<%@ params(type: String, pager: model.Pager<jobs.Job>) %>
<table class="table">
  <thead>
    <tr>
      <th>
        Job Id
      </th>
      <th>
        Job Type
      </th>
      <th>
        Total Time
      </th>
      <th>
        Progress
      </th>
    </tr>
  </thead>
  <tbody>
    <%
     if (pager.Current == 1 && pager.Page.size() == 0) { %>
      <div class="alert alert-info alert-dismissable">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <strong>Attention: </strong> There are currently no ${type} jobs in the database
      </div>
    <% } else {
    for(job in pager.Page)  {%>
    <tr>
      <td>
        <a href='/jobs/${job.UUId}/info' style="color:#476CB5">${job.UUId}</a>
      </td>
      <td>
        ${job.Type}
      </td>
      <td>
        <div ic-src="/jobs/${job.UUId}/elapsed_time" ic-transition="none" ic-poll="1s">${job.ElapsedTime}</div>
      </td>
      <td>
        <% if (job.Cancelled || job.Progress == 100) { %>
        <div class="progress">
        <% }else{ %>
        <div class="progress progress-striped active">
        <% } %>
          <div class="progress-bar"
            ic-style-src="width:/jobs/${job.UUId}/percent_done"
            ic-poll="1s" style="width:${jobs.Job.getUUIDProgress(job.UUId)}">
         </div>
      </div>
      </td>
    <% if (job.Progress < 100 && !(job.Cancelled || job.Failed)) { %>
      <td>
        <button ic-post-to="/jobs/action/state/${job.UUId}/cancel" class="btn btn-danger btn-sm" role="button"><b>Cancel</b></button>
      </td>
    <% } else {
       if (job.Cancelled || job.Failed) { %>
        <td>
          <button ic-post-to="/jobs/action/state/${job.UUId}/reset" class="btn btn-primary btn-sm" role="button"><span class="glyphicon glyphicon-repeat"></span></button>
        </td>
        <% } %>
      <td>
        <button ic-post-to="/jobs/action/delete/${job.UUId}" class="btn btn-danger btn-sm" role="button"><span class="glyphicon glyphicon-trash"></span></button>
      </td>
   <% } %>
   </tr>
   <% }
  } %>
  </tbody>
</table>
