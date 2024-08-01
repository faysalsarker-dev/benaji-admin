import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../Hook/useAxios";
import OrderTable from "../Order/OrderTable";
import { ScaleLoader } from "react-spinners";


const Order_2 = () => {
    const axiosSecure = useAxiosSecure();

    const { data=[],isLoading } = useQuery({
      queryKey: ["Order-1"],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/order-1`);
        return data;
      },
    });
  

    if(isLoading){
      return <div className="h-screen flex justify-center items-center"><ScaleLoader color="green" /></div>
   }



    return (
        <div>
            <h2 className="text-center text-3xl font-extrabold my-4 border-b-2 pb-2 border-green-500">Order 2 Page - <span className="bg-green-400 px-2 rounded-lg text-white">{data.length}</span></h2>
           
            <OrderTable data={data} />
        </div>
    );
};

export default Order_2;