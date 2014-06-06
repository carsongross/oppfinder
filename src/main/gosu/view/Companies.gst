<h2>The table of generated data to be analyzed is displayed below.</h2><br>
<a class="btn btn-lg btn-primary" href="/">
  <strong>Go Back</strong>
</a>
<table class="table">
  <thead>
    <tr>
      <% for (type in model.Company.CompanyDataTypes) { %>
        <th> ${type} </th>
      <% } %>
    </tr>
  </thead>
  <tbody>
    <% for (entry in model.DataSetEntry.All) { %>
      <tr>
        <% for (type in model.Company.CompanyDataTypes) { %>
          <td> ${entry[type]} </td>
        <% } %>
      </tr>
    <% } %>
  </tbody>
</table>
