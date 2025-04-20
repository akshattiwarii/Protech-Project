// DOM Elements
const startConsultationBtn = document.getElementById('startConsultationBtn');
const completeConsultationBtn = document.getElementById('completeConsultationBtn');
const addNoteBtn = document.getElementById('addNoteBtn');
const refreshQueueBtn = document.getElementById('refreshQueueBtn');
const addEmergencyBtn = document.getElementById('addEmergencyBtn');
const setAvailabilityBtn = document.getElementById('setAvailabilityBtn');
const viewScheduleBtn = document.getElementById('viewScheduleBtn');
const queueList = document.getElementById('queueList');
const waitingPatients = document.getElementById('waitingPatients');
const emergencyModal = document.getElementById('emergencyModal');
const notesModal = document.getElementById('notesModal');
const emergencyForm = document.getElementById('emergencyForm');
const notesForm = document.getElementById('notesForm');

// Sample Queue Data
let queueData = [
    { id: 1, name: "Cristiano Ronaldo", time: "10:30 AM", status: "in-progress" },
    { id: 2, name: "Lionel Messi", time: "10:45 AM", status: "waiting" },
    { id: 3, name: "Shivi Gupta", time: "11:00 AM", status: "waiting" },
    { id: 4, name: "Saloni MIshra", time: "11:15 AM", status: "waiting" }
];

// Initialize the dashboard
function initDashboard() {
    renderQueue();
    updateWaitingCount();
}

// Render the patient queue
function renderQueue() {
    queueList.innerHTML = '';
    queueData.forEach(patient => {
        const row = document.createElement('tr');
        
        let statusBadge = '';
        if (patient.status === 'waiting') {
            statusBadge = '<span class="status-waiting">Waiting</span>';
        } else if (patient.status === 'in-progress') {
            statusBadge = '<span class="status-in-progress">In Progress</span>';
        }
        
        row.innerHTML = `
            <td>${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.time}</td>
            <td>${statusBadge}</td>
            <td>
                <button class="btn btn-sm btn-primary start-btn" data-id="${patient.id}">
                    Start
                </button>
            </td>
        `;
        queueList.appendChild(row);
    });
    
    // Add event listeners to all start buttons
    document.querySelectorAll('.start-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const patientId = parseInt(this.getAttribute('data-id'));
            startConsultation(patientId);
        });
    });
}

// Update waiting patients count
function updateWaitingCount() {
    const waitingCount = queueData.filter(p => p.status === 'waiting').length;
    waitingPatients.textContent = waitingCount;
}

// Start consultation
function startConsultation(patientId) {
    queueData = queueData.map(patient => {
        if (patient.id === patientId) {
            return { ...patient, status: 'in-progress' };
        }
        return patient;
    });
    
    renderQueue();
    updateWaitingCount();
    
    // Enable complete button
    completeConsultationBtn.disabled = false;
    startConsultationBtn.disabled = true;
    
    alert(`Consultation started for patient #${patientId}`);
}

// Complete consultation
function completeConsultation() {
    // In a real app, this would move the patient to completed
    alert('Consultation marked as completed');
    completeConsultationBtn.disabled = true;
    startConsultationBtn.disabled = false;
    
    // Remove the in-progress patient
    queueData = queueData.filter(p => p.status !== 'in-progress');
    renderQueue();
    updateWaitingCount();
}

// Add emergency patient
function addEmergencyPatient(e) {
    e.preventDefault();
    const name = document.getElementById('patientName').value;
    const reason = document.getElementById('emergencyReason').value;
    
    if (!name || !reason) {
        alert('Please fill all fields');
        return;
    }
    
    // Add to top of queue
    const newId = queueData.length > 0 ? Math.max(...queueData.map(p => p.id)) + 1 : 1;
    queueData.unshift({
        id: newId,
        name: name,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'waiting'
    });
    
    renderQueue();
    updateWaitingCount();
    emergencyModal.style.display = 'none';
    emergencyForm.reset();
    
    alert('Emergency patient added to queue!');
}

// Open modal
function openModal(modal) {
    modal.style.display = 'flex';
}

// Close modal
function closeModal(modal) {
    modal.style.display = 'none';
}

// Event Listeners
startConsultationBtn.addEventListener('click', () => {
    const nextPatient = queueData.find(p => p.status === 'waiting');
    if (nextPatient) startConsultation(nextPatient.id);
});

completeConsultationBtn.addEventListener('click', completeConsultation);
addNoteBtn.addEventListener('click', () => openModal(notesModal));
refreshQueueBtn.addEventListener('click', initDashboard);
addEmergencyBtn.addEventListener('click', () => openModal(emergencyModal));
setAvailabilityBtn.addEventListener('click', () => alert('Set availability feature would open here'));
viewScheduleBtn.addEventListener('click', () => alert('Schedule viewer would open here'));

// Close modals when clicking X
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        closeModal(modal);
    });
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});

// Form submissions
emergencyForm.addEventListener('submit', addEmergencyPatient);
notesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Notes saved successfully!');
    notesModal.style.display = 'none';
    notesForm.reset();
});

// Initialize the dashboard
initDashboard();