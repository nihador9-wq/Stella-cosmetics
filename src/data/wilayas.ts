import { DeliveryMode } from '../types';

export interface Wilaya {
  code: string;
  name: string;
  zone: number;
  delaiJours: number;
  domicileFee: number;
  stopDeskFee: number;
}

export const WILAYAS: Wilaya[] = [
  { code: '01', name: 'Adrar', zone: 4, delaiJours: 3, domicileFee: 1050, stopDeskFee: 850 },
  { code: '02', name: 'Chlef', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '03', name: 'Laghouat', zone: 3, delaiJours: 1, domicileFee: 950, stopDeskFee: 750 },
  { code: '04', name: 'Oum El Bouaghi', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '05', name: 'Batna', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '06', name: 'Béjaïa', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '07', name: 'Biskra', zone: 3, delaiJours: 1, domicileFee: 950, stopDeskFee: 750 },
  { code: '08', name: 'Béchar', zone: 4, delaiJours: 3, domicileFee: 1050, stopDeskFee: 850 },
  { code: '09', name: 'Blida', zone: 1, delaiJours: 1, domicileFee: 700, stopDeskFee: 550 },
  { code: '10', name: 'Bouira', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '11', name: 'Tamanrasset', zone: 5, delaiJours: 5, domicileFee: 1600, stopDeskFee: 1400 },
  { code: '12', name: 'Tébessa', zone: 3, delaiJours: 1, domicileFee: 950, stopDeskFee: 750 },
  { code: '13', name: 'Tlemcen', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '14', name: 'Tiaret', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '15', name: 'Tizi Ouzou', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '16', name: 'Alger', zone: 0, delaiJours: 1, domicileFee: 590, stopDeskFee: 450 },
  { code: '17', name: 'Djelfa', zone: 3, delaiJours: 1, domicileFee: 950, stopDeskFee: 750 },
  { code: '18', name: 'Jijel', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '19', name: 'Sétif', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '20', name: 'Saïda', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '21', name: 'Skikda', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '22', name: 'Sidi Bel Abbès', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '23', name: 'Annaba', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '24', name: 'Guelma', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '25', name: 'Constantine', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '26', name: 'Médéa', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '27', name: 'Mostaganem', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '28', name: "M'Sila", zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '29', name: 'Mascara', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '30', name: 'Ouargla', zone: 3, delaiJours: 2, domicileFee: 950, stopDeskFee: 750 },
  { code: '31', name: 'Oran', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '32', name: 'El Bayadh', zone: 4, delaiJours: 2, domicileFee: 1050, stopDeskFee: 850 },
  { code: '33', name: 'Illizi', zone: 5, delaiJours: 6, domicileFee: 1600, stopDeskFee: 1400 },
  { code: '34', name: 'Bordj Bou Arréridj', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '35', name: 'Boumerdès', zone: 1, delaiJours: 1, domicileFee: 700, stopDeskFee: 550 },
  { code: '36', name: 'El Tarf', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '37', name: 'Tindouf', zone: 5, delaiJours: 5, domicileFee: 1600, stopDeskFee: 1400 },
  { code: '38', name: 'Tissemsilt', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '39', name: 'El Oued', zone: 3, delaiJours: 1, domicileFee: 950, stopDeskFee: 750 },
  { code: '40', name: 'Khenchela', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '41', name: 'Souk Ahras', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '42', name: 'Tipaza', zone: 1, delaiJours: 1, domicileFee: 700, stopDeskFee: 550 },
  { code: '43', name: 'Mila', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '44', name: 'Aïn Defla', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '45', name: 'Naâma', zone: 4, delaiJours: 3, domicileFee: 1050, stopDeskFee: 850 },
  { code: '46', name: 'Aïn Témouchent', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '47', name: 'Ghardaïa', zone: 3, delaiJours: 2, domicileFee: 950, stopDeskFee: 750 },
  { code: '48', name: 'Relizane', zone: 2, delaiJours: 1, domicileFee: 900, stopDeskFee: 650 },
  { code: '49', name: 'Timimoun', zone: 4, delaiJours: 3, domicileFee: 1050, stopDeskFee: 850 },
  { code: '50', name: 'Bordj Badji Mokhtar', zone: 4, delaiJours: 3, domicileFee: 1050, stopDeskFee: 850 },
  { code: '51', name: 'Ouled Djellal', zone: 3, delaiJours: 1, domicileFee: 950, stopDeskFee: 750 },
  { code: '52', name: 'Béni Abbès', zone: 4, delaiJours: 3, domicileFee: 1050, stopDeskFee: 850 },
  { code: '53', name: 'In Salah', zone: 5, delaiJours: 5, domicileFee: 1600, stopDeskFee: 1400 },
  { code: '54', name: 'In Guezzam', zone: 5, delaiJours: 6, domicileFee: 1600, stopDeskFee: 1400 },
  { code: '55', name: 'Touggourt', zone: 3, delaiJours: 2, domicileFee: 950, stopDeskFee: 750 },
  { code: '56', name: 'Djanet', zone: 5, delaiJours: 6, domicileFee: 1600, stopDeskFee: 1400 },
  { code: '57', name: "El M'Ghair", zone: 3, delaiJours: 1, domicileFee: 950, stopDeskFee: 750 },
  { code: '58', name: 'El Meniaa', zone: 3, delaiJours: 2, domicileFee: 950, stopDeskFee: 750 },
];

export function calculateShippingFee(wilayaCode: string, mode: DeliveryMode): number {
  if (mode === 'retrait') {
    return 0;
  }
  const wilaya = WILAYAS.find((w) => w.code === wilayaCode);
  if (!wilaya) return 900;
  return mode === 'stop_desk' ? wilaya.stopDeskFee : wilaya.domicileFee;
}

export function formatDzd(amount: number): string {
  return `${amount.toLocaleString('fr-DZ').replace(/\u202f|\u00a0/g, ' ')} DA`;
}
