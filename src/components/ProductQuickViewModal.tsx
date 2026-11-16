import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, MapPin, Truck } from 'lucide-react';
import { Product } from '../types';
import { ResilientImage, getProductImageStyle } from './ResilientImage';
import {
  Language,
  UI_TEXT,
  formatDzdLocalized,
  getBadgeLabel,
  getCategoryLabel,
  getLocalizedProduct,
} from '../i18n';

interface ProductQuickViewModalProps {
  lang: Language;
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductQuickViewModal({
  lang,
  product,
  onClose,
  onAddToCart,
}: ProductQuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const t = UI_TEXT[lang];
  const localized = getLocalizedProduct(product, lang);
  const isRental = product.category === 'Location Box' || product.badge === 'Location';

  const handleConfirmAdd = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C1D24]/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#FDF9F7] border border-[#EDD9DF] rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.cancel}
          className="absolute top-3 end-3 z-10 p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg bg-white/90 text-[#2C1D24] hover:text-[#BE2B5B] border border-[#EDD9DF] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image Left (1:1 uniform crop) */}
        <div className="bg-[#FAF3F0] aspect-square w-full overflow-hidden self-center">
          <ResilientImage
            src={product.imageUrl}
            alt={localized.name}
            style={getProductImageStyle(product)}
            className={`w-full h-full object-cover ${product.imagePosition || 'object-center'}`}
          />
        </div>

        {/* Purchase Module Right */}
        <div className="p-6 sm:p-8 flex flex-col">
          <div className="flex items-center gap-2 text-xs text-[#785C67]">
            <span className="uppercase tracking-wider font-medium">
              {getCategoryLabel(product.category, lang)}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-[#8E2246]">
              {getBadgeLabel(product.badge, lang)}
            </span>
            {localized.volume && (
              <>
                <span aria-hidden="true">·</span>
                <span>{localized.volume}</span>
              </>
            )}
          </div>

          <h2
            id="quick-view-title"
            className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-[#2C1D24] leading-tight"
          >
            {localized.name}
          </h2>

          <p className="mt-3 text-xl font-semibold text-[#BE2B5B] tabular-nums">
            {formatDzdLocalized(product.priceDzd, lang)}
          </p>

          <p className="mt-4 text-sm text-[#573E49] leading-relaxed">
            {localized.description}
          </p>

          <div className="mt-5 pt-4 border-t border-[#EDD9DF] space-y-2 text-xs text-[#6B505B]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#B99254] shrink-0" />
              <span>{t.quickViewStore}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-[#B99254] shrink-0" />
              <span>{t.quickViewDelivery}</span>
            </div>
          </div>

          <div className="mt-auto pt-6 flex items-center gap-3">
            <div className="inline-flex items-center border border-[#E5C9D2] rounded-lg bg-white">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="-"
                className="p-2.5 min-h-[42px] text-[#573E49] hover:text-[#BE2B5B] cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 text-sm font-semibold tabular-nums text-[#2C1D24]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="+"
                className="p-2.5 min-h-[42px] text-[#573E49] hover:text-[#BE2B5B] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleConfirmAdd}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-[#BE2B5B] hover:bg-[#9E1F49] text-white text-sm font-medium transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isRental ? t.reserveBox : t.addToCart}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
