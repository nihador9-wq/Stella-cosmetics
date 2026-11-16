import {
  DeliveryMode,
  OrderStatus,
  Product,
  ProductBadge,
  ProductCategory,
} from './types';

export type Language = 'fr' | 'ar' | 'en';

export const LANGUAGE_OPTIONS: { code: Language; label: string; nativeName: string }[] = [
  { code: 'fr', label: 'FR', nativeName: 'Français' },
  { code: 'ar', label: 'AR', nativeName: 'العربية' },
  { code: 'en', label: 'EN', nativeName: 'English' },
];

export interface LocalizedProductContent {
  name: string;
  description: string;
  volume?: string;
}

export const PRODUCT_TRANSLATIONS: Record<
  string,
  Partial<Record<Language, LocalizedProductContent>>
> = {
  'stella-coffret-rouge-11': {
    ar: {
      name: 'بوكس فاخرة « For You » روج باسيون',
      volume: 'بوكس متكاملة',
      description:
        'بوكس زجاجية أنيقة « For You » مزينة بشرائط الساتان الأحمر، مثالية للمهيبة أو الخطبة: حليب الجسم Amore، معطر الجسم Valeria Midnight Rose، عطر فاخر وماسك الشعر Color Vive.',
    },
    en: {
      name: 'Luxury "For You" Red Passion Gift Box',
      volume: 'Full gift box',
      description:
        'Glass display "For You" gift box adorned with crimson satin ribbons, ideal for Mhiba or Khotba: Amore body lotion, Valeria Midnight Rose mist, extrait de parfum, and Color Vive hair care.',
    },
  },
  'stella-coffret-rose-12': {
    ar: {
      name: 'بوكس المرآة الوردية « برينساس »',
      volume: 'بوكس مرآة',
      description:
        'بوكس مرآة فاخرة بتاج ذهبي: حليب الجسم Jardin de Rio، جل استحمام ومزيل عرق Dove، ماء عطر، منتجات Baby Powder AMK، صابون Lux Soft Rose ومقشر لامع.',
    },
    en: {
      name: 'Pink Mirror "Princess" Gift Box',
      volume: 'Mirror box',
      description:
        'Mirror-frame keepsake box topped with a golden crown: Jardin de Rio body lotion, Dove shower gel & deodorant, eau de parfum, Baby Powder AMK care, Lux Soft Rose soap, and shimmer scrub.',
    },
  },
  'stella-coffret-queen-rose-13': {
    ar: {
      name: 'بوكس القوس « كوين » بالورود البيضاء',
      volume: 'عناية بالجسم والشعر',
      description:
        'حامل قوس أبيض وذهبي « Queen » مزين بالورود البيضاء: حليب الجسم Seduction، مزيل عرق Rexona، لوشن الجسم Pharmamil فيتامين E 500 مل وثنائي L’Oréal Elseve.',
    },
    en: {
      name: 'White Roses "Queen" Arch Gift Box',
      volume: 'Body & Hair Care',
      description:
        'White & gold "Queen" arch display adorned with white roses: Seduction body lotion, Rexona deodorant, Pharmamil Vit E 500ml lotion, and L’Oréal Elseve Total Repair 5 duo.',
    },
  },
  'stella-coffret-senorita-14': {
    ar: {
      name: 'بوكس الفراشات « سينيوريتا » للعطور',
      volume: 'تشكيلة عطور فاخرة',
      description:
        'بوكس أكريليك مزينة بالفراشات « Señorita » بمقبض ذهبي: عطر Kayali Purple Shimmer، معطر Evoria Floral، عطر مستوحى من Prada، مزيل عرق وعطر Gissah One & Only.',
    },
    en: {
      name: 'Butterfly "Señorita" Perfume Box',
      volume: 'Luxury Fragrance Set',
      description:
        'Engraved butterfly acrylic "Señorita" box with golden handle: Kayali Purple Shimmer perfume, Evoria Floral mist, Prada-style scent, deodorant, and Gissah One & Only.',
    },
  },
  'stella-coffret-baby-powder-15': {
    ar: {
      name: 'بوكس الشريط الوردي « بيبي باودر باريس »',
      volume: 'روتين عناية متكامل',
      description:
        'بوكس زجاجية بشريط ساتان وردي: مجموعة Baby Powder Paris AMK الكاملة (معطر للجسم والشعر، لوشن، بخاخ منعش، صابون، رول أون) مع مقشر Gommage Magique.',
    },
    en: {
      name: 'Pink Ribbon "Baby Powder Paris" Box',
      volume: 'Complete Routine',
      description:
        'Satin pink ribbon acrylic box: full Baby Powder Paris AMK line (body & hair mist, lotion, spray, body soap, roll-on) paired with Gommage Magique scrub.',
    },
  },
  'stella-coffret-coeur-noir-16': {
    ar: {
      name: 'بوكس القلب الأسود « كوين » بالورود',
      volume: 'فكرة هدية',
      description:
        'بوكس قلب أسود « Queen » بالورود الوردية: شامبو Sunsilk الوردي، غسول Venus، كريم تجعيد الشعر Byphasse، مزيل عرق Flux، معطر جسم وكريم Vaseline.',
    },
    en: {
      name: 'Black Heart "Queen" Pink Roses Box',
      volume: 'Gift Idea',
      description:
        'Black heart-cutout "Queen" box with pastel roses: Sunsilk shampoo, Venus cleansing gel, Byphasse curls cream, Flux roll-on, body mist, and Vaseline care.',
    },
  },
  'stella-coffret-dove-vogue-17': {
    ar: {
      name: 'بوكس القوس « كوين » مجموعة دوف',
      volume: 'حجم كبير',
      description:
        'حامل قوس أبيض وذهبي « Queen » يضم تشكيلة Dove (جل استحمام، شامبو، مزيل عرق، صابون)، مقشر Vogue Secret Hydro Clean وكريم Natlyne.',
    },
    en: {
      name: '"Queen" Arch Dove Collection Box',
      volume: 'Grand Format',
      description:
        'White & gold "Queen" arch box filled with Dove essentials (shower gel, shampoo, deodorant, cream), Vogue Secret Hydro Clean scrub, and Natlyne deodorant cream.',
    },
  },
  'stella-coffret-garnier-miel-18': {
    ar: {
      name: 'بوكس المرآة « كوين » غارنييه بالعسل',
      volume: 'إشراقة وعناية بالشعر',
      description:
        'بوكس مرآة ذهبية « Queen »: ثلاثي Garnier Ultra Suave بالعسل، واقي شمس Dr. Rashel، قناع وجه Dermactifs، معطر Garranso ومقشر Pharmamil.',
    },
    en: {
      name: 'Mirror "Queen" Garnier Honey Box',
      volume: 'Glow & Hair Care',
      description:
        'Golden mirror "Queen" box: Garnier Ultra Suave Honey hair trio, Dr. Rashel sun cream, Dermactifs sheet mask, Garranso pistachio mist, and Pharmamil scrub.',
    },
  },
  'stella-coffret-foryou-ruby-19': {
    ar: {
      name: 'بوكس زجاجية « For You » مكياج روبي روز',
      volume: 'إصدار المكياج',
      description:
        'بوكس زجاجية « For You » بمقبض ذهبي: كريم أساس وبودرة Ruby Rose Soft Blend، بلاش وآيلاينر Farfasha، أحمر شفاه مخملي، فرشاة وجه ورولر مساج.',
    },
    en: {
      name: 'Glass "For You" Ruby Rose Makeup Box',
      volume: 'Makeup Edition',
      description:
        'Glass display "For You" box with golden handle: Ruby Rose Soft Blend foundation & compact, Farfasha blush & eyeliner, velvet lipstick, brush, and jade roller.',
    },
  },
  'stella-coffret-rouge-amore-20': {
    ar: {
      name: 'بوكس الشريط الأحمر « أموري وإلفيف »',
      volume: 'مهيبة وتجهيز',
      description:
        'بوكس أكريليك بقاعدة وشريط ساتان أحمر: حليب الجسم Garranso Amore، مجموعة L’Oréal Elvive Color Vive، بودرة ولوشن Enchanteur، مزيل عرق Rexona ومقشرات.',
    },
    en: {
      name: 'Red Ribbon "Amore & Elvive" Gift Box',
      volume: 'Mhiba & Trousseau',
      description:
        'Red-base acrylic ribbon box: Garranso Amore body lotion, L’Oréal Elvive Color Vive shampoo & mask, Enchanteur talc & lotion, Rexona, Calliderm scrub, and Gommage Magique.',
    },
  },
  'stella-coffret-dove-dolce-21': {
    ar: {
      name: 'بوكس القوس الماسي « كوين » ودولتشي',
      volume: 'عناية وعطر',
      description:
        'حامل قوس أبيض وذهبي بحلية ماسية: عطر مستوحى من D&G Light Blue Summer Vibes، منتجات Dove Secrets de Soin، مقشر Snowy Coco وليفة استحمام.',
    },
    en: {
      name: 'Diamond Arch "Queen" & Dolce Box',
      volume: 'Care & Perfume',
      description:
        'White & gold diamond-crest arch box: D&G Light Blue Summer Vibes style fragrance, Dove Secrets de Soin & Original roll-on, Snowy Coco scrub, and bath sponge.',
    },
  },
  'stella-coffret-gold-makeup-22': {
    ar: {
      name: 'بوكس القاعدة الذهبية « روبي روز وكيكو »',
      volume: 'طقم مكياج',
      description:
        'بوكس شفافة بقاعدة مرآة ذهبية وشريط أبيض: كريم أساس Ruby Rose Soft Blend، ماسكارا MaxImpact، إسفنجة Kiko Green Me، باليت بلاش، غلوس وطلاء أظافر.',
    },
    en: {
      name: 'Gold Base "Ruby Rose & Kiko" Makeup Box',
      volume: 'Makeup Set',
      description:
        'Clear acrylic box with mirrored gold tray and white ribbon: Ruby Rose Soft Blend foundation, MaxImpact mascara, Kiko Green Me puff, blush palette, glosses, and nail polish.',
    },
  },
  'stella-coffret-flux-panier-23': {
    ar: {
      name: 'سلة ذهبية « كوين » فلوكس كير',
      volume: '8 منتجات فلوكس كير',
      description:
        'سلة بيضاء وذهبية بمقبض « Queen » تضم مجموعة Flux Care: شامبو خالي من السلفات، بلسم، جل استحمام، حليب جسم، معطر، ماسك Glycolic Glow، صابون ومزيل عرق.',
    },
    en: {
      name: 'Golden Basket "Queen" Flux Care Set',
      volume: '8 Flux Care Essentials',
      description:
        'White & gold handled "Queen" basket filled with Flux Care Secret de Soin: sulfate-free shampoo, conditioner, shower gel, body lotion, mist, Glycolic Glow mask, soap, and roll-on.',
    },
  },
  'stella-coffret-mallette-violette-24': {
    ar: {
      name: 'حقيبة المكياج الفاخرة بالغطاء البنفسجي',
      volume: 'حقيبة مكياج ممتلئة',
      description:
        'حقيبة أكريليك بغطاء بنفسجي وقفل ذهبي: كريم أساس HudaBeauty 30H، بودرة Ruby Rose Flirt، ماء ميسيلار Venus، طقم فرش، غلوس، كريم Vaseline وطلاء أظافر.',
    },
    en: {
      name: 'Purple Lid Luxury Makeup Vanity Case',
      volume: 'Filled Vanity Case',
      description:
        'Acrylic vanity box with purple lid and gold clasp: HudaBeauty 30H foundation, Ruby Rose Flirt powder, Venus micellar water, brush set, gloss, Vaseline, and nail polish.',
    },
  },
  'stella-coffret-flux-colorfix-25': {
    ar: {
      name: 'بوكس « For You » للعناية بالشعر المصبوغ',
      volume: '4 منتجات أساسية',
      description:
        'بوكس بيضاء وذهبية « For You »: شامبو وماسك للشعر Flux Care Color Fix، ماء ميسيلار بالتوت البري وحمض الجليكوليك وصابون معطر.',
    },
    en: {
      name: '"For You" Color Fix Hair Care Box',
      volume: '4 Essentials',
      description:
        'White & gold "For You" display box: Flux Care Color Fix shampoo and hair mask for dyed hair, Cranberry glycolic micellar water, and Perle Rose scented soap.',
    },
  },
  'stella-coffret-foryou-nyx-26': {
    ar: {
      name: 'بوكس فاخرة « For You » مكياج الماركات العالمية',
      volume: 'ماركات احترافية',
      description:
        'بوكس كبيرة « For You » بمقبض ذهبي: آيلاينر NYX Epic Inky Stix، مثبت مكياج Sheglam، كريم أساس Bourjois Healthy Mix، بودرة Piové، إسفنجة Kiko، Topface وMax Factor.',
    },
    en: {
      name: 'Luxury "For You" Pro Brands Makeup Box',
      volume: 'Pro Brands Selection',
      description:
        'Large glass "For You" box with golden handle: NYX Epic Inky Stix, Sheglam setting spray, Bourjois Healthy Mix foundation, Piové powder, Kiko Green Me sponge, Topface & Max Factor.',
    },
  },
  'stella-coffret-flux-soin-27': {
    ar: {
      name: 'بوكس « For You » روتين الوجه والحماية من الشمس',
      volume: 'روتين العناية بالبشرة',
      description:
        'بوكس زجاجية « For You » بمقبض ذهبي تضم منتجات Flux Care: واقي شمس SPF 50+، غسول وجه بالتوت البري، ماسك Glycolic Glow، مقشر ومزيل عرق خالي من الألمنيوم.',
    },
    en: {
      name: '"For You" Skincare & Sun Routine Box',
      volume: 'Skincare Routine',
      description:
        'Glass "For You" box featuring Flux Care Secret de Soin: SPF 50+ sunscreen, Cranberry anti-aging face wash, Glycolic Glow mask, scrub, body lotion, and 0% aluminum roll-on.',
    },
  },
  'stella-coffret-dove-turquoise-28': {
    ar: {
      name: 'بوكس المرآة « كوين » دوف بالشرائط الفيروزية',
      volume: 'عناية ونعومة',
      description:
        'بوكس مرآة بيضاء وذهبية « Queen » بشرائط فيروزية: منتجات Dove Secrets de Soin باللافندر والأفوكادو، صابون بالخيار ومزيل عرق Go Fresh.',
    },
    en: {
      name: 'Turquoise Ribbon "Queen" Mirror Dove Box',
      volume: 'Gentle Body Care',
      description:
        'White & gold mirror "Queen" box tied with turquoise ribbons: Dove Secrets de Soin lavender & avocado care, cucumber soap bar, and Go Fresh deodorant.',
    },
  },
  'stella-coffret-10': {
    ar: {
      name: 'بوكس برستيج جولي فيو',
      volume: '3 مستحضرات أساسية',
      description:
        'علبة هدايا بشريط ساتان تحتوي على عطر ستيلا سينييتشر، سيروم الإشراق 30 مل وأحمر شفاه مخملي. مثالية للخطبة والهدايا الراقية.',
    },
    en: {
      name: 'Jolie Vue Prestige Gift Coffret',
      volume: '3 essentials',
      description:
        'Satin-ribbon keepsake box featuring Signature Eau de Parfum, 30 ml Radiance Serum, and Velvet Raspberry Lipstick. Ideal for engagements and gifting.',
    },
  },
  'stella-serum-02': {
    ar: {
      name: 'سيروم حمض الهيالورونيك النقي',
      volume: '30 مل',
      description:
        'تركيبة مركزة متعددة الجزيئات لترطيب عميق وإشراقة ممتلئة فورية. مناسب لجميع أنواع البشرة.',
    },
    en: {
      name: 'Pure Hyaluronic Acid Serum',
      volume: '30 ml',
      description:
        'Multi-molecular concentrated formula for deep hydration and an instant plumped glow. Suitable for all skin types.',
    },
  },
  'stella-creme-06': {
    ar: {
      name: 'كريم الإشراق بماء الورد',
      volume: '50 مل',
      description:
        'عناية يومية مخفوقة بماء الورد الدمشقي والنياسيناميد. ينعم ملمس البشرة ويعيد النضارة للبشرة الباهتة.',
    },
    en: {
      name: 'Rosewater Radiance Cream',
      volume: '50 ml',
      description:
        'Whipped daily moisturizer infused with Damask rose floral water and niacinamide to smooth texture and brighten dull skin.',
    },
  },
  'stella-gloss-01': {
    ar: {
      name: 'غلوس مكبر للشفاه روز نيكتار',
      volume: '7 مل',
      description:
        'ملمع شفاه بلمعان مرآة غني بالببتيدات ومستخلص الورد. ملمس مريح غير لزج بلون وردي شفاف.',
    },
    en: {
      name: 'Rose Nectar Plumping Lip Gloss',
      volume: '7 ml',
      description:
        'Mirror-shine lip gloss enriched with plumping peptides and rose extract. Cushion comfort, non-sticky translucent petal tint.',
    },
  },
  'stella-palette-03': {
    ar: {
      name: 'باليت ظلال العيون لوميير روزي',
      volume: '12 لوناً',
      description:
        'اثنا عشر لوناً متناغماً بين المات المخملي واللمعان الوردي الذهبي. ثبات عالٍ وألوان غنية.',
    },
    en: {
      name: 'Lumière Rosée Eyeshadow Palette',
      volume: '12 shades',
      description:
        'Twelve harmonious velvet-matte and champagne-rose shimmer shades with rich pigment payoff and minimal fallout.',
    },
  },
  'stella-blush-04': {
    ar: {
      name: 'بلاش سائل بيتال فيلور',
      volume: '15 مل',
      description:
        'قوام خفيف قابل للدمج يندمج مع البشرة ليمنحك إشراقة طبيعية مشرقة طوال اليوم.',
    },
    en: {
      name: 'Velvet Petal Liquid Blush',
      volume: '15 ml',
      description:
        'Weightless buildable formula that melts seamlessly into skin for a natural, luminous flush all day long.',
    },
  },
  'stella-huile-07': {
    ar: {
      name: 'زيت مغذي للشفاه بالتوت والورد',
      volume: '10 مل',
      description:
        'إكسير مغذٍ بزيوت التوت والجوجوبا لشفاه ناعمة، محمية وبلمسة وردية رقيقة.',
    },
    en: {
      name: 'Sweet Raspberry Lip Oil',
      volume: '10 ml',
      description:
        'Nourishing elixir with raspberry seed and jojoba oils for supple, protected, softly tinted lips.',
    },
  },
  'stella-pinceaux-09': {
    ar: {
      name: 'طقم 5 فرش مكياج للبودرة والوجه',
      volume: '5 قطع',
      description:
        'شعيرات اصطناعية فائقة النعومة وعالية الكثافة بمقابض وردية ولمسات ذهبية. مثالية للبودرة والبلاش والدمج.',
    },
    en: {
      name: '5-Piece Silk Face & Powder Brush Set',
      volume: '5 brushes',
      description:
        'Ultra-soft high-density vegan bristles with champagne-gold ferrules for powder, blush, and seamless blending.',
    },
  },
  'stella-parfum-08': {
    ar: {
      name: 'عطر أو دو بارفان ستيلا سينييتشر',
      volume: '100 مل',
      description:
        'عبق راقٍ يجمع بين البرغموت الذهبي والورد والياسمين والفانيليا العنبرية بثبات استثنائي.',
    },
    en: {
      name: 'Stella Signature Eau de Parfum',
      volume: '100 ml',
      description:
        'Refined signature trail blending golden bergamot, centifolia rose, jasmine, and warm amber vanilla.',
    },
  },
  'stella-brume-05': {
    ar: {
      name: 'معطر الجسم والشعر فلور دو سوا',
      volume: '100 مل',
      description:
        'رذاذ عطري رقيق بنفحات الفاوانيا المنعشة والليتشي والمسك الأبيض. مثالي للجسم والشعر.',
    },
    en: {
      name: 'Fleur de Soie Perfumed Body Mist',
      volume: '100 ml',
      description:
        'Delicate scented veil with notes of fresh peony, chilled lychee, and white musk for body and hair.',
    },
  },
  'stella-loc-box-01': {
    ar: {
      name: 'كراء بوكس زجاجية « For You » الذهبية',
      volume: 'كراء 72 ساعة',
      description:
        'كراء علبة العرض الزجاجية الفاخرة باللون الأسود والذهبي « For You » مع مقبض ذهبي وشرائط الساتان للمهيبة أو الخطبة أو الحنة (بدون منتجات). الاستلام في جولي فيو، القبة.',
    },
    en: {
      name: 'Rental Display Glass Box "For You" Gold',
      volume: '72h Rental',
      description:
        'Rental of the black & gold glass "For You" presentation box with golden handle and satin trim for Mhiba, Khotba, or henna ceremonies (empty display box). Pickup in Jolie Vue, Kouba.',
    },
  },
  'stella-loc-box-02': {
    ar: {
      name: 'كراء بوكس المرآة والتاج « برينساس »',
      volume: 'كراء 72 ساعة',
      description:
        'كراء بوكس المرآة المزينة بالتاج الذهبي لتقديم هدايا الخطبة أو المهيبة بطريقة فاخرة (صندوق فارغ للتزيين حسب رغبتك).',
    },
    en: {
      name: 'Rental Mirror Crown Box "Princess"',
      volume: '72h Rental',
      description:
        'Rental of the mirror-frame display box with golden crown and pink shred filler to present Khotba or engagement gifts (empty display box).',
    },
  },
};

export function getLocalizedProduct(product: Product, lang: Language): Product {
  if (lang === 'fr') return product;
  const tr = PRODUCT_TRANSLATIONS[product.id]?.[lang];
  if (!tr) return product;
  return {
    ...product,
    name: tr.name,
    description: tr.description,
    volume: tr.volume ?? product.volume,
  };
}

export function formatDzdLocalized(amount: number, lang: Language): string {
  const formatted = amount.toLocaleString('fr-DZ').replace(/\u202f|\u00a0/g, ' ');
  if (lang === 'ar') return `${formatted} دج`;
  return `${formatted} DA`;
}

export function getCategoryLabel(category: ProductCategory | 'Tous', lang: Language): string {
  const map: Record<ProductCategory | 'Tous', Record<Language, string>> = {
    Tous: { fr: 'Tous les espaces', ar: 'جميع الأقسام', en: 'All spaces' },
    Coffrets: { fr: 'Coffrets', ar: 'بوكسات وهدايا', en: 'Gift Boxes' },
    'Skin Care': { fr: 'Skin Care', ar: 'العناية بالبشرة', en: 'Skin Care' },
    Maquillage: { fr: 'Maquillage', ar: 'مكياج', en: 'Makeup' },
    'Parfums & Brumes': { fr: 'Parfums & Brumes', ar: 'عطور ومعطرات', en: 'Perfumes & Mists' },
    'Location Box': { fr: 'Location Box', ar: 'كراء البوكسات', en: 'Box Rentals' },
  };
  return map[category][lang];
}

export function getBadgeLabel(badge: ProductBadge, lang: Language): string {
  const map: Record<ProductBadge, Record<Language, string>> = {
    'En stock': { fr: 'En stock', ar: 'متوفر', en: 'In stock' },
    Nouveau: { fr: 'Nouveau', ar: 'جديد', en: 'New' },
    Location: { fr: 'Location', ar: 'للكراء', en: 'Rental' },
  };
  return map[badge][lang];
}

export function getOrderStatusLabel(status: OrderStatus, lang: Language): string {
  const map: Record<OrderStatus, Record<Language, string>> = {
    'En attente': { fr: 'En attente', ar: 'قيد الانتظار', en: 'Pending' },
    Confirmée: { fr: 'Confirmée', ar: 'مؤكدة', en: 'Confirmed' },
    'En livraison': { fr: 'En livraison', ar: 'قيد التوصيل', en: 'In delivery' },
    Livrée: { fr: 'Livrée', ar: 'تم التوصيل', en: 'Delivered' },
    Annulée: { fr: 'Annulée', ar: 'ملغاة', en: 'Cancelled' },
  };
  return map[status][lang];
}

export function getDeliveryModeLabel(mode: DeliveryMode, lang: Language): string {
  const map: Record<DeliveryMode, Record<Language, string>> = {
    domicile: {
      fr: 'Livraison à domicile',
      ar: 'التوصيل للمنزل',
      en: 'Home delivery',
    },
    stop_desk: {
      fr: 'Stop Desk / Bureau de livraison',
      ar: 'مكتب التوصيل (Stop Desk)',
      en: 'Stop Desk / Pickup office',
    },
    retrait: {
      fr: 'Retrait en boutique (Jolie Vue, Kouba)',
      ar: 'الاستلام من المحل (جولي فيو، القبة)',
      en: 'In-store pickup (Jolie Vue, Kouba)',
    },
  };
  return map[mode][lang];
}

export interface SpaceCopy {
  category: ProductCategory;
  code: string;
  title: Record<Language, string>;
  shortLabel: Record<Language, string>;
  subtitle: Record<Language, string>;
}

export const SPACE_COPY: SpaceCopy[] = [
  {
    category: 'Coffrets',
    code: '01',
    title: {
      fr: 'Espace Coffrets & Box Cadeaux',
      ar: 'فضاء البوكسات وهدايا المناسبات',
      en: 'Gift Coffrets & Special Boxes',
    },
    shortLabel: {
      fr: 'Coffrets',
      ar: 'بوكسات وهدايا',
      en: 'Gift Boxes',
    },
    subtitle: {
      fr: 'Compositions élégantes prêtes à offrir pour Mhiba, Khotba, mariage, anniversaire ou événement spécial.',
      ar: 'تشكيلات فاخرة جاهزة للإهداء للمهيبة، الخطبة، الأعراس والمناسبات السعيدة.',
      en: 'Curated ready-to-gift boxes for Mhiba, Khotba engagements, weddings, and special occasions.',
    },
  },
  {
    category: 'Skin Care',
    code: '02',
    title: {
      fr: 'Espace Skin Care',
      ar: 'فضاء العناية بالبشرة',
      en: 'Skin Care Space',
    },
    shortLabel: {
      fr: 'Skin Care',
      ar: 'العناية بالبشرة',
      en: 'Skin Care',
    },
    subtitle: {
      fr: 'Sérums, crèmes éclat et soins visage ciblés pour une peau hydratée, lumineuse et apaisée.',
      ar: 'سيرومات وكريمات نضارة وعناية مركزة لبشرة رطبة ومشرقة.',
      en: 'Targeted serums and glow creams for deeply hydrated, radiant, and soothed skin.',
    },
  },
  {
    category: 'Maquillage',
    code: '03',
    title: {
      fr: 'Espace Maquillage',
      ar: 'فضاء المكياج',
      en: 'Makeup Space',
    },
    shortLabel: {
      fr: 'Maquillage',
      ar: 'مكياج',
      en: 'Makeup',
    },
    subtitle: {
      fr: 'Gloss repulpants, palettes lumineuses, blushs velours, huiles à lèvres et pinceaux professionnels.',
      ar: 'غلوس للشفاه، باليت ظلال عيون، بلاش سائل، زيوت شفاه وفرش احترافية.',
      en: 'Plumping glosses, luminous palettes, velvet blushes, lip oils, and pro brush sets.',
    },
  },
  {
    category: 'Parfums & Brumes',
    code: '04',
    title: {
      fr: 'Espace Parfums & Brumes',
      ar: 'فضاء العطور والمعطرات',
      en: 'Perfumes & Body Mists',
    },
    shortLabel: {
      fr: 'Parfums & Brumes',
      ar: 'عطور ومعطرات',
      en: 'Perfumes & Mists',
    },
    subtitle: {
      fr: 'Eaux de parfum raffinées et brumes parfumées corps & cheveux aux sillages envoûtants.',
      ar: 'عطور راقية ومعطرات للجسم والشعر برائحة ساحرة وثبات طويل.',
      en: 'Refined eau de parfum and delicate body & hair mists with captivating trails.',
    },
  },
  {
    category: 'Location Box',
    code: '05',
    title: {
      fr: 'Espace Location Box',
      ar: 'فضاء كراء البوكسات',
      en: 'Display Box Rentals',
    },
    shortLabel: {
      fr: 'Location Box',
      ar: 'كراء البوكسات',
      en: 'Box Rentals',
    },
    subtitle: {
      fr: 'Box vitrées, miroirs couronne et présentoirs de cérémonie à louer pour sublimer vos cadeaux de Mhiba & Khotba.',
      ar: 'بوكسات زجاجية ومرايا فاخرة للكراء لتزيين وتقديم هدايا المهيبة والخطبة بأرقى حلة.',
      en: 'Glass and mirror crown display boxes available to rent for Mhiba, Khotba, and celebrations.',
    },
  },
];

export const UI_TEXT = {
  fr: {
    searchPlaceholder: 'Rechercher un coffret Mhiba, skin care, maquillage, parfum, location box...',
    searchShortPlaceholder: 'Rechercher un coffret, soin, box...',
    vendorSpace: 'Espace Vendeur',
    cart: 'Panier',
    heroBadgeTitle: 'Stella Cosmetics · Jolie Vue, Kouba',
    heroBadgeSub: 'Coffrets Mhiba, Khotba & Beauté',
    heroTitle: 'Coffrets cadeaux d’exception pour vos Mhiba, Khotba & moments précieux.',
    heroDesc:
      'Découvrez nos cinq univers à Jolie Vue, Kouba : coffrets et box cadeaux prêts à offrir, skin care, maquillage, parfums & brumes, ainsi que notre service de location de box de cérémonie. Livraison rapide vers les 58 wilayas.',
    heroCta: 'Découvrir nos espaces',
    trust1Title: 'Mhiba & Khotba',
    trust1Sub: 'Vente & location de box',
    trust2Title: 'Boutique à Kouba',
    trust2Sub: 'Retrait gratuit Jolie Vue',
    trust3Title: '58 Wilayas',
    trust3Sub: 'Paiement à la livraison',
    articleSingular: 'article',
    articlePlural: 'articles',
    spacesKicker: 'Stella Cosmetics · 5 Espaces dédiés',
    allSpacesHeading: 'Nos Univers Beauté & Coffrets',
    onlyThisSpace: 'Afficher uniquement cet espace →',
    noProductTitle: 'Aucun produit trouvé',
    noProductDesc: 'Essayez une autre recherche ou explorez tous les espaces Stella Cosmetics.',
    seeAllSpaces: 'Voir tous les espaces',
    addToCart: 'Ajouter au panier',
    added: 'Ajouté',
    reserveBox: 'Réserver la box',
    reserved: 'Réservée',
    storyKicker: 'Jolie Vue, Kouba · Alger',
    storyHeading: 'Coffrets Mhiba, Khotba & Location de Box sur mesure',
    storyCard1Title: 'Coffrets & Box Cadeaux',
    storyCard1Desc:
      'Nous préparons des coffrets complets remplis de soins, parfums et maquillage pour vos cérémonies de Mhiba, Khotba, mariages et cadeaux spéciaux, prêts à offrir avec rubans et finitions dorées.',
    storyCard2Title: 'Location de Box & Livraison 58 Wilayas',
    storyCard2Desc:
      'Louez nos box vitrées et présentoirs miroirs pour vos événements (retrait à Jolie Vue, Kouba), ou commandez vos articles partout en Algérie avec paiement à la livraison.',
    quickViewStore: 'Disponible en boutique à Jolie Vue, Kouba',
    quickViewDelivery: 'Livraison 58 wilayas · Paiement à la réception',
    cartTitle: 'Votre Panier',
    checkoutTitle: 'Finaliser la commande',
    confirmationTitle: 'Commande enregistrée',
    emptyCartTitle: 'Votre panier est vide',
    emptyCartDesc: 'Parcourez notre sélection de coffrets, soins, maquillage et location de box.',
    exploreStore: 'Explorer la boutique',
    subtotalLabel: 'Sous-total articles',
    shippingNoteCart:
      'Frais de livraison calculés à l’étape suivante selon votre wilaya (retrait gratuit à Jolie Vue, Kouba).',
    proceedCheckout: 'Passer la commande',
    fullNameLabel: 'Nom et prénom *',
    fullNamePlaceholder: 'Ex: Sarah Boudjemaa',
    phoneLabel: 'Numéro de téléphone (Algérie) *',
    phoneHint: 'Format 10 chiffres commençant par 05, 06 ou 07.',
    deliveryModeLabel: 'Mode de réception *',
    freeLabel: 'Gratuit',
    storePickupSub: 'Jolie Vue, Kouba, Alger',
    wilayaLabel: 'Wilaya (58 wilayas d’Algérie) *',
    delayLabel: 'Délai estimé :',
    daySingular: 'jour',
    dayPlural: 'jours',
    freeReturn: 'Retour gratuit',
    addressLabel: 'Commune / Adresse exacte *',
    addressPickupLabel: 'Remarque ou horaire de passage souhaité (optionnel)',
    addressPlaceholder: 'Ex: Kouba, Cité Jolie Vue, Bât B',
    addressPickupPlaceholder: 'Ex: Passage demain vers 15h',
    codTitle: 'Paiement à la livraison (Cash on Delivery)',
    codDesc: 'Réglez en espèces au livreur ou lors du retrait en boutique.',
    shippingLabel: 'Livraison',
    storePickupShort: 'Retrait boutique',
    totalToPay: 'Total à payer',
    confirmOrder: 'Confirmer la commande',
    errName: 'Veuillez saisir votre nom et prénom complets.',
    errPhone: 'Veuillez entrer un numéro algérien valide à 10 chiffres (ex: 0550 12 34 56).',
    errAddress: 'Veuillez préciser votre commune et adresse exacte de livraison.',
    orderPrefix: 'Commande',
    thankYou: 'Merci',
    orderSuccessPrefix: 'Votre commande a bien été enregistrée. Notre équipe à Jolie Vue, Kouba vous contactera très prochainement au',
    orderSuccessSuffix: 'pour la confirmation.',
    receptionLabel: 'Réception',
    destinationLabel: 'Destination',
    addressShortLabel: 'Adresse',
    paymentLabel: 'Paiement',
    codShort: 'Paiement à la livraison',
    orderedItemsLabel: 'Articles commandés',
    shippingFeeLabel: 'Frais de livraison',
    totalDueLabel: 'Total à régler',
    continueShopping: 'Continuer mes achats',
    footerDesc:
      'Coffrets & box cadeaux pour Mhiba, Khotba et événements spéciaux, skin care, maquillage, parfums & brumes, et location de box à Alger.',
    footerHoursTitle: 'Horaires d’ouverture',
    footerHours1: 'Samedi – Jeudi : 10h00 – 20h00',
    footerHours2: 'Vendredi : Fermé',
    footerDelivery: 'Livraison rapide vers les 58 wilayas d’Algérie · Paiement à la livraison',
    footerFollowTitle: 'Suivez Stella Cosmetics',
    footerFollowDesc: 'Nouveautés beauté, compositions Mhiba & Khotba et arrivages en boutique à Kouba.',
    footerPhoneLabel: 'Téléphone / Commande rapide :',
    footerVendorLink: 'Accès Espace Vendeur',
    vendorLoginDesc: 'Accédez à la gestion des commandes clients et du catalogue Stella Cosmetics.',
    vendorPasswordLabel: 'Mot de passe administrateur',
    vendorPasswordPlaceholder: 'Entrez le mot de passe',
    vendorHint: 'Indice de test :',
    vendorWrongPass: 'Mot de passe incorrect. Indice : stella2026',
    cancel: 'Annuler',
    login: 'Se connecter',
    vendorHeaderTitle: 'Stella Cosmetics · Espace Vendeur',
    backToStore: 'Boutique',
    resetDemo: 'Réinitialiser démo',
    logout: 'Déconnexion',
    statTotalOrders: 'Commandes totales',
    statTotalOrdersSub: 'Toutes périodes confondues',
    statRevenue: 'Chiffre d’affaires estimé',
    statRevenueSub: 'Hors commandes annulées',
    statPending: 'Commandes en attente',
    statPendingSub: 'À confirmer par téléphone',
    statCatalog: 'Produits au catalogue',
    statCatalogSub: 'En ligne sur la boutique',
    tabOrders: 'Commandes reçues',
    tabProducts: 'Produits',
    addProductBtn: 'Ajouter un produit',
    allStatuses: 'Toutes',
    searchOrdersPlaceholder: 'Rechercher N°, client, wilaya...',
    noOrdersTitle: 'Aucune commande correspondante',
    noOrdersDesc: 'Les nouvelles commandes passées depuis la boutique apparaîtront ici immédiatement.',
    colOrder: 'Commande',
    colClient: 'Client',
    colDelivery: 'Livraison & Wilaya',
    colItems: 'Produits commandés',
    colTotal: 'Total',
    colStatus: 'Statut',
    colProduct: 'Produit',
    colCategory: 'Catégorie',
    colPrice: 'Prix',
    colActions: 'Actions',
    formAddTitle: 'Ajouter un nouveau produit',
    formEditTitle: 'Modifier le produit',
    formProdName: 'Nom du produit *',
    formProdPrice: 'Prix en DZD *',
    formProdCat: 'Catégorie *',
    formProdBadge: 'Badge disponibilité',
    formProdVol: 'Contenance / Format (optionnel)',
    formProdPreset: 'Visuel studio suggéré',
    formProdCustomUrl: 'URL personnalisée ci-dessous',
    formProdImgUrl: 'URL de l’image',
    formProdDesc: 'Description *',
    saveChanges: 'Enregistrer les modifications',
    publishProduct: 'Publier dans la boutique',
    spaceEmptyNotice: 'Aucun article publié pour le moment dans cet espace.',
    addFromVendor: 'Ajouter un article (Espace Vendeur)',
    uploadPhotoBtn: 'Importer une photo',
    uploadPhotoHint: 'Depuis votre téléphone ou ordinateur (ou collez un lien image)',
  },
  ar: {
    searchPlaceholder: 'ابحثي عن بوكس مهيبة، عناية بالبشرة، مكياج، عطر، كراء بوكس...',
    searchShortPlaceholder: 'ابحثي عن بوكس، عناية، عطر...',
    vendorSpace: 'فضاء البائع',
    cart: 'السلة',
    heroBadgeTitle: 'ستيلا كوزميتيكس · جولي فيو، القبة',
    heroBadgeSub: 'بوكسات المهيبة، الخطبة والجمال',
    heroTitle: 'بوكسات وهدايا فاخرة لمناسبات المهيبة، الخطبة وأجمل لحظاتكم.',
    heroDesc:
      'اكتشفي فضاءاتنا الخمسة في جولي فيو، القبة: بوكسات وهدايا جاهزة، عناية بالبشرة، مكياج، عطور ومعطرات، وخدمة كراء البوكسات للمناسبات. توصيل سريع لـ 58 ولاية.',
    heroCta: 'اكتشفي فضاءاتنا',
    trust1Title: 'مهيبة وخطبة',
    trust1Sub: 'بيع وكراء البوكسات',
    trust2Title: 'محلنا بالقبة',
    trust2Sub: 'استلام مجاني بجولي فيو',
    trust3Title: '58 ولاية',
    trust3Sub: 'الدفع عند الاستلام',
    articleSingular: 'منتج',
    articlePlural: 'منتجات',
    spacesKicker: 'ستيلا كوزميتيكس · 5 فضاءات مخصصة',
    allSpacesHeading: 'عوالم الجمال والبوكسات',
    onlyThisSpace: 'عرض هذا الفضاء فقط ←',
    noProductTitle: 'لم يتم العثور على منتجات',
    noProductDesc: 'جربي كلمة بحث أخرى أو تصفحي جميع أقسام ستيلا كوزميتيكس.',
    seeAllSpaces: 'عرض جميع الفضاءات',
    addToCart: 'أضيفي إلى السلة',
    added: 'تمت الإضافة',
    reserveBox: 'احجزي البوكس',
    reserved: 'تم الحجز',
    storyKicker: 'جولي فيو، القبة · الجزائر',
    storyHeading: 'بوكسات المهيبة والخطبة وكراء صناديق العرض حسب الطلب',
    storyCard1Title: 'بوكسات وهدايا المناسبات',
    storyCard1Desc:
      'نحضر لكِ بوكسات متكاملة مليئة بمنتجات العناية، العطور والمكياج لحفلات المهيبة، الخطبة، الأعراس والهدايا الخاصة بتغليف أنيق وشرائط ذهبية.',
    storyCard2Title: 'كراء البوكسات والتوصيل لـ 58 ولاية',
    storyCard2Desc:
      'استأجري صناديق العرض الزجاجية والمرايا المزينة لمناسباتك (الاستلام من جولي فيو، القبة)، أو اطلبي منتجاتنا مع التوصيل لجميع ولايات الجزائر والدفع عند الاستلام.',
    quickViewStore: 'متوفر في المحل بجولي فيو، القبة',
    quickViewDelivery: 'توصيل 58 ولاية · الدفع عند الاستلام',
    cartTitle: 'سلة المشتريات',
    checkoutTitle: 'إتمام الطلب',
    confirmationTitle: 'تم تسجيل الطلب',
    emptyCartTitle: 'سلتك فارغة حالياً',
    emptyCartDesc: 'تصفحي مجموعتنا من البوكسات، العناية بالبشرة، المكياج وكراء صناديق العرض.',
    exploreStore: 'تصفحي المتجر',
    subtotalLabel: 'المجموع الفرعي',
    shippingNoteCart:
      'تُحسب تكلفة التوصيل في الخطوة التالية حسب ولايتك (استلام مجاني من المحل بجولي فيو، القبة).',
    proceedCheckout: 'متابعة الطلب',
    fullNameLabel: 'الاسم واللقب *',
    fullNamePlaceholder: 'مثال: سارة بوجمعة',
    phoneLabel: 'رقم الهاتف (الجزائر) *',
    phoneHint: 'رقم من 10 أرقام يبدأ بـ 05 أو 06 أو 07.',
    deliveryModeLabel: 'طريقة الاستلام *',
    freeLabel: 'مجاني',
    storePickupSub: 'جولي فيو، القبة، الجزائر',
    wilayaLabel: 'الولاية (58 ولاية جزائرية) *',
    delayLabel: 'المدة المقدرة:',
    daySingular: 'يوم',
    dayPlural: 'أيام',
    freeReturn: 'إرجاع مجاني',
    addressLabel: 'البلدية / العنوان الدقيق *',
    addressPickupLabel: 'ملاحظة أو وقت الاستلام المفضل (اختياري)',
    addressPlaceholder: 'مثال: القبة، حي جولي فيو',
    addressPickupPlaceholder: 'مثال: المرور غداً على الساعة 15:00',
    codTitle: 'الدفع عند الاستلام',
    codDesc: 'ادفعي نقداً لموزع البريد أو عند الاستلام من المحل.',
    shippingLabel: 'التوصيل',
    storePickupShort: 'استلام من المحل',
    totalToPay: 'المبلغ الإجمالي',
    confirmOrder: 'تأكيد الطلب',
    errName: 'يرجى إدخال الاسم واللقب كاملين.',
    errPhone: 'يرجى إدخال رقم هاتف جزائري صحيح من 10 أرقام (مثال: 0550 12 34 56).',
    errAddress: 'يرجى تحديد البلدية والعنوان الدقيق للتوصيل.',
    orderPrefix: 'الطلب رقم',
    thankYou: 'شكراً لكِ',
    orderSuccessPrefix: 'تم تسجيل طلبك بنجاح. سيتصل بك فريقنا في جولي فيو، القبة قريباً على الرقم',
    orderSuccessSuffix: 'لتأكيد الطلب.',
    receptionLabel: 'طريقة الاستلام',
    destinationLabel: 'الوجهة',
    addressShortLabel: 'العنوان',
    paymentLabel: 'الدفع',
    codShort: 'الدفع عند الاستلام',
    orderedItemsLabel: 'المنتجات المطلوبة',
    shippingFeeLabel: 'رسوم التوصيل',
    totalDueLabel: 'الإجمالي المطلوب',
    continueShopping: 'مواصلة التسوق',
    footerDesc:
      'بوكسات وهدايا المهيبة والخطبة، العناية بالبشرة، المكياج، العطور والمعطرات وكراء البوكسات في الجزائر.',
    footerHoursTitle: 'أوقات العمل',
    footerHours1: 'السبت – الخميس: 10:00 – 20:00',
    footerHours2: 'الجمعة: مغلق',
    footerDelivery: 'توصيل سريع لـ 58 ولاية جزائرية · الدفع عند الاستلام',
    footerFollowTitle: 'تابعي ستيلا كوزميتيكس',
    footerFollowDesc: 'أحدث المنتجات، تشكيلات المهيبة والخطبة والوافد الجديد بالمحل.',
    footerPhoneLabel: 'الهاتف / الطلب السريع:',
    footerVendorLink: 'الدخول إلى فضاء البائع',
    vendorLoginDesc: 'إدارة طلبات الزبائن وكتالوج منتجات ستيلا كوزميتيكس.',
    vendorPasswordLabel: 'كلمة مرور الإدارة',
    vendorPasswordPlaceholder: 'أدخلي كلمة المرور',
    vendorHint: 'كلمة المرور التجريبية:',
    vendorWrongPass: 'كلمة المرور غير صحيحة. التلميح: stella2026',
    cancel: 'إلغاء',
    login: 'دخول',
    vendorHeaderTitle: 'ستيلا كوزميتيكس · فضاء البائع',
    backToStore: 'المتجر',
    resetDemo: 'استعادة البيانات',
    logout: 'تسجيل الخروج',
    statTotalOrders: 'إجمالي الطلبات',
    statTotalOrdersSub: 'جميع الفترات',
    statRevenue: 'رقم الأعمال المقدر',
    statRevenueSub: 'باستثناء الطلبات الملغاة',
    statPending: 'طلبات قيد الانتظار',
    statPendingSub: 'بانتظار التأكيد الهاتفي',
    statCatalog: 'منتجات المتجر',
    statCatalogSub: 'منشورة في المتجر',
    tabOrders: 'الطلبات المستلمة',
    tabProducts: 'المنتجات',
    addProductBtn: 'إضافة منتج',
    allStatuses: 'الكل',
    searchOrdersPlaceholder: 'بحث برقم الطلب، الزبونة، الولاية...',
    noOrdersTitle: 'لا توجد طلبات مطابقة',
    noOrdersDesc: 'ستظهر الطلبات الجديدة المرسلة من المتجر هنا فوراً.',
    colOrder: 'الطلب',
    colClient: 'الزبونة',
    colDelivery: 'التوصيل والولاية',
    colItems: 'المنتجات المطلوبة',
    colTotal: 'المجموع',
    colStatus: 'الحالة',
    colProduct: 'المنتج',
    colCategory: 'القسم',
    colPrice: 'السعر',
    colActions: 'إجراءات',
    formAddTitle: 'إضافة منتج جديد',
    formEditTitle: 'تعديل المنتج',
    formProdName: 'اسم المنتج *',
    formProdPrice: 'السعر بالدينار (دج) *',
    formProdCat: 'القسم *',
    formProdBadge: 'حالة التوفر',
    formProdVol: 'الحجم / السعة (اختياري)',
    formProdPreset: 'صورة مقترحة',
    formProdCustomUrl: 'رابط مخصص أدناه',
    formProdImgUrl: 'رابط الصورة',
    formProdDesc: 'الوصف *',
    saveChanges: 'حفظ التعديلات',
    publishProduct: 'نشر في المتجر',
    spaceEmptyNotice: 'لا توجد منتجات منشورة حالياً في هذا الفضاء.',
    addFromVendor: 'إضافة منتج (فضاء البائع)',
    uploadPhotoBtn: 'رفع صورة',
    uploadPhotoHint: 'من هاتفك أو حاسوبك (أو الصقي رابط الصورة)',
  },
  en: {
    searchPlaceholder: 'Search Mhiba gift boxes, skin care, makeup, perfumes, box rentals...',
    searchShortPlaceholder: 'Search gift boxes, care, rentals...',
    vendorSpace: 'Vendor Space',
    cart: 'Bag',
    heroBadgeTitle: 'Stella Cosmetics · Jolie Vue, Kouba',
    heroBadgeSub: 'Mhiba, Khotba & Beauty Gift Boxes',
    heroTitle: 'Exquisite gift boxes for Mhiba, Khotba & your special moments.',
    heroDesc:
      'Explore our five dedicated spaces in Jolie Vue, Kouba: ready-to-gift boxes, skin care, makeup, perfumes & mists, plus ceremonial display box rentals. Fast delivery across all 58 Algerian wilayas.',
    heroCta: 'Explore our spaces',
    trust1Title: 'Mhiba & Khotba',
    trust1Sub: 'Gift boxes & rentals',
    trust2Title: 'Kouba Boutique',
    trust2Sub: 'Free pickup in Jolie Vue',
    trust3Title: '58 Wilayas',
    trust3Sub: 'Cash on delivery',
    articleSingular: 'item',
    articlePlural: 'items',
    spacesKicker: 'Stella Cosmetics · 5 Dedicated Spaces',
    allSpacesHeading: 'Our Beauty & Gift Universes',
    onlyThisSpace: 'View only this space →',
    noProductTitle: 'No products found',
    noProductDesc: 'Try another search or browse all Stella Cosmetics spaces.',
    seeAllSpaces: 'View all spaces',
    addToCart: 'Add to bag',
    added: 'Added',
    reserveBox: 'Reserve box',
    reserved: 'Reserved',
    storyKicker: 'Jolie Vue, Kouba · Algiers',
    storyHeading: 'Bespoke Mhiba, Khotba Gift Boxes & Display Rentals',
    storyCard1Title: 'Gift Coffrets & Boxes',
    storyCard1Desc:
      'We curate complete boxes filled with skin care, perfumes, and makeup for Mhiba, Khotba engagements, weddings, and celebrations—wrapped with satin ribbons and golden details.',
    storyCard2Title: 'Box Rentals & 58-Wilaya Delivery',
    storyCard2Desc:
      'Rent our glass and mirror display boxes for your events (pickup in Jolie Vue, Kouba), or order online with nationwide shipping across Algeria and cash on delivery.',
    quickViewStore: 'Available in-store at Jolie Vue, Kouba',
    quickViewDelivery: '58-wilaya delivery · Cash on delivery',
    cartTitle: 'Your Bag',
    checkoutTitle: 'Complete your order',
    confirmationTitle: 'Order confirmed',
    emptyCartTitle: 'Your bag is empty',
    emptyCartDesc: 'Browse our curated gift boxes, skin care, makeup, perfumes, and rental displays.',
    exploreStore: 'Explore boutique',
    subtotalLabel: 'Items subtotal',
    shippingNoteCart:
      'Shipping fee calculated in the next step by wilaya (free pickup in Jolie Vue, Kouba).',
    proceedCheckout: 'Proceed to checkout',
    fullNameLabel: 'Full name *',
    fullNamePlaceholder: 'e.g. Sarah Boudjemaa',
    phoneLabel: 'Phone number (Algeria) *',
    phoneHint: '10-digit number starting with 05, 06, or 07.',
    deliveryModeLabel: 'Delivery method *',
    freeLabel: 'Free',
    storePickupSub: 'Jolie Vue, Kouba, Algiers',
    wilayaLabel: 'Wilaya (58 Algerian provinces) *',
    delayLabel: 'Estimated delivery:',
    daySingular: 'day',
    dayPlural: 'days',
    freeReturn: 'Free return',
    addressLabel: 'Municipality / Exact address *',
    addressPickupLabel: 'Note or preferred pickup time (optional)',
    addressPlaceholder: 'e.g. Kouba, Cité Jolie Vue, Bldg B',
    addressPickupPlaceholder: 'e.g. Pickup tomorrow around 3 PM',
    codTitle: 'Cash on Delivery',
    codDesc: 'Pay in cash to the courier or upon pickup at our boutique.',
    shippingLabel: 'Shipping',
    storePickupShort: 'Store pickup',
    totalToPay: 'Total due',
    confirmOrder: 'Confirm order',
    errName: 'Please enter your full name.',
    errPhone: 'Please enter a valid 10-digit Algerian phone number (e.g. 0550 12 34 56).',
    errAddress: 'Please provide your municipality and exact delivery address.',
    orderPrefix: 'Order',
    thankYou: 'Thank you',
    orderSuccessPrefix: 'Your order has been saved. Our team in Jolie Vue, Kouba will call you shortly at',
    orderSuccessSuffix: 'to confirm.',
    receptionLabel: 'Method',
    destinationLabel: 'Destination',
    addressShortLabel: 'Address',
    paymentLabel: 'Payment',
    codShort: 'Cash on Delivery',
    orderedItemsLabel: 'Ordered items',
    shippingFeeLabel: 'Shipping fee',
    totalDueLabel: 'Total due',
    continueShopping: 'Continue shopping',
    footerDesc:
      'Gift boxes for Mhiba, Khotba & special events, skin care, makeup, perfumes & mists, and display box rentals in Algiers.',
    footerHoursTitle: 'Opening hours',
    footerHours1: 'Saturday – Thursday: 10:00 – 20:00',
    footerHours2: 'Friday: Closed',
    footerDelivery: 'Fast delivery across all 58 wilayas · Cash on delivery',
    footerFollowTitle: 'Follow Stella Cosmetics',
    footerFollowDesc: 'Beauty arrivals, Mhiba & Khotba gift boxes, and in-store updates in Kouba.',
    footerPhoneLabel: 'Phone / Quick order:',
    footerVendorLink: 'Vendor Dashboard Access',
    vendorLoginDesc: 'Manage customer orders and the Stella Cosmetics product catalog.',
    vendorPasswordLabel: 'Administrator password',
    vendorPasswordPlaceholder: 'Enter password',
    vendorHint: 'Demo password:',
    vendorWrongPass: 'Incorrect password. Hint: stella2026',
    cancel: 'Cancel',
    login: 'Sign in',
    vendorHeaderTitle: 'Stella Cosmetics · Vendor Dashboard',
    backToStore: 'Storefront',
    resetDemo: 'Reset demo',
    logout: 'Sign out',
    statTotalOrders: 'Total orders',
    statTotalOrdersSub: 'All time',
    statRevenue: 'Estimated revenue',
    statRevenueSub: 'Excluding cancelled orders',
    statPending: 'Pending orders',
    statPendingSub: 'Awaiting phone confirmation',
    statCatalog: 'Catalog items',
    statCatalogSub: 'Live on storefront',
    tabOrders: 'Received orders',
    tabProducts: 'Products',
    addProductBtn: 'Add product',
    allStatuses: 'All',
    searchOrdersPlaceholder: 'Search order #, client, wilaya...',
    noOrdersTitle: 'No matching orders',
    noOrdersDesc: 'New orders placed on the storefront will appear here immediately.',
    colOrder: 'Order',
    colClient: 'Customer',
    colDelivery: 'Delivery & Wilaya',
    colItems: 'Ordered items',
    colTotal: 'Total',
    colStatus: 'Status',
    colProduct: 'Product',
    colCategory: 'Space',
    colPrice: 'Price',
    colActions: 'Actions',
    formAddTitle: 'Add a new product',
    formEditTitle: 'Edit product',
    formProdName: 'Product name *',
    formProdPrice: 'Price in DZD *',
    formProdCat: 'Space / Category *',
    formProdBadge: 'Availability badge',
    formProdVol: 'Size / Format (optional)',
    formProdPreset: 'Suggested studio photo',
    formProdCustomUrl: 'Custom URL below',
    formProdImgUrl: 'Image URL',
    formProdDesc: 'Description *',
    saveChanges: 'Save changes',
    publishProduct: 'Publish to store',
    spaceEmptyNotice: 'No items published in this space yet.',
    addFromVendor: 'Add item (Vendor Space)',
    uploadPhotoBtn: 'Upload photo',
    uploadPhotoHint: 'From your phone or computer (or paste an image URL)',
  },
} as const;
