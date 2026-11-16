import { useEffect, useMemo, useState } from 'react';
import { Search, Sparkles, ArrowUpRight } from 'lucide-react';
import {
  CartItem,
  Order,
  OrderStatus,
  Product,
  ProductCategory,
} from './types';
import {
  CATEGORIES,
  INITIAL_ORDERS,
  INITIAL_PRODUCTS,
  REMOVED_SEEDED_ORDER_IDS,
  REMOVED_SEEDED_PRODUCT_IDS,
} from './data/initialData';
import {
  Language,
  SPACE_COPY,
  UI_TEXT,
  getCategoryLabel,
  getLocalizedProduct,
} from './i18n';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartCheckoutDrawer } from './components/CartCheckoutDrawer';
import { VendorAuthModal } from './components/VendorAuthModal';
import { VendorDashboard } from './components/VendorDashboard';
import { Footer } from './components/Footer';

const STORAGE_KEYS = {
  PRODUCTS: 'stella_cosmetics_products_v1',
  ORDERS: 'stella_cosmetics_orders_v1',
  CART: 'stella_cosmetics_cart_v1',
  SEED_VERSION: 'stella_cosmetics_seed_version',
  LANG: 'stella_cosmetics_lang_v1',
};

const CURRENT_SEED_VERSION = 'v5_16_coffrets_cropped';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function loadInitialLang(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    if (saved === 'fr' || saved === 'ar' || saved === 'en') {
      return saved;
    }
  } catch {
    // Ignore storage error
  }
  return 'fr';
}

function normalizeCategory(rawCategory: string): ProductCategory {
  if (rawCategory === 'Soins du visage') return 'Skin Care';
  if (rawCategory === 'Parfums') return 'Parfums & Brumes';
  if (rawCategory === 'Accessoires') return 'Maquillage';
  if (
    rawCategory === 'Coffrets' ||
    rawCategory === 'Skin Care' ||
    rawCategory === 'Maquillage' ||
    rawCategory === 'Parfums & Brumes' ||
    rawCategory === 'Location Box'
  ) {
    return rawCategory;
  }
  return 'Coffrets';
}

function loadInitialProducts(): Product[] {
  const stored = loadFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  try {
    const seedVer = localStorage.getItem(STORAGE_KEYS.SEED_VERSION);
    if (seedVer !== CURRENT_SEED_VERSION) {
      localStorage.setItem(STORAGE_KEYS.SEED_VERSION, CURRENT_SEED_VERSION);
      const userAndKeptProducts = stored
        .filter((p) => !REMOVED_SEEDED_PRODUCT_IDS.has(p.id))
        .map((p) => {
          const defaultMatch = INITIAL_PRODUCTS.find((d) => d.id === p.id);
          return {
            ...p,
            category: normalizeCategory(p.category),
            imagePosition: p.imagePosition || defaultMatch?.imagePosition,
            imageObjectPosition:
              p.imageObjectPosition || defaultMatch?.imageObjectPosition,
            imageScale: p.imageScale ?? defaultMatch?.imageScale,
          };
        });
      const existingIds = new Set(userAndKeptProducts.map((p) => p.id));
      const newDefaults = INITIAL_PRODUCTS.filter((p) => !existingIds.has(p.id));
      return [...userAndKeptProducts, ...newDefaults];
    }
  } catch {
    // Ignore storage errors
  }
  return stored.map((p) => ({
    ...p,
    category: normalizeCategory(p.category),
  }));
}

function loadInitialOrders(): Order[] {
  const stored = loadFromStorage<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  return stored.filter((o) => !REMOVED_SEEDED_ORDER_IDS.has(o.id));
}

export default function App() {
  const [lang, setLang] = useState<Language>(loadInitialLang);
  const [products, setProducts] = useState<Product[]>(loadInitialProducts);
  const [orders, setOrders] = useState<Order[]>(loadInitialOrders);
  const [cart, setCart] = useState<CartItem[]>(() =>
    loadFromStorage<CartItem[]>(STORAGE_KEYS.CART, [])
  );

  // Storefront UI State
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'Tous'>('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [isHeaderSearchOpen, setIsHeaderSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Vendor Space State
  const [isVendorAuthOpen, setIsVendorAuthOpen] = useState(false);
  const [isVendorAuthenticated, setIsVendorAuthenticated] = useState(false);
  const [viewMode, setViewMode] = useState<'store' | 'vendor'>('store');

  const t = UI_TEXT[lang];

  // Sync <html lang="" dir=""> and persist language preference
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem(STORAGE_KEYS.LANG, lang);
    } catch {
      // Ignore
    }
  }, [lang]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch {
      // Ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {
      // Ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  // Filtered products (matches against both base French and localized names/descriptions)
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCat =
        activeCategory === 'Tous' || p.category === activeCategory;
      if (!q) return matchesCat;
      const localized = getLocalizedProduct(p, lang);
      const matchesSearch =
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        localized.name.toLowerCase().includes(q) ||
        localized.description.toLowerCase().includes(q) ||
        getCategoryLabel(p.category, lang).toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [products, activeCategory, searchQuery, lang]);

  const showAllSpacesGrouped =
    activeCategory === 'Tous' && searchQuery.trim().length === 0;

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Order Submission Handler
  const handlePlaceOrder = (
    orderData: Omit<Order, 'id' | 'createdAt' | 'status'>
  ): Order => {
    const randomCode = Math.floor(2610 + Math.random() * 7000);
    const newOrder: Order = {
      ...orderData,
      id: `CMD-${randomCode}`,
      createdAt: new Date().toISOString(),
      status: 'En attente',
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    return newOrder;
  };

  // Vendor CRUD Handlers
  const handleOpenVendor = () => {
    if (isVendorAuthenticated) {
      setViewMode('vendor');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsVendorAuthOpen(true);
    }
  };

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...productData,
      id: `stella-${Date.now()}`,
    };
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === updated.id ? { ...item, product: updated } : item
      )
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const handleResetDemoData = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
  };

  const activeSpaceCopy =
    activeCategory !== 'Tous'
      ? SPACE_COPY.find((s) => s.category === activeCategory)
      : null;

  if (viewMode === 'vendor' && isVendorAuthenticated) {
    return (
      <VendorDashboard
        lang={lang}
        onChangeLang={setLang}
        products={products}
        orders={orders}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onResetDemoData={handleResetDemoData}
        onBackToStore={() => setViewMode('store')}
        onLogout={() => {
          setIsVendorAuthenticated(false);
          setViewMode('store');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF9F7] text-[#2C1D24]">
      <Header
        lang={lang}
        onChangeLang={setLang}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenVendor={handleOpenVendor}
        isSearchOpen={isHeaderSearchOpen}
        onToggleSearch={() => setIsHeaderSearchOpen((v) => !v)}
      />

      <main className="flex-1">
        <HeroSection
          lang={lang}
          onExploreCatalog={() => {
            const el = document.getElementById('catalogue');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          onOpenVendorMobile={handleOpenVendor}
        />

        {/* 5 Dedicated Spaces Overview Strip */}
        <section
          aria-label={t.spacesKicker}
          className="bg-white border-b border-[#EDD9DF]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {SPACE_COPY.map((space) => {
                const count = products.filter(
                  (p) => p.category === space.category
                ).length;
                const isSelected = activeCategory === space.category;
                return (
                  <button
                    key={space.category}
                    type="button"
                    onClick={() => {
                      setActiveCategory(space.category);
                      const el = document.getElementById('catalogue');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`group text-start p-4 rounded-xl border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE2B5B] ${
                      isSelected
                        ? 'bg-[#F7E6EA] border-[#BE2B5B]'
                        : 'bg-[#FAF3F0] border-[#EDD9DF] hover:border-[#C9A469]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-[#8E2246] font-medium">
                      <span className="tabular-nums">{space.code}.</span>
                      <ArrowUpRight
                        className={`w-3.5 h-3.5 text-[#B99254] opacity-75 group-hover:opacity-100 ${
                          lang === 'ar' ? '-rotate-90' : ''
                        }`}
                      />
                    </div>
                    <p className="mt-1.5 font-serif text-lg font-semibold text-[#2C1D24] leading-snug">
                      {space.shortLabel[lang]}
                    </p>
                    <p className="mt-0.5 text-xs text-[#785C67] tabular-nums">
                      {count} {count > 1 ? t.articlePlural : t.articleSingular}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Catalog & Dedicated Spaces Section */}
        <section
          id="catalogue"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#EDD9DF]">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#8E2246]">
                {t.spacesKicker}
              </p>
              <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold text-[#2C1D24]">
                {activeSpaceCopy ? activeSpaceCopy.title[lang] : t.allSpacesHeading}
              </h2>
              {activeSpaceCopy && (
                <p className="mt-2 text-sm text-[#6B505B] max-w-2xl">
                  {activeSpaceCopy.subtitle[lang]}
                </p>
              )}
            </div>

            {/* Inline Catalog Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#8B6D79] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchShortPlaceholder}
                aria-label={t.searchShortPlaceholder}
                className="w-full ps-10 pe-4 py-2.5 text-sm bg-white border border-[#E5C9D2] rounded-lg text-[#2C1D24] placeholder:text-[#9A7F8A] focus:outline-none focus:border-[#BE2B5B] focus:ring-1 focus:ring-[#BE2B5B]"
              />
            </div>
          </div>

          {/* Space Filter Tabs */}
          <div
            role="tablist"
            aria-label={t.spacesKicker}
            className="mt-6 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2"
          >
            {(['Tous', ...CATEGORIES] as const).map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 min-h-[40px] rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE2B5B] ${
                    isActive
                      ? 'bg-[#BE2B5B] text-white'
                      : 'bg-[#FAF3F0] text-[#573E49] hover:bg-[#F7E6EA] border border-[#E8D5DC]'
                  }`}
                >
                  {getCategoryLabel(cat, lang)}
                </button>
              );
            })}
          </div>

          {/* Grouped 5 Dedicated Spaces OR Filtered Grid */}
          {showAllSpacesGrouped ? (
            <div className="mt-10 space-y-12">
              {SPACE_COPY.map((space) => {
                const spaceProducts = products.filter(
                  (p) => p.category === space.category
                );

                return (
                  <div
                    key={space.category}
                    className="pt-8 first:pt-0 border-t first:border-t-0 border-[#EDD9DF]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                      <div>
                        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2C1D24]">
                          {space.code}. {space.title[lang]}
                        </h3>
                        <p className="mt-1 text-sm text-[#6B505B] max-w-2xl">
                          {space.subtitle[lang]}
                        </p>
                      </div>

                      {spaceProducts.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setActiveCategory(space.category)}
                          className="text-xs font-semibold text-[#BE2B5B] hover:text-[#9E1F49] whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-end"
                        >
                          {t.onlyThisSpace}
                        </button>
                      )}
                    </div>

                    {spaceProducts.length === 0 ? (
                      <div className="bg-[#FAF3F0] border border-dashed border-[#DFC1CB] rounded-xl px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <p className="text-sm text-[#6B505B]">{t.spaceEmptyNotice}</p>
                        <button
                          type="button"
                          onClick={handleOpenVendor}
                          className="px-4 py-2 min-h-[38px] rounded-lg border border-[#E5C9D2] bg-white hover:bg-[#F7E6EA] text-xs font-semibold text-[#BE2B5B] whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          {t.addFromVendor}
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {spaceProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            lang={lang}
                            product={product}
                            onAddToCart={(p) => handleAddToCart(p, 1)}
                            onQuickView={setQuickViewProduct}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="mt-10 bg-white border border-[#EDD9DF] rounded-xl p-12 text-center">
              <Sparkles className="w-6 h-6 text-[#B99254] mx-auto mb-3" />
              <h3 className="font-serif text-2xl font-semibold text-[#2C1D24]">
                {searchQuery.trim() ? t.noProductTitle : t.spaceEmptyNotice}
              </h3>
              <p className="mt-2 text-sm text-[#6B505B]">{t.noProductDesc}</p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleOpenVendor}
                  className="px-5 py-2.5 min-h-[42px] rounded-lg border border-[#E5C9D2] bg-[#FAF3F0] hover:bg-[#F7E6EA] text-[#2C1D24] text-sm font-medium cursor-pointer"
                >
                  {t.addFromVendor}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('Tous');
                    setSearchQuery('');
                  }}
                  className="px-5 py-2.5 min-h-[42px] rounded-lg bg-[#BE2B5B] hover:bg-[#9E1F49] text-white text-sm font-medium cursor-pointer"
                >
                  {t.seeAllSpaces}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  lang={lang}
                  product={product}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          )}
        </section>

        {/* Boutique Story / Mhiba, Khotba & Location Box Section */}
        <section className="bg-white border-t border-[#EDD9DF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <p className="text-xs font-medium uppercase tracking-wider text-[#B99254]">
                  {t.storyKicker}
                </p>
                <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#2C1D24] text-balance">
                  {t.storyHeading}
                </h2>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-[#573E49] leading-relaxed">
                <div className="p-5 rounded-xl bg-[#FAF3F0] border border-[#EDD9DF]">
                  <h3 className="font-serif text-xl font-semibold text-[#2C1D24] mb-2">
                    {t.storyCard1Title}
                  </h3>
                  <p>{t.storyCard1Desc}</p>
                </div>

                <div className="p-5 rounded-xl bg-[#FAF3F0] border border-[#EDD9DF]">
                  <h3 className="font-serif text-xl font-semibold text-[#2C1D24] mb-2">
                    {t.storyCard2Title}
                  </h3>
                  <p>{t.storyCard2Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} onOpenVendor={handleOpenVendor} />

      {/* Modals & Drawers */}
      <ProductQuickViewModal
        lang={lang}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartCheckoutDrawer
        lang={lang}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onPlaceOrder={handlePlaceOrder}
      />

      <VendorAuthModal
        lang={lang}
        isOpen={isVendorAuthOpen}
        onClose={() => setIsVendorAuthOpen(false)}
        onSuccess={() => {
          setIsVendorAuthOpen(false);
          setIsVendorAuthenticated(true);
          setViewMode('vendor');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
