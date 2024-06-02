import AddServiceModal from "@/components/Services/Add/AddService";
import "./Services.css";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpdateService from "@/components/Services/Update/UpdateService";
import { ServiceType } from "@/utils/Types";
import { Button } from "@/components/ui/button";
import Loading from "@/components/layout/Spinner/Loading";

const ServicesPage = () => {
  const [page, setPage] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const { data, isLoading } = useQuery(
    ["services", page, title],
    async () => {
      return await axios.get(
        `http://localhost:5171/api/services?PageNumber=${page}&Limit=${9}&Title=${title}`
      );
    },
    { keepPreviousData: true }
  );

  const query = useQueryClient();
  const DeleteService = async (id: number) => {
    await axios.delete(`http://localhost:5171/api/services/${id}`);
    query.invalidateQueries("services");
  };

  if (isLoading == true) {
    return <Loading />;
  }

  return (
    <div className="px-[30px] pt-6 ">
      <div className="flex justify-center items-center">
        <h2 className="text-2xl font-bold text-slate-700 flex-1">Services</h2>
        <div className="flex gap-3">
          <AddServiceModal />
          <Input
            className="border-2 border-slate-700 shadow-lg"
            placeholder="search..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="pt-6">
        <div className="services  mt-2">
          {data?.data.map((service: ServiceType) => (
            <Card className="w-[300px] shadow-lg">
              <CardHeader>
                <CardTitle className="flex w-fit">{service.title}</CardTitle>
                <CardDescription className="w-full overflow-hidden">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-end gap-3">
                <UpdateService id={service.id} />
                <Button
                  className="bg-red-800"
                  onClick={() => DeleteService(service.id)}>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {data?.data.length > 0 && (
          <div className="w-full">
            <div className="mt-4  flex justify-center gap-8 items-center m-auto">
              <Button
                className="bg-blue-700"
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page == 1}>
                -
              </Button>
              <span>{page}</span>
              <Button
                className="bg-blue-700"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={data?.data.length != 9}>
                +
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;

/* 
      <div className="pt-6">
        <div className="services  mt-2">
          {data?.data.map((service: ServiceType) => (
            <Card className=" shadow-lg">
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription className="w-full overflow-hidden">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-end gap-3">
                <UpdateService id={service.id} />
                <Button
                  className="bg-red-800"
                  onClick={() => DeleteService(service.id)}>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Pagination className="mt-3 mb-4">
          <PaginationContent>
            <PaginationItem>
              {page >= 2 && (
                <PaginationPrevious
                  onClick={() => setPage((prev) => prev - 1)}
                  href="#"
                />
              )}
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              {data?.data.length != 0 && (
                <PaginationNext
                  onClick={() => setPage((prev) => prev + 1)}
                  href="#"
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

*/
