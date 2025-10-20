const pulse = document.getElementsByClassName("pulse")[0];
const ageDiv = document.getElementsByClassName("age")[0]; // get first .age element

const isAlive = true;
const dob = new Date("2006-02-28T00:00:00Z");
const secondsInYear = 365.2425 * 24 * 60 * 60;

if (isAlive) {
  pulse.classList.remove("dead");
  pulse.classList.add("alive");
} else {
  pulse.classList.remove("alive");
  pulse.classList.add("dead");
}

let firstTime = true;
function updateAge() {
  if (!firstTime) {
    if (!isAlive) return; // if not alive(dead) dont update the age
  } else firstTime = false;

  const now = new Date();
  const ageInSeconds = (now - dob) / 1000; // milliseconds → seconds
  const ageInYears = ageInSeconds / secondsInYear;

  // Display with 12 decimal places
  ageDiv.textContent = ageInYears.toFixed(12);
}

// Call every 1 milliseconds for smooth update
setInterval(updateAge, 1);
