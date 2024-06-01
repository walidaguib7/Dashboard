import { create } from 'zustand';


type DataType = {
    title: string;
    description: string;
    content: string;
}

type BlogType = {
    BlogId: number;
    setId: (value: number) => void;
    getId: () => number;
    data: DataType;
    setData: (value: DataType) => void;
    getData: () => DataType;

}


export const useBlogStore = create<BlogType>()((set, get) => ({
    BlogId: 1,
    setId: (BlogId) => set({ BlogId }),
    getId: () => get().BlogId,
    data: { title: "", description: "", content: "" },
    setData: (data) => set({ data }),
    getData: () => get().data
}));