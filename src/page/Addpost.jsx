import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../Hook/useAxios";
import { SyncLoader } from "react-spinners";
import axios from "axios";


const Addpost = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [img, setImg] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [value, setValue] = useState("file");
  const [btnSpin, setBtnSpin] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleImg = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
    setImg(file);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (info) => {
      const { data } = await axiosSecure.post('/add-product', info);
      return data;
    },
    onSuccess: () => {
      setBtnSpin(false);
      toast.success("পোষ্ট সফলভাবে যোগ করা হয়েছে");
      reset();
      setImageUrl(null);
      setImg(null);
    },
    onError: (error) => {
      console.error("Error adding post:", error);
      setBtnSpin(false);
      toast.error("পোষ্ট যোগ করতে ত্রুটি হয়েছে। আবার চেষ্টা করুন।");
    },
  });

  const onSubmit = async (data) => {
    setBtnSpin(true);
    const formData = new FormData();
    formData.append("image", img);

    try {
      const { data: imgData } = await axios.post(
        `https://api.imgbb.com/1/upload?key=c574bd5458d78740bdd523d664057318`,
        formData
      );
      const newData = {
        image: imgData.data.display_url,
        ...data,
        date: new Date(),
        type: value
      };
      console.log(newData);
      await mutateAsync(newData);
    } catch (error) {
      console.error("Error uploading image:", error);
      setBtnSpin(false);
      toast.error("ছবি আপলোড করতে ত্রুটি হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      
      <Card color="white" shadow={true} className="p-6 max-w-lg w-full">
        <Typography variant="h4" color="blue-gray" className="text-center mb-4">
          পোস্ট যোগ করুন
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-4">
            <Typography variant="h6" color="blue-gray">
              প্রধান শিরোনাম
            </Typography>
            <Input
              size="lg"
              placeholder="প্রধান শিরোনাম লিখুন"
              {...register("headline", { required: "এই ক্ষেত্রটি পূরণ করা আবশ্যক" })}
              className="border-blue-gray-200 focus:border-gray-900"
            />
            {errors.headline && <p className="text-red-500">{errors.headline.message}</p>}

            <Typography variant="h6" color="blue-gray">
              খাবার নিয়ম
            </Typography>
            <Textarea
              size="lg"
              placeholder="খাবার নিয়ম লিখুন"
              {...register("rules", { required: "এই ক্ষেত্রটি পূরণ করা আবশ্যক" })}
              className="border-blue-gray-200 focus:border-gray-900"
            />
            {errors.rules && <p className="text-red-500">{errors.rules.message}</p>}

            <Typography variant="h6" color="blue-gray">
              ছবি আপলোড করুন
            </Typography>
            <div className="relative w-full h-50 border-dashed border-2 border-gray-700 bg-gray-200 rounded-lg flex justify-center items-center">
              {imageUrl ? (
                <img src={imageUrl} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="text-center">
                  <h3 className="text-2xl font-bold">
                    ছবি আপলোড করুন
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 inline-block ml-2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </h3>
                </div>
              )}
              <input type="file" onChange={handleImg} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>

            <Typography variant="h6" color="blue-gray">
              নাম
            </Typography>
            <Input
              size="lg"
              placeholder="নাম লিখুন"
              {...register("name", { required: "এই ক্ষেত্রটি পূরণ করা আবশ্যক" })}
              className="border-blue-gray-200 focus:border-gray-900"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

            <Typography variant="h6" color="blue-gray">
              মূল্য
            </Typography>
            <div className="relative flex w-full">
              <Input
                size="lg"
                placeholder="মূল্য লিখুন"
                type="number"
                {...register("price", { required: "এই ক্ষেত্রটি পূরণ করা আবশ্যক" })}
                className="border-blue-gray-200 focus:border-gray-900"
              />
              <div className="flex items-center bg-primary text-white rounded-lg p-2 ml-2">
                টাকা
              </div>
            </div>
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}

            <Typography variant="h6" color="blue-gray">
              ধরণ
            </Typography>
            <Select
              label="ধরণ নির্বাচন করুন"
              value={value}
              onChange={(val) => setValue(val)}
              
            >
              <Option value="file">ফাইল</Option>
              <Option value="piece">পিস</Option>
            </Select>



            <Typography variant="h6" color="blue-gray">
            উপকারিতার শিরোনাম
            </Typography>
            <Textarea
              size="lg"
              placeholder="উপকারিতা শিরোনাম"
              {...register("benefitHeadline", { required: "এই ক্ষেত্রটি পূরণ করা আবশ্যক" })}
              className="border-blue-gray-200 focus:border-gray-900"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}



            <Typography variant="h6" color="blue-gray">
              উপকারিতা
            </Typography>
            <Textarea
              size="lg"
              placeholder="উপকারিতা লিখুন"
              {...register("benefits", { required: "এই ক্ষেত্রটি পূরণ করা আবশ্যক" })}
              className="border-blue-gray-200 focus:border-gray-900"
            />
            {errors.benefits && <p className="text-red-500">{errors.benefits.message}</p>}
          </div>
       
          <Button disabled={btnSpin} type="submit" className="mt-10 bg-primary" fullWidth>
            {btnSpin ? <SyncLoader size={8} color="#FFFFFF" /> : 'জমা দিন'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Addpost;
