package controller

uses jobs.Job
uses model.Pager

class PagerController {
  static function getPager(type : String, page : long) : Pager<Job> {
    var pager : Pager<Job>
    if (type == "complete") {
      pager = new Pager<Job>(Job.CompleteJobs,10)
    } else if (type == "running") {
      pager = new Pager<Job>(Job.ActiveJobs,10)
    } else {
      pager = new Pager<Job>(Job.CancelledJobs,10)
    }
    if (!pager.validPage(page)) {
      page = pager.lastPage()
    }
    pager.getPage(page)
    return pager
  }
}