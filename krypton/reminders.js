// Reminder management functionality
const apiCall = async (url, method, data) => {
  // Placeholder for apiCall implementation
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      if (method === "GET") {
        resolve({
          success: true,
          data: [
            { vaccinationSchedule: { vaccine: { name: "Vaccine A" } }, child: { name: "Child A" } },
            { vaccinationSchedule: { vaccine: { name: "Vaccine B" } }, child: { name: "Child B" } },
          ],
        })
      } else if (method === "POST") {
        resolve({ success: true, message: "SMS sent" })
      } else {
        reject("Unsupported method")
      }
    }, 1000)
  })
}

const showNotification = (message, type) => {
  // Placeholder for showNotification implementation
  console.log(`Notification (${type}): ${message}`)
}

class ReminderManager {
  constructor() {
    this.reminders = []
    this.init()
  }

  async init() {
    await this.loadReminders()
    this.setupEventListeners()
  }

  async loadReminders() {
    try {
      const response = await apiCall("/api/reminders/user", "GET")
      if (response.success) {
        this.reminders = response.data
        this.renderReminders()
      }
    } catch (error) {
      console.error("Error loading reminders:", error)
    }
  }

  renderReminders() {
    const container = document.getElementById("remindersContainer")
    if (!container) return

    if (this.reminders.length === 0) {
      container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-bell-slash"></i>
                    <h3>No Reminders</h3>
                    <p>You don't have any reminders yet.</p>
                </div>
            `
      return
    }

    container.innerHTML = this.reminders
      .map(
        (reminder) => `
            <div class="reminder-card ${reminder.status.toLowerCase()}">
                <div class="reminder-icon">
                    <i class="fas fa-${reminder.status === "SENT" ? "check-circle" : "exclamation-circle"}"></i>
                </div>
                <div class="reminder-content">
                    <h4>${reminder.vaccinationSchedule.vaccine.name}</h4>
                    <p class="child-name">${reminder.vaccinationSchedule.child.name}</p>
                    <p class="reminder-message">${reminder.message}</p>
                    <div class="reminder-meta">
                        <span class="reminder-date">
                            <i class="fas fa-calendar"></i> ${this.formatDate(reminder.reminderDate)}
                        </span>
                        <span class="reminder-type">
                            <i class="fas fa-sms"></i> ${reminder.reminderType}
                        </span>
                        <span class="reminder-status status-${reminder.status.toLowerCase()}">
                            ${reminder.status}
                        </span>
                    </div>
                </div>
            </div>
        `,
      )
      .join("")
  }

  async testSms(phoneNumber, message) {
    try {
      const response = await apiCall("/api/reminders/test-sms", "POST", {
        phoneNumber: phoneNumber,
        message: message,
      })

      if (response.success) {
        showNotification("Test SMS sent successfully!", "success")
        return true
      } else {
        showNotification("Failed to send test SMS: " + response.message, "error")
        return false
      }
    } catch (error) {
      console.error("Error sending test SMS:", error)
      showNotification("Error sending test SMS", "error")
      return false
    }
  }

  setupEventListeners() {
    // Test SMS button
    const testSmsBtn = document.getElementById("testSmsBtn")
    if (testSmsBtn) {
      testSmsBtn.addEventListener("click", this.showTestSmsModal.bind(this))
    }

    // Refresh reminders button
    const refreshBtn = document.getElementById("refreshReminders")
    if (refreshBtn) {
      refreshBtn.addEventListener("click", this.loadReminders.bind(this))
    }
  }

  showTestSmsModal() {
    const modal = document.createElement("div")
    modal.className = "modal"
    modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Test SMS</h3>
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

      const success = await this.testSms(phoneNumber, message)
      if (success) {
        modal.remove()
      }
    })
  }

  formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
}

// Initialize reminder manager when page loads
let reminderManager
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("remindersContainer")) {
    reminderManager = new ReminderManager()
  }
})
