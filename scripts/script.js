const ageDiv = document.getElementsByClassName("age")[0];

const dob = new Date("2006-02-28T00:00:00Z");
const secondsInYear = 365.2425 * 24 * 60 * 60;

function updateAge() {
    const now = new Date();
    const ageInSeconds = (now - dob) / 1000; // milliseconds → seconds
    const ageInYears = ageInSeconds / secondsInYear;

    ageDiv.textContent = ageInYears.toFixed(9);
}

// Call every 1 milliseconds
setInterval(updateAge, 1);