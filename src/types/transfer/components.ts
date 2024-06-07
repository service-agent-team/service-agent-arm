export interface IGlobalCountry {
  id: number;
  name: Name;
  lineString: string;
  lowerCorner: LowerCorner;
  upperCorner: UpperCorner;
  code: string;
  type: string;
  parentId: number;
  deleted: boolean;
}

export interface Name {
  id: number;
  ru: string;
  en: string;
  uz: string;
}

export interface LowerCorner {
  id: number;
  longitude: number;
  latitude: number;
}

export interface UpperCorner {
  id: number;
  longitude: number;
  latitude: number;
}
