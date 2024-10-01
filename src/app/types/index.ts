export type TDirectoryItem = {
  name: string;
  type: 'file' | 'directory';
  children?: TDirectoryItem[];
}