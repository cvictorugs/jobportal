const jobSearchBar = document.getElementById('job_search_bar');
// let jobData = null;

function findJobs(userPrompt) {
  fetch('https://jsearch.p.rapidapi.com/search?query=developer%20jobs%20in%20chicago&page=1&num_pages=1&country=us&date_posted=all', {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'jsearch.p.rapidapi.com',
      'x-rapidapi-key': 'dfe5a02c45mshb0798228d053839p147744jsnf553b83ccddc'
    }
  })
  .then(promise => {
    if (!promise.ok) {
      throw new Error('The promise was not ok');
    }
    return promise.json();
  })
  .then(data => {
    console.log('Searched jobs:', data);
    // console.log('job data', jobData);
    // jobData = data;
    renderJobs(data.data);
    
  })
  .catch(err => {
    console.error('Error fetching data:', err);
  });
}

jobSearchBar.addEventListener('keydown', () => {
  console.log('a prompt is being made')
  findJobs(jobSearchBar.value);
});

function renderJobs(jobData){
  const jobsContainer = document.getElementById('jobs_container');
  const jobCardsHTML = jobData.map(j => 
  `
    <div class="job-card">
      <div>
        <div class="job-posted-at">${j.job_posted_at}</div>
          <div> Save icon</div>
      </div>
      <div>
        <div> <img src="${j.employer_logo}"/></div>
        <h2 class="job-title">${j.job_title}</h2>
        <p class="employer-name">${j.employer_name}</p>
      </div>
      <div>
        <div> 
          <img src=""/>icon goes here
          <p>job sector goes here</p>
        </div>
         <div>
           <img src=""/>clock icon goes here
            <p class="employment-type">${j.job_employment_type}</p>
         </div>
         <div>
           <img src=""/>wallet icon goes here
           <p class="salary">${j.job_min_salary} - ${j.job_max_salary}</p>
         </div>
         <div>
           <img src=""/>location icon goes here
           
         </div>
      </div>
      <p class="location">${j.job_state},${j.job_country}</p>
      <button onClick="viewDetails()" class="details-btn" id="details_btn">View Details</button>
    </div>`
  ).join("")

  jobsContainer.innerHTML = jobCardsHTML;
}

// find out more info about the job
function viewDetails() {
  console.log('view details button was clicked');
}
// const viewDetailsBtn = document.getElementById('details_btn');
// viewDetailsBtn.addEventListener('click', () => 
//   console.log('view details button was clicked')
// );

     {/* <div class="job-card"> */}
       {/* <h2 class="job-title"v>Backend Engineer</h2> */}
       {/* <p class="company">Code Labs</p> */}
       {/* <p class="location">Lagos, Nigeria</p> */}
       {/* <p class="salary">₦3,000,000/year</p> */}
       {/* <button class="details-btn">View Details</button> */}
     {/* </div> */}