
import { create } from 'zustand';

type categoryType = {
    categoryId: number;
    setId: (value: number) => void;
    getId: () => number
}


export const useCategoryStore = create<categoryType>()((set, get) => ({
    categoryId: 1,
    setId: (categoryId) => set({ categoryId }),
    getId: () => get().categoryId
}));