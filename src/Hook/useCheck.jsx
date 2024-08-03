import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxios";
import useAuth from "./useAuth";

const useCheck = () => {
  const axiosCommon = useAxiosSecure();
  const { user } = useAuth();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/user/${user?.email}`);
      return data;
    },
  });

  return { data, isLoading };
};

export default useCheck;
