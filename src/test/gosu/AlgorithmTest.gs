uses junit.framework.*
uses datagen.GenerateTest
uses jobs.GenerateJob
uses jobs.RecommendJob
uses java.lang.Thread

class AlgorithmTest extends TestCase {
  static final var numCompanies = 1000

  public function testReaches() {
    for (1..80 index i) {
      print("iteration: "+i)
      new GenerateTest().generateTest('src/main/gosu/datagen/assets/dataReach.json', "Reach", numCompanies)
      var gJob = new GenerateJob('src/main/gosu/datagen/assets/dataReach.json')
      gJob.start().join()

      var recommendJob = new RecommendJob()
      recommendJob.start().join()

      var recommendations = recommendJob.ResultsData.find().next()
      assertEquals(recommendations.get("Company"), "RECOMMENDEE (test success)")

    }
  }


}