<%@ params(page : int)%>
${JobTable.renderToString(jobs.Job.ActiveJobs, "Currently Running Jobs", "running", page)}