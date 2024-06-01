import { useBlogStore } from "@/store/BlogStore";
import { BlogType } from "@/utils/Types";
import axios from "axios";
import { useQueryClient } from "react-query";


type PutProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reset: any;
    data: BlogType
}

export const usePut = ({ reset, data }: PutProps) => {
    const blogStore = useBlogStore();
    const queryClient = useQueryClient();

    const SubmitForm = async () => {
        await axios.put(`http://localhost:5171/api/blog/${blogStore.getId()}`, data, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                console.log(res.data);
                queryClient.invalidateQueries("blogs");
                reset;
            })
            .catch((err) => console.log(err));
    }

    return { SubmitForm }

}