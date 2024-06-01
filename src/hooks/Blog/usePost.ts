

import { BlogType } from "@/utils/Types";
import axios from "axios";

import { useQueryClient } from "react-query";





type PostProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reset: any;
    categoryId: string;
    data: BlogType
}

export const usePost = ({ reset, categoryId, data }: PostProps) => {
    const queryClient = useQueryClient();
    const SubmitForm = async () => {

        await axios
            .post(
                `http://localhost:5171/api/blog/${parseInt(
                    categoryId
                )}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                queryClient.invalidateQueries("blogs");
                reset;
            })
            .catch((err) => console.log(err));
    }

    return { SubmitForm }
}