
import * as yup from "yup";

export type BlogTypes = {

    Title: string;
    description: string;
    content: string;
    categoryId: string;
    userId: string;

}


export const Blogschema = yup.object({

    Title: yup.string().required().trim(),
    description: yup.string().required().trim(),
    content: yup.string().required(),
    categoryId: yup.string().required(),
    userId: yup.string().required(),
    file: yup.mixed()


});