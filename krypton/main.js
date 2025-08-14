// Main application JavaScript
class VaxTrackerApp {
  constructor() {
    this.isLoggedIn = !!localStorage.getItem("auth_token")
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    this.children = []
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.updateUI()
    if (this.isLoggedIn) {
      this.loadUserData()
    }
  }

  setupEventListeners() {
    // Navigation
    const loginBtn = document.getElementById("loginBtn")
    const getStartedBtn = document.getElementById("getStartedBtn")
    const learnMoreBtn = document.getElementById("learnMoreBtn")

    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        if (this.isLoggedIn) {
          this.logout()
        } else {
          this.showLoginModal()
        }
      })
    }

    if (getStartedBtn) {
      getStartedBtn.addEventListener("click", () => {
        if (this.isLoggedIn) {
          this.showDashboard()
        } else {
          this.showLoginModal()
        }
      })
    }

    if (learnMoreBtn) {
      learnMoreBtn.addEventListener("click", () => {
        document.querySelector(".features-section").scrollIntoView({
          behavior: "smooth",
        })
      })
    }

    // Modal controls
    this.setupModalControls()

    // Forms
    this.setupForms()

    // Mobile menu
    this.setupMobileMenu()
  }

  setupModalControls() {
    // Login modal
    const closeLoginModal = document.getElementById("closeLoginModal")
    const showRegisterModal = document.getElementById("showRegisterModal")

    if (closeLoginModal) {
      closeLoginModal.addEventListener("click", () => this.hideModal("loginModal"))
    }

    if (showRegisterModal) {
      showRegisterModal.addEventListener("click", (e) => {
        e.preventDefault()
        this.hideModal("loginModal")
        this.showModal("registerModal")
      })
    }

    // Add child modal
    const closeAddChildModal = document.getElementById("closeAddChildModal")
    const addChildBtn = document.getElementById("addChildBtn")

    if (closeAddChildModal) {
      closeAddChildModal.addEventListener("click", () => this.hideModal("addChildModal"))
    }

    if (addChildBtn) {
      addChildBtn.addEventListener("click", () => this.showModal("addChildModal"))
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
    // Login form
    const loginForm = document.getElementById("loginForm")
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => this.handleLogin(e))
    }

    // Register form
    const registerForm = document.getElementById("registerForm")
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => this.handleRegister(e))
    }

    // Child form
    const childForm = document.getElementById("childForm")
    if (childForm) {
      childForm.addEventListener("submit", (e) => this.handleAddChild(e))
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

  showModal(modalId) {
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.classList.add("active")
      document.body.style.overflow = "hidden"
    }
  }

  hideModal(modalId) {
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.classList.remove("active")
      document.body.style.overflow = ""
    }
  }

  showLoginModal() {
    this.showModal("loginModal")
  }

  async handleLogin(e) {
    e.preventDefault()

    const submitBtn = e.target.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent

    try {
      submitBtn.disabled = true
      submitBtn.innerHTML = '<span class="spinner"></span> Signing in...'

      const formData = new FormData(e.target)
      const credentials = {
        email: formData.get("email"),
        password: formData.get("password"),
      }

      const response = await window.apiClient.login(credentials)

      // Store authentication data
      window.apiClient.setToken(response.token)
      this.currentUser = response.user
      this.isLoggedIn = true

      localStorage.setItem("currentUser", JSON.stringify(this.currentUser))

      this.hideModal("loginModal")
      this.updateUI()
      await this.loadUserData()
      this.showDashboard()
      this.showNotification("Login successful!", "success")

      // Reset form
      e.target.reset()
    } catch (error) {
      console.error("Login error:", error)
      this.showNotification(error.message || "Login failed. Please try again.", "error")
    } finally {
      submitBtn.disabled = false
      submitBtn.textContent = originalText
    }
  }

  async handleRegister(e) {
    e.preventDefault()

    const submitBtn = e.target.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent

    try {
      submitBtn.disabled = true
      submitBtn.innerHTML = '<span class="spinner"></span> Creating account...'

      const formData = new FormData(e.target)
      const userData = {
        email: formData.get("email"),
        password: formData.get("password"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        phoneNumber: formData.get("phoneNumber"),
        role: formData.get("role") || "PARENT",
        preferredLanguage: window.languageManager ? window.languageManager.getCurrentLanguage() : "en",
      }

      // Validate password confirmation
      const confirmPassword = formData.get("confirmPassword")
      if (userData.password !== confirmPassword) {
        throw new Error("Passwords do not match")
      }

      await window.apiClient.register(userData)

      this.hideModal("registerModal")
      this.showNotification("Registration successful! Please log in.", "success")
      this.showLoginModal()

      // Reset form
      e.target.reset()
    } catch (error) {
      console.error("Registration error:", error)
      this.showNotification(error.message || "Registration failed. Please try again.", "error")
    } finally {
      submitBtn.disabled = false
      submitBtn.textContent = originalText
    }
  }

  async handleAddChild(e) {
    e.preventDefault()

    const submitBtn = e.target.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent

    try {
      submitBtn.disabled = true
      submitBtn.innerHTML = '<span class="spinner"></span> Adding child...'

      const formData = new FormData(e.target)
      const childData = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        dateOfBirth: formData.get("dateOfBirth"),
        gender: formData.get("gender"),
        bloodGroup: formData.get("bloodGroup"),
      }

      const newChild = await window.apiClient.addChild(childData)

      // Handle photo upload if provided
      const photoFile = formData.get("photo")
      if (photoFile && photoFile.size > 0) {
        try {
          await window.apiClient.uploadChildPhoto(newChild.id, photoFile)
        } catch (photoError) {
          console.error("Photo upload failed:", photoError)
          this.showNotification("Child added but photo upload failed", "warning")
        }
      }

      this.hideModal("addChildModal")
      await this.loadUserData()
      this.showNotification("Child added successfully!", "success")

      // Reset form
      e.target.reset()
    } catch (error) {
      console.error("Add child error:", error)
      this.showNotification(error.message || "Failed to add child. Please try again.", "error")
    } finally {
      submitBtn.disabled = false
      submitBtn.textContent = originalText
    }
  }

  async loadUserData() {
    if (!this.isLoggedIn) return

    try {
      // Load children data
      this.children = await window.apiClient.getChildren()
      this.renderChildren()
      this.renderUpcomingVaccines()
    } catch (error) {
      console.error("Failed to load user data:", error)
      if (error.message.includes("401") || error.message.includes("Unauthorized")) {
        // Token might be expired, logout user
        this.logout()
        this.showNotification("Session expired. Please log in again.", "warning")
      }
    }
  }

  updateUI() {
    const loginBtn = document.getElementById("loginBtn")

    if (this.isLoggedIn) {
      if (loginBtn) {
        loginBtn.textContent = "Logout"
      }
    } else {
      if (loginBtn) {
        loginBtn.textContent = window.languageManager ? window.languageManager.getTranslation("login") : "Login"
      }
    }
  }

  async logout() {
    try {
      await window.apiClient.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      this.isLoggedIn = false
      this.currentUser = {}
      this.children = []
      localStorage.removeItem("currentUser")

      this.updateUI()
      this.hideDashboard()
      this.showNotification("Logged out successfully!", "success")
    }
  }

  showDashboard() {
    const dashboardSection = document.getElementById("dashboardSection")
    const heroSection = document.querySelector(".hero-section")
    const featuresSection = document.querySelector(".features-section")

    if (dashboardSection && this.isLoggedIn) {
      dashboardSection.style.display = "block"
      if (heroSection) heroSection.style.display = "none"
      if (featuresSection) featuresSection.style.display = "none"

      dashboardSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  hideDashboard() {
    const dashboardSection = document.getElementById("dashboardSection")
    const heroSection = document.querySelector(".hero-section")
    const featuresSection = document.querySelector(".features-section")

    if (dashboardSection) {
      dashboardSection.style.display = "none"
      if (heroSection) heroSection.style.display = "block"
      if (featuresSection) featuresSection.style.display = "block"
    }
  }

  renderChildren() {
    const childrenGrid = document.getElementById("childrenGrid")
    if (!childrenGrid) return

    if (this.children.length === 0) {
      childrenGrid.innerHTML = `
        <div class="empty-state">
          <p>No children added yet. Click "Add Child" to get started!</p>
        </div>
      `
      return
    }

    childrenGrid.innerHTML = this.children
      .map(
        (child) => `
          <div class="child-card">
            <div class="child-header">
              <img src="${child.photoUrl || "/placeholder.svg?height=60&width=60"}" 
                   alt="${child.firstName}" class="child-avatar">
              <div class="child-info">
                <h3>${child.firstName} ${child.lastName}</h3>
                <div class="child-details">
                  <p>DOB: ${new Date(child.dateOfBirth).toLocaleDateString()}</p>
                  <p>Age: ${child.ageInMonths} months</p>
                  <p>Gender: ${child.gender}</p>
                  <p>Blood Group: ${child.bloodGroup}</p>
                </div>
              </div>
            </div>
            <div class="child-actions">
              <button class="btn btn-outline" onclick="app.viewChildSchedule(${child.id})">
                View Schedule
              </button>
            </div>
          </div>
        `,
      )
      .join("")
  }

  renderUpcomingVaccines() {
    const vaccineTimeline = document.getElementById("vaccineTimeline")
    if (!vaccineTimeline) return

    // For now, show a placeholder message
    // In a real implementation, this would fetch upcoming vaccines from the API
    vaccineTimeline.innerHTML = `
      <div class="timeline-item">
        <div class="timeline-date">Loading...</div>
        <div class="timeline-vaccine">
          <strong>Fetching upcoming vaccines...</strong>
          <div class="timeline-child">Please wait</div>
        </div>
        <span class="status-badge status-pending">pending</span>
      </div>
    `
  }

  viewChildSchedule(childId) {
    const child = this.children.find((c) => c.id === childId)
    if (child) {
      this.showNotification(`Viewing schedule for ${child.firstName} ${child.lastName}`, "info")
      // In real app, this would navigate to a detailed schedule page
    }
  }

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    `

    // Add styles if not already present
    if (!document.querySelector("#notification-styles")) {
      const styles = document.createElement("style")
      styles.id = "notification-styles"
      styles.textContent = `
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 1rem 1.5rem;
          border-radius: 0.5rem;
          color: white;
          z-index: 1001;
          display: flex;
          align-items: center;
          gap: 1rem;
          animation: slideInRight 0.3s ease;
          max-width: 400px;
        }
        .notification-success { background: #10b981; }
        .notification-error { background: #ef4444; }
        .notification-warning { background: #f59e0b; }
        .notification-info { background: #3b82f6; }
        .notification-close {
          background: none;
          border: none;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0;
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `
      document.head.appendChild(styles)
    }

    // Add to page
    document.body.appendChild(notification)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove()
      }
    }, 5000)

    // Manual close
    notification.querySelector(".notification-close").addEventListener("click", () => {
      notification.remove()
    })
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.app = new VaxTrackerApp()
})
