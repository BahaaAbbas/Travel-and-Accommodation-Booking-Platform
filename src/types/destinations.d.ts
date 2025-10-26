export interface Destination {
  cityId: number;
  cityName: string;
  countryName: string;
  description: string;
  thumbnailUrl: string;
  highlights?: string[];
  bestTimeToVisit?: string;
  population?: string;
  language?: string;
  currency?: string;
}
