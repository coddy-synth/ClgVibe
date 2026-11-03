import React from 'react';

interface PhoneFrameProps {
  scale?: number;
  className?: string;
  children: React.ReactNode;
}

/** Fixed 300 x 620 design-size phone, uniformly scaled so inner UI stays crisp. */
export const PhoneFrame: React.FC<PhoneFrameProps> = ({ scale = 1, className = '', children }) => (
  <div
    className={`relative shrink-0 ${className}`}
    style={{ width: 300 * scale, height: 620 * scale }}
  >
    <div
      className="absolute left-0 top-0 origin-top-left"
      style={{ width: 300, height: 620, transform: `scale(${scale})` }}
    >
      <div className="relative h-full w-full rounded-[50px] bg-[#101114] p-[9px] shadow-phone ring-1 ring-black/60">
        {/* side buttons */}
        <span className="absolute -left-[2px] top-[104px] h-[26px] w-[3px] rounded-l bg-[#26272b]" />
        <span className="absolute -left-[2px] top-[146px] h-[48px] w-[3px] rounded-l bg-[#26272b]" />
        <span className="absolute -right-[2px] top-[132px] h-[72px] w-[3px] rounded-r bg-[#26272b]" />
        <div className="relative h-full w-full overflow-hidden rounded-[42px] bg-white">
          {children}
          {/* dynamic island */}
          <div className="pointer-events-none absolute left-1/2 top-[9px] z-40 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
          {/* home indicator */}
          <div className="pointer-events-none absolute bottom-[7px] left-1/2 z-40 h-[4px] w-[108px] -translate-x-1/2 rounded-full bg-black/85" />
        </div>
      </div>
    </div>
  </div>
);

