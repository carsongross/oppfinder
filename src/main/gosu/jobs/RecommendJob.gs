package jobs

uses java.lang.Runnable
uses java.util.Map
uses java.lang.Thread
uses model.DataSet
uses java.lang.Float
uses model.DataSetEntry
uses util.MahoutUtil

class RecommendJob extends Job implements Runnable {

  var subJobs = {"recommender.LocationFieldImpl", "recommender.SizeFieldImpl"}//, "recommender.ReachFieldImpl","recommender.IndustryFieldImpl"}
  var subJobsID : List<String> = {}
  final var SLEEP_TIME = 1000

  construct(data : Map<Object, Object> ) {
    super(data)
  }

  construct() {
    super()
  }

  override function run() {
    if (Cancelled) return
    for (jobName in subJobs) {
      var job = new RecommendSubJob(jobName)
      job.start()
      subJobsID.add(job.UUId)
      if (Cancelled) return
    }
    poll() //Blocks until sub-tasks are complete
    if (Cancelled) return
    var recommendations : Map<String, Float>  = {}
    for (jobID in subJobsID) {
      var ds = new DataSet(jobID)
      for (companyRecommendations in ds.find()) {
        companyRecommendations.remove('_id')
        var entry = companyRecommendations.entrySet().first()
        if (recommendations.containsKey(entry.Key)) {
          var value = recommendations.get(entry.Key)
          recommendations.put(entry.Key as String, (value + entry.Value as Float) / 2)
        } else {
          recommendations.put(entry.Key as String,entry.Value as Float)
        }
      }
      ds.drop() //Get rid of the temp data
    }
    var sorted = recommendations.entrySet().stream().sorted(Map.Entry.comparingByValue())
    var finalResults = new DataSet('Results:'+UUId)
    var companyDB = new DataSet(DataSetEntry.COLLECTION)
    for (each in sorted.iterator() index i) {
      if (i == 20) break
      var result : Map<Object, Object> = {}
      var info = each.Key.split(",")
      var company = companyDB.find({'longID' -> info[0].toLong()},{'Company' -> 1})
      result.put('Company', company.next()['Company'])
      result.put('Policy',MahoutUtil.longToPolicy(info[1].toLong()))
      result.put('Value', each.Value)
      finalResults.insert(result)
    }
    this.Progress = 100
  }

  property get ResultsData() : DataSet {
    return new DataSet('Results:'+UUId)
  }

  override function reset() {
    for (jobID in subJobsID) {
      new DataSet(jobID).drop()
    }
  }

  override function renderToString() : String {
    return view.RecommendJob.renderToString(this)
  }

  function poll() {
    var finished = false
    while (true) {
      if (Cancelled) {
        return
      }
      finished = true
      for (jobID in subJobsID) {
        if (Job.getUUIDProgress(jobID) < Job.MAX_PROGRESS_VALUE) {
          finished = false
          break
        }
      }
      if (finished) {
        return
      }
      Thread.sleep(SLEEP_TIME)
    }
  }

}