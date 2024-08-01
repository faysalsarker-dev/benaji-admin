import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
import useAuth from "../Hook/useAuth";

export function Register() {
  const [imageUrl, setImageUrl] = useState(null);
  const [img, setImg] = useState(null);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const { createUser, profileUpdate, setUser, loading, setLoading } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", img);

      const { data: imgData } = await axios.post(`https://api.imgbb.com/1/upload?key=c574bd5458d78740bdd523d664057318`, formData);

      createUser(data.email, data.password)
        .then(() => {
          profileUpdate(data.name, imgData.data.display_url)
            .then((res) => {
              toast.success("Registration successful");
              setUser(res);
              navigate('/');
              reset();
            });
        }).catch(error => {
          setErr(error.message);
          setLoading(false);
        });
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error("Registration failed. Please try again later.");
    }
  };

  const handleImg = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
    setImg(file);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card color="transparent" shadow={false} className="p-8 w-full max-w-md">
        <Typography variant="h4" color="primary" className="text-center bg-green-500 text-white rounded-lg my-2">
          Benaji -Admin penel
        </Typography>

        <Typography variant="h4" color="primary" className="text-center mb-6">
          Register
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="text-center relative">
            <label htmlFor="fileInput" className="mx-auto flex flex-col items-center justify-center w-24 h-24 bg-gray-200 rounded-full cursor-pointer">
              {imageUrl ? (
                <img src={imageUrl} alt="Uploaded" className="w-full h-full rounded-full" />
              ) : (
                <>
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    alt="Default Avatar"
                    className="w-full h-full rounded-full"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="absolute bottom-0 ml-12 text-primary font-extrabold size-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </>
              )}
              <input
                id="fileInput"
                type="file"
                onChange={(e) => handleImg(e)}
                className="hidden"
              />
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <Typography variant="h6" color="blue-gray">
                Your Name
              </Typography>
              <Input
                {...register("name", { required: true })}
                size="lg"
                placeholder="Your Name"
                className="!border-t-blue-gray-200 focus:!border-primary"
                labelProps={{ className: "before:content-none after:content-none" }}
              />
              {errors.name && <span className="text-red-600">Name is required</span>}
            </div>

            <div>
              <Typography variant="h6" color="blue-gray">
                Your Email
              </Typography>
              <Input
                {...register("email", { required: true })}
                size="lg"
                placeholder="name@mail.com"
                className="!border-t-blue-gray-200 focus:!border-primary"
                labelProps={{ className: "before:content-none after:content-none" }}
              />
              {errors.email && <span className="text-red-600">Email is required</span>}
            </div>

            <div>
              <Typography variant="h6" color="blue-gray">
                Password
              </Typography>
              <Input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
          
                })}
                size="lg"
                placeholder="********"
                className="!border-t-blue-gray-200 focus:!border-primary"
                labelProps={{ className: "before:content-none after:content-none" }}
              />
              {errors.password?.type === "required" && <span className="text-red-600">Password is required</span>}
              {errors.password?.type === "minLength" && <span className="text-red-600">Password must be at least 6 characters</span>}
              {errors.password?.type === "maxLength" && <span className="text-red-600">Password must be less than 20 characters</span>}
              
            </div>
          </div>

          {err && <p className="text-red-600 text-center">{err}</p>}

          <Button type="submit" className="mt-6 bg-primary" fullWidth variant="filled" disabled={loading}>
            {loading ? <BeatLoader size={6} color="#FFFFFF" /> : 'Sign Up'}
          </Button>

          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to='/login' className="font-medium text-primary">
              Log In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
