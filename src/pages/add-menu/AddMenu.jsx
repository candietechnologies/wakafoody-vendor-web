import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Switch,
  VStack,
  Heading,
  Image,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  discount: z.any(),
});

import InputComponent from "../../components/Input";
import Wrapper from "../../components/Wrapper";
import CustomSelect from "../../components/CustomSelect";
import AddCollectionModal from "../../components/AddCollection";
import AddMenuOptionModal from "../../components/AddMenuOption";
import AddPack from "../../components/AddPack";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useRestaurant } from "../../context/restaurant";
import useGet from "../../hooks/useGet";
import { url } from "../../utils/lib";
import Spinner from "../../components/Spinner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { usePost } from "../../hooks/usePost";
import { uploadUrl } from "../../utils/lib";

const AddMenu = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { activeRestaurant } = useRestaurant();

  const bg = useColorModeValue("white", "gray.800");
  const borderBg = useColorModeValue("gray.200", "gray.700");

  const collectionProps = useDisclosure();
  const menuOptionProps = useDisclosure();
  const packProps = useDisclosure();

  const [category, setCategory] = useState("");
  const [packs, setPacks] = useState([]);
  const [collection, setCollection] = useState("");
  const [selectedMenuOptions, setMenuOptions] = useState([]);
  const [inStock, setInStock] = useState(true);
  const [file, setFile] = useState("");
  const [payload, setPayload] = useState("");

  const restaurantId = activeRestaurant?._id;

  const { data, isPending } = useGet(`${url}/v1/category/vendor`, `categories`);
  const { data: collectionData, isPending: isCollectionLoading } = useGet(
    `${url}/v1/collection?restaurant=${restaurantId}`,
    `collection-${restaurantId}`
  );

  const { data: optionData, isPending: isOptionLoading } = useGet(
    `${url}/v1/option?restaurant=${restaurantId}`,
    `options-${restaurantId}`
  );

  const { data: menuOptionData, isPending: isMenuOptionLoading } = useGet(
    `${url}/v1/menu-options?restaurant=${restaurantId}`,
    `menu-options-${restaurantId}`
  );

  const { data: packData, isPending: isPackLoading } = useGet(
    `${url}/v1/pack?restaurant=${restaurantId}`,
    `packs-${restaurantId}`
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const menuHandler = usePost({
    url: `${url}/v1/menu`,
    queryKey: `menu-${restaurantId}`,
    title: "Menu added",
    onSuccess: () => {
      toast.success("Menu added");
      navigate("/menus");
      reset();
      setCategory("");
      setCollection("");
      setPacks([]);
      setMenuOptions([]);
      setFile("");
    },
  });

  const handleSuccess = (data) => {
    const payloadData = {
      ...payload,
      image: data?.data,
    };
    menuHandler.mutate(payloadData);
  };

  const uploadHandler = usePost({
    queryKey: "image",
    url: `${uploadUrl}/image-upload`,
    onSuccess: handleSuccess,
    onError: () => {},
    contentType: "multipart/form-data",
  });

  const categories = data?.data || [];
  const collections = collectionData?.data || [];
  const options = optionData?.data || [];
  const packList = packData?.data || [];
  const menuOptions = menuOptionData?.data || [];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const onSubmit = (data) => {
    if (!file) return toast.warn("Upload menu image");
    if (!category) return toast.warn("Select a category");
    if (!collection) return toast.warn("Select a collection");

    const payload = {
      ...data,
      category: category.label,
      collection: collection.label,
      restaurant: restaurantId,
      packs: packs.map((el) => el.value),
      options: selectedMenuOptions.map((el) => el.value),
      inStock,
    };

    setPayload(payload);

    const formData = new FormData();
    formData.append("image", file);

    uploadHandler.mutate(formData);
  };

  // Invalidate queries on restaurant change
  useEffect(() => {
    if (!restaurantId) return;

    const keys = [
      `menu-options-${restaurantId}`,
      `options-${restaurantId}`,
      `packs-${restaurantId}`,
      `collection-${restaurantId}`,
    ];

    keys.forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }));
  }, [restaurantId, queryClient]);

  if (
    isPending ||
    isCollectionLoading ||
    isOptionLoading ||
    isMenuOptionLoading ||
    isPackLoading
  )
    return <Spinner />;

  return (
    <Wrapper title="Add Menu">
      <AddPack isOpen={packProps.isOpen} onClose={packProps.onClose} />
      <AddCollectionModal
        isOpen={collectionProps.isOpen}
        onClose={collectionProps.onClose}
      />
      <AddMenuOptionModal
        isOpen={menuOptionProps.isOpen}
        onClose={menuOptionProps.onClose}
        options={options}
        restaurantId={restaurantId}
      />
      <Box
        w="100%"
        mx="auto"
        p="1rem"
        bg={bg}
        borderColor={borderBg}
        rounded="lg">
        <Heading size="md" mb={4}>
          Add New Menu Item
        </Heading>

        <form className="p-[1rem]" onSubmit={handleSubmit(onSubmit)}>
          <VStack pb="3rem" spacing={4} align="stretch">
            {/* Image */}
            <FormControl required={true}>
              <FormLabel>Menu Image</FormLabel>
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

            <CustomSelect
              label="Meal Category"
              name="category"
              value={category}
              options={categories.map((el) => {
                return { label: el.name, value: el._id };
              })}
              onChange={(e) => setCategory(e)}
              visible={false}
              custom
              required={true}
            />

            <CustomSelect
              label="Collection"
              name="collection"
              value={collection}
              options={collections.map((el) => {
                return { label: el.name, value: el._id };
              })}
              onChange={(e) => setCollection(e)}
              onClick={collectionProps.onOpen}
              custom
              required={true}
            />

            <InputComponent
              label="Menu Name"
              name="name"
              register={register}
              placeholder="Menu name"
              required={true}
              info={errors.name?.message ? errors.name.message : null}
            />

            <InputComponent
              inputType="textarea"
              label="Description"
              name="description"
              register={register}
              placeholder="description..."
              required={true}
              info={
                errors.description?.message ? errors.description.message : null
              }
            />

            <InputComponent
              label="Price (₦)"
              name="price"
              type="number"
              register={register}
              placeholder="1,500"
              required={true}
              info={errors.price?.message ? errors.price.message : null}
            />

            <InputComponent
              label="Discount (%)"
              name="discount"
              type="number"
              register={register}
              placeholder="10"
            />

            <CustomSelect
              required={false}
              label="Menu Option"
              name="option"
              multiple
              options={menuOptions.map((el) => {
                return {
                  label: el.name,
                  value: el._id,
                };
              })}
              value={selectedMenuOptions}
              onChange={(e) => setMenuOptions(e)}
              onClick={menuOptionProps.onOpen}
              custom
            />

            <CustomSelect
              label="Pack"
              name="pack"
              options={packList.map((el) => {
                return {
                  label: `${el.name} (${el.price})`,
                  value: el._id,
                };
              })}
              multiple
              custom
              value={packs}
              onChange={(e) => setPacks(e)}
              onClick={packProps.onOpen}
              required={false}
            />

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">In Stock</FormLabel>
              <Switch
                isChecked={inStock}
                onChange={() => setInStock((prev) => !prev)}
                colorScheme="orange"
              />
            </FormControl>

            <Button
              isLoading={uploadHandler.isPending || menuHandler.isPending}
              isDisabled={uploadHandler.isPending || menuHandler.isPending}
              bg="brand.100"
              color="#fff"
              colorScheme="orange"
              type="submit">
              Add Menu
            </Button>
          </VStack>
        </form>
      </Box>
    </Wrapper>
  );
};

export default AddMenu;
