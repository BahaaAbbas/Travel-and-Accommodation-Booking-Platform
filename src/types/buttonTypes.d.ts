export interface SearchButtonProps {
  text: string;
  padding?: string | number;
  bgColor?: string | ((theme: Theme) => string);
  onClick?: () => void;
}
