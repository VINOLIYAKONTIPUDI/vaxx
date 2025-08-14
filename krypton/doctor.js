// Doctor Dashboard JavaScript
const apiCall = async (url, method, data = null) => {
  const options = {
    method: method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      "Content-Type": "application/json",
    },
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  const response = await fetch(url, options)
  return response.json()
}

class DoctorDashboard {
  constructor() {
    this.currentUser = null
    this.patients = []
    this.selectedPatient = null
    this.init()
  }

  async init() {
    // Check authentication
    const token = localStorage.getItem("authToken")
    const userType = localStorage.getItem("userType")

    if (!token || userType !== "DOCTOR") {
      window.location.href = "/index.html"
      return
    }

    this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
    await this.loadPatients()
    this.setupEventListeners()
    this.updateUI()
  }

  async loadPatients() {
    try {
      const response = await apiCall("/api/doctor/patients", "GET")
      this.patients = response.data || []
      this.renderPatientsList()
    } catch (error) {
      console.error("Error loading patients:", error)
      showNotification("Error loading patients", "error")
    }
  }

  renderPatientsList() {
    const patientsList = document.getElementById("patientsList")
    if (!patientsList) return

    if (this.patients.length === 0) {
      patientsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <h3>No Patients Assigned</h3>
                    <p>You don't have any patients assigned yet.</p>
                </div>
            `
      return
    }

    patientsList.innerHTML = this.patients
      .map(
        (patient) => `
            <div class="patient-card" onclick="doctorDashboard.selectPatient(${patient.id})">
                <div class="patient-info">
                    <div class="patient-avatar">
                        ${
                          patient.photoUrl
                            ? `<img src="${patient.photoUrl}" alt="${patient.name}">`
                            : `<i class="fas fa-child"></i>`
                        }
                    </div>
                    <div class="patient-details">
                        <h3>${patient.name}</h3>
                        <p class="patient-meta">
                            <span><i class="fas fa-birthday-cake"></i> ${this.formatDate(patient.dateOfBirth)}</span>
                            <span><i class="fas fa-venus-mars"></i> ${patient.gender}</span>
                            <span><i class="fas fa-tint"></i> ${patient.bloodGroup}</span>
                        </p>
                        <p class="parent-info">
                            <i class="fas fa-user"></i> Parent: ${patient.parentName}
                        </p>
                    </div>
                </div>
                <div class="patient-status">
                    <span class="vaccination-count">${patient.completedVaccinations || 0} completed</span>
                    <span class="pending-count">${patient.pendingVaccinations || 0} pending</span>
                </div>
            </div>
        `,
      )
      .join("")
  }

  async selectPatient(patientId) {
    this.selectedPatient = this.patients.find((p) => p.id === patientId)
    if (!this.selectedPatient) return

    // Update UI to show selected patient
    document.querySelectorAll(".patient-card").forEach((card) => {
      card.classList.remove("selected")
    })
    event.currentTarget.classList.add("selected")

    // Load patient's vaccination schedule
    await this.loadPatientVaccinations(patientId)
    this.showPatientDetails()
  }

  async loadPatientVaccinations(patientId) {
    try {
      const response = await apiCall(`/api/doctor/patients/${patientId}/vaccinations`, "GET")
      this.selectedPatient.vaccinations = response.data || []
      this.renderVaccinationSchedule()
    } catch (error) {
      console.error("Error loading vaccinations:", error)
      showNotification("Error loading vaccination data", "error")
    }
  }

  showPatientDetails() {
    const detailsSection = document.getElementById("patientDetails")
    if (!detailsSection || !this.selectedPatient) return

    detailsSection.style.display = "block"
    detailsSection.innerHTML = `
            <div class="patient-header">
                <div class="patient-photo">
                    ${
                      this.selectedPatient.photoUrl
                        ? `<img src="${this.selectedPatient.photoUrl}" alt="${this.selectedPatient.name}">`
                        : `<div class="photo-placeholder"><i class="fas fa-child"></i></div>`
                    }
                </div>
                <div class="patient-info">
                    <h2>${this.selectedPatient.name}</h2>
                    <div class="patient-meta">
                        <span><i class="fas fa-birthday-cake"></i> ${this.formatDate(this.selectedPatient.dateOfBirth)}</span>
                        <span><i class="fas fa-venus-mars"></i> ${this.selectedPatient.gender}</span>
                        <span><i class="fas fa-tint"></i> ${this.selectedPatient.bloodGroup}</span>
                    </div>
                    <p class="parent-contact">
                        <i class="fas fa-phone"></i> ${this.selectedPatient.parentPhone || "No phone"}
                        <i class="fas fa-envelope"></i> ${this.selectedPatient.parentEmail || "No email"}
                    </p>
                </div>
            </div>
            <div class="vaccination-schedule-container">
                <h3>Vaccination Schedule</h3>
                <div id="vaccinationSchedule"></div>
            </div>
        `
  }

  renderVaccinationSchedule() {
    const scheduleContainer = document.getElementById("vaccinationSchedule")
    if (!scheduleContainer || !this.selectedPatient.vaccinations) return

    const vaccinations = this.selectedPatient.vaccinations

    if (vaccinations.length === 0) {
      scheduleContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-syringe"></i>
                    <p>No vaccination schedule available</p>
                </div>
            `
      return
    }

    scheduleContainer.innerHTML = vaccinations
      .map(
        (vaccination) => `
            <div class="vaccination-item ${vaccination.status.toLowerCase()}">
                <div class="vaccination-info">
                    <h4>${vaccination.vaccineName}</h4>
                    <p class="vaccination-description">${vaccination.description || ""}</p>
                    <div class="vaccination-meta">
                        <span class="due-date">
                            <i class="fas fa-calendar"></i> 
                            Due: ${this.formatDate(vaccination.dueDate)}
                        </span>
                        <span class="status-badge status-${vaccination.status.toLowerCase()}">
                            ${vaccination.status}
                        </span>
                    </div>
                </div>
                <div class="vaccination-actions">
                    ${
                      vaccination.status === "PENDING"
                        ? `
                        <button class="btn btn-primary" onclick="doctorDashboard.markAsCompleted(${vaccination.id})">
                            <i class="fas fa-check"></i> Mark Completed
                        </button>
                    `
                        : vaccination.status === "COMPLETED"
                          ? `
                        <div class="completed-info">
                            <p><i class="fas fa-check-circle"></i> Completed on ${this.formatDate(vaccination.completedDate)}</p>
                            ${vaccination.notes ? `<p class="notes"><i class="fas fa-sticky-note"></i> ${vaccination.notes}</p>` : ""}
                        </div>
                    `
                          : ""
                    }
                </div>
            </div>
        `,
      )
      .join("")
  }

  async markAsCompleted(vaccinationId) {
    const notes = prompt("Add any notes about this vaccination (optional):")

    try {
      const response = await apiCall(`/api/doctor/vaccinations/${vaccinationId}/complete`, "POST", {
        notes: notes || "",
        completedDate: new Date().toISOString(),
      })

      if (response.success) {
        showNotification("Vaccination marked as completed", "success")
        // Reload patient vaccinations
        await this.loadPatientVaccinations(this.selectedPatient.id)
      }
    } catch (error) {
      console.error("Error marking vaccination as completed:", error)
      showNotification("Error updating vaccination status", "error")
    }
  }

  setupEventListeners() {
    // Logout button
    const logoutBtn = document.getElementById("logoutBtn")
    if (logoutBtn) {
      logoutBtn.addEventListener("click", this.logout.bind(this))
    }

    // Search functionality
    const searchInput = document.getElementById("patientSearch")
    if (searchInput) {
      searchInput.addEventListener("input", this.filterPatients.bind(this))
    }
  }

  filterPatients(event) {
    const searchTerm = event.target.value.toLowerCase()
    const patientCards = document.querySelectorAll(".patient-card")

    patientCards.forEach((card) => {
      const patientName = card.querySelector("h3").textContent.toLowerCase()
      const parentName = card.querySelector(".parent-info").textContent.toLowerCase()

      if (patientName.includes(searchTerm) || parentName.includes(searchTerm)) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })
  }

  updateUI() {
    // Update doctor name in header
    const doctorNameElement = document.getElementById("doctorName")
    if (doctorNameElement && this.currentUser) {
      doctorNameElement.textContent = `Dr. ${this.currentUser.name}`
    }
  }

  formatDate(dateString) {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  logout() {
    localStorage.removeItem("authToken")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("userType")
    window.location.href = "/index.html"
  }
}

// Utility function for notifications
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    `

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)
}

// Initialize dashboard when page loads
let doctorDashboard
document.addEventListener("DOMContentLoaded", () => {
  doctorDashboard = new DoctorDashboard()
})
