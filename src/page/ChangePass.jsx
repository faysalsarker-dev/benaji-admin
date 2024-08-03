import { Button, Card, Input, Typography } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";


const ChangePassword = () => {
    const { changePassword, user } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        if (data.newPassword === data.confirmPassword) {
            await changePassword(data.newPassword);
            reset();
            navigate('/');
        } else {
            toast.error("Passwords do not match");
        }
    };

    return (
        <div className="flex justify-center flex-col items-center min-h-screen">
              <Typography variant="h4" color="primary" className=" text-center">
                    Change Password
                </Typography>
            <Card color="transparent" shadow={false} className="p-8">
              
                <div className="flex justify-center">
                    <img className="w-28 rounded-full border-2 p-2 border-primary" src={user?.photoURL} alt="" />
                </div>
                <Typography variant="h4" color="primary" className="text-center">
                    {user?.email}
                </Typography>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto"
                >
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            New Password
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            className="!border-t-blue-gray-200 focus:!border-primary"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            {...register("newPassword", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                            })}
                        />
                        {errors.newPassword?.type === "required" && (
                            <p className="text-red-600">New Password is required</p>
                        )}
                        {errors.newPassword?.type === "minLength" && (
                            <p className="text-red-600">Password must be at least 6 characters</p>
                        )}
                        {errors.newPassword?.type === "maxLength" && (
                            <p className="text-red-600">Password must be less than 20 characters</p>
                        )}

                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Confirm Password
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            className="!border-t-blue-gray-200 focus:!border-primary"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            {...register("confirmPassword", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                            })}
                        />
                        {errors.confirmPassword?.type === "required" && (
                            <p className="text-red-600">Confirm Password is required</p>
                        )}
                        {errors.confirmPassword?.type === "minLength" && (
                            <p className="text-red-600">Password must be at least 6 characters</p>
                        )}
                        {errors.confirmPassword?.type === "maxLength" && (
                            <p className="text-red-600">Password must be less than 20 characters</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="mt-6 bg-primary"
                        fullWidth
                        variant="filled"
                    >
                        Change Password
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default ChangePassword;
