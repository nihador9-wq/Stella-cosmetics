import { useState } from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BrandLogo({ size = 'sm', className = '' }: BrandLogoProps) {
  const [failed, setFailed] = useState(false);

  const sizeClasses =
    size === 'lg'
      ? 'w-20 h-20 sm:w-24 sm:h-24'
      : size === 'md'
        ? 'w-12 h-12'
        : 'w-9 h-9';

  if (failed) {
    return (
      <div
        className={`${sizeClasses} rounded-full bg-gradient-to-br from-[#F7E6EA] to-[#E9C9B8] border border-[#C9A469] flex items-center justify-center shrink-0 ${className}`}
      >
        <span className="font-serif font-semibold text-[#2C1D24] text-sm">SC</span>
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses} rounded-full overflow-hidden border border-[#C9A469]/70 bg-[#FAF3F0] shadow-xs shrink-0 ${className}`}
    >
      <img
        src="/assets/aistudio/IMG_2872_7bd8b2e3.png"
        alt="Logo Stella Cosmetics"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover object-[50%_39%] scale-[1.48]"
      />
    </div>
  );
}
