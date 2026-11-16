import { Search, ShoppingBag, Lock, X } from 'lucide-react';
import { ProductCategory } from '../types';
import { CATEGORIES } from '../data/initialData';
import { BrandLogo } from './BrandLogo';
import { LANGUAGE_OPTIONS, Language, UI_TEXT, getCategoryLabel } from '../i18n';

interface HeaderProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  activeCategory: ProductCategory | 'Tous';
  onSelectCategory: (category: ProductCategory | 'Tous') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenVendor: () => void;
  isSearchOpen: boolean;
  onToggleSearch: () => void;
}

export function Header({
  lang,
  onChangeLang,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  onOpenVendor,
  isSearchOpen,
  onToggleSearch,
}: HeaderProps) {
  const t = UI_TEXT[lang];

  const handleCategoryClick = (category: ProductCategory | 'Tous') => {
    onSelectCategory(category);
    const el = document.getElementById('catalogue');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDF9F7]/95 backdrop-blur-md border-b border-[#EDD9DF]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
        {/* Zone 1: Brand wordmark + Logo */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('Tous');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 sm:gap-2.5 font-serif text-lg sm:text-2xl font-semibold tracking-tight text-[#2C1D24] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE2B5B] rounded"
        >
          <BrandLogo size="sm" />
          <span>Stella Cosmetics</span>
        </a>

        {/* Zone 2: 5 Dedicated Spaces Navigation */}
        <nav
          aria-label="Spaces navigation"
          className="hidden xl:flex items-center gap-5 text-sm font-medium text-[#6B505B]"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryClick(category)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE2B5B] rounded ${
                  isActive
                    ? 'text-[#BE2B5B] font-semibold'
                    : 'hover:text-[#2C1D24]'
                }`}
              >
                {getCategoryLabel(category, lang)}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[#BE2B5B]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Language switcher + Search + Vendor + Cart */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Trilingual Language Switcher (FR / AR / EN) */}
          <div
            role="group"
            aria-label="Language switcher"
            className="inline-flex items-center p-0.5 bg-[#FAF3F0] border border-[#E5C9D2] rounded-lg shrink-0"
          >
            {LANGUAGE_OPTIONS.map((opt) => {
              const active = lang === opt.code;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => onChangeLang(opt.code)}
                  aria-label={opt.nativeName}
                  aria-pressed={active}
                  className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#BE2B5B] text-white'
                      : 'text-[#6B505B] hover:text-[#2C1D24]'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onToggleSearch}
            aria-label={t.searchShortPlaceholder}
            className="p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg text-[#573E49] hover:text-[#BE2B5B] hover:bg-[#F7E6EA] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE2B5B]"
          >
            {isSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onOpenVendor}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 min-h-[38px] text-xs font-medium text-[#6B505B] hover:text-[#2C1D24] hover:bg-[#F7E6EA]/70 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE2B5B]"
          >
            <Lock className="w-3.5 h-3.5 text-[#B99254]" />
            <span>{t.vendorSpace}</span>
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`${t.cart} (${cartCount})`}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 min-h-[38px] rounded-lg bg-[#BE2B5B] hover:bg-[#9E1F49] text-white text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#BE2B5B]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{t.cart}</span>
            <span className="tabular-nums font-semibold">({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-[#EDD9DF] bg-[#FAF3F0] px-4 sm:px-6 lg:px-8 py-3">
          <div className="max-w-2xl mx-auto relative">
            <Search className="w-4 h-4 text-[#8B6D79] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                const el = document.getElementById('catalogue');
                if (el && e.target.value.length === 1) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              placeholder={t.searchPlaceholder}
              autoFocus
              className="w-full ps-10 pe-4 py-2.5 text-sm bg-white border border-[#E5C9D2] rounded-lg text-[#2C1D24] placeholder:text-[#9A7F8A] focus:outline-none focus:border-[#BE2B5B] focus:ring-1 focus:ring-[#BE2B5B]"
            />
          </div>
        </div>
      )}
    </header>
  );
}
