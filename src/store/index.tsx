import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { TDirectoryItem } from '../app/types'
// import { getImagesList } from '../actions/imagesList'

interface FAlbumState {
  folders : TDirectoryItem[] | undefined;
  setFolders: (tree: TDirectoryItem[]) => void
}

export const useFAlbumStore = create<FAlbumState>()(
  devtools(
    persist(
      (set) => ({
        folders : undefined,
        setFolders: (tree) => set(() => ({ folders: tree })),
      }),
      { name: 'fAlbumStore' }
    ),
  ),
)

 