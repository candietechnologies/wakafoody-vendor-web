import React, { useState } from "react";
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

import InputComponent from "../../components/Input";
import Wrapper from "../../components/Wrapper";
import CustomSelect from "../../components/CustomSelect";
import AddCollectionModal from "../../components/AddCollection";
import AddMenuOptionModal from "../../components/AddMenuOption";
import AddPack from "../../components/AddPack";

const AddMenu = ({
  collections = [],
  categories = [],
  menuOptions = [],
  packs = [],
  onAddNewCollection,
  onAddNewMenuOption,
  onAddNewPack,
  onSubmit,
}) => {
  const collectionProps = useDisclosure();
  const menuOption = useDisclosure();
  const packProps = useDisclosure();

  const [form, setForm] = useState({
    image: null,
    name: "",
    description: "",
    price: "",
    discount: "",
    collection: "",
    category: "",
    option: "",
    pack: "",
    inStock: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Wrapper title="Add Menu">
      <AddPack isOpen={packProps.isOpen} onClose={packProps.onClose} />
      <AddCollectionModal
        isOpen={collectionProps.isOpen}
        onClose={collectionProps.onClose}
      />
      <AddMenuOptionModal
        isOpen={menuOption.isOpen}
        onClose={menuOption.onClose}
      />
      <Box
        w="100%"
        mx="auto"
        p="1rem"
        bg={useColorModeValue("white", "gray.800")}
        borderColor={useColorModeValue("gray.200", "gray.700")}
        rounded="lg">
        <Heading size="md" mb={4}>
          Add New Menu Item
        </Heading>

        <form className="p-[1rem]" onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            {/* Image */}
            <FormControl>
              <FormLabel>Menu Image</FormLabel>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              {form.image && (
                <Image
                  src={URL.createObjectURL(form.image)}
                  alt="Preview"
                  mt={2}
                  boxSize="100px"
                  objectFit="cover"
                  borderRadius="md"
                />
              )}
            </FormControl>

            <InputComponent
              label="Menu Name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Menu name"
            />

            <InputComponent
              inputType="textarea"
              label="Description"
              name="description"
              value={form.description}
              onChange={handleInputChange}
              placeholder="description..."
            />

            <InputComponent
              label="Price (₦)"
              name="price"
              type="number"
              value={form.price}
              onChange={handleInputChange}
              placeholder="1,500"
            />

            <InputComponent
              label="Discount (%)"
              name="discount"
              type="number"
              value={form.discount}
              onChange={handleInputChange}
              placeholder="10"
            />

            <CustomSelect
              label="Collection"
              name="collection"
              value={form.collection}
              options={collections}
              onChange={handleInputChange}
              onAddNew={onAddNewCollection}
              onClick={collectionProps.onOpen}
            />

            <CustomSelect
              label="Meal Category"
              name="category"
              value={form.category}
              options={categories}
              onChange={handleInputChange}
              visible={false}
            />

            <CustomSelect
              label="Menu Option"
              name="option"
              value={form.option}
              options={menuOptions}
              onChange={handleInputChange}
              onAddNew={onAddNewMenuOption}
              onClick={menuOption.onOpen}
            />

            <CustomSelect
              label="Pack"
              name="pack"
              value={form.pack}
              options={packs}
              onChange={handleInputChange}
              onAddNew={onAddNewPack}
              onClick={packProps.onOpen}
            />

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Available / In Stock</FormLabel>
              <Switch
                isChecked={form.inStock}
                onChange={() =>
                  setForm((prev) => ({ ...prev, inStock: !prev.inStock }))
                }
                colorScheme="green"
              />
            </FormControl>

            <Button bg="brand.100" color="#fff" type="submit">
              Add Menu
            </Button>
          </VStack>
        </form>
      </Box>
    </Wrapper>
  );
};

export default AddMenu;
