import { create } from 'zustand';

type BlogType = {
    BlogId: number;
    setId: (value: number) => void;
    getId: () => number
}


export const useBlogStore = create<BlogType>()((set, get) => ({
    BlogId: 1,
    setId: (BlogId) => set({ BlogId }),
    getId: () => get().BlogId
}));