export interface CompanyStylizationDTO {
  [x: string]: unknown;
  hasImage?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  logo?: string;
  header?: string;
}