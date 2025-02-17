function isEligibleForJob(age, experience, qualification) {
    const minimumAge = 21;
    const maximumAge = 55;
    const minimumExperience = 2;
    const requiredQualification = "Bachelor's Degree";

    if (age >= minimumAge && age <= maximumAge && experience >= minimumExperience && qualification === requiredQualification) {
      return true;
    } else {
      return false;
    }
  }

  document.getElementById("application-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let age = parseInt(document.getElementById("age").value);
    let experience = parseInt(document.getElementById("experience").value);
    let qualification = document.getElementById("qualification").value.trim();

    if (isNaN(age) || isNaN(experience) || qualification === "") {
      document.getElementById("result").innerText = "Please enter valid details.";
      return;
    }

    let isEligible = isEligibleForJob(age, experience, qualification);

    if (isEligible) {
      document.getElementById("result").innerText = "Congratulations! You are eligible for the job.";
    } else {
      document.getElementById("result").innerText = "Sorry, you are not eligible for the job.";
    }
  });
  