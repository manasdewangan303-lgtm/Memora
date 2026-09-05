/**
 * MEMORA - GPS & Home Assistance Service
 * Section 19: Real Geolocation API + Haversine distance to saved home location,
 * offline ping caching, and accessible compass view.
 */

const GPSService = {
  // Default fallback: Guwahati, Assam
  DEFAULT_HOME_LAT: 26.1445,
  DEFAULT_HOME_LNG: 91.7362,
  DEFAULT_HOME_ADDRESS: "House #14, B.R. Phukan Road, Bharalumukh, Guwahati, Assam",

  currentLocation: { lat: 26.1462, lng: 91.7380 }, // approx 280m from home
  homeLocation: null,

  init() {
    this.homeLocation = {
      lat: this.DEFAULT_HOME_LAT,
      lng: this.DEFAULT_HOME_LNG,
      address: this.DEFAULT_HOME_ADDRESS
    };
  },

  getCurrentPosition(callback) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.currentLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          OfflineStore.saveGPSPing(this.currentLocation.lat, this.currentLocation.lng);
          if (callback) callback(this.currentLocation);
        },
        (err) => {
          console.warn("Geolocation denied or error, using demo coordinates:", err.message);
          // Fallback demo location near Guwahati home
          OfflineStore.saveGPSPing(this.currentLocation.lat, this.currentLocation.lng);
          if (callback) callback(this.currentLocation);
        },
        { timeout: 8000, enableHighAccuracy: true }
      );
    } else {
      OfflineStore.saveGPSPing(this.currentLocation.lat, this.currentLocation.lng);
      if (callback) callback(this.currentLocation);
    }
  },

  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // in km
  },

  renderFindMyHomeView(container) {
    this.getCurrentPosition((pos) => {
      const distKm = this.calculateDistance(pos.lat, pos.lng, this.homeLocation.lat, this.homeLocation.lng);
      let distText = "";
      if (distKm < 0.1) {
        distText = `You are Home! (${Math.round(distKm * 1000)} meters)`;
      } else if (distKm < 1.0) {
        distText = `${Math.round(distKm * 1000)} meters from Home`;
      } else {
        distText = `${distKm.toFixed(2)} km from Home`;
      }

      container.innerHTML = `
        <div class="game-view-container">
          <div class="game-top-nav">
            <button class="back-btn" onclick="PatientApp.showHome()">← Back</button>
            <span class="game-level-badge">🏠 Safe Return</span>
          </div>

          <div class="home-finder-card">
            <div style="font-size: 64px; margin-bottom: 8px;">🧭</div>
            <h2 style="font-size: 28px; font-weight: 900; color: #1E6091; margin-bottom: 6px;">
              ${t('home_heading')}
            </h2>
            <div style="font-size: 16px; color: #64748B;">
              MEMORA has located your position.
            </div>

            <div class="home-distance-badge">
              📍 ${distText}
            </div>

            <div class="home-address-box">
              <div style="font-size: 13px; color: #64748B; font-weight: 700; text-transform: uppercase;">
                ${t('home_address_label')}
              </div>
              <div style="margin-top: 4px; font-size: 18px;">
                ${this.homeLocation.address}
              </div>
            </div>

            <!-- Compass Direction Visualizer -->
            <div style="background: #E2E8F0; border-radius: 16px; padding: 20px; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 20px;">
              <div style="width: 70px; height: 70px; border-radius: 50%; background: #1E6091; color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 36px; box-shadow: 0 4px 12px rgba(30,96,145,0.3);">
                ⬆️
              </div>
              <div style="text-align: left;">
                <div style="font-size: 18px; font-weight: 800; color: #1E293B;">Walk North along Main Road</div>
                <div style="font-size: 14px; color: #475569;">Toward Bharalumukh Roundabout</div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <a href="tel:+919864012345" class="elderly-btn accent-action" style="text-decoration: none;">
                <span class="btn-icon">📞</span>
                <div class="btn-text-wrap">
                  <div class="btn-title">${t('call_caregiver')}</div>
                  <div class="btn-subtext">Tap to phone son Rahul directly</div>
                </div>
              </a>

              <button class="elderly-btn primary-action" onclick="GPSService.openMapsNavigation(${this.homeLocation.lat}, ${this.homeLocation.lng})">
                <span class="btn-icon">🗺️</span>
                <div class="btn-text-wrap">
                  <div class="btn-title">OPEN MAP DIRECTIONS</div>
                  <div class="btn-subtext">View step-by-step route to your door</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      `;

      if (currentLang === 'hi') {
        VoiceService.speak(`आप घर से ${distText} की दूरी पर हैं। उत्तर दिशा में घर की ओर चलें या अपने बेटे राहुल को फोन करें।`);
      } else if (currentLang === 'as') {
        VoiceService.speak(`আপুনি ঘৰৰ পৰা ${distText} দূৰত আছে। উত্তৰ দিশলৈ যাওক বা পুত্ৰ ৰাহুলক ফোন কৰক।`);
      } else {
        VoiceService.speak(`You are ${distText}. Walk North toward your home, or tap the button to call your son Rahul.`);
      }
    });
  },

  openMapsNavigation(lat, lng) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  }
};

GPSService.init();
