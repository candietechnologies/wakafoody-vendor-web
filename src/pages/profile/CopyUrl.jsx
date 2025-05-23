import React from "react";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useClipboard,
  Text,
} from "@chakra-ui/react";
import { useRestaurant } from "../../context/restaurant";
import { toast } from "react-toastify";

const CopyRestaurantURL = () => {
  const { activeRestaurant } = useRestaurant();
  const url = `https://web.wakafoody.ng/${activeRestaurant?.username}`;
  const { hasCopied, onCopy } = useClipboard(url);

  const handleCopy = async () => {
    onCopy();
    if (navigator.share) {
      try {
        await navigator.share({
          title: activeRestaurant?.name,
          text:
            activeRestaurant?.description ||
            "Check out this restaurant on WakaFoody!",
          url: url,
        });
      } catch {
        toast.error("Sharing was cancelled or failed.");
      }
    } else {
      toast.info("Sharing is not supported in this browser.");
    }
  };

  return (
    <Box my={4}>
      <Text fontWeight="medium" mb={2}>
        Your Restaurant URL:
      </Text>
      <InputGroup outline="none" focusBorderColor="brand.100" size="md">
        <Input
          outline="none"
          focusBorderColor="brand.100"
          value={url}
          isReadOnly
        />
        <InputRightElement width="6.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={handleCopy}
            colorScheme="orange"
            bg="brand.100"
            color="#fff">
            {hasCopied ? "Copied!" : "Copy Link"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default CopyRestaurantURL;
