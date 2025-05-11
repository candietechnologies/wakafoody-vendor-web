import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PhoneInput from "../../components/PhoneInput";
import CustomSelect from "../../components/CustomSelect";
import { usePost } from "../../hooks/usePost";
import { uploadUrl, url } from "../../utils/lib";
import { toast } from "react-toastify";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
} from "@chakra-ui/react";
import InputComponent from "../../components/Input";
import useGet from "../../hooks/useGet";
import Spinner from "../../components/Spinner";
import SearchAddress from "../../components/SearchAddress";
import { useRestaurant } from "../../context/restaurant";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  email: z.string().email({ message: "Invalid email address" }).trim(),
});

export default function CreateRestaurant({ handleNext }) {
  const [file, setFile] = useState("");
  const [payload, setPayload] = useState("");
  const [tags, setTags] = useState([]);
  const [address, setAddress] = useState("");

  const { selectRestaurant } = useRestaurant();

  const { data, isPending } = useGet(`${url}/v1/tag`, `tags`);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  function handleSuccessRestaurant(data) {
    reset();
    setFile("");
    handleNext();
    selectRestaurant(data?.data);
  }

  const handleSuccess = (data) => {
    const payloadData = {
      ...payload,
      image: data?.data,
    };

    restaurantHandler.mutate(payloadData);
  };

  const restaurantHandler = usePost({
    url: `${url}/v1/restaurant`,
    queryKey: ``,
    title: "Menu added",
    onSuccess: (data) => {
      toast.success("Restaurant created");
      handleSuccessRestaurant(data);
    },
  });

  const uploadHandler = usePost({
    queryKey: "image",
    url: `${uploadUrl}/image-upload`,
    onSuccess: handleSuccess,
    onError: () => {},
    contentType: "multipart/form-data",
  });

  const onSubmit = (data) => {
    if (!file) return toast.warn("Upload menu image");
    if (tags.length === 0) return toast.warn("Select restaurant tags");
    if (!address) return toast.warn("Add restaurant address");

    const payload = {
      ...data,
      tags: tags.map((el) => el.value),
      ...address,
    };

    setPayload(payload);

    const formData = new FormData();
    formData.append("image", file);

    uploadHandler.mutate(formData);
  };

  if (isPending) return <Spinner />;

  return (
    <form
      // style={{ width: "100%", height: "100%" }}
      className="p-[1rem]"
      onSubmit={handleSubmit(onSubmit)}>
      <Flex w="100%" align="start" direction="column" gap="1rem">
        {/* Image */}
        <FormControl required={true}>
          <FormLabel>Restaurant Image</FormLabel>
          <Input type="file" accept="image/*" onChange={handleFileChange} />
          {file && (
            <Image
              src={URL.createObjectURL(file)}
              alt="Preview"
              mt={2}
              boxSize="100px"
              objectFit="cover"
              borderRadius="md"
            />
          )}
        </FormControl>

        <InputComponent
          label="Restaurant Name"
          name="name"
          register={register}
          placeholder="Waka Kitchen"
          required={true}
          info={errors.name?.message ? errors.name.message : null}
        />

        <InputComponent
          inputType="textarea"
          label="Restaurant Description"
          name="description"
          register={register}
          placeholder="description..."
          required={true}
          info={errors.description?.message ? errors.description.message : null}
        />
        <PhoneInput label="Phone Number" register={register} name="phone" />

        <InputComponent
          label="Restaurant Email"
          name="email"
          register={register}
          placeholder="wakakitchen@gmail.com"
          required={true}
          info={errors.email?.message ? errors.email.message : null}
        />

        <SearchAddress
          label="Restaurant Address"
          onClick={(e) => setAddress(e)}
        />

        <CustomSelect
          label="Tags"
          name="tags"
          value={tags}
          options={data?.data?.map((el) => {
            return { label: el, value: el };
          })}
          onChange={(e) => setTags(e)}
          visible={false}
          required={true}
          custom
          multiple={true}
        />

        <Flex
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          w="100%"
          gap={4}>
          <Button
            isLoading={uploadHandler.isPending || restaurantHandler.isPending}
            isDisabled={uploadHandler.isPending || restaurantHandler.isPending}
            w="100%"
            bg="brand.100"
            color="#fff"
            colorScheme="orange"
            type="submit">
            Continue
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
