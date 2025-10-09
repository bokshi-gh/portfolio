const ageDiv = document.getElementsByClassName("age")[0]; // get first .age element

const dob = new Date("2006-02-28T00:00:00Z");
const secondsInYear = 365.2425 * 24 * 60 * 60;

function updateAge() {
    const now = new Date();
    const ageInSeconds = (now - dob) / 1000; // milliseconds → seconds
    const ageInYears = ageInSeconds / secondsInYear;
  
    // Display with 12 decimal places
    ageDiv.textContent = ageInYears.toFixed(12);
}

// Call every 1 milliseconds for smooth update
setInterval(updateAge, 1);
