// Settings page functionality
class SettingsManager {
  constructor() {
    this.init()
  }

  async init() {
    // Check authentication
    const token = localStorage.getItem("authToken")
    if (!token) {
      window.location.href = "/index.html"
      return
    }

    await this.loadUserPreferences()
    this.setupEventListeners()
  }

  async loadUserPreferences() {
    try {
      // Load language preference
      const langResponse = await window.apiCall("/api/language/preference", "GET")
      if (langResponse.success) {
        const languageSelect = document.getElementById("languageSelect")
        if (languageSelect) {
          languageSelect.value = langResponse.data
        }
      }
    } catch (error) {
      console.error("Error loading preferences:", error)
    }
  }

  setupEventListeners() {
    // Save language preference
    const saveLanguageBtn = document.getElementById("saveLanguageBtn")
    if (saveLanguageBtn) {
      saveLanguageBtn.addEventListener("click", this.saveLanguagePreference.bind(this))
    }

    // Save notification settings
    const saveNotificationBtn = document.getElementById("saveNotificationBtn")
    if (saveNotificationBtn) {
      saveNotificationBtn.addEventListener("click", this.saveNotificationSettings.bind(this))
    }

    // Test SMS
    const testSmsBtn = document.getElementById("testSmsBtn")
    if (testSmsBtn) {
      testSmsBtn.addEventListener("click", this.showTestSmsModal.bind(this))
    }

    // Logout
    const logoutBtn = document.getElementById("logoutBtn")
    if (logoutBtn) {
      logoutBtn.addEventListener("click", this.logout.bind(this))
    }
  }

  async saveLanguagePreference() {
    try {
      const languageSelect = document.getElementById("languageSelect")
      const selectedLanguage = languageSelect.value

      const response = await window.apiCall("/api/language/preference", "POST", {
        language: selectedLanguage,
      })

      if (response.success) {
        // Update the language manager
        if (window.languageManager) {
          window.languageManager.setLanguage(selectedLanguage)
        }
        showNotification("Language preference saved successfully!", "success")
      } else {
        showNotification("Failed to save language preference", "error")
      }
    } catch (error) {
      console.error("Error saving language preference:", error)
      showNotification("Error saving language preference", "error")
    }
  }

  async saveNotificationSettings() {
    try {
      const smsEnabled = document.getElementById("smsNotifications").checked
      const emailEnabled = document.getElementById("emailNotifications").checked

      // Save to localStorage for now (can be extended to backend)
      localStorage.setItem("smsNotifications", smsEnabled)
      localStorage.setItem("emailNotifications", emailEnabled)

      showNotification("Notification settings saved successfully!", "success")
    } catch (error) {
      console.error("Error saving notification settings:", error)
      showNotification("Error saving notification settings", "error")
    }
  }

  showTestSmsModal() {
    const modal = document.createElement("div")
    modal.className = "modal"
    modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 data-translate="test_sms">Test SMS</h3>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="testSmsForm">
                        <div class="form-group">
                            <label for="testPhoneNumber">Phone Number</label>
                            <input type="tel" id="testPhoneNumber" required 
                                   placeholder="+91 9876543210" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="testMessage">Message</label>
                            <textarea id="testMessage" required class="form-control" rows="3"
                                      placeholder="Test message from VaxTracker"></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" 
                                    onclick="this.closest('.modal').remove()">Cancel</button>
                            <button type="submit" class="btn btn-primary">Send Test SMS</button>
                        </div>
                    </form>
                </div>
            </div>
        `

    document.body.appendChild(modal)

    // Handle form submission
    const form = modal.querySelector("#testSmsForm")
    form.addEventListener("submit", async (e) => {
      e.preventDefault()

      const phoneNumber = document.getElementById("testPhoneNumber").value
      const message = document.getElementById("testMessage").value

      try {
        const response = await window.apiCall("/api/reminders/test-sms", "POST", {
          phoneNumber: phoneNumber,
          message: message,
        })

        if (response.success) {
          showNotification("Test SMS sent successfully!", "success")
          modal.remove()
        } else {
          showNotification("Failed to send test SMS: " + response.message, "error")
        }
      } catch (error) {
        console.error("Error sending test SMS:", error)
        showNotification("Error sending test SMS", "error")
      }
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

// Initialize settings manager when page loads
let settingsManager
document.addEventListener("DOMContentLoaded", () => {
  settingsManager = new SettingsManager()
})
