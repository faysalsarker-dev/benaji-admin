import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxios";


const useFetchData = (endpoint, queryKey) => {
    const axiosSecure = useAxiosSecure();

    const { data = [], isLoading } = useQuery({
        queryKey: [queryKey],
        queryFn: async () => {
            const { data } = await axiosSecure.get(endpoint);
            return data;
        },
    });

    return { data, isLoading };
};

export default useFetchData;
