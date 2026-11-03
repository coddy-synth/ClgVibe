import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { AppModal } from './components/AppModal';
import { Hero } from './sections/Hero';
import { Marquee } from './sections/Marquee';
import { FeatureStory } from './sections/FeatureStory';
import { ScreenFan } from './sections/ScreenFan';
import { HowItWorks } from './sections/HowItWorks';
import { Safety } from './sections/Safety';
import { FinalCTA } from './sections/FinalCTA';
import { Footer } from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [appOpen, setAppOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const openApp = useCallback(() => setAppOpen(true), []);
  const closeApp = useCallback(() => setAppOpen(false), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.2 },
      });
    });

    // fonts shift layout: recompute trigger positions once they settle
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <div
        ref={progressRef}
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#0095f6] via-[#5ca9ff] to-[#9099fc]"
      />
      <Navbar onGetApp={openApp} />
      <main>
        <Hero onGetApp={openApp} />
        <Marquee />
        <FeatureStory />
        <ScreenFan />
        <HowItWorks />
        <Safety />
        <FinalCTA onGetApp={openApp} />
      </main>
      <Footer onGetApp={openApp} />
      <AppModal open={appOpen} onClose={closeApp} />
    </div>
  );
}

