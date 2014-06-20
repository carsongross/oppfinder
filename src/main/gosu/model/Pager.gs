package model

uses util.SkipIterator

class Pager<T> {

  var pageSize : long
  var iterate : SkipIterator<T>
  var copy : SkipIterator<T>
  var jobs : List<T>
  var page : long as Current
  var processed : boolean

  construct(i : SkipIterator<T>, size : long, p : long) {
    iterate = i
    copy = i.copy()
    pageSize = size
    jobs = {}
    page = (validPage(p)) ? p : lastPage()
  }

  function getPage() : List<T> {
    if (processed || page == 0) return jobs
    iterate.skip((page -1) * pageSize)
    for (i in 0..|pageSize) {
      if (!iterate.hasNext()) {
        break
      }
      jobs.add(iterate.next())
    }
    processed = true
    return jobs
  }

  function validPage(p : long) : boolean {
    if (p < 1) return false
    var tmp = copy.copy()
    tmp.skip((p - 1) * pageSize)
    return tmp.hasNext()
  }

  function checkStatus(p : long) : String {
    if (p == page) {
      return "active"
    } else if (validPage(p)) {
      return ""
    }
    return "disabled"
  }

  function lastPage() : long {
    return iterate.Count / pageSize
  }

}