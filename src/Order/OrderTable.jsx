/* eslint-disable react/prop-types */
import { Card, Typography } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
 
const TABLE_HEAD = ["Phone", "quantity", "date",""];
 

 
export default function OrderTable({data}) {
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD?.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(({ quantity, date,phone,_id }, index) => {
            const isLast = index === data.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={index}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {phone}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {quantity} 
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {date}
                  </Typography>
                </td>
               
                <td className={classes}>
                 <Link to={`/Order-Details/${_id}`}>
                      <button
                      
                       
                        className="font-medium border-2 p-2 rounded-lg bg-primary text-white"
                      >
                       View
                      </button>
                 </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}