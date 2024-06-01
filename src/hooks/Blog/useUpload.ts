/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useCallback, useState } from "react";


export const useUpload = () => {

    const [fl, setFileId] = useState<number>(0);
    const [file, setFile] = useState<File | null>(null);
    const [isFileError, setFileError] = useState<boolean>(false);
    const Upload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] ?? null);
    };


    const Submit = useCallback(
        async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            if (!file) {
                alert("Please select a file to upload");
                return;
            }

            const formData = new FormData();
            formData.append("file", file);

            await axios
                .post("http://localhost:5171/api/files", formData, {
                    headers: {
                        Accept: "/",
                        "Content-Type": "'multipart/form-data'",
                    },
                })
                .then((res) => {
                    setFileId(res.data.id);
                })
                .catch((err) => {
                    setFileError(true);
                    setTimeout(() => setFileError(false), 3000);
                });
        },
        [file]
    );

    return { fl, Submit, Upload, isFileError }
}