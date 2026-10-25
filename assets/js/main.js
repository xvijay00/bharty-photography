/**
 * Bharti Video Vision - Main Interactive JavaScript
 * Includes: WhatsApp Booking Dispatcher, Font Style Switcher,
 * Portfolio Filter, Lightbox, Hero Slider, Countdown Timer,
 * FAQ Accordion, and Toast Notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Official Studio WhatsApp Number (without + or hyphens for wa.me URL)
  const STUDIO_WHATSAPP_NUMBER = '918233470445';

  /* ==========================================================================
     1. SCRIPT FONT STYLE SWITCHER
     Allows switching between Great Vibes, Allura, Alex Brush, Pinyon, etc.
     ========================================================================== */
  const fontSelect = document.getElementById('fontSelect');
  if (fontSelect) {
    const savedFont = localStorage.getItem('bharti_script_font') || 'great-vibes';
    document.body.setAttribute('data-script-font', savedFont);
    fontSelect.value = savedFont;

    fontSelect.addEventListener('change', (e) => {
      const selectedFont = e.target.value;
      document.body.setAttribute('data-script-font', selectedFont);
      localStorage.setItem('bharti_script_font', selectedFont);
      showToast(`Font style updated to: ${e.target.options[e.target.selectedIndex].text}`);
    });
  }

  /* ==========================================================================
     2. MOBILE NAVIGATION MENU
     ========================================================================== */
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      mobileToggle.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        mobileToggle.classList.remove('open');
      });
    });
  }

  /* ==========================================================================
     3. HERO BACKGROUND SLIDER
     ========================================================================== */
  const heroSlides = document.querySelectorAll('.hero-slide');
  const sliderDots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  let slideInterval = null;

  function goToSlide(index) {
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    sliderDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    let next = (currentSlide + 1) % heroSlides.length;
    goToSlide(next);
  }

  if (heroSlides.length > 0) {
    slideInterval = setInterval(nextSlide, 5500);

    sliderDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToSlide(idx);
        slideInterval = setInterval(nextSlide, 5500);
      });
    });
  }

  /* ==========================================================================
     4. WEDDING SEASON LIVE COUNTDOWN TIMER
     ========================================================================== */
  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins = document.getElementById('cdMins');
  const cdSecs = document.getElementById('cdSecs');

  if (cdDays && cdHours && cdMins && cdSecs) {
    // Set target date to 21 days from current date
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 21);
    targetDate.setHours(18, 0, 0, 0);

    function updateCountdown() {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((difference % (1000 * 60)) / 1000);

        cdDays.textContent = String(days).padStart(2, '0');
        cdHours.textContent = String(hours).padStart(2, '0');
        cdMins.textContent = String(mins).padStart(2, '0');
        cdSecs.textContent = String(secs).padStart(2, '0');
      }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ==========================================================================
     5. PORTFOLIO FILTER TABS
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.gallery-tab-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* ==========================================================================
     6. PORTFOLIO LIGHTBOX MODAL
     ========================================================================== */
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxInquireBtn = document.getElementById('lightboxInquireBtn');
  const lightboxTriggers = document.querySelectorAll('.btn-icon-lightbox');

  function openLightbox(src, title, desc) {
    if (!lightboxModal) return;
    lightboxImg.src = src;
    lightboxImg.alt = title;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  lightboxTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const src = btn.getAttribute('data-src');
      const title = btn.getAttribute('data-title');
      const desc = btn.getAttribute('data-desc');
      openLightbox(src, title, desc);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxInquireBtn) {
    lightboxInquireBtn.addEventListener('click', () => {
      closeLightbox();
      openBookingModal();
    });
  }

  /* ==========================================================================
     7. 1-MINUTE CINEMATIC SHOWREEL PLAYER SIMULATION
     ========================================================================== */
  const playShowreelBtn = document.getElementById('playShowreelBtn');
  const playerContainer = document.getElementById('playerContainer');
  const simClose = document.getElementById('simClose');
  const simTogglePlay = document.getElementById('simTogglePlay');
  const simToggleAudio = document.getElementById('simToggleAudio');
  let isPlaying = true;
  let isAudioOn = true;

  if (playShowreelBtn && playerContainer) {
    playShowreelBtn.addEventListener('click', () => {
      playerContainer.style.display = 'flex';
      isPlaying = true;
    });

    if (simClose) {
      simClose.addEventListener('click', () => {
        playerContainer.style.display = 'none';
      });
    }

    if (simTogglePlay) {
      simTogglePlay.addEventListener('click', () => {
        isPlaying = !isPlaying;
        simTogglePlay.innerHTML = isPlaying 
          ? '<i class="fa-solid fa-pause"></i> Pause' 
          : '<i class="fa-solid fa-play"></i> Resume';
      });
    }

    if (simToggleAudio) {
      simToggleAudio.addEventListener('click', () => {
        isAudioOn = !isAudioOn;
        simToggleAudio.innerHTML = isAudioOn 
          ? '<i class="fa-solid fa-volume-high"></i> Audio On' 
          : '<i class="fa-solid fa-volume-xmark"></i> Muted';
      });
    }
  }

  /* ==========================================================================
     8. FAQS ACCORDION
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(other => {
        other.classList.remove('active');
        const btn = other.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ==========================================================================
     9. BOOKING MODAL OPEN / CLOSE LOGIC
     ========================================================================== */
  const bookingModal = document.getElementById('bookingModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalOpenBtns = document.querySelectorAll('.open-modal-btn');
  const modalPackageSelect = document.getElementById('mPackageInterest');

  function openBookingModal(preselectedPackage = '') {
    if (!bookingModal) return;
    bookingModal.classList.add('active');
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (preselectedPackage && modalPackageSelect) {
      // Find matching option
      for (let i = 0; i < modalPackageSelect.options.length; i++) {
        if (modalPackageSelect.options[i].value.includes(preselectedPackage) || 
            preselectedPackage.includes(modalPackageSelect.options[i].value)) {
          modalPackageSelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  function closeBookingModal() {
    if (!bookingModal) return;
    bookingModal.classList.remove('active');
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalOpenBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pack = btn.getAttribute('data-package') || '';
      openBookingModal(pack);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeBookingModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeBookingModal);

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeBookingModal();
    }
  });

  /* ==========================================================================
     10. WHATSAPP BOOKING DISPATCHER (THE ENGINE)
     Formats structured message with emojis and transmits to +91 8233470445
     ========================================================================== */
  function dispatchWhatsAppBooking(data) {
    const formattedMessage = 
`✨ *NEW BOOKING APPOINTMENT INQUIRY* ✨
📸 *Studio:* Bharti Video Vision
───────────────
👤 *Client Name:* ${data.name}
📞 *WhatsApp Phone:* ${data.phone}
💍 *Event Type:* ${data.eventType}
📅 *Program Date:* ${data.date}
⏳ *Days for Program:* ${data.days}
👥 *Estimated Guests:* ${data.guests}
📍 *Venue / City:* ${data.venue}
💎 *Package Interest:* ${data.packageInterest}
📝 *Special Description:*
${data.description || 'None provided'}
───────────────
🌐 *Sent via Official Website Booking Engine*`;

    // Encode for WhatsApp URL
    const encodedText = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/${STUDIO_WHATSAPP_NUMBER}?text=${encodedText}`;

    // Open WhatsApp in new tab/app
    window.open(whatsappUrl, '_blank');

    // Notify user with elegant toast
    showToast(`✓ Booking formatted! Opening WhatsApp with your inquiry to +91 8233470445...`);
  }

  // Handle On-Page Booking Form
  const appointmentForm = document.getElementById('appointmentForm');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = {
        name: document.getElementById('clientName')?.value.trim() || 'N/A',
        phone: document.getElementById('clientPhone')?.value.trim() || 'N/A',
        eventType: document.getElementById('eventType')?.value || 'Wedding',
        date: document.getElementById('programDate')?.value || 'Not fixed',
        days: document.getElementById('programDays')?.value || '2 Days',
        guests: document.getElementById('guestCount')?.value || 'Medium',
        venue: document.getElementById('venueAddress')?.value.trim() || 'Rajasthan',
        packageInterest: document.getElementById('packageInterest')?.value || 'Royal Signature',
        description: document.getElementById('eventDescription')?.value.trim() || 'Looking forward to booking.'
      };

      dispatchWhatsAppBooking(data);
    });
  }

  // Handle Modal Booking Form
  const modalAppointmentForm = document.getElementById('modalAppointmentForm');
  if (modalAppointmentForm) {
    modalAppointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = {
        name: document.getElementById('mClientName')?.value.trim() || 'N/A',
        phone: document.getElementById('mClientPhone')?.value.trim() || 'N/A',
        eventType: document.getElementById('mEventType')?.value || 'Wedding',
        date: document.getElementById('mProgramDate')?.value || 'Not fixed',
        days: document.getElementById('mProgramDays')?.value || '2 Days',
        guests: document.getElementById('mGuestCount')?.value || 'Medium',
        venue: document.getElementById('mVenueAddress')?.value.trim() || 'Rajasthan',
        packageInterest: document.getElementById('mPackageInterest')?.value || 'Royal Signature',
        description: document.getElementById('mDescription')?.value.trim() || 'Looking forward to booking.'
      };

      closeBookingModal();
      dispatchWhatsAppBooking(data);
    });
  }

  /* ==========================================================================
     11. COPY UPI ID BUTTON
     ========================================================================== */
  const copyUpiBtn = document.getElementById('copyUpiBtn');
  if (copyUpiBtn) {
    copyUpiBtn.addEventListener('click', () => {
      const upiId = '8233470445@upi';
      navigator.clipboard.writeText(upiId).then(() => {
        showToast(`✓ UPI ID copied to clipboard: ${upiId}`);
      }).catch(() => {
        showToast(`UPI ID: ${upiId}`);
      });
    });
  }

  /* ==========================================================================
     12. TOAST NOTIFICATION HELPER
     ========================================================================== */
  function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-bell"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  /* ==========================================================================
     13. HEADER SCROLL EFFECT & ACTIVE NAVIGATION LINK
     ========================================================================== */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.padding = '0.65rem 0';
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    } else {
      header.style.padding = '1rem 0';
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = 'none';
    }
  });

});
