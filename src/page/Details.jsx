import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hook/useAxios';
import toast from 'react-hot-toast';
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';


const Details = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: orderData = {},isLoading } = useQuery({
        queryKey: ["details", id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/order-details/${id}`);
            return data;
        },
    });

    const { mutateAsync } = useMutation({
        mutationFn: async (info) => {
            const { data } = await axiosSecure.patch(`/confirm-order/${id}`, info);
            return data;
        },
        onSuccess: () => {
            Swal.fire({
                title: "Confirmed!",
                text: "Order has been confirmed.",
                icon: "success",
                customClass: {
                    title: 'text-green-600',
                    content: 'text-gray-700',
                    confirmButton: 'bg-green-500 text-white hover:bg-green-600'
                }
            });
        },
        onError: (error) => {
            console.error("Error confirming order:", error);
            Swal.fire({
                title: "Error!",
                text: "There was an issue confirming the order. Please try again.",
                icon: "error",
                customClass: {
                    title: 'text-red-600',
                    content: 'text-gray-700',
                    confirmButton: 'bg-red-500 text-white hover:bg-red-600'
                }
            });
            
        },
    });

    const onConfirm = () => {
        const info = {
            date: new Date(),
            status: 'confirm'
        };
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, confirm it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
            customClass: {
                title: 'text-yellow-600',
                content: 'text-gray-700',
                confirmButton: 'bg-green-500 text-white hover:bg-green-700 p-3 rounded-lg ml-2',
                cancelButton: 'bg-red-500 text-white hover:bg-red-700 p-3 rounded-lg'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                mutateAsync(info);
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your order is not confirmed :)",
                    icon: "error",
                    customClass: {
                        title: 'text-gray-600',
                        content: 'text-gray-700',
                        confirmButton: 'bg-gray-500 text-white hover:bg-gray-600 p-3 rounded-lg'
                    }
                });
            }
        });
    };

    const formattedDate = new Date(orderData.date).toLocaleDateString('en-GB');

    if(isLoading){
        return <div className="h-screen flex justify-center items-center"><ScaleLoader color="green" /></div>
     }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
     
            <Card className="w-full max-w-md mx-4 my-4 shadow-lg">
                <CardBody>
                  <div className='flex items-center justify-between mb-4'>
                        <Typography variant="h4" color="blue-gray" >
                            Order Details 
                        </Typography>
                        <div>
                        <Typography variant="h6" color="blue-gray">
                        Date:  {formattedDate}
                        </Typography>
                        
                    </div>
                  </div>
                    <div className="mb-4">
                        <Typography variant="h6" color="blue-gray">
                            Name:
                        </Typography>
                        <Typography variant="paragraph">
                            {orderData.name}
                        </Typography>
                    </div>
                    <div className="mb-4">
                        <Typography variant="h6" color="blue-gray">
                            Phone:
                        </Typography>
                        <Typography variant="paragraph">
                            {orderData.phone}
                        </Typography>
                    </div>
                    <div className="mb-4">
                        <Typography variant="h6" color="blue-gray">
                            Address:
                        </Typography>
                        <Typography variant="paragraph" className="whitespace-pre-line">
                            {orderData.address}
                        </Typography>
                    </div>
                    <div className="mb-4">
                        <Typography variant="h6" color="blue-gray">
                            Total: {orderData.total} Tk
                        </Typography>
                   
                    </div>
                    <div className="mb-4">
                        <Typography variant="h6" color="blue-gray">
                            Quantity: {orderData.quantity}
                        </Typography>
                     
                    </div>
            
                    <div className='my-2'>
                        <Button onClick={onConfirm} fullWidth color='green'>Confirm</Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default Details;
