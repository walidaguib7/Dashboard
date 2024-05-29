

import { create } from 'zustand'

type FileType = {
    fileId: number;
    setId: (value: number) => void
    getId: () => number;
    reset: () => void;
}



export const useFilesStore = create<FileType>()((set, get) => ({
    fileId: 0,
    setId: (fileId) => set({ fileId }),
    getId: () => get().fileId,
    reset: () => set({ fileId: 0 })
}));