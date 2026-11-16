import { useState, FormEvent } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  Truck,
  Store,
  Building2,
  Banknote,
  ShoppingBag,
} from 'lucide-react';
import { CartItem, DeliveryMode, Order } from '../types';
import { WILAYAS, calculateShippingFee } from '../data/wilayas';
import { ResilientImage, getProductImageStyle } from './ResilientImage';
import {
  Language,
  UI_TEXT,
  formatDzdLocalized,
  getCategoryLabel,
  getDeliveryModeLabel,
  getLocalizedProduct,
} from '../i18n';

interface CartCheckoutDrawerProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onPlaceOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
}

type DrawerStep = 'cart' | 'checkout' | 'confirmation';

export function CartCheckoutDrawer({
  lang,
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
}: CartCheckoutDrawerProps) {
  const [step, setStep] = useState<DrawerStep>('cart');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [wilayaCode, setWilayaCode] = useState('16');
  const [communeAddress, setCommuneAddress] = useState('');
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('domicile');
  const [formError, setFormError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const t = UI_TEXT[lang];

  const subtotalDzd = items.reduce(
    (sum, item) => sum + item.product.priceDzd * item.quantity,
    0
  );

  const effectiveWilayaCode = deliveryMode === 'retrait' ? '16' : wilayaCode;
  const selectedWilaya =
    WILAYAS.find((w) => w.code === effectiveWilayaCode) || WILAYAS[15];
  const shippingFeeDzd =
    items.length === 0 ? 0 : calculateShippingFee(effectiveWilayaCode, deliveryMode);
  const totalDzd = subtotalDzd + shippingFeeDzd;

  const handleClose = () => {
    if (step === 'confirmation') {
      setStep('cart');
      setConfirmedOrder(null);
    }
    setFormError('');
    onClose();
  };

  const validatePhone = (raw: string): boolean => {
    const digits = raw.replace(/\D/g, '');
    return /^0[567]\d{8}$/.test(digits);
  };

  const handleSubmitOrder = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (customerName.trim().length < 3) {
      setFormError(t.errName);
      return;
    }

    if (!validatePhone(phone)) {
      setFormError(t.errPhone);
      return;
    }

    if (deliveryMode !== 'retrait' && communeAddress.trim().length < 4) {
      setFormError(t.errAddress);
      return;
    }

    const finalAddress =
      deliveryMode === 'retrait'
        ? communeAddress.trim()
          ? `Jolie Vue, Kouba — ${communeAddress.trim()}`
          : t.storePickupSub
        : communeAddress.trim();

    const created = onPlaceOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      wilayaCode: selectedWilaya.code,
      wilayaName: selectedWilaya.name,
      communeAddress: finalAddress,
      deliveryMode,
      shippingFeeDzd,
      subtotalDzd,
      totalDzd,
      paymentMethod: 'Paiement à la livraison',
      items: items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        priceDzd: i.product.priceDzd,
        quantity: i.quantity,
      })),
    });

    setConfirmedOrder(created);
    setStep('confirmation');
    setCustomerName('');
    setPhone('');
    setCommuneAddress('');
  };

  const totalItemsCount = items.reduce((a, b) => a + b.quantity, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#2C1D24]/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label={t.cartTitle}
      onClick={handleClose}
    >
      <div
        className="w-full max-w-lg bg-[#FDF9F7] h-full flex flex-col border-s border-[#EDD9DF] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 bg-white border-b border-[#EDD9DF] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => {
                  setFormError('');
                  setStep('cart');
                }}
                aria-label={t.cartTitle}
                className="p-2 -ms-2 rounded-lg text-[#573E49] hover:text-[#BE2B5B] hover:bg-[#F7E6EA] cursor-pointer"
              >
                <ArrowLeft className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
              </button>
            )}
            <h2 className="font-serif text-2xl font-semibold text-[#2C1D24]">
              {step === 'cart' && t.cartTitle}
              {step === 'checkout' && t.checkoutTitle}
              {step === 'confirmation' && t.confirmationTitle}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label={t.cancel}
            className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-[#573E49] hover:text-[#BE2B5B] hover:bg-[#F7E6EA] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: CART */}
        {step === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-[#F7E6EA] flex items-center justify-center text-[#BE2B5B] mb-4">
                    <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <p className="font-serif text-2xl font-semibold text-[#2C1D24]">
                    {t.emptyCartTitle}
                  </p>
                  <p className="mt-2 text-sm text-[#6B505B] max-w-xs">
                    {t.emptyCartDesc}
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-6 px-5 py-2.5 min-h-[42px] rounded-lg bg-[#BE2B5B] hover:bg-[#9E1F49] text-white text-sm font-medium cursor-pointer"
                  >
                    {t.exploreStore}
                  </button>
                </div>
              ) : (
                items.map(({ product, quantity }) => {
                  const localized = getLocalizedProduct(product, lang);
                  return (
                    <div
                      key={product.id}
                      className="flex gap-4 p-3.5 bg-white border border-[#EDD9DF] rounded-xl"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#FAF3F0] shrink-0">
                        <ResilientImage
                          src={product.imageUrl}
                          alt={localized.name}
                          style={getProductImageStyle(product)}
                          className={`w-full h-full object-cover ${
                            product.imagePosition || 'object-center'
                          }`}
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[11px] uppercase tracking-wider text-[#785C67]">
                              {getCategoryLabel(product.category, lang)}
                            </p>
                            <h3 className="font-serif text-base font-semibold text-[#2C1D24] leading-snug truncate max-w-[230px]">
                              {localized.name}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(product.id)}
                            aria-label={localized.name}
                            className="p-1.5 text-[#8B6D79] hover:text-[#BE2B5B] cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="mt-auto pt-2 flex items-center justify-between">
                          <div className="inline-flex items-center border border-[#E5C9D2] rounded-lg bg-[#FDF9F7]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(product.id, -1)}
                              aria-label="-"
                              className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center text-[#573E49] hover:text-[#BE2B5B] cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 text-xs font-semibold tabular-nums text-[#2C1D24]">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(product.id, 1)}
                              aria-label="+"
                              className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center text-[#573E49] hover:text-[#BE2B5B] cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="text-sm font-semibold text-[#2C1D24] tabular-nums">
                            {formatDzdLocalized(product.priceDzd * quantity, lang)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-[#EDD9DF] space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B505B]">{t.subtotalLabel}</span>
                  <span className="text-lg font-semibold text-[#2C1D24] tabular-nums">
                    {formatDzdLocalized(subtotalDzd, lang)}
                  </span>
                </div>
                <p className="text-xs text-[#785C67]">{t.shippingNoteCart}</p>
                <button
                  type="button"
                  onClick={() => setStep('checkout')}
                  className="w-full py-3.5 px-6 min-h-[46px] rounded-lg bg-[#BE2B5B] hover:bg-[#9E1F49] text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  {t.proceedCheckout}
                </button>
              </div>
            )}
          </>
        )}

        {/* STEP 2: CHECKOUT FORM */}
        {step === 'checkout' && (
          <form onSubmit={handleSubmitOrder} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {formError && (
                <div
                  role="alert"
                  className="p-3.5 rounded-lg bg-[#FDECEF] border border-[#E8A5B8] text-xs sm:text-sm text-[#8E2246] font-medium"
                >
                  {formError}
                </div>
              )}

              <div>
                <label
                  htmlFor="checkout-name"
                  className="block text-xs font-semibold text-[#2C1D24] mb-1.5"
                >
                  {t.fullNameLabel}
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={t.fullNamePlaceholder}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5C9D2] rounded-lg text-[#2C1D24] focus:outline-none focus:border-[#BE2B5B] focus:ring-1 focus:ring-[#BE2B5B]"
                />
              </div>

              <div>
                <label
                  htmlFor="checkout-phone"
                  className="block text-xs font-semibold text-[#2C1D24] mb-1.5"
                >
                  {t.phoneLabel}
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0550 12 34 56"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5C9D2] rounded-lg text-[#2C1D24] tabular-nums focus:outline-none focus:border-[#BE2B5B] focus:ring-1 focus:ring-[#BE2B5B]"
                />
                <p className="mt-1 text-[11px] text-[#785C67]">{t.phoneHint}</p>
              </div>

              {/* Delivery Mode */}
              <div>
                <span className="block text-xs font-semibold text-[#2C1D24] mb-2">
                  {t.deliveryModeLabel}
                </span>
                <div className="space-y-2">
                  <label
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      deliveryMode === 'domicile'
                        ? 'bg-[#F7E6EA]/70 border-[#BE2B5B]'
                        : 'bg-white border-[#E5C9D2] hover:border-[#C9A469]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="deliveryMode"
                        value="domicile"
                        checked={deliveryMode === 'domicile'}
                        onChange={() => setDeliveryMode('domicile')}
                        className="accent-[#BE2B5B]"
                      />
                      <Truck className="w-4 h-4 text-[#B99254]" />
                      <span className="text-sm font-medium text-[#2C1D24]">
                        {getDeliveryModeLabel('domicile', lang)}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-[#573E49] tabular-nums">
                      {formatDzdLocalized(calculateShippingFee(wilayaCode, 'domicile'), lang)}
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      deliveryMode === 'stop_desk'
                        ? 'bg-[#F7E6EA]/70 border-[#BE2B5B]'
                        : 'bg-white border-[#E5C9D2] hover:border-[#C9A469]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="deliveryMode"
                        value="stop_desk"
                        checked={deliveryMode === 'stop_desk'}
                        onChange={() => setDeliveryMode('stop_desk')}
                        className="accent-[#BE2B5B]"
                      />
                      <Building2 className="w-4 h-4 text-[#B99254]" />
                      <span className="text-sm font-medium text-[#2C1D24]">
                        {getDeliveryModeLabel('stop_desk', lang)}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-[#573E49] tabular-nums">
                      {formatDzdLocalized(calculateShippingFee(wilayaCode, 'stop_desk'), lang)}
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      deliveryMode === 'retrait'
                        ? 'bg-[#F7E6EA]/70 border-[#BE2B5B]'
                        : 'bg-white border-[#E5C9D2] hover:border-[#C9A469]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="deliveryMode"
                        value="retrait"
                        checked={deliveryMode === 'retrait'}
                        onChange={() => setDeliveryMode('retrait')}
                        className="accent-[#BE2B5B]"
                      />
                      <Store className="w-4 h-4 text-[#B99254]" />
                      <div>
                        <span className="block text-sm font-medium text-[#2C1D24]">
                          {t.storePickupShort}
                        </span>
                        <span className="block text-[11px] text-[#785C67]">
                          {t.storePickupSub}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#8E2246]">{t.freeLabel}</span>
                  </label>
                </div>
              </div>

              {/* Wilaya Selector */}
              {deliveryMode !== 'retrait' && (
                <div>
                  <label
                    htmlFor="checkout-wilaya"
                    className="block text-xs font-semibold text-[#2C1D24] mb-1.5"
                  >
                    {t.wilayaLabel}
                  </label>
                  <select
                    id="checkout-wilaya"
                    value={wilayaCode}
                    onChange={(e) => setWilayaCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5C9D2] rounded-lg text-[#2C1D24] focus:outline-none focus:border-[#BE2B5B] focus:ring-1 focus:ring-[#BE2B5B]"
                  >
                    {WILAYAS.map((w) => (
                      <option key={w.code} value={w.code}>
                        {w.code} — {w.name} (
                        {formatDzdLocalized(
                          deliveryMode === 'stop_desk' ? w.stopDeskFee : w.domicileFee,
                          lang
                        )}
                        )
                      </option>
                    ))}
                  </select>
                  <p className="mt-1.5 text-[11px] text-[#785C67] tabular-nums">
                    {t.delayLabel}{' '}
                    <span className="font-semibold text-[#2C1D24]">
                      {selectedWilaya.delaiJours}{' '}
                      {selectedWilaya.delaiJours > 1 ? t.dayPlural : t.daySingular}
                    </span>{' '}
                    · Zone {selectedWilaya.zone} · {t.freeReturn}
                  </p>
                </div>
              )}

              <div>
                <label
                  htmlFor="checkout-address"
                  className="block text-xs font-semibold text-[#2C1D24] mb-1.5"
                >
                  {deliveryMode === 'retrait' ? t.addressPickupLabel : t.addressLabel}
                </label>
                <input
                  id="checkout-address"
                  type="text"
                  required={deliveryMode !== 'retrait'}
                  value={communeAddress}
                  onChange={(e) => setCommuneAddress(e.target.value)}
                  placeholder={
                    deliveryMode === 'retrait'
                      ? t.addressPickupPlaceholder
                      : t.addressPlaceholder
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5C9D2] rounded-lg text-[#2C1D24] focus:outline-none focus:border-[#BE2B5B] focus:ring-1 focus:ring-[#BE2B5B]"
                />
              </div>

              {/* Payment method callout */}
              <div className="flex items-center gap-3 p-3.5 rounded-lg bg-[#FAF3F0] border border-[#E8D5DC]">
                <Banknote className="w-5 h-5 text-[#B99254] shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-[#2C1D24]">{t.codTitle}</p>
                  <p className="text-[11px] text-[#6B505B]">{t.codDesc}</p>
                </div>
              </div>
            </div>

            {/* Checkout Summary Footer */}
            <div className="p-6 bg-white border-t border-[#EDD9DF] space-y-2.5">
              <div className="flex justify-between text-xs text-[#6B505B]">
                <span>
                  {t.subtotalLabel} ({totalItemsCount}{' '}
                  {totalItemsCount > 1 ? t.articlePlural : t.articleSingular})
                </span>
                <span className="tabular-nums font-medium">
                  {formatDzdLocalized(subtotalDzd, lang)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-[#6B505B]">
                <span>
                  {t.shippingLabel} (
                  {deliveryMode === 'retrait'
                    ? t.storePickupShort
                    : `${selectedWilaya.code} - ${selectedWilaya.name}`}
                  )
                </span>
                <span className="tabular-nums font-medium">
                  {shippingFeeDzd === 0
                    ? t.freeLabel
                    : formatDzdLocalized(shippingFeeDzd, lang)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#F4E6EA] flex justify-between items-center">
                <span className="text-sm font-semibold text-[#2C1D24]">{t.totalToPay}</span>
                <span className="text-xl font-bold text-[#BE2B5B] tabular-nums">
                  {formatDzdLocalized(totalDzd, lang)}
                </span>
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-3.5 px-6 min-h-[46px] rounded-lg bg-[#BE2B5B] hover:bg-[#9E1F49] text-white text-sm font-medium transition-colors cursor-pointer"
              >
                {t.confirmOrder}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: THANK YOU RECEIPT */}
        {step === 'confirmation' && confirmedOrder && (
          <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-full bg-[#F7E6EA] text-[#BE2B5B] flex items-center justify-center mb-5">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-[#B99254]">
                {t.orderPrefix} {confirmedOrder.id}
              </p>
              <h3 className="mt-1 font-serif text-3xl font-semibold text-[#2C1D24]">
                {t.thankYou} {confirmedOrder.customerName} !
              </h3>
              <p className="mt-2 text-sm text-[#573E49] leading-relaxed">
                {t.orderSuccessPrefix}{' '}
                <strong className="font-semibold text-[#2C1D24] tabular-nums" dir="ltr">
                  {confirmedOrder.phone}
                </strong>{' '}
                {t.orderSuccessSuffix}
              </p>

              <div className="mt-6 p-5 bg-white border border-[#EDD9DF] rounded-xl space-y-4">
                <div className="pb-3 border-b border-[#F4E6EA] text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#785C67]">{t.receptionLabel}</span>
                    <span className="font-medium text-[#2C1D24]">
                      {getDeliveryModeLabel(confirmedOrder.deliveryMode, lang)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#785C67]">{t.destinationLabel}</span>
                    <span className="font-medium text-[#2C1D24] text-end">
                      {confirmedOrder.wilayaCode} — {confirmedOrder.wilayaName}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#785C67] shrink-0">{t.addressShortLabel}</span>
                    <span className="font-medium text-[#2C1D24] text-end">
                      {confirmedOrder.communeAddress}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#785C67]">{t.paymentLabel}</span>
                    <span className="font-medium text-[#2C1D24]">{t.codShort}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#785C67]">Stella Cosmetics</span>
                    <a
                      href="tel:0551129265"
                      dir="ltr"
                      className="font-medium text-[#BE2B5B] tabular-nums hover:underline"
                    >
                      0551 12 92 65
                    </a>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-[#2C1D24]">
                    {t.orderedItemsLabel}
                  </p>
                  {confirmedOrder.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex justify-between text-xs text-[#573E49]"
                    >
                      <span>
                        {item.quantity} × {item.name}
                      </span>
                      <span className="tabular-nums font-medium">
                        {formatDzdLocalized(item.priceDzd * item.quantity, lang)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#F4E6EA] space-y-1">
                  <div className="flex justify-between text-xs text-[#6B505B]">
                    <span>{t.shippingFeeLabel}</span>
                    <span className="tabular-nums">
                      {confirmedOrder.shippingFeeDzd === 0
                        ? t.freeLabel
                        : formatDzdLocalized(confirmedOrder.shippingFeeDzd, lang)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-[#2C1D24]">
                    <span>{t.totalDueLabel}</span>
                    <span className="text-[#BE2B5B] tabular-nums">
                      {formatDzdLocalized(confirmedOrder.totalDzd, lang)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="mt-8 w-full py-3.5 px-6 min-h-[46px] rounded-lg bg-[#BE2B5B] hover:bg-[#9E1F49] text-white text-sm font-medium transition-colors cursor-pointer"
            >
              {t.continueShopping}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
