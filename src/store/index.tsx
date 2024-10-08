import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { TDirectoryItem } from '@/app/types'
// import { getImagesList } from '../actions/imagesList'

interface FAlbumState {
  folders : TDirectoryItem[] | undefined;
  setInitTree: (response: TDirectoryItem[]) => void
}

export const useFAlbumStore = create<FAlbumState>()(
  devtools(
    persist(
      (set) => ({
        folders : undefined,
        setInitTree: (response) => {
          if (response) set({ folders: response });
        }
      }),
      { name: 'fAlbumStore' }
    ),
  ),
)

 