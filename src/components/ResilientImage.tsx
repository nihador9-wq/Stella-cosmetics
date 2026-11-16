import { CSSProperties, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Product } from '../types';

export function getProductImageStyle(
  product: Pick<Product, 'imageObjectPosition' | 'imageScale'>
): CSSProperties {
  return {
    ...(product.imageObjectPosition ? { objectPosition: product.imageObjectPosition } : {}),
    ...(product.imageScale ? { transform: `scale(${product.imageScale})` } : {}),
  };
}

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}

export function ResilientImage({ src, alt, className = '', style }: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F7E6EA] via-[#FAF3F0] to-[#F2D3DB] text-[#8E2246] p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Sparkles className="w-6 h-6 mb-2 text-[#B99254]" strokeWidth={1.5} />
        <span className="font-serif text-sm font-medium text-[#2C1D24] line-clamp-2 max-w-[180px]">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
      style={style}
    />
  );
}
