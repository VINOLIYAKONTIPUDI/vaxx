// Multi-language support
const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    children: "Children",
    schedule: "Schedule",
    login: "Login",
    logout: "Logout",

    // Hero Section
    hero_title: "Stay Ahead of Your Child's Health",
    hero_subtitle: "Manage Vaccination Schedules with Ease",
    hero_description:
      "Never miss an important vaccination. Track your child's health journey effortlessly with automated reminders and comprehensive vaccine information.",
    get_started: "Get Started Today",
    learn_more: "Learn More",

    // Features
    features_title: "Comprehensive Vaccine Management",
    child_profile: "Child Profile",
    child_profile_desc: "Complete profiles with photos, medical details, and personalized vaccine schedules.",
    dynamic_schedule: "Dynamic Schedule",
    dynamic_schedule_desc: "Auto-calculated vaccination timeline based on your child's date of birth.",
    sms_reminders: "SMS Reminders",
    sms_reminders_desc: "Automated text notifications before each vaccination due date.",
    vaccine_info: "Vaccine Information",
    vaccine_info_desc: "Detailed information about each vaccine's importance and possible side effects.",
    doctor_access: "Doctor Access",
    doctor_access_desc: "Healthcare providers can update vaccination status and add notes.",
    data_privacy: "Data Privacy",
    data_privacy_desc: "Secure login system with encrypted data storage for complete privacy.",

    // Dashboard
    welcome_back: "Welcome Back!",
    add_child: "Add Child",
    upcoming_vaccines: "Upcoming Vaccines",

    // Forms
    email: "Email",
    password: "Password",
    remember_me: "Remember me",
    sign_in: "Sign In",
    forgot_password: "Forgot Password?",
    create_account: "Create Account",
    first_name: "First Name",
    last_name: "Last Name",
    date_of_birth: "Date of Birth",
    gender: "Gender",
    select_gender: "Select Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    blood_group: "Blood Group",
    select_blood_group: "Select Blood Group",
    photo: "Photo",

    // Registration
    register: "Register",
    phone_number: "Phone Number",
    confirm_password: "Confirm Password",
    role: "Role",
    parent: "Parent",
    doctor: "Doctor",
    already_have_account: "Already have an account?",

    // Vaccine Information
    vaccine_importance: "Why This Vaccine is Important",
    side_effects: "Possible Side Effects",
    dosage_info: "Dosage Information",
    age_recommendation: "Age Recommendation",
    next_dose: "Next Dose",
    completed: "Completed",
    pending: "Pending",
    overdue: "Overdue",

    // Doctor Dashboard
    patients: "Patients",
    patient_search: "Search patients...",
    vaccination_history: "Vaccination History",
    mark_completed: "Mark as Completed",
    add_notes: "Add Notes",
    vaccination_notes: "Vaccination Notes",
    administered_by: "Administered by",

    // Reminders
    reminders: "Reminders",
    test_sms: "Test SMS",
    send_reminder: "Send Reminder",
    reminder_sent: "Reminder Sent",
    reminder_failed: "Reminder Failed",
    no_reminders: "No reminders found",

    // Settings
    settings: "Settings",
    language_preference: "Language Preference",
    notification_settings: "Notification Settings",
    sms_notifications: "SMS Notifications",
    email_notifications: "Email Notifications",

    // Common Actions
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    update: "Update",
    refresh: "Refresh",

    // Status Messages
    success: "Success",
    error: "Error",
    loading: "Loading...",
    no_data: "No data available",

    // Vaccine Names (English)
    vaccines: {
      BCG: "BCG (Tuberculosis)",
      "Hepatitis B": "Hepatitis B",
      OPV: "Oral Polio Vaccine",
      IPV: "Inactivated Polio Vaccine",
      DPT: "Diphtheria, Pertussis, Tetanus",
      Hib: "Haemophilus Influenzae Type B",
      PCV: "Pneumococcal Conjugate Vaccine",
      Rotavirus: "Rotavirus Vaccine",
      MMR: "Measles, Mumps, Rubella",
      Varicella: "Chickenpox Vaccine",
      "Hepatitis A": "Hepatitis A",
      Typhoid: "Typhoid Vaccine",
      "Japanese Encephalitis": "Japanese Encephalitis",
    },
  },

  hi: {
    // Navigation
    dashboard: "डैशबोर्ड",
    children: "बच्चे",
    schedule: "कार्यक्रम",
    login: "लॉगिन",
    logout: "लॉगआउट",

    // Hero Section
    hero_title: "अपने बच्चे के स्वास्थ्य से आगे रहें",
    hero_subtitle: "टीकाकरण कार्यक्रम को आसानी से प्रबंधित करें",
    hero_description:
      "कोई भी महत्वपूर्ण टीकाकरण न चूकें। स्वचालित रिमाइंडर और व्यापक टीका जानकारी के साथ अपने बच्चे की स्वास्थ्य यात्रा को आसानी से ट्रैक करें।",
    get_started: "आज ही शुरू करें",
    learn_more: "और जानें",

    // Features
    features_title: "व्यापक टीका प्रबंधन",
    child_profile: "बच्चे की प्रोफाइल",
    child_profile_desc: "फोटो, चिकित्सा विवरण और व्यक्तिगत टीका कार्यक्रम के साथ पूर्ण प्रोफाइल।",
    dynamic_schedule: "गतिशील कार्यक्रम",
    dynamic_schedule_desc: "आपके बच्चे की जन्म तिथि के आधार पर स्वचालित रूप से गणना की गई टीकाकरण समयरेखा।",
    sms_reminders: "SMS रिमाइंडर",
    sms_reminders_desc: "प्रत्येक टीकाकरण की नियत तारीख से पहले स्वचालित टेक्स्ट सूचनाएं।",
    vaccine_info: "टीका जानकारी",
    vaccine_info_desc: "प्रत्येक टीके के महत्व और संभावित दुष्प्रभावों के बारे में विस्तृत जानकारी।",
    doctor_access: "डॉक्टर पहुंच",
    doctor_access_desc: "स्वास्थ्य सेवा प्रदाता टीकाकरण स्थिति अपडेट कर सकते हैं और नोट्स जोड़ सकते हैं।",
    data_privacy: "डेटा गोपनीयता",
    data_privacy_desc: "पूर्ण गोपनीयता के लिए एन्क्रिप्टेड डेटा स्टोरेज के साथ सुरक्षित लॉगिन सिस्टम।",

    // Dashboard
    welcome_back: "वापसी पर स्वागत है!",
    add_child: "बच्चा जोड़ें",
    upcoming_vaccines: "आगामी टीके",

    // Forms
    email: "ईमेल",
    password: "पासवर्ड",
    remember_me: "मुझे याद रखें",
    sign_in: "साइन इन करें",
    forgot_password: "पासवर्ड भूल गए?",
    create_account: "खाता बनाएं",
    first_name: "पहला नाम",
    last_name: "अंतिम नाम",
    date_of_birth: "जन्म की तारीख",
    gender: "लिंग",
    select_gender: "लिंग चुनें",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    blood_group: "रक्त समूह",
    select_blood_group: "रक्त समूह चुनें",
    photo: "फोटो",

    // Registration
    register: "पंजीकरण",
    phone_number: "फोन नंबर",
    confirm_password: "पासवर्ड की पुष्टि करें",
    role: "भूमिका",
    parent: "माता-पिता",
    doctor: "डॉक्टर",
    already_have_account: "क्या आपका पहले से खाता है?",

    // Vaccine Information
    vaccine_importance: "यह टीका क्यों महत्वपूर्ण है",
    side_effects: "संभावित दुष्प्रभाव",
    dosage_info: "खुराक की जानकारी",
    age_recommendation: "आयु सिफारिश",
    next_dose: "अगली खुराक",
    completed: "पूर्ण",
    pending: "लंबित",
    overdue: "देर से",

    // Doctor Dashboard
    patients: "मरीज़",
    patient_search: "मरीज़ों को खोजें...",
    vaccination_history: "टीकाकरण इतिहास",
    mark_completed: "पूर्ण के रूप में चिह्नित करें",
    add_notes: "नोट्स जोड़ें",
    vaccination_notes: "टीकाकरण नोट्स",
    administered_by: "द्वारा प्रशासित",

    // Reminders
    reminders: "रिमाइंडर",
    test_sms: "टेस्ट SMS",
    send_reminder: "रिमाइंडर भेजें",
    reminder_sent: "रिमाइंडर भेजा गया",
    reminder_failed: "रिमाइंडर असफल",
    no_reminders: "कोई रिमाइंडर नहीं मिला",

    // Settings
    settings: "सेटिंग्स",
    language_preference: "भाषा प्राथमिकता",
    notification_settings: "सूचना सेटिंग्स",
    sms_notifications: "SMS सूचनाएं",
    email_notifications: "ईमेल सूचनाएं",

    // Common Actions
    save: "सेव करें",
    cancel: "रद्द करें",
    edit: "संपादित करें",
    delete: "हटाएं",
    view: "देखें",
    update: "अपडेट करें",
    refresh: "रीफ्रेश करें",

    // Status Messages
    success: "सफलता",
    error: "त्रुटि",
    loading: "लोड हो रहा है...",
    no_data: "कोई डेटा उपलब्ध नहीं",

    // Vaccine Names (Hindi)
    vaccines: {
      BCG: "बीसीजी (तपेदिक)",
      "Hepatitis B": "हेपेटाइटिस बी",
      OPV: "मौखिक पोलियो वैक्सीन",
      IPV: "निष्क्रिय पोलियो वैक्सीन",
      DPT: "डिप्थीरिया, काली खांसी, टेटनस",
      Hib: "हीमोफिलस इन्फ्लुएंजा टाइप बी",
      PCV: "न्यूमोकोकल कंजुगेट वैक्सीन",
      Rotavirus: "रोटावायरस वैक्सीन",
      MMR: "खसरा, कण्ठमाला, रूबेला",
      Varicella: "चिकनपॉक्स वैक्सीन",
      "Hepatitis A": "हेपेटाइटिस ए",
      Typhoid: "टाइफाइड वैक्सीन",
      "Japanese Encephalitis": "जापानी एन्सेफलाइटिस",
    },
  },

  te: {
    // Navigation
    dashboard: "డాష్‌బోర్డ్",
    children: "పిల్లలు",
    schedule: "షెడ్యూల్",
    login: "లాగిన్",
    logout: "లాగ్అవుట్",

    // Hero Section
    hero_title: "మీ పిల్లల ఆరోగ్యంలో ముందుండండి",
    hero_subtitle: "వ్యాక్సినేషన్ షెడ్యూల్‌లను సులభంగా నిర్వహించండి",
    hero_description:
      "ఏ ముఖ్యమైన వ్యాక్సినేషన్‌ను కూడా మిస్ చేయవద్దు. ఆటోమేటెడ్ రిమైండర్లు మరియు సమగ్ర వ్యాక్సిన్ సమాచారంతో మీ పిల్లల ఆరోగ్య ప్రయాణాన్ని సులభంగా ట్రాక్ చేయండి.",
    get_started: "ఈరోజే ప్రారంభించండి",
    learn_more: "మరింత తెలుసుకోండి",

    // Features
    features_title: "సమగ్ర వ్యాక్సిన్ నిర్వహణ",
    child_profile: "పిల్లల ప్రొఫైల్",
    child_profile_desc: "ఫోటోలు, వైద్య వివరాలు మరియు వ్యక్తిగతీకరించిన వ్యాక్సిన్ షెడ్యూల్‌లతో పూర్తి ప్రొఫైల్‌లు.",
    dynamic_schedule: "డైనమిక్ షెడ్యూల్",
    dynamic_schedule_desc: "మీ పిల్లల జన్మ తేదీ ఆధారంగా ఆటో-లెక్కించబడిన వ్యాక్సినేషన్ టైమ్‌లైన్.",
    sms_reminders: "SMS రిమైండర్లు",
    sms_reminders_desc: "ప్రతి వ్యాక్సినేషన్ గడువు తేదీకి ముందు ఆటోమేటెడ్ టెక్స్ట్ నోటిఫికేషన్లు.",
    vaccine_info: "వ్యాక్సిన్ సమాచారం",
    vaccine_info_desc: "ప్రతి వ్యాక్సిన్ యొక్క ప్రాముఖ్యత మరియు సాధ్యమైన దుష్ప్రభావాల గురించి వివరణాత్మక సమాచారం.",
    doctor_access: "డాక్టర్ యాక్సెస్",
    doctor_access_desc: "ఆరోగ్య సేవా ప్రదాతలు వ్యాక్సినేషన్ స్థితిని అప్డేట్ చేయవచ్చు మరియు గమనికలను జోడించవచ్చు.",
    data_privacy: "డేటా గోప్యత",
    data_privacy_desc: "పూర్తి గోప్యత కోసం ఎన్క్రిప్టెడ్ డేటా స్టోరేజ్‌తో సురక్షిత లాగిన్ సిస్టమ్.",

    // Dashboard
    welcome_back: "తిరిగి స్వాగతం!",
    add_child: "పిల్లవాడిని జోడించండి",
    upcoming_vaccines: "రాబోయే వ్యాక్సిన్‌లు",

    // Forms
    email: "ఇమెయిల్",
    password: "పాస్‌వర్డ్",
    remember_me: "నన్ను గుర్తుంచుకో",
    sign_in: "సైన్ ఇన్",
    forgot_password: "పాస్‌వర్డ్ మర్చిపోయారా?",
    create_account: "ఖాతా సృష్టించండి",
    first_name: "మొదటి పేరు",
    last_name: "చివరి పేరు",
    date_of_birth: "జన్మ తేదీ",
    gender: "లింగం",
    select_gender: "లింగం ఎంచుకోండి",
    male: "పురుషుడు",
    female: "స్త్రీ",
    other: "ఇతర",
    blood_group: "రక్త వర్గం",
    select_blood_group: "రక్త వర్గం ఎంచుకోండి",
    photo: "ఫోటో",

    // Registration
    register: "నమోదు",
    phone_number: "ఫోన్ నంబర్",
    confirm_password: "పాస్‌వర్డ్ నిర్ధారించండి",
    role: "పాత్ర",
    parent: "తల్లిదండ్రులు",
    doctor: "వైద్యుడు",
    already_have_account: "ఇప్పటికే ఖాతా ఉందా?",

    // Vaccine Information
    vaccine_importance: "ఈ వ్యాక్సిన్ ఎందుకు ముఖ్యమైనది",
    side_effects: "సాధ్యమైన దుష్ప్రభావాలు",
    dosage_info: "మోతాదు సమాచారం",
    age_recommendation: "వయస్సు సిఫార్సు",
    next_dose: "తదుపరి మోతాదు",
    completed: "పూర్తయింది",
    pending: "పెండింగ్‌లో",
    overdue: "ఆలస్యం",

    // Doctor Dashboard
    patients: "రోగులు",
    patient_search: "రోగులను వెతకండి...",
    vaccination_history: "వ్యాక్సినేషన్ చరిత్ర",
    mark_completed: "పూర్తయినట్లు గుర్తించండి",
    add_notes: "గమనికలను జోడించండి",
    vaccination_notes: "వ్యాక్సినేషన్ గమనికలు",
    administered_by: "ద్వారా అందించబడింది",

    // Reminders
    reminders: "రిమైండర్లు",
    test_sms: "టెస్ట్ SMS",
    send_reminder: "రిమైండర్ పంపండి",
    reminder_sent: "రిమైండర్ పంపబడింది",
    reminder_failed: "రిమైండర్ విఫలమైంది",
    no_reminders: "రిమైండర్లు కనుగొనబడలేదు",

    // Settings
    settings: "సెట్టింగ్‌లు",
    language_preference: "భాష ప్రాధాన్యత",
    notification_settings: "నోటిఫికేషన్ సెట్టింగ్‌లు",
    sms_notifications: "SMS నోటిఫికేషన్‌లు",
    email_notifications: "ఇమెయిల్ నోటిఫికేషన్‌లు",

    // Common Actions
    save: "సేవ్ చేయండి",
    cancel: "రద్దు చేయండి",
    edit: "సవరించండి",
    delete: "తొలగించండి",
    view: "చూడండి",
    update: "అప్డేట్ చేయండి",
    refresh: "రిఫ్రెష్ చేయండి",

    // Status Messages
    success: "విజయం",
    error: "లోపం",
    loading: "లోడ్ అవుతోంది...",
    no_data: "డేటా అందుబాటులో లేదు",

    // Vaccine Names (Telugu)
    vaccines: {
      BCG: "బీసీజీ (క్షయవ్యాధి)",
      "Hepatitis B": "హెపటైటిస్ బీ",
      OPV: "నోటి పోలియో వ్యాక్సిన్",
      IPV: "నిష్క్రియ పోలియో వ్యాక్సిన్",
      DPT: "డిఫ్తీరియా, పెర్టుసిస్, టెటనస్",
      Hib: "హీమోఫిలస్ ఇన్ఫ్లుఎంజా టైప్ బీ",
      PCV: "న్యూమోకోకల్ కంజుగేట్ వ్యాక్సిన్",
      Rotavirus: "రోటావైరస్ వ్యాక్సిన్",
      MMR: "మీజిల్స్, మంప్స్, రుబెల్లా",
      Varicella: "చికెన్‌పాక్స్ వ్యాక్సిన్",
      "Hepatitis A": "హెపటైటిస్ ఎ",
      Typhoid: "టైఫాయిడ్ వ్యాక్సిన్",
      "Japanese Encephalitis": "జపనీస్ ఎన్సెఫలైటిస్",
    },
  },
}

// Language management
class LanguageManager {
  constructor() {
    this.currentLanguage = localStorage.getItem("preferred_language") || "en"
    this.supportedLanguages = ["en", "hi", "te"]
    this.init()
  }

  init() {
    this.setLanguage(this.currentLanguage)
    this.setupLanguageSelector()
    this.setupLanguageToggle()
  }

  setupLanguageSelector() {
    const languageSelect = document.getElementById("languageSelect")
    if (languageSelect) {
      languageSelect.value = this.currentLanguage
      languageSelect.addEventListener("change", (e) => {
        this.setLanguage(e.target.value)
      })
    }
  }

  setupLanguageToggle() {
    // Create language toggle buttons if they don't exist
    const languageToggle = document.getElementById("languageToggle")
    if (languageToggle) {
      languageToggle.innerHTML = `
        <button class="lang-btn ${this.currentLanguage === "en" ? "active" : ""}" data-lang="en">EN</button>
        <button class="lang-btn ${this.currentLanguage === "hi" ? "active" : ""}" data-lang="hi">हि</button>
        <button class="lang-btn ${this.currentLanguage === "te" ? "active" : ""}" data-lang="te">తె</button>
      `

      languageToggle.addEventListener("click", (e) => {
        if (e.target.classList.contains("lang-btn")) {
          this.setLanguage(e.target.dataset.lang)
        }
      })
    }
  }

  setLanguage(lang) {
    if (!this.supportedLanguages.includes(lang)) {
      console.warn(`Language ${lang} not supported, falling back to English`)
      lang = "en"
    }

    this.currentLanguage = lang
    localStorage.setItem("preferred_language", lang)

    // Update all translatable elements
    this.updateTranslations()
    this.updateLanguageSelector()
    this.updateLanguageToggle()

    // Update document language and direction
    document.documentElement.lang = lang
    document.documentElement.dir = this.isRTL(lang) ? "rtl" : "ltr"

    // Trigger custom event for other components
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: { language: lang } }))
  }

  updateTranslations() {
    const elements = document.querySelectorAll("[data-translate]")
    elements.forEach((element) => {
      const key = element.getAttribute("data-translate")
      const translation = this.getTranslation(key)

      if (translation) {
        if (element.tagName === "INPUT" && (element.type === "submit" || element.type === "button")) {
          element.value = translation
        } else if (element.tagName === "INPUT" && element.placeholder !== undefined) {
          element.placeholder = translation
        } else if (element.tagName === "OPTION") {
          element.textContent = translation
        } else {
          element.textContent = translation
        }
      }
    })
  }

  updateLanguageSelector() {
    const languageSelect = document.getElementById("languageSelect")
    if (languageSelect) {
      languageSelect.value = this.currentLanguage
    }
  }

  updateLanguageToggle() {
    const languageToggle = document.getElementById("languageToggle")
    if (languageToggle) {
      const buttons = languageToggle.querySelectorAll(".lang-btn")
      buttons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.lang === this.currentLanguage)
      })
    }
  }

  getTranslation(key) {
    // Support nested keys like "vaccines.BCG"
    const keys = key.split(".")
    let translation = translations[this.currentLanguage]

    for (const k of keys) {
      translation = translation?.[k]
    }

    // Fallback to English if translation not found
    if (!translation) {
      translation = translations["en"]
      for (const k of keys) {
        translation = translation?.[k]
      }
    }

    return translation || key
  }

  getCurrentLanguage() {
    return this.currentLanguage
  }

  getSupportedLanguages() {
    return this.supportedLanguages
  }

  isRTL(lang) {
    // Add RTL languages here if needed
    const rtlLanguages = ["ar", "he", "fa", "ur"]
    return rtlLanguages.includes(lang)
  }

  // Method to translate vaccine names
  translateVaccineName(vaccineName) {
    return this.getTranslation(`vaccines.${vaccineName}`) || vaccineName
  }
}

// Initialize language manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.languageManager = new LanguageManager()
})
