import { useState, FormEvent } from 'react';
import { Lock, X } from 'lucide-react';
import { Language, UI_TEXT } from '../i18n';

interface VendorAuthModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function VendorAuthModal({
  lang,
  isOpen,
  onClose,
  onSuccess,
}: VendorAuthModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const t = UI_TEXT[lang];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password.trim() === 'stella2026') {
      setError('');
      setPassword('');
      onSuccess();
    } else {
      setError(t.vendorWrongPass);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C1D24]/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vendor-login-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FDF9F7] border border-[#EDD9DF] rounded-2xl p-6 sm:p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.cancel}
          className="absolute top-4 end-4 p-2 rounded-lg text-[#6B505B] hover:text-[#BE2B5B] hover:bg-[#F7E6EA] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-11 h-11 rounded-xl bg-[#F7E6EA] text-[#BE2B5B] flex items-center justify-center mb-4">
          <Lock className="w-5 h-5" />
        </div>

        <h2
          id="vendor-login-title"
          className="font-serif text-2xl font-semibold text-[#2C1D24]"
        >
          {t.vendorSpace}
        </h2>
        <p className="mt-1.5 text-sm text-[#6B505B]">{t.vendorLoginDesc}</p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="vendor-password"
              className="block text-xs font-semibold text-[#2C1D24] mb-1.5"
            >
              {t.vendorPasswordLabel}
            </label>
            <input
              id="vendor-password"
              type="password"
              autoFocus
              required
              dir="ltr"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder={t.vendorPasswordPlaceholder}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5C9D2] rounded-lg text-[#2C1D24] focus:outline-none focus:border-[#BE2B5B] focus:ring-1 focus:ring-[#BE2B5B]"
            />
            <p className="mt-1.5 text-xs text-[#8E2246]">
              {t.vendorHint} <code className="font-mono font-semibold">stella2026</code>
            </p>
          </div>

          {error && (
            <p role="alert" className="text-xs font-medium text-[#B91C1C]">
              {error}
            </p>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 min-h-[42px] rounded-lg border border-[#E5C9D2] bg-white text-sm font-medium text-[#573E49] hover:bg-[#FAF3F0] cursor-pointer"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 min-h-[42px] rounded-lg bg-[#BE2B5B] hover:bg-[#9E1F49] text-white text-sm font-medium cursor-pointer"
            >
              {t.login}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
