
import {
  Card,
  Typography,
  CardBody,
  Avatar,

} from "@material-tailwind/react";
import useAxiosSecure from "../Hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import { ScaleLoader } from 'react-spinners';

export function Allpost() {
  const axiosSecure = useAxiosSecure();

  const { data: TABLE_ROWS = [],isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-product`);
      return data;
    },
  });
  if(isLoading){
    return <div className="h-screen flex justify-center items-center"><ScaleLoader color="green" /></div>
 }
  return (
    <Card className="h-full w-full">
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            {/* Add table headers if needed */}
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ image, name, price, date }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              const formattedDate = new Date(date).toLocaleDateString('en-GB');

              return (
                <tr key={name}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar 
                        src={image} 
                        alt={name} 
                        size="lg" 
                        className="rounded-lg" 
                      />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {price}TK
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {formattedDate}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
