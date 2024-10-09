import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
// import { filterImagesByKeywords } from '@/store/filterUtils'
import { TImage } from '@/dataModel/image'

type FAlbumState =  {
  directoryTree : object;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterData: any;
  keywords: string[];
  allImages: TImage[];
  filteredImages: TImage[];
}

type FAlbumActions = {
  resetFilteredImages : () => void;
}

export type FAlbumStore = FAlbumState & FAlbumActions;


export const useFAlbumStore = create<FAlbumStore>()(
  devtools(
    immer(
      (set, get) => ({
        directoryTree: {},
        filterData: {},
        keywords: [],
        allImages: [],
        filteredImages: [],
        resetFilteredImages: () => set({ filteredImages: get().allImages })
      })
    ),
  ),
)

 