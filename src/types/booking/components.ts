import { LanguageType } from '@/common/enum';

export type TBreakfast = {
  id: number;
  name: string;
  languageType: string;
  translations: TBreakfastTranslation[];
};

export interface TBreakfastTranslation {
  name: string;
  languageType: LanguageType;
}
