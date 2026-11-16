import { ArrowRight, MapPin, Truck, Gift } from 'lucide-react';
import { HERO_IMAGE } from '../data/initialData';
import { ResilientImage } from './ResilientImage';
import { BrandLogo } from './BrandLogo';
import { Language, UI_TEXT } from '../i18n';

interface HeroSectionProps {
  lang: Language;
  onExploreCatalog: () => void;
  onOpenVendorMobile: () => void;
}

export function HeroSection({
  lang,
  onExploreCatalog,
  onOpenVendorMobile,
}: HeroSectionProps) {
  const t = UI_TEXT[lang];

  return (
    <section id="top" className="bg-[#FAF3F0] border-b border-[#EDD9DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Editorial Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <BrandLogo size="md" />
              <div className="text-xs sm:text-sm text-[#6B505B]">
                <p className="font-semibold text-[#8E2246]">{t.heroBadgeTitle}</p>
                <p>{t.heroBadgeSub}</p>
              </div>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[50px] font-semibold leading-[1.12] tracking-tight text-[#2C1D24] text-balance max-w-xl">
              {t.heroTitle}
            </h1>

            <p className="mt-5 text-base sm:text-[17px] leading-relaxed text-[#573E49] max-w-lg">
              {t.heroDesc}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreCatalog}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 min-h-[44px] rounded-lg bg-[#BE2B5B] hover:bg-[#9E1F49] text-white text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#BE2B5B]"
              >
                <span>{t.heroCta}</span>
                <ArrowRight className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
              </button>

              <button
                type="button"
                onClick={onOpenVendorMobile}
                className="md:hidden inline-flex items-center px-4 py-3 min-h-[44px] rounded-lg border border-[#E5C9D2] bg-white text-[#573E49] text-sm font-medium whitespace-nowrap shrink-0 cursor-pointer"
              >
                {t.vendorSpace}
              </button>
            </div>

            {/* Clean Trust Strip */}
            <div className="mt-10 pt-6 border-t border-[#E8D5DC] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#573E49]">
              <div className="flex items-start gap-2.5">
                <Gift className="w-4 h-4 text-[#B99254] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#2C1D24]">{t.trust1Title}</p>
                  <p className="text-[#785C67]">{t.trust1Sub}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B99254] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#2C1D24]">{t.trust2Title}</p>
                  <p className="text-[#785C67]">{t.trust2Sub}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#B99254] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#2C1D24]">{t.trust3Title}</p>
                  <p className="text-[#785C67]">{t.trust3Sub}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Media Column */}
          <div className="lg:col-span-6 flex items-center">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#EDD9DF] bg-[#F7E6EA] shadow-sm">
              <ResilientImage
                src={HERO_IMAGE}
                alt="Boutique Stella Cosmetics — Jolie Vue, Kouba"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
