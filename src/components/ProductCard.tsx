import { useState } from 'react';
import { Check, Plus } from 'lucide-react';
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

interface ProductCardProps {
  lang: Language;
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export function ProductCard({
  lang,
  product,
  onAddToCart,
  onQuickView,
}: ProductCardProps) {
  const [justAdded, setJustAdded] = useState(false);
  const t = UI_TEXT[lang];
  const localized = getLocalizedProduct(product, lang);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const isRental = product.category === 'Location Box' || product.badge === 'Location';

  return (
    <article className="group flex flex-col bg-white border border-[#EDD9DF] rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-12px_rgba(142,34,70,0.16)]">
      {/* Product Photography (1:1 uniform crop) */}
      <button
        type="button"
        onClick={() => onQuickView(product)}
        className="relative aspect-square w-full overflow-hidden bg-[#FAF3F0] cursor-pointer text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#BE2B5B]"
      >
        <div className="w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.03]">
          <ResilientImage
            src={product.imageUrl}
            alt={localized.name}
            style={getProductImageStyle(product)}
            className={`w-full h-full object-cover ${
              product.imagePosition || 'object-center'
            }`}
          />
        </div>
        <span
          className={`absolute top-3 start-3 px-2.5 py-1 text-[11px] font-medium tracking-wide rounded ${
            product.badge === 'Nouveau'
              ? 'bg-[#BE2B5B] text-white'
              : product.badge === 'Location'
                ? 'bg-[#2C1D24] text-[#FDF9F7]'
                : 'bg-[#FDF9F7]/95 text-[#2C1D24] border border-[#E5C9D2]'
          }`}
        >
          {getBadgeLabel(product.badge, lang)}
        </span>
      </button>

      {/* Product Metadata & CTA */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 text-xs text-[#785C67]">
          <span className="uppercase tracking-wider font-medium">
            {getCategoryLabel(product.category, lang)}
          </span>
          {localized.volume && (
            <>
              <span aria-hidden="true">·</span>
              <span>{localized.volume}</span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="mt-1.5 text-start cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE2B5B] rounded"
        >
          <h3 className="font-serif text-xl font-semibold text-[#2C1D24] leading-snug group-hover:text-[#BE2B5B] transition-colors">
            {localized.name}
          </h3>
        </button>

        <p className="mt-1.5 text-sm text-[#6B505B] line-clamp-2 leading-relaxed">
          {localized.description}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between gap-3 border-t border-[#F4E6EA]">
          <span className="text-[16px] font-semibold text-[#2C1D24] tabular-nums whitespace-nowrap">
            {formatDzdLocalized(product.priceDzd, lang)}
          </span>

          <button
            type="button"
            onClick={handleAdd}
            className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[40px] rounded-lg text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#BE2B5B] ${
              justAdded
                ? 'bg-[#2C1D24] text-white'
                : 'bg-[#BE2B5B] hover:bg-[#9E1F49] text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{isRental ? t.reserved : t.added}</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>{isRental ? t.reserveBox : t.addToCart}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
