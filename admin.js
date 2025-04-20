// DOM Elements
const addDoctorBtn = document.getElementById('addDoctorBtn');
const doctorModal = document.getElementById('doctorModal');
const reportModal = document.getElementById('reportModal');
const doctorForm = document.getElementById('doctorForm');
const reportForm = document.getElementById('reportForm');
const reportType = document.getElementById('reportType');
const reportPeriod = document.getElementById('reportPeriod');
const customDateRange = document.getElementById('customDateRange');
const doctorsTable = document.getElementById('doctorsTable');
const appointmentsTable = document.getElementById('appointmentsTable');
const activityList = document.getElementById('activityList');
const appointmentFilter = document.getElementById('appointmentFilter');

// Sample Data
let doctors = [
    { id: 1, name: "Dr.Ayush Mishra", specialty: "Cardiology", status: "Active" },
    { id: 2, name: "Dr.Akshat Tiwari", specialty: "Pediatrics", status: "Active" },
    { id: 3, name: "Dr.Avinesh Kushwaha", specialty: "Dermatology", status: "Active" },
    { id: 4, name: "Dr.Amit Shukla", specialty: "Neurology", status: "On Leave" }
];

let appointments = [
    { id: 1, patient: "Cristiano Ronaldo", doctor: "Dr. Ayush Mishra", datetime: "2023-06-15 10:00", status: "Completed" },
    { id: 2, patient: "Leonel Messi", doctor: "Dr.Aditya Diwedi", datetime: "2023-06-15 10:30", status: "Completed" },
    { id: 3, patient: "Shivi Gupta", doctor: "Dr.Amit Shukla", datetime: "2023-06-15 11:00", status: "In Progress" },
    { id: 4, patient: "Saloni Mishra", doctor: "Dr.Avinesh Kushwaha", datetime: "2023-06-15 11:30", status: "Pending" }
];

let activities = [
    { type: "appointment", description: "New appointment booked with Dr.Mishra", time: "10 mins ago" },
    { type: "doctor", description: "Dr.Tiwari updated availability", time: "25 mins ago" },
    { type: "system", description: "System maintenance completed", time: "1 hour ago" },
    { type: "patient", description: "New patient registered", time: "2 hours ago" }
];

// Initialize Dashboard
function initDashboard() {
    renderDoctors();
    renderAppointments();
    renderActivities();
}

// Render Doctors Table
function renderDoctors() {
    doctorsTable.innerHTML = '';
    doctors.forEach(doctor => {
        const row = document.createElement('tr');
        
        let statusBadge = '';
        if (doctor.status === 'Active') {
            statusBadge = '<span style="color:green">●</span> Active';
        } else {
            statusBadge = '<span style="color:orange">●</span> On Leave';
        }
        
        row.innerHTML = `
            <td>${doctor.id}</td>
            <td>${doctor.name}</td>
            <td>${doctor.specialty}</td>
            <td>${statusBadge}</td>
            <td>
                <button class="btn btn-sm btn-success edit-btn" data-id="${doctor.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-btn" data-id="${doctor.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        doctorsTable.appendChild(row);
    });
    
    // Add event listeners to buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const doctorId = parseInt(this.getAttribute('data-id'));
            editDoctor(doctorId);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const doctorId = parseInt(this.getAttribute('data-id'));
            deleteDoctor(doctorId);
        });
    });
}

// Render Appointments Table
function renderAppointments() {
    appointmentsTable.innerHTML = '';
    appointments.forEach(appointment => {
        const row = document.createElement('tr');
        
        let statusBadge = '';
        if (appointment.status === 'Completed') {
            statusBadge = '<span style="color:green">Completed</span>';
        } else if (appointment.status === 'In Progress') {
            statusBadge = '<span style="color:blue">In Progress</span>';
        } else {
            statusBadge = '<span style="color:orange">Pending</span>';
        }
        
        row.innerHTML = `
            <td>${appointment.id}</td>
            <td>${appointment.patient}</td>
            <td>${appointment.doctor}</td>
            <td>${appointment.datetime}</td>
            <td>${statusBadge}</td>
            <td>
                <button class="btn btn-sm btn-primary view-btn" data-id="${appointment.id}">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-danger cancel-btn" data-id="${appointment.id}">
                    <i class="fas fa-times"></i>
                </button>
            </td>
        `;
        appointmentsTable.appendChild(row);
    });
}

// Render Activity List
function renderActivities() {
    activityList.innerHTML = '';
    activities.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        
        let icon = '';
        if (activity.type === 'appointment') {
            icon = '<i class="fas fa-calendar-check"></i>';
        } else if (activity.type === 'doctor') {
            icon = '<i class="fas fa-user-md"></i>';
        } else if (activity.type === 'patient') {
            icon = '<i class="fas fa-procedures"></i>';
        } else {
            icon = '<i class="fas fa-cog"></i>';
        }
        
        item.innerHTML = `
            <div class="activity-icon">${icon}</div>
            <div class="activity-details">
                <p>${activity.description}</p>
                <small class="activity-time">${activity.time}</small>
            </div>
        `;
        activityList.appendChild(item);
    });
}

// Add New Doctor
function addDoctor(e) {
    e.preventDefault();
    
    const name = document.getElementById('doctorName').value;
    const specialty = document.getElementById('doctorSpecialty').value;
    const email = document.getElementById('doctorEmail').value;
    const phone = document.getElementById('doctorPhone').value;
    
    if (!name || !specialty || !email || !phone) {
        alert('Please fill all fields');
        return;
    }
    
    const newId = doctors.length > 0 ? Math.max(...doctors.map(d => d.id)) + 1 : 1;
    doctors.push({
        id: newId,
        name: name,
        specialty: specialty,
        status: "Active"
    });
    
    renderDoctors();
    doctorModal.style.display = 'none';
    doctorForm.reset();
    
    alert('Doctor added successfully!');
}

// Edit Doctor
function editDoctor(id) {
    const doctor = doctors.find(d => d.id === id);
    if (doctor) {
        alert(`Edit doctor: ${doctor.name}\nThis would open an edit form in a real application.`);
    }
}

// Delete Doctor
function deleteDoctor(id) {
    if (confirm('Are you sure you want to delete this doctor?')) {
        doctors = doctors.filter(d => d.id !== id);
        renderDoctors();
        alert('Doctor deleted successfully!');
    }
}

// Generate Report
function generateReport(e) {
    e.preventDefault();
    
    const type = reportType.value;
    const period = reportPeriod.value;
    
    if (!type) {
        alert('Please select report type');
        return;
    }
    
    alert(`Generating ${type} report for ${period}...\nThis would generate a PDF/CSV in a real application.`);
    reportModal.style.display = 'none';
}

// Filter Appointments
function filterAppointments() {
    const filter = appointmentFilter.value;
    alert(`Filtering appointments by: ${filter}\nThis would filter the table in a real application.`);
}

// Toggle Custom Date Range
reportPeriod.addEventListener('change', function() {
    customDateRange.style.display = this.value === 'custom' ? 'block' : 'none';
});

// Event Listeners
addDoctorBtn.addEventListener('click', () => {
    doctorModal.style.display = 'flex';
});

doctorForm.addEventListener('submit', addDoctor);
reportForm.addEventListener('submit', generateReport);
appointmentFilter.addEventListener('change', filterAppointments);

// Close modals when clicking X
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        modal.style.display = 'none';
    });
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Initialize the dashboard
initDashboard();