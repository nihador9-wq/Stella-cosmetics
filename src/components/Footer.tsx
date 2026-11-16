import { MapPin, Clock, Truck, Phone } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { Language, UI_TEXT } from '../i18n';

interface FooterProps {
  lang: Language;
  onOpenVendor: () => void;
}

export function Footer({ lang, onOpenVendor }: FooterProps) {
  const t = UI_TEXT[lang];

  return (
    <footer className="bg-[#FAF3F0] border-t border-[#EDD9DF] text-[#573E49]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand & Boutique Address */}
          <div>
            <div className="flex items-center gap-3">
              <BrandLogo size="md" />
              <p className="font-serif text-2xl font-semibold text-[#2C1D24]">
                Stella Cosmetics
              </p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#6B505B] max-w-sm">
              {t.footerDesc}
            </p>
            <div className="mt-4 space-y-2 text-sm text-[#2C1D24]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B99254] shrink-0 mt-0.5" />
                <span>{t.storePickupSub}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B99254] shrink-0" />
                <a
                  href="tel:0551129265"
                  dir="ltr"
                  className="font-medium tabular-nums hover:text-[#BE2B5B] transition-colors"
                >
                  0551 12 92 65
                </a>
              </div>
            </div>
          </div>

          {/* Hours & Delivery */}
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#2C1D24] mb-2">
                {t.footerHoursTitle}
              </h3>
              <div className="flex items-start gap-2 text-sm text-[#6B505B]">
                <Clock className="w-4 h-4 text-[#B99254] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p>{t.footerHours1}</p>
                  <p>{t.footerHours2}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 text-sm text-[#6B505B]">
              <Truck className="w-4 h-4 text-[#B99254] shrink-0 mt-0.5" />
              <span>{t.footerDelivery}</span>
            </div>
          </div>

          {/* Social & Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#2C1D24] mb-2">
              {t.footerFollowTitle}
            </h3>
            <p className="text-sm text-[#6B505B] mb-4">{t.footerFollowDesc}</p>
            <div className="space-y-2.5 text-sm font-medium">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://www.instagram.com/stella_.cosmetics1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2C1D24] hover:text-[#BE2B5B] underline decoration-[#E5C9D2] underline-offset-4 transition-colors"
                >
                  Instagram · @Stella_.cosmetics1
                </a>
                <a
                  href="https://www.tiktok.com/@stella.cosmetics16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2C1D24] hover:text-[#BE2B5B] underline decoration-[#E5C9D2] underline-offset-4 transition-colors"
                >
                  TikTok · @Stella.cosmetics16
                </a>
              </div>
              <p className="text-xs text-[#6B505B] font-normal">
                {t.footerPhoneLabel}{' '}
                <a
                  href="tel:0551129265"
                  dir="ltr"
                  className="font-semibold text-[#2C1D24] hover:text-[#BE2B5B] tabular-nums"
                >
                  0551 12 92 65
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#E8D5DC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#785C67]">
          <p>© {new Date().getFullYear()} Stella Cosmetics · {t.storePickupSub}</p>
          <button
            type="button"
            onClick={onOpenVendor}
            className="hover:text-[#BE2B5B] transition-colors cursor-pointer"
          >
            {t.footerVendorLink}
          </button>
        </div>
      </div>
    </footer>
  );
}
