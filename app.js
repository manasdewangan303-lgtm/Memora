/**
 * MEMORA - Main Application Coordinator
 * Manages Views (Patient App vs Caregiver Dashboard),
 * Patient Navigation, Reminders, Memories, Language Synchronization, and the complete 16-Step SIH Demo Flow.
 */

const PatientApp = {
  currentRole: 'patient', // 'patient' or 'caregiver'
  currentScreen: 'home',  // 'home' | 'games' | 'memories' | 'reminders' | 'home_finder'
  patientData: {
    id: 'patient_demo_1',
    name: 'Mrs. Sharma',
    level: 2
  },

  init() {
    this.showHome();
  },

  renderCurrentScreen() {
    if (this.currentRole !== 'patient') return;
    switch (this.currentScreen) {
      case 'games':
        this.showGamesMenu();
        break;
      case 'memories':
        this.showMemories();
        break;
      case 'reminders':
        this.showReminders();
        break;
      case 'home_finder':
        this.showFindHome();
        break;
      default:
        this.showHome();
        break;
    }
  },

  showHome() {
    this.currentScreen = 'home';
    const container = document.getElementById('patient-dynamic-content');
    if (!container) return;

    container.innerHTML = `
      <!-- Today's Status Summary Section -->
      <div class="patient-status-section">
        <div class="status-mini-card" id="card-session-status">
          <div class="status-icon">🧠</div>
          <div class="status-title">${t('session_status')}</div>
          <div class="status-value" id="home-session-status">${t('session_not_done')}</div>
        </div>
        <div class="status-mini-card" id="card-med-status">
          <div class="status-icon">💊</div>
          <div class="status-title">${t('med_status')}</div>
          <div class="status-value">${t('med_next')}</div>
        </div>
        <div class="status-mini-card" id="card-hydro-status">
          <div class="status-icon">💧</div>
          <div class="status-title">${t('hydro_status')}</div>
          <div class="status-value">${t('hydro_next')}</div>
        </div>
      </div>

      <!-- Main Elderly Accessible Action Cards (Hover-to-Speak enabled) -->
      <div class="patient-actions-list">
        <!-- 1. Play Cognitive Game -->
        <button class="elderly-btn primary-action" onclick="PatientApp.showGamesMenu()">
          <span class="btn-icon">🧠</span>
          <div class="btn-text-wrap">
            <div class="btn-title">${t('btn_games')}</div>
            <div class="btn-subtext">${t('btn_games_sub')}</div>
          </div>
        </button>

        <!-- 2. My Memories -->
        <button class="elderly-btn" onclick="PatientApp.showMemories()">
          <span class="btn-icon">❤️</span>
          <div class="btn-text-wrap">
            <div class="btn-title">${t('btn_memories')}</div>
            <div class="btn-subtext">${t('btn_memories_sub')}</div>
          </div>
        </button>

        <!-- 3. My Reminders -->
        <button class="elderly-btn" onclick="PatientApp.showReminders()">
          <span class="btn-icon">💊</span>
          <div class="btn-text-wrap">
            <div class="btn-title">${t('btn_reminders')}</div>
            <div class="btn-subtext">${t('btn_reminders_sub')}</div>
          </div>
        </button>

        <!-- 4. Find My Home -->
        <button class="elderly-btn accent-action" onclick="PatientApp.showFindHome()">
          <span class="btn-icon">🏠</span>
          <div class="btn-text-wrap">
            <div class="btn-title">${t('btn_home')}</div>
            <div class="btn-subtext">${t('btn_home_sub')}</div>
          </div>
        </button>

        <!-- 5. Voice Assistant -->
        <button class="elderly-btn" onclick="PatientApp.activateVoice()">
          <span class="btn-icon">🎤</span>
          <div class="btn-text-wrap">
            <div class="btn-title">${t('btn_voice')}</div>
            <div class="btn-subtext">${t('btn_voice_sub')}</div>
          </div>
        </button>
      </div>
    `;

    VoiceService.speakKey('speak_greeting');
  },

  showGamesMenu() {
    this.currentScreen = 'games';
    const container = document.getElementById('patient-dynamic-content');
    if (!container) return;

    container.innerHTML = `
      <div class="game-view-container">
        <div class="game-top-nav">
          <button class="back-btn" onclick="PatientApp.showHome()">← Back</button>
          <span class="game-level-badge">Cognitive Suite</span>
        </div>

        <div style="font-size: 26px; font-weight: 800; color: #1E6091; margin: 4px 0 14px;">
          ${t('choose_activity')}
        </div>

        <div class="patient-actions-list" style="padding: 0;">
          <!-- Game 1: Memory Match -->
          <button class="elderly-btn primary-action" onclick="MemoryMatchGame.init(2)">
            <span class="btn-icon">🧠</span>
            <div class="btn-text-wrap">
              <div class="btn-title">${t('game1_title')}</div>
              <div class="btn-subtext">${t('game1_desc')}</div>
            </div>
          </button>

          <!-- Game 2: Sequence Recall -->
          <button class="elderly-btn" onclick="SequenceRecallGame.init(1)">
            <span class="btn-icon">🔢</span>
            <div class="btn-text-wrap">
              <div class="btn-title">${t('game2_title')}</div>
              <div class="btn-subtext">${t('game2_desc')}</div>
            </div>
          </button>

          <!-- Game 3: Object Recognition -->
          <button class="elderly-btn" onclick="ObjectRecognitionGame.init()">
            <span class="btn-icon">👀</span>
            <div class="btn-text-wrap">
              <div class="btn-title">${t('game3_title')}</div>
              <div class="btn-subtext">${t('game3_desc')}</div>
            </div>
          </button>
        </div>
      </div>
    `;

    VoiceService.speakKey('speak_choose_game');
  },

  async showMemories() {
    this.currentScreen = 'memories';
    const container = document.getElementById('patient-dynamic-content');
    if (!container) return;

    let memories = [
      { person_name: "Rahul", relationship: currentLang === 'hi' ? "बेटा" : (currentLang === 'as' ? "পুত্র" : "Son"), description: currentLang === 'hi' ? "आपका बड़ा बेटा जो गुवाहाटी में रहता है। हर रविवार आपकी पसंदीदा मिठाई लाता है।" : "Your elder son who lives in Guwahati. Brings your favorite sweets every Sunday.", photo: "👨‍💼" },
      { person_name: "Priya", relationship: currentLang === 'hi' ? "बेटी" : (currentLang === 'as' ? "কন্যা" : "Daughter"), description: currentLang === 'hi' ? "आपकी बेटी जो पुणे में रहती है। हर शाम 7 बजे फोन करती है।" : "Your daughter in Pune. Calls you every evening at 7:00 PM.", photo: "👩‍⚕️" },
      { person_name: "Shillong Cottage", relationship: currentLang === 'hi' ? "विशेष स्थान" : (currentLang === 'as' ? "বিশেষ স্থান" : "Important Place"), description: currentLang === 'hi' ? "परिवार का शिलॉन्ग वाला ग्रीष्मकालीन घर जहां सुंदर फूल खिलते हैं।" : "The family summer house with blooming hydrangeas in Shillong.", photo: "🏡" },
      { person_name: "Tea Cup", relationship: currentLang === 'hi' ? "जानी-पहचानी वस्तु" : (currentLang === 'as' ? "চিনাকি সামগ্ৰী" : "Familiar Object"), description: currentLang === 'hi' ? "माजुली वाला आपका पीतल का पसंदीदा कप जिसमें आप सुबह अदरक की चाय पीती हैं।" : "Your brass-rimmed Majuli cup you love drinking morning ginger tea in.", photo: "☕" }
    ];

    try {
      const res = await fetch('/api/memories/patient_demo_1');
      if (res.ok) {
        const fetched = await res.json();
        if (fetched && fetched.length > 0) {
          memories = fetched;
        }
      }
    } catch(e) {}

    container.innerHTML = `
      <div class="game-view-container">
        <div class="game-top-nav">
          <button class="back-btn" onclick="PatientApp.showHome()">← Back</button>
          <span class="game-level-badge">Family & Memories</span>
        </div>

        <div style="font-size: 26px; font-weight: 800; color: #1E6091; margin: 4px 0 10px;">
          ${t('memories_heading')}
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${memories.map(m => `
            <div class="patient-reminder-item" style="flex-direction: column; align-items: flex-start; gap: 10px;" data-speak-text="${m.person_name}. ${m.relationship}. ${m.description}">
              <div style="display: flex; align-items: center; gap: 14px; width: 100%;">
                <div style="font-size: 44px; width: 60px; height: 60px; background: #E0F2FE; border-radius: 14px; display: flex; align-items: center; justify-content: center;">
                  ${m.photo || '❤️'}
                </div>
                <div style="flex: 1;">
                  <div style="font-size: 22px; font-weight: 800; color: #1E6091;">${m.person_name}</div>
                  <div style="font-size: 16px; font-weight: 700; color: #2563EB;">${m.relationship}</div>
                </div>
              </div>
              <div style="font-size: 17px; color: #1E293B; line-height: 1.4;">
                ${m.description}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    VoiceService.speakKey('speak_memories');
  },

  async showReminders() {
    this.currentScreen = 'reminders';
    const container = document.getElementById('patient-dynamic-content');
    if (!container) return;

    let reminders = [
      { id: '1', title: currentLang === 'hi' ? "सुबह की बीपी की गोली (एम्लोडिपाइन)" : "Take Morning BP Tablet (Amlodipine)", category: "medicine", scheduled_time: "08:00 AM", is_completed: 1 },
      { id: '2', title: currentLang === 'hi' ? "एक गिलास गुनगुना पानी पिएं" : "Drink a glass of warm water", category: "hydration", scheduled_time: "10:00 AM", is_completed: 1 },
      { id: '3', title: currentLang === 'hi' ? "दोपहर का मल्टीविटामिन और कैल्शियम" : "Post-Lunch Multivitamin & Calcium", category: "medicine", scheduled_time: "02:00 PM", is_completed: 0 },
      { id: '4', title: currentLang === 'hi' ? "दोपहर का नींबू पानी पिएं" : "Afternoon Hydration - Lemon Water", category: "hydration", scheduled_time: "03:00 PM", is_completed: 0 },
      { id: '5', title: currentLang === 'hi' ? "बरामदे में 15 मिनट टहलें" : "Gentle Garden Walk in Veranda", category: "activity", scheduled_time: "05:00 PM", is_completed: 0 }
    ];

    try {
      const res = await fetch('/api/reminders/patient_demo_1');
      if (res.ok) {
        reminders = await res.json();
      }
    } catch(e) {}

    container.innerHTML = `
      <div class="game-view-container">
        <div class="game-top-nav">
          <button class="back-btn" onclick="PatientApp.showHome()">← Back</button>
          <span class="game-level-badge">Daily Reminders</span>
        </div>

        <div style="font-size: 26px; font-weight: 800; color: #1E6091; margin: 4px 0 10px;">
          ${t('reminders_heading')}
        </div>

        <div class="reminders-patient-list">
          ${reminders.map(r => `
            <div class="patient-reminder-item ${r.is_completed ? 'done' : ''}" id="rem-item-${r.id}" data-speak-text="${r.scheduled_time}. ${r.title}. ${r.is_completed ? t('done_btn_label') : t('took_it_btn')}">
              <div style="flex: 1;">
                <div style="font-size: 14px; font-weight: 800; color: #2563EB; text-transform: uppercase;">
                  ⏰ ${r.scheduled_time} (${r.category})
                </div>
                <div style="font-size: 20px; font-weight: 800; color: #0F1E2E; margin-top: 2px;">
                  ${r.title}
                </div>
              </div>
              <button class="reminder-check-btn" onclick="PatientApp.toggleReminder('${r.id}')">
                ${r.is_completed ? t('done_btn_label') : t('took_it_btn')}
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    VoiceService.speakKey('speak_reminders');
  },

  async toggleReminder(remId) {
    const itemEl = document.getElementById(`rem-item-${remId}`);
    if (itemEl) {
      itemEl.classList.toggle('done');
      const btn = itemEl.querySelector('.reminder-check-btn');
      if (btn) {
        btn.textContent = itemEl.classList.contains('done') ? t('done_btn_label') : t('took_it_btn');
      }
    }

    if (OfflineStore.isOnline) {
      try {
        await fetch(`/api/reminders/${remId}/toggle`, { method: 'PATCH' });
        if (window.CaregiverApp) CaregiverApp.refreshData();
      } catch(e) {}
    } else {
      console.log("Offline mode: reminder status queued locally");
    }

    VoiceService.speakKey('speak_reminder_done');
  },

  showFindHome() {
    this.currentScreen = 'home_finder';
    const container = document.getElementById('patient-dynamic-content');
    if (!container) return;
    GPSService.renderFindMyHomeView(container);
  },

  activateVoice() {
    VoiceService.speakKey('voice_start_msg', () => {
      VoiceService.listen((spoken) => {
        if (spoken.includes("game") || spoken.includes("play") || spoken.includes("खेल")) {
          this.showGamesMenu();
        } else if (spoken.includes("home") || spoken.includes("take me home") || spoken.includes("घर")) {
          this.showFindHome();
        } else if (spoken.includes("remind") || spoken.includes("medicine") || spoken.includes("दवा")) {
          this.showReminders();
        } else if (spoken.includes("memory") || spoken.includes("photo") || spoken.includes("याद")) {
          this.showMemories();
        }
      });
    });
  }
};

/**
 * ============================================================================
 * SIH 16-STEP GUIDED WALKTHROUGH CONTROLLER
 * Automates or steps through the exact demonstration story specified in Section 31
 * ============================================================================
 */
const SIHDemoController = {
  currentStep: 1,

  steps: [
    { num: 1, title: "Caregiver Logs In", desc: "Demonstrating Caregiver authentication role.", action: () => SIHDemoController.step1CaregiverLogin() },
    { num: 2, title: "Selects Mrs. Sharma", desc: "Caregiver selects patient profile.", action: () => SIHDemoController.step2SelectPatient() },
    { num: 3, title: "Sets Reminder, Home & Memory", desc: "Caregiver configures patient care settings.", action: () => SIHDemoController.step3ConfigureCare() },
    { num: 4, title: "Patient Opens App", desc: "Switches to Patient mobile accessibility view.", action: () => SIHDemoController.step4PatientOpen() },
    { num: 5, title: "Greeting & Daily Status", desc: "Shows 'Good Morning, Mrs. Sharma' & today's reminders.", action: () => SIHDemoController.step5Greeting() },
    { num: 6, title: "Starts Memory Match", desc: "Launches Game 1: Memory Match.", action: () => SIHDemoController.step6StartMemoryMatch() },
    { num: 7, title: "Scores 90% in Game", desc: "Patient completes Memory Match with 90% accuracy.", action: () => SIHDemoController.step7Score90() },
    { num: 8, title: "Adaptive AI Increases Difficulty", desc: "Engine explains: Next session difficulty Level 3.", action: () => SIHDemoController.step8AdaptiveIncrease() },
    { num: 9, title: "Completes Another Activity", desc: "Sequence Recall / Object Recognition completed.", action: () => SIHDemoController.step9AnotherActivity() },
    { num: 10, title: "Turn Internet OFF", desc: "Demonstrating Offline Mode (Low-connectivity NER regions).", action: () => SIHDemoController.step10InternetOff() },
    { num: 11, title: "Play Game in Offline Mode", desc: "Game completes; result saved locally in SQLite queue.", action: () => SIHDemoController.step11PlayOffline() },
    { num: 12, title: "Turn Internet ON & Sync", desc: "Internet restored -> Auto-syncing pending queue.", action: () => SIHDemoController.step12InternetOnSync() },
    { num: 13, title: "Caregiver Dashboard Refreshed", desc: "Newly synced game result appears live on dashboard.", action: () => SIHDemoController.step13CaregiverRefreshed() },
    { num: 14, title: "Show Performance Trend", desc: "Chart.js 7-session accuracy and response time trends.", action: () => SIHDemoController.step14ShowTrends() },
    { num: 15, title: "Demonstrate Reminders", desc: "Medicine & hydration reminder notifications.", action: () => SIHDemoController.step15DemoReminder() },
    { num: 16, title: "Demonstrate FIND MY HOME", desc: "GPS distance to home & safe navigation guidance.", action: () => SIHDemoController.step16FindMyHome() }
  ],

  init() {
    this.updateUI();
  },

  nextStep() {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
      this.executeStep(this.currentStep);
    }
  },

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.executeStep(this.currentStep);
    }
  },

  jumpToStep(stepNum) {
    this.currentStep = stepNum;
    this.executeStep(this.currentStep);
  },

  executeStep(num) {
    const step = this.steps[num - 1];
    if (step && step.action) {
      step.action();
    }
    this.updateUI();
  },

  updateUI() {
    const step = this.steps[this.currentStep - 1];
    const badge = document.getElementById('sih-step-badge');
    const title = document.getElementById('sih-step-title');
    const desc = document.getElementById('sih-step-desc');

    if (badge) badge.textContent = `SIH STEP ${step.num}/16`;
    if (title) title.textContent = step.title;
    if (desc) desc.textContent = step.desc;
  },

  // STEP ACTIONS
  step1CaregiverLogin() {
    switchRole('caregiver');
  },
  step2SelectPatient() {
    switchRole('caregiver');
    CaregiverApp.refreshData();
  },
  step3ConfigureCare() {
    switchRole('caregiver');
    CaregiverApp.switchTab('reminders');
  },
  step4PatientOpen() {
    switchRole('patient');
    PatientApp.showHome();
  },
  step5Greeting() {
    switchRole('patient');
    PatientApp.showHome();
    VoiceService.speakKey('speak_greeting');
  },
  step6StartMemoryMatch() {
    switchRole('patient');
    MemoryMatchGame.init(2);
  },
  step7Score90() {
    switchRole('patient');
    MemoryMatchGame.renderResult(90, 90, 4200, 0, 3, "Difficulty increased because of consistently strong recent performance.");
  },
  step8AdaptiveIncrease() {
    switchRole('caregiver');
    const aiEl = document.getElementById('cg-ai-explanation');
    if (aiEl) {
      aiEl.textContent = "Difficulty increased to Level 3 because of consistently strong recent accuracy (90%) and prompt response time.";
    }
  },
  step9AnotherActivity() {
    switchRole('patient');
    ObjectRecognitionGame.init();
  },
  step10InternetOff() {
    OfflineStore.setNetworkStatus(false);
  },
  step11PlayOffline() {
    switchRole('patient');
    // Save an offline session
    OfflineStore.saveGameSession({
      patient_id: 'patient_demo_1',
      game_type: 'memory_match',
      difficulty_level: 3,
      score: 85,
      accuracy: 85,
      response_time_ms: 4800,
      mistakes: 1,
      items_count: 5,
      feedback_text: "Offline session stored locally."
    });
    MemoryMatchGame.renderResult(85, 85, 4800, 1, 3, "Stored offline in local device database. Will sync when connectivity returns.");
  },
  step12InternetOnSync() {
    OfflineStore.setNetworkStatus(true);
  },
  step13CaregiverRefreshed() {
    switchRole('caregiver');
    CaregiverApp.refreshData();
  },
  step14ShowTrends() {
    switchRole('caregiver');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  },
  step15DemoReminder() {
    switchRole('patient');
    PatientApp.showReminders();
  },
  step16FindMyHome() {
    switchRole('patient');
    PatientApp.showFindHome();
  }
};

function switchRole(role) {
  const patientView = document.getElementById('patient-view');
  const caregiverView = document.getElementById('caregiver-view');
  const patientTabBtn = document.getElementById('tab-role-patient');
  const caregiverTabBtn = document.getElementById('tab-role-caregiver');

  if (role === 'patient') {
    if (patientView) patientView.style.display = 'block';
    if (caregiverView) caregiverView.style.display = 'none';
    if (patientTabBtn) patientTabBtn.classList.add('active');
    if (caregiverTabBtn) caregiverTabBtn.classList.remove('active');
  } else {
    if (patientView) patientView.style.display = 'none';
    if (caregiverView) caregiverView.style.display = 'block';
    if (patientTabBtn) patientTabBtn.classList.remove('active');
    if (caregiverTabBtn) caregiverTabBtn.classList.add('active');
    if (window.CaregiverApp) CaregiverApp.refreshData();
  }
}

// Global initialization on window load
window.addEventListener('DOMContentLoaded', () => {
  PatientApp.init();
  CaregiverApp.init();
  SIHDemoController.init();
});
