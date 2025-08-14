// Doctor Dashboard JavaScript
class DoctorDashboard {
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    this.patients = []
    this.pendingVaccinations = []
    this.overdueVaccinations = []
    this.records = []
    this.currentSection = "patients"
    this.init()
  }

  init() {
    // Check if user is logged in and is a doctor
    if (!window.apiClient.token || this.currentUser.role !== "DOCTOR") {
      window.location.href = "index.html"
      return
    }

    this.setupEventListeners()
    this.updateDoctorInfo()
    this.loadDashboardData()
  }

  setupEventListeners() {
    // Navigation
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const section = link.getAttribute("href").substring(1)
        this.showSection(section)
      })
    })

    // Logout
    const logoutBtn = document.getElementById("logoutBtn")
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => this.logout())
    }

    // Modal controls
    this.setupModalControls()

    // Forms
    this.setupForms()

    // Mobile menu
    this.setupMobileMenu()
  }

  setupModalControls() {
    // Complete vaccination modal
    const closeCompleteModal = document.getElementById("closeCompleteModal")
    if (closeCompleteModal) {
      closeCompleteModal.addEventListener("click", () => this.hideModal("completeVaccinationModal"))
    }

    // Patient schedule modal
    const closeScheduleModal = document.getElementById("closeScheduleModal")
    if (closeScheduleModal) {
      closeScheduleModal.addEventListener("click", () => this.hideModal("patientScheduleModal"))
    }

    // Close modals when clicking outside
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        this.hideModal(e.target.id)
      }
    })

    // Close modals with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const activeModal = document.querySelector(".modal.active")
        if (activeModal) {
          this.hideModal(activeModal.id)
        }
      }
    })
  }

  setupForms() {
    // Vaccination completion form
    const vaccinationForm = document.getElementById("vaccinationForm")
    if (vaccinationForm) {
      vaccinationForm.addEventListener("submit", (e) => this.handleCompleteVaccination(e))
    }

    // Set default vaccination date to today
    const vaccinationDateInput = document.getElementById("vaccinationDate")
    if (vaccinationDateInput) {
      vaccinationDateInput.value = new Date().toISOString().split("T")[0]
    }
  }

  setupMobileMenu() {
    const mobileMenuToggle = document.getElementById("mobileMenuToggle")
    const navMenu = document.querySelector(".nav-menu")

    if (mobileMenuToggle && navMenu) {
      mobileMenuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active")
        mobileMenuToggle.classList.toggle("active")
      })
    }
  }

  updateDoctorInfo() {
    const doctorNameElement = document.getElementById("doctorName")
    if (doctorNameElement && this.currentUser.firstName) {
      doctorNameElement.textContent = `Dr. ${this.currentUser.firstName} ${this.currentUser.lastName}`
    }
  }

  async loadDashboardData() {
    try {
      await Promise.all([this.loadPatients(), this.loadPendingVaccinations(), this.loadOverdueVaccinations(), this.loadRecords()])

      this.updateStats()
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
      this.showNotification("Failed to load dashboard data", "error")
    }
  }

  async loadPatients() {
    try {
      this.patients = await window.apiClient.request("/doctor/patients")
      this.renderPatients()
    } catch (error) {
      console.error("Failed to load patients:", error)
    }
  }

  async loadPendingVaccinations() {
    try {
      this.pendingVaccinations = await window.apiClient.request("/doctor/schedules/pending")
      this.renderPendingVaccinations()
    } catch (error) {
      console.error("Failed to load pending vaccinations:", error)
    }
  }

  async loadOverdueVaccinations() {
    try {
      this.overdueVaccinations = await window.apiClient.request("/doctor/schedules/overdue")
      this.renderOverdueVaccinations()
    } catch (error) {
      console.error("Failed to load overdue vaccinations:", error)
    }
  }

  async loadRecords() {
    try {
      this.records = await window.apiClient.request("/doctor/records")
      this.renderRecords()
    } catch (error) {
      console.error("Failed to load records:", error)
    }
  }

  updateStats() {
    const totalPatientsElement = document.getElementById("totalPatients")
    const pendingVaccinationsElement = document.getElementById("pendingVaccinations")
    const overdueVaccinationsElement = document.getElementById("overdueVaccinations")
    const completedTodayElement = document.getElementById("completedToday")

    if (totalPatientsElement) {
      totalPatientsElement.textContent = this.patients.length
    }

    if (pendingVaccinationsElement) {
      pendingVaccinationsElement.textContent = this.pendingVaccinations.length
    }

    if (overdueVaccinationsElement) {
      overdueVaccinationsElement.textContent = this.overdueVaccinations.length
    }

    if (completedTodayElement) {
      const today = new Date().toISOString().split("T")[0]
      const completedToday = this.records.filter((record) => record.vaccinationDate === today).length
      completedTodayElement.textContent = completedToday
    }
  }

  showSection(sectionName) {
    // Hide all sections
    const sections = ["patientsSection", "pendingSection", "overdueSection", "recordsSection"]
    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (element) {
        element.style.display = "none"
      }
    })

    // Show selected section
    const targetSection = document.getElementById(`${sectionName}Section`)
    if (targetSection) {
      targetSection.style.display = "block"
    }

    // Update navigation
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${sectionName}`) {
        link.classList.add("active")
      }
    })

    this.currentSection = sectionName
  }

  renderPatients() {
    const patientsGrid = document.getElementById("patientsGrid")
    if (!patientsGrid) return

    if (this.patients.length === 0) {
      patientsGrid.innerHTML = `
        <div class="empty-state">
          <img src="/placeholder.svg?height=120&width=120" alt="No patients">
          <p>No patients assigned yet.</p>
        </div>
      `
      return
    }

    patientsGrid.innerHTML = this.patients
      .map(
        (patient) => `
        <div class="patient-card">
          <div class="patient-header">
            <img src="${patient.photoUrl || "/placeholder.svg?height=60&width=60"}" 
                 alt="${patient.firstName}" class="patient-avatar">
            <div class="patient-info">
              <h3>${patient.firstName} ${patient.lastName}</h3>
              <div class="patient-details">
                <p>Age: ${patient.ageInMonths} months</p>
                <p>DOB: ${new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                <p>Gender: ${patient.gender}</p>
                <p>Blood Group: ${patient.bloodGroup}</p>
              </div>
            </div>
          </div>
          <div class="patient-actions">
            <button class="btn btn-outline" onclick="doctorDashboard.viewPatientSchedule(${patient.id}, '${patient.firstName} ${patient.lastName}')">
              View Schedule
            </button>
          </div>
        </div>
      `,
      )
      .join("")
  }

  renderPendingVaccinations() {
    const pendingList = document.getElementById("pendingList")
    if (!pendingList) return

    if (this.pendingVaccinations.length === 0) {
      pendingList.innerHTML = `
        <div class="empty-state">
          <p>No pending vaccinations.</p>
        </div>
      `
      return
    }

    pendingList.innerHTML = this.pendingVaccinations
      .map(
        (vaccination) => `
        <div class="vaccination-item status-pending">
          <div class="vaccination-info">
            <h4>${vaccination.vaccineName}</h4>
            <div class="vaccination-meta">
              <p><strong>Patient:</strong> ${vaccination.childName}</p>
              <p><strong>Due Date:</strong> ${new Date(vaccination.dueDate).toLocaleDateString()}</p>
              <p><strong>Description:</strong> ${vaccination.vaccineDescription || "N/A"}</p>
            </div>
          </div>
          <div class="vaccination-actions">
            <button class="btn btn-primary" onclick="doctorDashboard.showCompleteVaccinationModal(${vaccination.id})">
              Complete
            </button>
            <button class="btn btn-outline" onclick="doctorDashboard.updateVaccinationStatus(${vaccination.id}, 'SKIPPED')">
              Skip
            </button>
          </div>
        </div>
      `,
      )
      .join("")
  }

  renderOverdueVaccinations() {
    const overdueList = document.getElementById("overdueList")
    if (!overdueList) return

    if (this.overdueVaccinations.length === 0) {
      overdueList.innerHTML = `
        <div class="empty-state">
          <p>No overdue vaccinations.</p>
        </div>
      `
      return
    }

    overdueList.innerHTML = this.overdueVaccinations
      .map(
        (vaccination) => `
        <div class="vaccination-item status-overdue">
          <div class="vaccination-info">
            <h4>${vaccination.vaccineName}</h4>
            <div class="vaccination-meta">
              <p><strong>Patient:</strong> ${vaccination.childName}</p>
              <p><strong>Due Date:</strong> ${new Date(vaccination.dueDate).toLocaleDateString()}</p>
              <p><strong>Days Overdue:</strong> ${this.calculateDaysOverdue(vaccination.dueDate)}</p>
              <p><strong>Description:</strong> ${vaccination.vaccineDescription || "N/A"}</p>
            </div>
          </div>
          <div class="vaccination-actions">
            <button class="btn btn-primary" onclick="doctorDashboard.showCompleteVaccinationModal(${vaccination.id})">
              Complete
            </button>
            <button class="btn btn-outline" onclick="doctorDashboard.updateVaccinationStatus(${vaccination.id}, 'SKIPPED')">
              Skip
            </button>
          </div>
        </div>
      `,
      )
      .join("")
  }

  renderRecords() {
    const recordsList = document.getElementById("recordsList")
    if (!recordsList) return

    if (this.records.length === 0) {
      recordsList.innerHTML = `
        <div class="empty-state">
          <p>No vaccination records yet.</p>
        </div>
      `
      return
    }

    recordsList.innerHTML = this.records
      .map(
        (record) => `
        <div class="record-item status-completed">
          <div class="record-info">
            <h4>${record.vaccineName}</h4>
            <div class="record-meta">
              <p><strong>Patient:</strong> ${record.chil
