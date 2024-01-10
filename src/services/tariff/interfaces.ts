import { ItariffCreatepayload } from '@/store/tariff/types';
export type ITariffpayloadData = Omit<ItariffCreatepayload, 'callback'>;
