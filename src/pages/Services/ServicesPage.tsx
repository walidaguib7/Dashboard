import AddServiceModal from "@/components/Services/Add/AddService";
import "./Services.css";
import NoData from "/NoData.svg";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
  if (data?.data.length == 0) {
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
        <div className="w-full">
          <img
            src={NoData}
            className="w-[350px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    );
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
