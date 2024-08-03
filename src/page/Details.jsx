import {  Button, Card, CardBody, Typography } from '@material-tailwind/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hook/useAxios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

const Details = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()

    const { data: orderData = {}, isLoading } = useQuery({
        queryKey: ["details", id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/order-details/${id}`);
            return data;
        },
    });

    const { mutateAsync: confirmOrder } = useMutation({
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

    const { mutateAsync: deleteOrder } = useMutation({
        mutationFn: async () => {
            const { data } = await axiosSecure.delete(`/order-delete/${id}`);
            return data;
        },
        onSuccess: () => {
            Swal.fire({
                title: "Deleted!",
                text: "Order has been deleted.",
                icon: "success",
                customClass: {
                    title: 'text-green-600',
                    content: 'text-gray-700',
                    confirmButton: 'bg-green-500 text-white hover:bg-green-600'
                }
            });
            navigate(-1)
        },
        onError: (error) => {
            console.error("Error deleting order:", error);
            Swal.fire({
                title: "Error!",
                text: "There was an issue deleting the order. Please try again.",
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
            ConfirmDate: new Date(),
            status: 'confirm'
        };
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, confirm it!",
            cancelButtonText: "No, cancel!",
            customClass: {
                title: 'text-yellow-600',
                content: 'text-gray-700',
                confirmButton: 'bg-green-500 text-white hover:bg-green-700 p-3 rounded-lg ml-2',
                cancelButton: 'bg-red-500 text-white hover:bg-red-700 p-3 rounded-lg'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                confirmOrder(info);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
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

    const onDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            customClass: {
                title: 'text-yellow-600',
                content: 'text-gray-700',
                confirmButton: 'bg-green-500 text-white hover:bg-green-700 p-3 rounded-lg ml-2',
                cancelButton: 'bg-red-500 text-white hover:bg-red-700 p-3 rounded-lg'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                deleteOrder();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Cancelled",
                    text: "Your order is not deleted :)",
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

    const formattedDate = new Date(orderData.date).toLocaleDateString();

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><ScaleLoader color="green" /></div>;
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 ">
     
     <div className={`flex items-center p-4 mb-4 text-sm border rounded-lg  w-full  ${orderData?.status === 'confirm' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'}`} role="alert">
      {orderData?.status === 'confirm' ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
      )}
      <span>This order is {orderData.status}  at {orderData?.ConfirmDate ? new Date(orderData?.ConfirmDate).toLocaleDateString():new Date(orderData?.date).toLocaleDateString()}</span>
    </div>
    
<div className='flex justify-end items-end  w-full '>
   
        <button onClick={onDelete} className='p-4 bg-red-700 text-white rounded-lg'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
        </button>
  
</div>
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
                        <Button disabled={orderData?.status === 'confirm'} onClick={onConfirm} fullWidth color='green'>{orderData?.status === 'confirm' ?'confirmed':'confirm'}</Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default Details;
