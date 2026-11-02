import React, { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PhoneShowcase } from './PhoneShowcase';
import { PhoneShowcaseClassic } from './PhoneShowcaseClassic';
import { ScreenStageId } from '../data/campusData';

const DESKTOP_QUERY = '(min-width: 1024px)';

export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia(DESKTOP_QUERY).matches : true
  );

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return isDesktop;
}

interface AdaptivePhoneProps {
  activeStage: ScreenStageId;
  onSelectStage?: (stage: ScreenStageId) => void;
  showPopups?: boolean;
  compact?: boolean;
  mobileSticky?: boolean;
}

/**
 * Desktop (>= 1024px) renders the classic phone mockup;
 * mobile & tablet render the responsive scroll-reactive phone.
 */
export const AdaptivePhone: React.FC<AdaptivePhoneProps> = ({
  mobileSticky,
  ...rest
}) => {
  const isDesktop = useIsDesktop();
  return isDesktop ? (
    <PhoneShowcaseClassic {...rest} />
  ) : (
    <PhoneShowcase {...rest} mobileSticky={mobileSticky} />
  );
};
