document.getElementById('jobs_container').style.backgroundColor = 'green'



const jobSearchBar = document.getElementById('job_search_bar');
let jobData = null;

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
    jobData = data;
    renderJobs();
    
  })
  .catch(err => {
    console.error('Error fetching data:', err);
  });
}

jobSearchBar.addEventListener('change', () => {
  findJobs(jobSearchBar.value)
});

function renderJobs(){
  document.getElementById('jobs_container').innerHTML = `
 ${jobData.map((j,index) => (
    <div key=${j.job_id} class="job-card">
      <div>
        <div class="job-posted-at">${j.job_posted_at}</div>
          <div> Save icon</div>
      </div>
      <div>
        <div> <img src="${j.employer_logo}"></div>
        <h2 class="job-title">${j.job_title}</h2>
        <p class="employer-name">${j.employer_name}</p>
      </div>
      <div>
        <div> 
          <img>icon goes here
          <p>job sector goes here</p>
        </div>
         <div>
           <img>clock icon goes here
            <p class="employment-type">${j.job_employment_type}</p>
         </div>
         <div>
           <img>wallet icon goes here
           <p class="salary">${j.job_min_salary} - ${j.job_max_salary}</p>
         </div>
         <div>
           <img>location icon goes here
           
         </div>
      </div>
      <p class="location">${j.job_state},${j.job_country}</p>
      <button class="details-btn" id="details_btn">View Details</button>
    </div>
  )).join("")
}
`
}

    // <div class="job-card">
    //   <h2 class="job-title">Backend Engineer</h2>
    //   <p class="company">Code Labs</p>
    //   <p class="location">Lagos, Nigeria</p>
    //   <p class="salary">₦3,000,000/year</p>
    //   <button class="details-btn">View Details</button>
    // </div>