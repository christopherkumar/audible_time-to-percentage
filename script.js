// ===========================
// GLOBAL VARIABLES
// ===========================

// Store the current mode (either "completed" or "remaining")
let mode = "completed";

// DOM elements for buttons, labels, and progress display
const completedBtn = document.getElementById("completedBtn");
const remainingBtn = document.getElementById("remainingBtn");
const inputLabel = document.getElementById("inputLabel");
const timeDisplay = document.getElementById("timeDisplay");
const ring = document.getElementById("ring");
const percentText = document.getElementById("percentText");

// Variable to hold the last calculated times
let lastCalc = null;

// ===========================
// ALERT FUNCTION (Custom Toast)
// ===========================

/**
 * Show a custom alert message in a floating box.
 * 
 * param {string} message - The message to display in the alert.
 */
function showAlert(message) {
    const box = document.getElementById("alertBox");
    box.textContent = message;
    box.classList.remove("hidden");
    box.classList.add("show");

    // Hide alert after 2.5 seconds
    setTimeout(() => {
        box.classList.remove("show");
        setTimeout(() => box.classList.add("hidden"), 400);
    }, 2500);
}  

// ===========================
// TOGGLE MODE FUNCTION
// ===========================

/**
 * Update the toggle button colors and input labels based on the selected mode.
 * - Adds "active" and specific mode class to buttons
 * - Updates the label of the input fields
 */
function updateToggleDisplay() {
    // Reset active states
    completedBtn.classList.remove("active", "completed-active");
    remainingBtn.classList.remove("active", "remaining-active");

    // Update active button and label based on selected mode
    if (mode === "completed") {
      completedBtn.classList.add("active", "completed-active");
      inputLabel.innerText = "Completed Time:";
    } else {
      remainingBtn.classList.add("active", "remaining-active");
      inputLabel.innerText = "Remaining Time:";
    }

    // Update ring and stat display based on latest calculation
    if (lastCalc) updateRingAndStat();
}

// ===========================
// BUTTON EVENT LISTENERS
// ===========================

// Switch to completed mode
completedBtn.addEventListener("click", () => {
    mode = "completed";
    updateToggleDisplay();
});

// Switch to remaining mode
remainingBtn.addEventListener("click", () => {
    mode = "remaining";
    updateToggleDisplay();
});

// ===========================
// FORM SUBMISSION & VALIDATION
// ===========================

document.getElementById("progressForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Parse total time from inputs
    let totalHours = parseInt(document.getElementById("totalHours").value) || 0;
    let totalMinutes = parseInt(document.getElementById("totalMinutes").value) || 0;

    // Normalize total time to minutes
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;
    const total = totalHours * 60 + totalMinutes;

    // Parse input time from inputs
    let inputHours = parseInt(document.getElementById("inputHours").value) || 0;
    let inputMinutes = parseInt(document.getElementById("inputMinutes").value) || 0;

    // Normalize input time to minutes
    inputHours += Math.floor(inputMinutes / 60);
    inputMinutes = inputMinutes % 60;
    const input = inputHours * 60 + inputMinutes;

    // Validate: Input time cannot exceed total time
    if (input > total) {
      showAlert("Input time cannot be more than total time.");
      return;
    }

    // Determine completed and remaining time based on mode
    let completed, remaining;
    if (mode === "completed") {
      completed = input;
      remaining = total - input;
    } else {
      remaining = input;
      completed = total - input;
    }

    // Store the calculated values
    lastCalc = { completed, remaining, total };

    // Update the ring and stats display
    updateRingAndStat();
});

// ===========================
// RING AND STAT UPDATE FUNCTION
// ===========================

/**
 * Update the progress ring and stats based on the current calculation.
 */
function updateRingAndStat() {
    if (!lastCalc) return; // If no calculation exists, do nothing
    const { completed, remaining, total } = lastCalc;

    const ringLength = 408; // The length of the stroke dasharray (circumference of the circle)

    // Select completed and remaining rings
    const completedRing = document.querySelector(".completed");
    const remainingRing = document.querySelector(".remaining");

    // Calculate the percentage for completed and remaining times
    const completedPercent = (completed / total) * 100;
    const remainingPercent = (remaining / total) * 100;

    // Calculate the stroke dashoffset based on the percentage
    const completedOffset = ringLength - (ringLength * completedPercent) / 100;
    const remainingOffset = ringLength - (ringLength * remainingPercent) / 100;

    // Display both rings
    completedRing.style.display = "block";
    remainingRing.style.display = "block";

    // Adjust the ring positions based on the mode
    if (mode === "completed") {
      completedRing.style.strokeDashoffset = completedOffset;
      remainingRing.style.strokeDashoffset = ringLength; // Hide remaining ring
    } else {
      remainingRing.style.transform = `rotate(${(360 * completed / total)}deg)`; // Position remaining ring correctly
      remainingRing.style.transformOrigin = "center";

      remainingRing.style.strokeDashoffset = remainingOffset;
      completedRing.style.strokeDashoffset = ringLength; // Hide completed ring
    }

    // Update the displayed time and percentage
    const value = mode === "completed" ? completed : remaining;
    const label = mode === "completed" ? "Completed" : "Remaining";
    const h = Math.floor(value / 60);
    const m = value % 60;
    const percent = (value / total) * 100;

    // Update the UI with the new percentage and time values
    document.getElementById("percentText").textContent = `${percent.toFixed(1)}%`;
    document.getElementById("timeDisplay").textContent = `${label} Time: ${h}h ${m}m`;
}

// Initial display update when page loads
updateToggleDisplay();
