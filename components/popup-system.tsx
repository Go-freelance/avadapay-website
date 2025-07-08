"use client";

import React from "react";
import { PopupProvider, usePopup } from "@/components/providers/popup-provider";
import { PopupModal } from "@/components/ui/popup-modal";

function PopupModalWrapper() {
  const { state, content, hidePopup, dismissPopup } = usePopup();

  return (
    <PopupModal
      isOpen={state.isVisible}
      onClose={hidePopup}
      onDismiss={dismissPopup}
      title={content.title}
      message={content.message}
      ctaText={content.ctaText}
      ctaLink={content.ctaLink}
      dismissText={content.dismissText}
      permanentDismissText={content.permanentDismissText}
      subtitle={content.subtitle}
      badgeMobile={content.badgeMobile}
      badgeDesktop={content.badgeDesktop}
      integrationTitle={content.integrationTitle}
      integrationDescription={content.integrationDescription}
      supportTitle={content.supportTitle}
      supportDescription={content.supportDescription}
      statsPartners={content.statsPartners}
      statsAvailability={content.statsAvailability}
      statsCountries={content.statsCountries}
    />
  );
}

interface PopupSystemProps {
  children: React.ReactNode;
}

export function PopupSystem({ children }: PopupSystemProps) {
  return (
    <PopupProvider>
      {children}
      <PopupModalWrapper />
    </PopupProvider>
  );
}
