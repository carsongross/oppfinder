<h1><i class="fa fa-search"></i> <span>Opportunity</span><span>Finder!!!  </span></h1>

<p>Welcome to OpportunityFinder, the 2014 Gosu Summer If Intern Project!</p>

<p>Would you like to begin a new analysis?</p>

<a class="btn btn-lg btn-primary" href="/companies">
  <strong>Upload or generate data</strong>
</a>

<button ic-post-to="/jobs/test" ic-target="#feedback" class="btn btn-lg btn-primary">
  <strong>Begin Analysis &rarr;</strong>
</button>

<span id="feedback"></span>
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
        Progress
      </th>
    </tr>
  </thead>
  <tbody>
    <% for(job in jobs.Job.ActiveJobs) { %>
    <tr>
      <td>
        ${job.UUId}
      </td>
       <td>
        ${job.Type}
      </td>
      <td>
      <div class="progress progress-striped active">
        <div class="progress-bar"  role="progressbar" aria-valuenow="${job.Progress}" aria-valuemin="0" aria-valuemax="100" style="width: ${job.Progress}%">
          <span class="sr-only">${job.Progress}% Complete</span>
        </div>
      </div>
      </td>
    <% } %>
  </tbody>
</table>
