// Global variables
let currentUser = null
let otpCode = ""
let pendingUserData = null

// DOM Elements
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  // Check if user is logged in
  const savedUser = localStorage.getItem("vaxtrack_user")
  if (savedUser) {
    currentUser = JSON.parse(savedUser)
    showDashboard()
  }

  // Setup event listeners
  setupEventListeners()
}

function setupEventListeners() {
  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })

  // Form submissions
  document.getElementById("loginForm").addEventListener("submit", handleLogin)
  document.getElementById("signupForm").addEventListener("submit", handleSignup)
  document.getElementById("otpForm").addEventListener("submit", handleOTPVerification)
  document.getElementById("childForm").addEventListener("submit", handleChildProfile)

  // OTP input navigation
  setupOTPInputs()

  // Close modals when clicking outside
  window.addEventListener("click", (event) => {
    const modals = document.querySelectorAll(".modal")
    modals.forEach((modal) => {
      if (event.target === modal) {
        modal.style.display = "none"
      }
    })
  })
}

// Navigation functions
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
    behavior: "smooth",
  })
}

function showLoginModal() {
  document.getElementById("loginModal").style.display = "block"
}

function showSignupModal() {
  document.getElementById("signupModal").style.display = "block"
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none"
  clearFormErrors()
}

function switchModal(currentModal, targetModal) {
  closeModal(currentModal)
  document.getElementById(targetModal).style.display = "block"
}

// Validation functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validatePassword(password) {
  // At least 8 characters, one uppercase, one lowercase, one number, one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

function showError(fieldId, message) {
  const errorElement = document.getElementById(fieldId + "Error")
  if (errorElement) {
    errorElement.textContent = message
  }
}

function clearFormErrors() {
  const errorElements = document.querySelectorAll(".error-message")
  errorElements.forEach((element) => {
    element.textContent = ""
  })
}

// Authentication functions
async function handleLogin(event) {
  event.preventDefault()
  clearFormErrors()

  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value

  // Validate inputs
  if (!validateEmail(email)) {
    showError("loginEmail", "Please enter a valid email address")
    return
  }

  if (!password) {
    showError("loginPassword", "Password is required")
    return
  }

  try {
    // Simulate API call - Replace with actual backend integration
    const response = await simulateLogin(email, password)

    if (response.success) {
      currentUser = response.user
      localStorage.setItem("vaxtrack_user", JSON.stringify(currentUser))
      closeModal("loginModal")
      showDashboard()
      showNotification("Login successful!", "success")
    } else {
      showError("loginPassword", response.message)
    }
  } catch (error) {
    showError("loginPassword", "Login failed. Please try again.")
  }
}

async function handleSignup(event) {
  event.preventDefault()
  clearFormErrors()

  const name = document.getElementById("signupName").value
  const email = document.getElementById("signupEmail").value
  const password = document.getElementById("signupPassword").value
  const confirmPassword = document.getElementById("confirmPassword").value

  // Validate inputs
  if (!name.trim()) {
    showError("signupName", "Name is required")
    return
  }

  if (!validateEmail(email)) {
    showError("signupEmail", "Please enter a valid email address")
    return
  }

  if (!validatePassword(password)) {
    showError("signupPassword", "Password does not meet requirements")
    return
  }

  if (password !== confirmPassword) {
    showError("confirmPassword", "Passwords do not match")
    return
  }

  try {
    // Store pending user data
    pendingUserData = { name, email, password }

    // Generate and send OTP
    otpCode = generateOTP()
    await sendOTP(email, otpCode)

    closeModal("signupModal")
    document.getElementById("otpModal").style.display = "block"
    showNotification("OTP sent to your email!", "info")
  } catch (error) {
    showError("signupEmail", "Failed to send OTP. Please try again.")
  }
}

async function handleOTPVerification(event) {
  event.preventDefault()
  clearFormErrors()

  const enteredOTP = getOTPValue()

  if (enteredOTP.length !== 6) {
    showError("otp", "Please enter all 6 digits")
    return
  }

  if (enteredOTP === otpCode) {
    try {
      // Create user account
      const response = await simulateSignup(pendingUserData)

      if (response.success) {
        currentUser = response.user
        localStorage.setItem("vaxtrack_user", JSON.stringify(currentUser))
        closeModal("otpModal")
        showDashboard()
        showNotification("Account created successfully!", "success")
      } else {
        showError("otp", response.message)
      }
    } catch (error) {
      showError("otp", "Account creation failed. Please try again.")
    }
  } else {
    showError("otp", "Invalid OTP. Please try again.")
  }
}

// OTP functions
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

async function sendOTP(email, otp) {
  // Simulate sending OTP via email
  // In real implementation, this would call your backend API
  // Here, just simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 1000)
  })
}

function setupOTPInputs() {
  const otpInputs = document.querySelectorAll(".otp-input")

  otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      if (e.target.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus()
      }
    })

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && e.target.value === "" && index > 0) {
        otpInputs[index - 1].focus()
      }
    })
  })
}

function getOTPValue() {
  const otpInputs = document.querySelectorAll(".otp-input")
  return Array.from(otpInputs)
    .map((input) => input.value)
    .join("")
}

async function resendOTP() {
  if (pendingUserData) {
    otpCode = generateOTP()
    await sendOTP(pendingUserData.email, otpCode)
    showNotification("New OTP sent!", "info")
  }
}

// Dashboard functions
function showDashboard() {
  document.querySelector(".hero").style.display = "none"
  document.querySelector(".features").style.display = "none"
  document.querySelector(".vaccines-timeline").style.display = "none"
  document.querySelector(".navbar").style.display = "none"
  document.getElementById("dashboard").style.display = "block"
}

function hideDashboard() {
  document.querySelector(".hero").style.display = "flex"
  document.querySelector(".features").style.display = "block"
  document.querySelector(".vaccines-timeline").style.display = "block"
  document.querySelector(".navbar").style.display = "block"
  document.getElementById("dashboard").style.display = "none"
}

function logout() {
  currentUser = null
  localStorage.removeItem("vaxtrack_user")
  hideDashboard()
  showNotification("Logged out successfully!", "info")
}

// Child profile functions
async function handleChildProfile(event) {
  event.preventDefault()

  const childData = {
    name: document.getElementById("childName").value,
    dob: document.getElementById("childDOB").value,
    gender: document.getElementById("childGender").value,
    bloodGroup: document.getElementById("childBloodGroup").value,
    photo: document.getElementById("childPhoto").files[0],
  }

  try {
    // Calculate vaccine schedule based on DOB
    const vaccineSchedule = calculateVaccineSchedule(childData.dob)

    // Save child profile (simulate API call)
    const response = await saveChildProfile(childData, vaccineSchedule)

    if (response.success) {
      showNotification("Child profile added successfully!", "success")
      document.getElementById("childForm").reset()

      // Schedule reminders
      scheduleReminders(vaccineSchedule)
    } else {
      showNotification("Failed to add child profile", "error")
    }
  } catch (error) {
    showNotification("Error adding child profile", "error")
  }
}

function calculateVaccineSchedule(dob) {
  const birthDate = new Date(dob)
  const schedule = []

  // Define vaccine schedule based on age
  const vaccines = [
    { name: "BCG", age: 0, unit: "days" },
    { name: "Hepatitis B (1st dose)", age: 0, unit: "days" },
    { name: "OPV (Birth dose)", age: 0, unit: "days" },
    { name: "DPT (1st dose)", age: 6, unit: "weeks" },
    { name: "IPV (1st dose)", age: 6, unit: "weeks" },
    { name: "Hepatitis B (2nd dose)", age: 6, unit: "weeks" },
    { name: "Hib (1st dose)", age: 6, unit: "weeks" },
    { name: "Rotavirus (1st dose)", age: 6, unit: "weeks" },
    { name: "PCV (1st dose)", age: 6, unit: "weeks" },
    { name: "DPT (2nd dose)", age: 10, unit: "weeks" },
    { name: "IPV (2nd dose)", age: 10, unit: "weeks" },
    { name: "Hib (2nd dose)", age: 10, unit: "weeks" },
    { name: "Rotavirus (2nd dose)", age: 10, unit: "weeks" },
    { name: "PCV (2nd dose)", age: 10, unit: "weeks" },
    { name: "DPT (3rd dose)", age: 14, unit: "weeks" },
    { name: "IPV (3rd dose)", age: 14, unit: "weeks" },
    { name: "Hib (3rd dose)", age: 14, unit: "weeks" },
    { name: "Rotavirus (3rd dose)", age: 14, unit: "weeks" },
    { name: "PCV (3rd dose)", age: 14, unit: "weeks" },
    { name: "MMR (1st dose)", age: 9, unit: "months" },
    { name: "Typhoid", age: 9, unit: "months" },
    { name: "Hepatitis A (1st dose)", age: 12, unit: "months" },
    { name: "MMR (2nd dose)", age: 15, unit: "months" },
    { name: "Varicella (Chickenpox)", age: 15, unit: "months" },
    { name: "PCV Booster", age: 15, unit: "months" },
    { name: "DPT Booster", age: 18, unit: "months" },
    { name: "DPT Booster", age: 4, unit: "years" },
    { name: "OPV Booster", age: 4, unit: "years" },
    { name: "MMR Booster", age: 4, unit: "years" },
    { name: "Tdap Booster", age: 10, unit: "years" },
    { name: "HPV (for girls)", age: 10, unit: "years" },
    { name: "Meningococcal", age: 10, unit: "years" },
  ]

  vaccines.forEach((vaccine) => {
    const dueDate = new Date(birthDate)

    if (vaccine.unit === "days") {
      dueDate.setDate(dueDate.getDate() + vaccine.age)
    } else if (vaccine.unit === "weeks") {
      dueDate.setDate(dueDate.getDate() + vaccine.age * 7)
    } else if (vaccine.unit === "months") {
      dueDate.setMonth(dueDate.getMonth() + vaccine.age)
    } else if (vaccine.unit === "years") {
      dueDate.setFullYear(dueDate.getFullYear() + vaccine.age)
    }

    schedule.push({
      name: vaccine.name,
      dueDate: dueDate,
      completed: false,
      reminderSent: false,
    })
  })

  return schedule
}

async function scheduleReminders(schedule) {
  // In a real implementation, this would integrate with your backend
  // to schedule SMS, Email, and WhatsApp reminders using Twilio and Nodemailer

  schedule.forEach((vaccine) => {
    const reminderDate = new Date(vaccine.dueDate)
    reminderDate.setDate(reminderDate.getDate() - 7) // Remind 7 days before

    if (reminderDate > new Date()) {
      console.log(`Scheduling reminder for ${vaccine.name} on ${reminderDate}`)
      // Here you would call your backend API to schedule the reminder
    }
  })
}

// Utility functions
async function simulateLogin(email, password) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check against stored users (in real app, this would be backend validation)
  const storedUsers = JSON.parse(localStorage.getItem("vaxtrack_users") || "[]")
  const user = storedUsers.find((u) => u.email === email && u.password === password)

  if (user) {
    return {
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
    }
  } else {
    return {
      success: false,
      message: "Invalid email or password",
    }
  }
}

async function simulateSignup(userData) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const storedUsers = JSON.parse(localStorage.getItem("vaxtrack_users") || "[]")

  // Check if user already exists
  if (storedUsers.find((u) => u.email === userData.email)) {
    return {
      success: false,
      message: "User already exists",
    }
  }

  // Create new user
  const newUser = {
    id: Date.now(),
    name: userData.name,
    email: userData.email,
    password: userData.password,
    createdAt: new Date(),
  }

  storedUsers.push(newUser)
  localStorage.setItem("vaxtrack_users", JSON.stringify(storedUsers))

  return {
    success: true,
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
  }
}

async function saveChildProfile(childData, schedule) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const childProfiles = JSON.parse(localStorage.getItem("vaxtrack_children") || "[]")

  const newChild = {
    id: Date.now(),
    userId: currentUser.id,
    ...childData,
    vaccineSchedule: schedule,
    createdAt: new Date(),
  }

  childProfiles.push(newChild)
  localStorage.setItem("vaxtrack_children", JSON.stringify(childProfiles))

  return { success: true }
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `

  // Set background color based on type
  const colors = {
    success: "#10b981",
    error: "#ef4444",
    info: "#3b82f6",
    warning: "#f59e0b",
  }

  notification.style.backgroundColor = colors[type] || colors.info

  // Add to DOM
  document.body.appendChild(notification)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Add notification animations to CSS
const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)
