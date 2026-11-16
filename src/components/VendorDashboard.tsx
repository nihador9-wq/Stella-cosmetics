import { useState, FormEvent } from 'react';
import {
  ArrowLeft,
  LogOut,
  Plus,
  Trash2,
  Pencil,
  Search,
  RotateCcw,
  Package,
  ClipboardList,
  X,
  Upload,
} from 'lucide-react';
import {
  Order,
  OrderStatus,
  Product,
  ProductBadge,
  ProductCategory,
} from '../types';
import { CATEGORIES, PRESET_IMAGE_OPTIONS } from '../data/initialData';
import { ResilientImage, getProductImageStyle } from './ResilientImage';
import {
  LANGUAGE_OPTIONS,
  Language,
  UI_TEXT,
  formatDzdLocalized,
  getBadgeLabel,
  getCategoryLabel,
  getDeliveryModeLabel,
  getLocalizedProduct,
  getOrderStatusLabel,
} from '../i18n';

interface VendorDashboardProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onResetDemoData: () => void;
  onBackToStore: () => void;
  onLogout: () => void;
}

const ORDER_STATUSES: OrderStatus[] = [
  'En attente',
  'Confirmée',
  'En livraison',
  'Livrée',
  'Annulée',
];

function getStatusClasses(status: OrderStatus): string {
  switch (status) {
    case 'En attente':
      return 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]';
    case 'Confirmée':
      return 'bg-[#E0F2FE] text-[#075985] border-[#BAE6FD]';
    case 'En livraison':
      return 'bg-[#FCE7F3] text-[#9D174D] border-[#FBCFE8]';
    case 'Livrée':
      return 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]';
    case 'Annulée':
      return 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]';
  }
}

export function VendorDashboard({
  lang,
  onChangeLang,
  products,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onResetDemoData,
  onBackToStore,
  onLogout,
}: VendorDashboardProps) {
  const t = UI_TEXT[lang];
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'Toutes'>('Toutes');
  const [orderSearch, setOrderSearch] = useState('');

  // Product Form State
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodCategory, setProdCategory] = useState<ProductCategory>('Coffrets');
  const [prodBadge, setProdBadge] = useState<ProductBadge>('Nouveau');
  const [prodVolume, setProdVolume] = useState('');
  const [prodImageUrl, setProdImageUrl] = useState(PRESET_IMAGE_OPTIONS[0].url);
  const [prodDescription, setProdDescription] = useState('');

  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'En attente').length;
  const estimatedRevenueDzd = orders
    .filter((o) => o.status !== 'Annulée')
    .reduce((sum, o) => sum + o.totalDzd, 0);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'Toutes' || order.status === statusFilter;
    const q = orderSearch.trim().toLowerCase();
    const matchesQuery =
      !q ||
      order.id.toLowerCase().includes(q) ||
      order.customerName.toLowerCase().includes(q) ||
      order.phone.toLowerCase().includes(q) ||
      order.wilayaName.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const resetForm = () => {
    setEditingProductId(null);
    setProdName('');
    setProdPrice('');
    setProdCategory('Coffrets');
    setProdBadge('Nouveau');
    setProdVolume('');
    setProdImageUrl(PRESET_IMAGE_OPTIONS[0].url);
    setProdDescription('');
    setShowProductForm(false);
  };

  const openCreateForm = () => {
    resetForm();
    setShowProductForm(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProductId(product.id);
    setProdName(product.name);
    setProdPrice(String(product.priceDzd));
    setProdCategory(product.category);
    setProdBadge(product.badge);
    setProdVolume(product.volume || '');
    setProdImageUrl(product.imageUrl);
    setProdDescription(product.description);
    setShowProductForm(true);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxSide = 900;
        let { width, height } = img;
        if (width > maxSide || height > maxSide) {
          if (width >= height) {
            height = Math.round((height * maxSide) / width);
            width = maxSide;
          } else {
            width = Math.round((width * maxSide) / height);
            height = maxSide;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          setProdImageUrl(canvas.toDataURL('image/jpeg', 0.82));
        }
      };
      if (typeof reader.result === 'string') {
        img.src = reader.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProduct = (e: FormEvent) => {
    e.preventDefault();
    const parsedPrice = Math.max(100, Number(prodPrice) || 0);
    if (!prodName.trim() || parsedPrice <= 0) return;

    if (editingProductId) {
      const existing = products.find((p) => p.id === editingProductId);
      const nextUrl = prodImageUrl.trim() || PRESET_IMAGE_OPTIONS[0].url;
      const keepCrop = existing && existing.imageUrl === nextUrl;
      onUpdateProduct({
        id: editingProductId,
        name: prodName.trim(),
        priceDzd: parsedPrice,
        category: prodCategory,
        badge: prodBadge,
        volume: prodVolume.trim() || undefined,
        imageUrl: nextUrl,
        ...(keepCrop
          ? {
              imagePosition: existing.imagePosition,
              imageObjectPosition: existing.imageObjectPosition,
              imageScale: existing.imageScale,
            }
          : {}),
        description:
          prodDescription.trim() ||
          'Stella Cosmetics.',
      });
    } else {
      onAddProduct({
        name: prodName.trim(),
        priceDzd: parsedPrice,
        category: prodCategory,
        badge: prodBadge,
        volume: prodVolume.trim() || undefined,
        imageUrl: prodImageUrl.trim() || PRESET_IMAGE_OPTIONS[0].url,
        description:
          prodDescription.trim() ||
          'Stella Cosmetics — Jolie Vue, Kouba.',
      });
    }
    resetForm();
  };

  const formatDate = (iso: string) => {
    try {
      const locale = lang === 'ar' ? 'ar-DZ' : lang === 'en' ? 'en-GB' : 'fr-DZ';
      return new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF5F3] text-[#2C1D24]">
      {/* Vendor Top Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#EDD9DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onBackToStore}
              className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-lg border border-[#E5C9D2] bg-[#FDF9F7] hover:bg-[#F7E6EA] text-xs font-medium text-[#2C1D24] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
              <span>{t.backToStore}</span>
            </button>
            <h1 className="font-serif text-lg sm:text-2xl font-semibold text-[#2C1D24] truncate">
              {t.vendorHeaderTitle}
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="inline-flex items-center p-0.5 bg-[#FAF3F0] border border-[#E5C9D2] rounded-lg">
              {LANGUAGE_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => onChangeLang(opt.code)}
                  className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                    lang === opt.code
                      ? 'bg-[#BE2B5B] text-white'
                      : 'text-[#6B505B] hover:text-[#2C1D24]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onResetDemoData}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-lg text-xs font-medium text-[#6B505B] hover:text-[#2C1D24] hover:bg-[#FAF3F0] whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.resetDemo}</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg bg-[#2C1D24] hover:bg-[#462F3A] text-white text-xs font-medium whitespace-nowrap cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.logout}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Quick Stats Row */}
        <section
          aria-label="Statistics"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div className="bg-white border border-[#EDD9DF] rounded-xl p-5">
            <p className="text-xs font-medium text-[#785C67]">{t.statTotalOrders}</p>
            <p className="mt-2 font-serif text-3xl font-semibold text-[#2C1D24] tabular-nums">
              {totalOrdersCount}
            </p>
            <p className="mt-1 text-xs text-[#6B505B]">{t.statTotalOrdersSub}</p>
          </div>

          <div className="bg-white border border-[#EDD9DF] rounded-xl p-5">
            <p className="text-xs font-medium text-[#785C67]">{t.statRevenue}</p>
            <p className="mt-2 font-serif text-3xl font-semibold text-[#BE2B5B] tabular-nums">
              {formatDzdLocalized(estimatedRevenueDzd, lang)}
            </p>
            <p className="mt-1 text-xs text-[#6B505B]">{t.statRevenueSub}</p>
          </div>

          <div className="bg-white border border-[#EDD9DF] rounded-xl p-5">
            <p className="text-xs font-medium text-[#785C67]">{t.statPending}</p>
            <p className="mt-2 font-serif text-3xl font-semibold text-[#2C1D24] tabular-nums">
              {pendingOrdersCount}
            </p>
            <p className="mt-1 text-xs text-[#6B505B]">{t.statPendingSub}</p>
          </div>

          <div className="bg-white border border-[#EDD9DF] rounded-xl p-5">
            <p className="text-xs font-medium text-[#785C67]">{t.statCatalog}</p>
            <p className="mt-2 font-serif text-3xl font-semibold text-[#2C1D24] tabular-nums">
              {products.length}
            </p>
            <p className="mt-1 text-xs text-[#6B505B]">{t.statCatalogSub}</p>
          </div>
        </section>

        {/* Section Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EDD9DF] pb-4">
          <div className="inline-flex items-center gap-1 p-1 bg-[#F2E3E8] rounded-lg">
            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-white text-[#2C1D24] shadow-xs'
                  : 'text-[#6B505B] hover:text-[#2C1D24]'
              }`}
            >
              <ClipboardList className="w-4 h-4 text-[#BE2B5B]" />
              <span>
                {t.tabOrders} ({orders.length})
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-white text-[#2C1D24] shadow-xs'
                  : 'text-[#6B505B] hover:text-[#2C1D24]'
              }`}
            >
              <Package className="w-4 h-4 text-[#BE2B5B]" />
              <span>
                {t.tabProducts} ({products.length})
              </span>
            </button>
          </div>

          {activeTab === 'products' && (
            <button
              type="button"
              onClick={openCreateForm}
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-lg bg-[#BE2B5B] hover:bg-[#9E1F49] text-white text-xs sm:text-sm font-medium whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addProductBtn}</span>
            </button>
          )}
        </div>

        {/* TAB 1: ORDERS TABLE */}
        {activeTab === 'orders' && (
          <section className="space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {(['Toutes', ...ORDER_STATUSES] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer border transition-colors ${
                      statusFilter === status
                        ? 'bg-[#BE2B5B] text-white border-[#BE2B5B]'
                        : 'bg-white text-[#573E49] border-[#E5C9D2] hover:bg-[#F7E6EA]'
                    }`}
                  >
                    {status === 'Toutes' ? t.allStatuses : getOrderStatusLabel(status, lang)}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-72">
                <Search className="w-4 h-4 text-[#8B6D79] absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder={t.searchOrdersPlaceholder}
                  className="w-full ps-9 pe-3 py-2 text-sm bg-white border border-[#E5C9D2] rounded-lg text-[#2C1D24] focus:outline-none focus:border-[#BE2B5B]"
                />
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="bg-white border border-[#EDD9DF] rounded-xl p-12 text-center">
                <p className="font-serif text-2xl font-semibold text-[#2C1D24]">
                  {t.noOrdersTitle}
                </p>
                <p className="mt-1.5 text-sm text-[#6B505B]">{t.noOrdersDesc}</p>
              </div>
            ) : (
              <div className="bg-white border border-[#EDD9DF] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-start border-collapse">
                    <thead>
                      <tr className="bg-[#FAF3F0] border-b border-[#EDD9DF] text-[11px] uppercase tracking-wider text-[#6B505B]">
                        <th className="py-3.5 px-4 font-semibold">{t.colOrder}</th>
                        <th className="py-3.5 px-4 font-semibold">{t.colClient}</th>
                        <th className="py-3.5 px-4 font-semibold">{t.colDelivery}</th>
                        <th className="py-3.5 px-4 font-semibold">{t.colItems}</th>
                        <th className="py-3.5 px-4 font-semibold text-end">{t.colTotal}</th>
                        <th className="py-3.5 px-4 font-semibold">{t.colStatus}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F4E6EA] text-sm">
                      {filteredOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-[#FDF9F7] transition-colors align-top"
                        >
                          <td className="py-4 px-4 whitespace-nowrap">
                            <p className="font-semibold text-[#2C1D24] tabular-nums">
                              {order.id}
                            </p>
                            <p className="text-xs text-[#785C67] mt-0.5 tabular-nums">
                              {formatDate(order.createdAt)}
                            </p>
                          </td>

                          <td className="py-4 px-4 whitespace-nowrap">
                            <p className="font-medium text-[#2C1D24]">{order.customerName}</p>
                            <p className="text-xs text-[#6B505B] tabular-nums mt-0.5" dir="ltr">
                              {order.phone}
                            </p>
                          </td>

                          <td className="py-4 px-4 min-w-[200px]">
                            <p className="font-medium text-[#2C1D24]">
                              {order.wilayaCode} — {order.wilayaName} ·{' '}
                              <span className="text-[#8E2246]">
                                {getDeliveryModeLabel(order.deliveryMode, lang)}
                              </span>
                            </p>
                            <p className="text-xs text-[#6B505B] mt-0.5 leading-snug">
                              {order.communeAddress}
                            </p>
                          </td>

                          <td className="py-4 px-4 min-w-[210px]">
                            <ul className="space-y-1 text-xs text-[#573E49]">
                              {order.items.map((item, idx) => (
                                <li key={`${order.id}-${idx}`}>
                                  <span className="font-semibold tabular-nums text-[#2C1D24]">
                                    {item.quantity}×
                                  </span>{' '}
                                  {item.name}
                                </li>
                              ))}
                            </ul>
                          </td>

                          <td className="py-4 px-4 text-end whitespace-nowrap">
                            <p className="font-semibold text-[#2C1D24] tabular-nums">
                              {formatDzdLocalized(order.totalDzd, lang)}
                            </p>
                            <p className="text-[11px] text-[#785C67] tabular-nums mt-0.5">
                              {order.shippingFeeDzd === 0
                                ? t.freeLabel
                                : formatDzdLocalized(order.shippingFeeDzd, lang)}
                            </p>
                          </td>

                          <td className="py-4 px-4 whitespace-nowrap">
                            <select
                              aria-label={order.id}
                              value={order.status}
                              onChange={(e) =>
                                onUpdateOrderStatus(order.id, e.target.value as OrderStatus)
                              }
                              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#BE2B5B] ${getStatusClasses(
                                order.status
                              )}`}
                            >
                              {ORDER_STATUSES.map((st) => (
                                <option key={st} value={st} className="bg-white text-[#2C1D24]">
                                  {getOrderStatusLabel(st, lang)}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <section className="space-y-6">
            {showProductForm && (
              <form
                onSubmit={handleSaveProduct}
                className="bg-white border border-[#EDD9DF] rounded-xl p-6 space-y-5"
              >
                <div className="flex items-center justify-between border-b border-[#F4E6EA] pb-3">
                  <h2 className="font-serif text-2xl font-semibold text-[#2C1D24]">
                    {editingProductId ? t.formEditTitle : t.formAddTitle}
                  </h2>
                  <button
                    type="button"
                    onClick={resetForm}
                    aria-label={t.cancel}
                    className="p-2 rounded-lg text-[#6B505B] hover:text-[#BE2B5B] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="prod-name"
                      className="block text-xs font-semibold text-[#2C1D24] mb-1.5"
                    >
                      {t.formProdName}
                    </label>
                    <input
                      id="prod-name"
                      type="text"
                      required
                      value={prodName}
                      onChange={(e) => setProdName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FDF9F7] border border-[#E5C9D2] rounded-lg focus:outline-none focus:border-[#BE2B5B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="prod-price"
                      className="block text-xs font-semibold text-[#2C1D24] mb-1.5"
                    >
                      {t.formProdPrice}
                    </label>
                    <input
                      id="prod-price"
                      type="number"
                      min={100}
                      step={50}
                      required
                      dir="ltr"
                      value={prodPrice}
                      onChange={(e) => setProdPrice(e.target.value)}
                      placeholder="2500"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FDF9F7] border border-[#E5C9D2] rounded-lg tabular-nums focus:outline-none focus:border-[#BE2B5B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="prod-category"
                      className="block text-xs font-semibold text-[#2C1D24] mb-1.5"
                    >
                      {t.formProdCat}
                    </label>
                    <select
                      id="prod-category"
                      value={prodCategory}
                      onChange={(e) => setProdCategory(e.target.value as ProductCategory)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FDF9F7] border border-[#E5C9D2] rounded-lg focus:outline-none focus:border-[#BE2B5B]"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {getCategoryLabel(c, lang)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="prod-badge"
                      className="block text-xs font-semibold text-[#2C1D24] mb-1.5"
                    >
                      {t.formProdBadge}
                    </label>
                    <select
                      id="prod-badge"
                      value={prodBadge}
                      onChange={(e) => setProdBadge(e.target.value as ProductBadge)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FDF9F7] border border-[#E5C9D2] rounded-lg focus:outline-none focus:border-[#BE2B5B]"
                    >
                      <option value="Nouveau">{getBadgeLabel('Nouveau', lang)}</option>
                      <option value="En stock">{getBadgeLabel('En stock', lang)}</option>
                      <option value="Location">{getBadgeLabel('Location', lang)}</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="prod-volume"
                      className="block text-xs font-semibold text-[#2C1D24] mb-1.5"
                    >
                      {t.formProdVol}
                    </label>
                    <input
                      id="prod-volume"
                      type="text"
                      value={prodVolume}
                      onChange={(e) => setProdVolume(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FDF9F7] border border-[#E5C9D2] rounded-lg focus:outline-none focus:border-[#BE2B5B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="prod-preset"
                      className="block text-xs font-semibold text-[#2C1D24] mb-1.5"
                    >
                      {t.formProdPreset}
                    </label>
                    <select
                      id="prod-preset"
                      value={
                        PRESET_IMAGE_OPTIONS.some((o) => o.url === prodImageUrl)
                          ? prodImageUrl
                          : ''
                      }
                      onChange={(e) => {
                        if (e.target.value) setProdImageUrl(e.target.value);
                      }}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FDF9F7] border border-[#E5C9D2] rounded-lg focus:outline-none focus:border-[#BE2B5B]"
                    >
                      <option value="">{t.formProdCustomUrl}</option>
                      {PRESET_IMAGE_OPTIONS.map((opt) => (
                        <option key={opt.label} value={opt.url}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="prod-image"
                    className="block text-xs font-semibold text-[#2C1D24] mb-1.5"
                  >
                    {t.formProdImgUrl}
                  </label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    {prodImageUrl && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#E5C9D2] bg-[#FAF3F0] shrink-0">
                        <ResilientImage
                          src={prodImageUrl}
                          alt={prodName || 'Aperçu'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <input
                      id="prod-image"
                      type="text"
                      dir="ltr"
                      value={prodImageUrl}
                      onChange={(e) => setProdImageUrl(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 text-sm bg-[#FDF9F7] border border-[#E5C9D2] rounded-lg focus:outline-none focus:border-[#BE2B5B]"
                    />
                    <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] rounded-lg border border-[#E5C9D2] bg-[#FAF3F0] hover:bg-[#F7E6EA] text-xs font-semibold text-[#2C1D24] whitespace-nowrap shrink-0 cursor-pointer">
                      <Upload className="w-4 h-4 text-[#BE2B5B]" />
                      <span>{t.uploadPhotoBtn}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="mt-1 text-[11px] text-[#785C67]">{t.uploadPhotoHint}</p>
                </div>

                <div>
                  <label
                    htmlFor="prod-desc"
                    className="block text-xs font-semibold text-[#2C1D24] mb-1.5"
                  >
                    {t.formProdDesc}
                  </label>
                  <textarea
                    id="prod-desc"
                    rows={3}
                    required
                    value={prodDescription}
                    onChange={(e) => setProdDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FDF9F7] border border-[#E5C9D2] rounded-lg focus:outline-none focus:border-[#BE2B5B]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2.5 min-h-[42px] rounded-lg border border-[#E5C9D2] text-sm font-medium text-[#573E49] hover:bg-[#FAF3F0] cursor-pointer"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 min-h-[42px] rounded-lg bg-[#BE2B5B] hover:bg-[#9E1F49] text-white text-sm font-medium cursor-pointer"
                  >
                    {editingProductId ? t.saveChanges : t.publishProduct}
                  </button>
                </div>
              </form>
            )}

            {/* Catalog List */}
            <div className="bg-white border border-[#EDD9DF] rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-start border-collapse">
                  <thead>
                    <tr className="bg-[#FAF3F0] border-b border-[#EDD9DF] text-[11px] uppercase tracking-wider text-[#6B505B]">
                      <th className="py-3.5 px-4 font-semibold">{t.colProduct}</th>
                      <th className="py-3.5 px-4 font-semibold">{t.colCategory}</th>
                      <th className="py-3.5 px-4 font-semibold">{t.colStatus}</th>
                      <th className="py-3.5 px-4 font-semibold text-end">{t.colPrice}</th>
                      <th className="py-3.5 px-4 font-semibold text-end">{t.colActions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4E6EA] text-sm">
                    {products.map((product) => {
                      const localized = getLocalizedProduct(product, lang);
                      return (
                        <tr key={product.id} className="hover:bg-[#FDF9F7]">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#FAF3F0] shrink-0">
                                <ResilientImage
                                  src={product.imageUrl}
                                  alt={localized.name}
                                  style={getProductImageStyle(product)}
                                  className={`w-full h-full object-cover ${
                                    product.imagePosition || 'object-center'
                                  }`}
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium text-[#2C1D24] truncate max-w-[260px]">
                                  {localized.name}
                                </p>
                                <p className="text-xs text-[#785C67] truncate max-w-[300px]">
                                  {localized.description}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap text-xs text-[#573E49]">
                            {getCategoryLabel(product.category, lang)}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span
                              className={`inline-block px-2.5 py-1 text-xs font-medium rounded border ${
                                product.badge === 'Nouveau'
                                  ? 'bg-[#FCE7F3] text-[#9D174D] border-[#FBCFE8]'
                                  : product.badge === 'Location'
                                    ? 'bg-[#2C1D24] text-[#FDF9F7] border-[#2C1D24]'
                                    : 'bg-[#FAF3F0] text-[#2C1D24] border-[#E5C9D2]'
                              }`}
                            >
                              {getBadgeLabel(product.badge, lang)}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-end whitespace-nowrap font-semibold tabular-nums text-[#2C1D24]">
                            {formatDzdLocalized(product.priceDzd, lang)}
                          </td>
                          <td className="py-3.5 px-4 text-end whitespace-nowrap">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => openEditForm(product)}
                                aria-label={localized.name}
                                className="p-2 rounded-lg text-[#573E49] hover:text-[#BE2B5B] hover:bg-[#F7E6EA] cursor-pointer"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => onDeleteProduct(product.id)}
                                aria-label={localized.name}
                                className="p-2 rounded-lg text-[#573E49] hover:text-[#B91C1C] hover:bg-[#FEE2E2] cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
