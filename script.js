/**
 * Newsletter Signup Modal — Day 20
 * Author: Aditya Singh (B.Tech, Computer Science and Engineering)
 * Technologies: HTML5, CSS3, Vanilla JavaScript
 */

(function () {
  'use strict';

  // Configuration Constants
  const POPUP_DELAY_MS = 2500;
  const SESSION_STORAGE_KEY = 'newsletter_modal_dismissed_v1';

  // DOM Elements
  const modalOverlay = document.getElementById('modalOverlay');
  const modalDialog = document.getElementById('modalDialog');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalFormView = document.getElementById('modalFormView');
  const modalSuccessView = document.getElementById('modalSuccessView');
  const modalDoneBtn = document.getElementById('modalDoneBtn');
  const modalDismissLink = document.getElementById('modalDismissLink');

  const newsletterForm = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('emailInput');
  const emailError = document.getElementById('emailError');
  const userEmailDisplay = document.getElementById('userEmailDisplay');

  // Trigger and Reset buttons on the page
  const navSubscribeBtn = document.getElementById('navSubscribeBtn');
  const heroSubscribeBtn = document.getElementById('heroSubscribeBtn');
  const bannerSubscribeBtn = document.getElementById('bannerSubscribeBtn');
  const replayPopupBtn = document.getElementById('replayPopupBtn');
  const resetPopupFooterBtn = document.getElementById('resetPopupFooterBtn');

  let popupTimerId = null;

  /**
   * Checks whether the user has already dismissed or completed the modal in this session.
   * @returns {boolean}
   */
  function hasBeenDismissedInSession() {
    try {
      return sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true';
    } catch (e) {
      return false;
    }
  }

  /**
   * Persists dismissal flag in sessionStorage to enforce single display per session.
   */
  function markDismissedInSession() {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
    } catch (e) {
      // Graceful fallback if storage is restricted
    }
  }

  /**
   * Validates standard email address syntax using an RFC-compatible regex.
   * @param {string} email
   * @returns {boolean}
   */
  function isValidEmailFormat(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailPattern.test(email);
  }

  /**
   * Displays an accessible validation error.
   * @param {string} message
   */
  function showValidationError(message) {
    if (!emailError || !emailInput) return;
    emailError.textContent = message;
    emailError.hidden = false;
    emailInput.classList.add('is-invalid');
    emailInput.setAttribute('aria-invalid', 'true');
    emailInput.focus();
  }

  /**
   * Clears any active validation error.
   */
  function clearValidationError() {
    if (!emailError || !emailInput) return;
    emailError.textContent = '';
    emailError.hidden = true;
    emailInput.classList.remove('is-invalid');
    emailInput.removeAttribute('aria-invalid');
  }

  /**
   * Reveals the newsletter modal and manages focus.
   */
  function openModal() {
    if (!modalOverlay) return;

    modalOverlay.hidden = false;
    modalOverlay.setAttribute('aria-hidden', 'false');

    // Trigger smooth fade and scale via class
    requestAnimationFrame(() => {
      modalOverlay.classList.add('is-open');
      if (modalSuccessView && !modalSuccessView.hidden && modalDoneBtn) {
        modalDoneBtn.focus();
      } else if (emailInput) {
        emailInput.focus();
      }
    });
  }

  /**
   * Closes the modal, cancels any pending timers, and marks the session dismissed.
   */
  function closeModal() {
    if (!modalOverlay) return;

    if (popupTimerId !== null) {
      clearTimeout(popupTimerId);
      popupTimerId = null;
    }

    modalOverlay.classList.remove('is-open');
    modalOverlay.setAttribute('aria-hidden', 'true');

    // Allow CSS transition to finish before setting hidden attribute
    setTimeout(() => {
      modalOverlay.hidden = true;
    }, 200);

    markDismissedInSession();
  }

  /**
   * Schedules the modal popup after the configured delay using setTimeout().
   */
  function scheduleDelayedPopup() {
    if (popupTimerId !== null) {
      clearTimeout(popupTimerId);
      popupTimerId = null;
    }

    // Do not show if already dismissed in this session
    if (hasBeenDismissedInSession()) {
      return;
    }

    popupTimerId = window.setTimeout(() => {
      if (!hasBeenDismissedInSession()) {
        openModal();
      }
    }, POPUP_DELAY_MS);
  }

  /**
   * Resets the form state and opens the modal immediately.
   */
  function openModalManually() {
    if (popupTimerId !== null) {
      clearTimeout(popupTimerId);
      popupTimerId = null;
    }

    clearValidationError();
    if (modalFormView) modalFormView.hidden = false;
    if (modalSuccessView) modalSuccessView.hidden = true;
    openModal();
  }

  /**
   * Clears session storage and restarts the delayed timer for testing.
   */
  function replayDelayedPopup() {
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (e) {
      // Ignore
    }

    closeModal();
    clearValidationError();
    if (newsletterForm) newsletterForm.reset();
    if (modalFormView) modalFormView.hidden = false;
    if (modalSuccessView) modalSuccessView.hidden = true;

    scheduleDelayedPopup();
  }

  // Form submission handler
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const enteredEmail = emailInput ? emailInput.value.trim() : '';

      // 1. Check for empty string
      if (!enteredEmail) {
        showValidationError('Please enter your email address before submitting.');
        return;
      }

      // 2. Check for valid email format
      if (!isValidEmailFormat(enteredEmail)) {
        showValidationError('Please enter a valid email address (for example, name@domain.com).');
        return;
      }

      // 3. Clear errors and transition to confirmation view
      clearValidationError();
      if (userEmailDisplay) {
        userEmailDisplay.textContent = enteredEmail;
      }
      if (modalFormView) modalFormView.hidden = true;
      if (modalSuccessView) modalSuccessView.hidden = false;

      markDismissedInSession();
      if (modalDoneBtn) modalDoneBtn.focus();
    });
  }

  // Clear validation error dynamically on user input
  if (emailInput) {
    emailInput.addEventListener('input', function () {
      if (!emailError.hidden) {
        clearValidationError();
      }
    });
  }

  // Close button click
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Dismiss link click
  if (modalDismissLink) {
    modalDismissLink.addEventListener('click', closeModal);
  }

  // Confirmation view "Continue Reading" button click
  if (modalDoneBtn) {
    modalDoneBtn.addEventListener('click', closeModal);
  }

  // Overlay click (dismiss if clicking the backdrop outside the dialog)
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function (event) {
      if (event.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Keyboard Escape key dismissal
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modalOverlay && !modalOverlay.hidden) {
      closeModal();
    }
  });

  // Manual Trigger Button Event Listeners
  if (navSubscribeBtn) navSubscribeBtn.addEventListener('click', openModalManually);
  if (heroSubscribeBtn) heroSubscribeBtn.addEventListener('click', openModalManually);
  if (bannerSubscribeBtn) bannerSubscribeBtn.addEventListener('click', openModalManually);
  if (replayPopupBtn) replayPopupBtn.addEventListener('click', replayDelayedPopup);
  if (resetPopupFooterBtn) resetPopupFooterBtn.addEventListener('click', replayDelayedPopup);

  // Initialize: start the delayed timer on page load
  scheduleDelayedPopup();
})();
