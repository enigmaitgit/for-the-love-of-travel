"use client";
import { useState, useEffect } from 'react';

export function useScrollTrigger(ctaDelay = 2000) {
  const [showCTA, setShowCTA] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hasShownCTA, setHasShownCTA] = useState(false);

  useEffect(() => {
    // Check if CTA has already been shown in this session
    const hasShownCTABefore = sessionStorage.getItem('auth-cta-shown');
    console.log('CTA check:', { hasShownCTABefore, ctaDelay });
    
    if (hasShownCTABefore === 'true') {
      console.log('CTA already shown, skipping');
      setHasShownCTA(true);
      return;
    }

    let ctaTimeoutId;

    // Show CTA after a delay when page loads
    console.log('Setting CTA timeout for', ctaDelay, 'ms');
    ctaTimeoutId = setTimeout(() => {
      console.log('CTA timeout triggered, showing CTA');
      setShowCTA(true);
      setHasShownCTA(true);
      sessionStorage.setItem('auth-cta-shown', 'true');
    }, ctaDelay);

    // Cleanup
    return () => {
      if (ctaTimeoutId) {
        clearTimeout(ctaTimeoutId);
      }
    };
  }, [ctaDelay]);

  const closeCTA = () => {
    setShowCTA(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const showAuthPopup = () => {
    setShowCTA(false);
    setShowPopup(true);
  };

  const resetCTA = () => {
    setShowCTA(false);
    setShowPopup(false);
    setHasShownCTA(false);
    sessionStorage.removeItem('auth-cta-shown');
  };

  return {
    showCTA,
    showPopup,
    closeCTA,
    closePopup,
    showAuthPopup,
    resetCTA,
    hasShownCTA
  };
}
