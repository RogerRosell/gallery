export type TDirectoryItem = {
  name: string;
  type: 'file' | 'directory';
  children?: TDirectoryItem[];
  title?: string;
  place?: string;
  date?: {
    year?: string;
    month?: string;
  };
  keywords?: string[] | string | undefined;
  width?: number;
  height?: number;
}