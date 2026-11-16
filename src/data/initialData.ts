import { Order, Product, ProductCategory } from '../types';

export const HERO_IMAGE = '/assets/aistudio/IMG_2875_8501a678.png';
export const LOGO_IMAGE = '/assets/aistudio/IMG_2872_7bd8b2e3.png';

export const CATEGORIES: ProductCategory[] = [
  'Coffrets',
  'Skin Care',
  'Maquillage',
  'Parfums & Brumes',
  'Location Box',
];

export const PRESET_IMAGE_OPTIONS: { label: string; url: string }[] = [
  { label: 'Coffret For You Rouge', url: '/assets/aistudio/IMG_6458_3b4e7b93.jpeg' },
  { label: 'Coffret Miroir Princesse', url: '/assets/aistudio/IMG_6587_761438f6.jpeg' },
  { label: 'Coffret Queen Roses Blanches', url: '/assets/aistudio/9F4EDDC2-32B0-4654-98BA-AD06A69C01E1_1ddb53cc.jpeg' },
  { label: 'Coffret Papillons Señorita', url: '/assets/aistudio/E8D2D54B-13D1-4735-8C92-DCBC5A2095D4_2f507fd3.jpeg' },
  { label: 'Coffret Baby Powder Rose', url: '/assets/aistudio/32E96AE3-14EB-4F2D-ACCB-FE42DBEB3B31_549630ef.jpeg' },
  { label: 'Coffret For You Maquillage Luxe', url: '/assets/aistudio/B4F625C9-6B2B-40D7-BA0D-C654919C1542_e807fc75.jpeg' },
];

export const REMOVED_SEEDED_PRODUCT_IDS = new Set([
  'stella-gloss-01',
  'stella-serum-02',
  'stella-palette-03',
  'stella-blush-04',
  'stella-brume-05',
  'stella-creme-06',
  'stella-huile-07',
  'stella-parfum-08',
  'stella-pinceaux-09',
  'stella-coffret-10',
  'stella-loc-box-01',
  'stella-loc-box-02',
]);

export const REMOVED_SEEDED_ORDER_IDS = new Set([
  'CMD-2601',
  'CMD-2602',
  'CMD-2603',
]);

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'stella-coffret-rouge-11',
    name: 'Coffret Luxe « For You » Rouge Passion',
    category: 'Coffrets',
    priceDzd: 8000,
    badge: 'Nouveau',
    volume: 'Mhiba & Khotba',
    imageUrl: '/assets/aistudio/IMG_6458_3b4e7b93.jpeg',
    imagePosition: 'object-[50%_62%]',
    description:
      'Coffret présentoir vitré « For You » orné de rubans satin rouge, idéal pour Mhiba ou Khotba : lait corporel Amore, brume parfumée Valeria Midnight Rose, extrait de parfum et soin Color Vive.',
  },
  {
    id: 'stella-coffret-rose-12',
    name: 'Coffret Miroir Rose « Princesse »',
    category: 'Coffrets',
    priceDzd: 8000,
    badge: 'Nouveau',
    volume: 'Mhiba & Événements',
    imageUrl: '/assets/aistudio/IMG_6587_761438f6.jpeg',
    imagePosition: 'object-[50%_55%]',
    description:
      'Coffret cadre miroir avec couronne dorée : lait corporel Jardin de Rio, gel douche & déodorant Dove, eau de parfum, soins Baby Powder AMK, savon Lux Soft Rose et gommage scintillant.',
  },
  {
    id: 'stella-coffret-queen-rose-13',
    name: 'Coffret Arche « Queen » Roses Blanches',
    category: 'Coffrets',
    priceDzd: 7800,
    badge: 'Nouveau',
    volume: 'Soin Corps & Cheveux',
    imageUrl: '/assets/aistudio/9F4EDDC2-32B0-4654-98BA-AD06A69C01E1_1ddb53cc.jpeg',
    imageObjectPosition: '50% 66%',
    description:
      'Présentoir arche blanc & or « Queen » fleuri de roses blanches : Lait Corporel Seduction, déodorant Rexona, Body Lotion Pharmamil Vit E 500ml et duo L’Oréal Elseve Total Repair 5.',
  },
  {
    id: 'stella-coffret-senorita-14',
    name: 'Coffret Papillons « Señorita » Parfums',
    category: 'Coffrets',
    priceDzd: 12850,
    badge: 'Nouveau',
    volume: 'Prestige Parfums',
    imageUrl: '/assets/aistudio/E8D2D54B-13D1-4735-8C92-DCBC5A2095D4_2f507fd3.jpeg',
    imageObjectPosition: '50% 61.4%',
    description:
      'Box acrylique gravée de papillons « Señorita » avec poignée dorée : parfum Kayali Purple Shimmer, brume Evoria Floral, parfum façon Prada, déodorant assorti et parfum Gissah One & Only.',
  },
  {
    id: 'stella-coffret-baby-powder-15',
    name: 'Coffret Ruban Rose « Baby Powder Paris »',
    category: 'Coffrets',
    priceDzd: 9200,
    badge: 'Nouveau',
    volume: 'Routine Complète',
    imageUrl: '/assets/aistudio/32E96AE3-14EB-4F2D-ACCB-FE42DBEB3B31_549630ef.jpeg',
    imageObjectPosition: '50% 96%',
    description:
      'Box vitrée à ruban satin rose : gamme complète Baby Powder Paris AMK (brume corps & cheveux, lait corporel, spray fraîcheur, savon, roll-on) accompagnée d’un Gommage Magique.',
  },
  {
    id: 'stella-coffret-coeur-noir-16',
    name: 'Coffret Cœur Noir « Queen » Roses Roses',
    category: 'Coffrets',
    priceDzd: 3500,
    badge: 'En stock',
    volume: 'Idée Cadeau',
    imageUrl: '/assets/aistudio/A9FB1ACB-7709-45DA-BE85-CB6479B1BB7A_e079ea0c.jpeg',
    imageObjectPosition: '50% 86.6%',
    imageScale: 1.12,
    description:
      'Box cœur noir « Queen » garnie de roses pastel : shampoing Sunsilk rose, gel nettoyant Venus, crème boucles Byphasse, déodorant Flux, brume parfumée et soin Vaseline.',
  },
  {
    id: 'stella-coffret-dove-vogue-17',
    name: 'Coffret Arche « Queen » Collection Dove',
    category: 'Coffrets',
    priceDzd: 11000,
    badge: 'Nouveau',
    volume: 'Grand Format',
    imageUrl: '/assets/aistudio/C2A0439E-635D-415B-8A43-028E4014E153_90611382.jpeg',
    imageObjectPosition: '50% 69.4%',
    description:
      'Présentoir arche « Queen » blanc et or garni de la collection Dove (gel douche, shampoing, déodorant, savon), gommage exfoliant Vogue Secret Hydro Clean et crème déodorante Natlyne.',
  },
  {
    id: 'stella-coffret-garnier-miel-18',
    name: 'Coffret Miroir « Queen » Ultra Suave Miel',
    category: 'Coffrets',
    priceDzd: 8300,
    badge: 'Nouveau',
    volume: 'Éclat & Cheveux',
    imageUrl: '/assets/aistudio/513EEFCD-5911-474B-8AD3-2A863D9221D2_f15fafa7.jpeg',
    imageObjectPosition: '50% 92.3%',
    description:
      'Coffret miroir doré « Queen » : trio Garnier Ultra Suave Trésors de Miel, crème solaire Dr. Rashel, masque visage Dermactifs, brume Garranso Pistache et gommage Pharmamil.',
  },
  {
    id: 'stella-coffret-foryou-ruby-19',
    name: 'Coffret Vitré « For You » Beauté Ruby Rose',
    category: 'Coffrets',
    priceDzd: 8000,
    badge: 'En stock',
    volume: 'Édition Maquillage',
    imageUrl: '/assets/aistudio/B99A5745-A24E-4B17-8F4D-0E82BF4D306E_74fd87d7.jpeg',
    imageObjectPosition: '50% 61.4%',
    description:
      'Box vitrée « For You » à poignée dorée : fond de teint et poudre compacte Ruby Rose Soft Blend, blush & eyeliner Farfasha, rouge à lèvres velours, pinceau teint et rouleau de massage.',
  },
  {
    id: 'stella-coffret-rouge-amore-20',
    name: 'Coffret Ruban Rouge « Amore & Elvive »',
    category: 'Coffrets',
    priceDzd: 9900,
    badge: 'Nouveau',
    volume: 'Mhiba & Trousseau',
    imageUrl: '/assets/aistudio/D8980595-D40E-4F23-B00E-4E0BEC2498F3_ea2acb31.jpeg',
    imageObjectPosition: '50% 66%',
    description:
      'Box acrylique à socle rouge et ruban satin : lait corporel Garranso Amore, gamme L’Oréal Elvive Color Vive (shampoing & masque), talc & lait Enchanteur Enticing, Rexona, Calliderm et Gommage Magique.',
  },
  {
    id: 'stella-coffret-dove-dolce-21',
    name: 'Coffret Arche Diamant « Queen » & Dolce',
    category: 'Coffrets',
    priceDzd: 9100,
    badge: 'Nouveau',
    volume: 'Soin & Parfum',
    imageUrl: '/assets/aistudio/0BC7E854-73CD-446C-A7FF-6DC92B78E84F_85314a02.jpeg',
    imageObjectPosition: '50% 98%',
    description:
      'Présentoir arche blanc & or à ornement diamant : eau de toilette façon D&G Light Blue Summer Vibes, soins Dove Secrets de Soin & roll-on Original, Gommage Magique Snowy Coco et fleur de douche.',
  },
  {
    id: 'stella-coffret-gold-makeup-22',
    name: 'Coffret Socle Or « Ruby Rose & Kiko »',
    category: 'Coffrets',
    priceDzd: 9100,
    badge: 'Nouveau',
    volume: 'Set Maquillage',
    imageUrl: '/assets/aistudio/9F0AFCD3-8D14-4F01-BDA8-718626001B8B_7efb46e1.jpeg',
    imageObjectPosition: '50% 100%',
    imageScale: 1.06,
    description:
      'Box transparente à socle miroir doré et ruban blanc : fond de teint Ruby Rose Soft Blend, mascara MaxImpact, houppette Kiko Green Me, palette blush, glosses et vernis.',
  },
  {
    id: 'stella-coffret-flux-panier-23',
    name: 'Coffret Panier Or « Queen » Flux Care',
    category: 'Coffrets',
    priceDzd: 5500,
    badge: 'En stock',
    volume: '8 Soins Flux Care',
    imageUrl: '/assets/aistudio/DA20EA44-DB1B-4555-AD61-FF48EEEC574A_53140a17.jpeg',
    imageObjectPosition: '50% 83.2%',
    description:
      'Panier blanc & or à anse « Queen » rempli de la gamme Flux Care Secret de Soin : shampoing sans sulfates, après-shampoing, gel douche, lait corporel, brume, masque Glycolic Glow, savon et roll-on.',
  },
  {
    id: 'stella-coffret-mallette-violette-24',
    name: 'Coffret Mallette Prune Maquillage Luxe',
    category: 'Coffrets',
    priceDzd: 9500,
    badge: 'Nouveau',
    volume: 'Vanity Case Garnie',
    imageUrl: '/assets/aistudio/8B715887-99EC-447D-95F7-06A60F69982E_e34e2ed4.jpeg',
    imageObjectPosition: '50% 61%',
    imageScale: 1.08,
    description:
      'Mallette acrylique à couvercle prune et fermoir doré : fond de teint HudaBeauty 30H, poudre compacte Ruby Rose Flirt, eau micellaire Venus, set de pinceaux, gloss, crème mains Vaseline et vernis.',
  },
  {
    id: 'stella-coffret-flux-colorfix-25',
    name: 'Coffret « For You » Soin Capillaire Color Fix',
    category: 'Coffrets',
    priceDzd: 3000,
    badge: 'En stock',
    volume: '4 Essentiels',
    imageUrl: '/assets/aistudio/93D00D6D-EBC4-4D4B-9DE3-1F11F18198C1_f94896f3.jpeg',
    imageObjectPosition: '50% 85.4%',
    imageScale: 1.05,
    description:
      'Coffret blanc & or vitré « For You » : shampoing et masque capillaire Flux Care Color Fix pour cheveux colorés, eau micellaire au cranberry & acide glycolique et savon parfumé Perle Rose.',
  },
  {
    id: 'stella-coffret-foryou-nyx-26',
    name: 'Coffret Luxe « For You » Maquillage Pro',
    category: 'Coffrets',
    priceDzd: 14700,
    badge: 'Nouveau',
    volume: 'Sélection Marques Pro',
    imageUrl: '/assets/aistudio/B4F625C9-6B2B-40D7-BA0D-C654919C1542_e807fc75.jpeg',
    imageObjectPosition: '50% 86.6%',
    description:
      'Grande box vitrée « For You » avec poignée dorée : liner NYX Epic Inky Stix, spray fixateur Sheglam, fond de teint Bourjois Healthy Mix, poudre Piové, éponge Kiko Green Me, Topface et Max Factor.',
  },
  {
    id: 'stella-coffret-flux-soin-27',
    name: 'Coffret « For You » Routine Visage & Solaire',
    category: 'Coffrets',
    priceDzd: 5600,
    badge: 'En stock',
    volume: 'Routine Skin Care',
    imageUrl: '/assets/aistudio/FA365E85-A2CE-4CBF-9613-95FF9031CB04_36e5edca.jpeg',
    imageObjectPosition: '50% 85.4%',
    description:
      'Box vitrée « For You » à poignée dorée réunissant les soins Flux Care : crème solaire SPF 50+, gel nettoyant Cranberry anti-âge, masque Glycolic Glow, lotion tonique, gommage et déodorant 0% aluminium.',
  },
  {
    id: 'stella-coffret-dove-turquoise-28',
    name: 'Coffret Miroir « Queen » Dove Rubans Turquoise',
    category: 'Coffrets',
    priceDzd: 4550,
    badge: 'En stock',
    volume: 'Soin Douceur',
    imageUrl: '/assets/aistudio/IMG_0755_4018a2f7.png',
    imageObjectPosition: '50% 66.7%',
    description:
      'Coffret miroir blanc & or « Queen » décoré de rubans satin turquoise : soins Dove Secrets de Soin (lavande, avocat, concombre), savon doux et déodorant Go Fresh.',
  },
];

export const INITIAL_ORDERS: Order[] = [];
