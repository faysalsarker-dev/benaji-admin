import {
  Card,
  Typography,
  Button,
  CardBody,
  Chip,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import useAxiosSecure from "../Hook/useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ScaleLoader } from 'react-spinners';
import Swal from "sweetalert2";

export function AllUsers() {
  const axiosSecure = useAxiosSecure();

  const { data: TABLE_ROWS = [], isLoading,refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-users`);
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async ({ email, info }) => {
      const { data } = await axiosSecure.patch(`/update-user-role/${email}`, info);
      return data;
    },
    onSuccess: () => {
      refetch()
      Swal.fire({
        title: "Confirmed!",
        text: "User role has been updated.",
        icon: "success",
        customClass: {
          title: 'text-green-600',
          content: 'text-gray-700',
          confirmButton: 'bg-green-500 text-white hover:bg-green-600'
        }
      });
    },
    onError: (error) => {
      console.error("Error updating user role:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue updating the user role. Please try again.",
        icon: "error",
        customClass: {
          title: 'text-red-600',
          content: 'text-gray-700',
          confirmButton: 'bg-red-500 text-white hover:bg-red-600'
        }
      });
    },
  });

  const confirmAction = async (email, info, actionText) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this action!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${actionText}!`,
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      customClass: {
        title: 'text-yellow-600',
        content: 'text-gray-700',
        confirmButton: 'bg-green-500 text-white hover:bg-green-700 p-3 rounded-lg ml-2',
        cancelButton: 'bg-red-500 text-white hover:bg-red-700 p-3 rounded-lg'
      }
    });

    if (result.isConfirmed) {
      await mutateAsync({ email, info });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "Cancelled",
        text: "The action has been cancelled.",
        icon: "error",
        customClass: {
          title: 'text-gray-600',
          content: 'text-gray-700',
          confirmButton: 'bg-gray-500 text-white hover:bg-gray-600 p-3 rounded-lg'
        }
      });
    }
  };

  const onActive = (email) => {
    const info = { status: 'active' };
    confirmAction(email, info, "activate the user");
  };

  const onBlock = (email) => {
    const info = { status: 'block' };
    confirmAction(email, info, "block the user");
  };

  if (isLoading) {
    return <div className="h-screen flex justify-center items-center"><ScaleLoader color="green" /></div>
  }

  return (
    <Card className="h-full w-full">
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <tbody>
            {TABLE_ROWS?.map(({ profile, name, email, status, role }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={email}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar src={profile} alt={name} size="sm" />
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
                          {email}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <Chip
                      size="sm"
                      variant="ghost"
                      value={status}
                      color={
                        status === "active"
                          ? "green"
                          : status === "pending"
                            ? "amber"
                            : status === "blocked"
                              ? "red"
                              : ""
                      }
                    />
                  </td>
                  {role !== 'admin' && (
                    <>
                      <td className={classes}>
                        <Tooltip content="Activate User">
                          <Button onClick={() => onActive(email)} className="border-2" color="green" variant="text">Activate</Button>
                        </Tooltip>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Block User">
                          <Button onClick={() => onBlock(email)} className="border-2" color="red" variant="text">Block</Button>
                        </Tooltip>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
