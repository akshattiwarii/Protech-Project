// DOM Elements
const bookAppointmentBtn = document.getElementById('bookAppointmentBtn');
const openBookingBtn = document.getElementById('openBookingBtn');
const bookingModal = document.getElementById('bookingModal');
const closeModalBtn = document.querySelector('.close-modal');
const appointmentForm = document.getElementById('appointmentForm');
const emergencyBtn = document.getElementById('emergencyBtn');
const queuePosition = document.getElementById('queuePosition');
const queueNumber = document.getElementById('queueNumber');
const waitTime = document.getElementById('waitTime');
const statusText = document.getElementById('statusText');
const statusIndicator = document.getElementById('statusIndicator');
const leaveTime = document.getElementById('leaveTime');

// Open Modal
function openModal() {
    bookingModal.style.display = 'flex';
}

// Close Modal
function closeModal() {
    bookingModal.style.display = 'none';
}

// Emergency Booking
function handleEmergency() {
    if (confirm("This is for medical emergencies only. Are you sure?")) {
        // In a real app, this would prioritize the patient
        alert("Emergency slot booked! You'll be seen next.");
        queuePosition.textContent = "1";
        queueNumber.textContent = "1";
        waitTime.textContent = "0";
        statusText.textContent = "Priority";
        statusIndicator.style.color = "#dc3545";
        leaveTime.textContent = "Immediately";
    }
}

// Simulate Queue Updates
function updateQueueStatus() {
    // Rotate through statuses
    if (statusText.textContent === "Waiting") {
        statusText.textContent = "In Progress";
        statusIndicator.style.color = "#28a745";
        waitTime.textContent = "0";
        leaveTime.textContent = "Now";
    } else if (statusText.textContent === "In Progress") {
        statusText.textContent = "Completed";
        statusIndicator.style.color = "#6c757d";
    } else {
        statusText.textContent = "Waiting";
        statusIndicator.style.color = "#ffc107";
        waitTime.textContent = "15";
        leaveTime.textContent = "10:10 AM";
    }
}

// Form Submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const doctor = document.getElementById('doctor').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const isEmergency = document.getElementById('emergencyCheck').checked;
    
    if (!doctor || !date || !time) {
        alert("Please fill all fields!");
        return;
    }
    
    if (isEmergency) {
        alert("Emergency appointment booked! You'll be prioritized.");
        queuePosition.textContent = "1";
        queueNumber.textContent = "1";
        waitTime.textContent = "0";
        statusText.textContent = "Priority";
        statusIndicator.style.color = "#dc3545";
        leaveTime.textContent = "Immediately";
    } else {
        alert(`Appointment booked with Dr. ${doctor} on ${date} at ${time}`);
    }
    
    closeModal();
}

// Event Listeners
openBookingBtn.addEventListener('click', openModal);
bookAppointmentBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
emergencyBtn.addEventListener('click', handleEmergency);
appointmentForm.addEventListener('submit', handleFormSubmit);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        closeModal();
    }
});

// Simulate queue updates every 5 seconds
setInterval(updateQueueStatus, 5000);