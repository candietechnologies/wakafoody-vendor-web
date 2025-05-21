import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Avatar,
} from "@chakra-ui/react";
import amountFormater from "../../utils/amount-formatter";
import { usePost } from "../../hooks/usePost";
import { url } from "../../utils/lib";
import { toast } from "react-toastify";
import { useRestaurant } from "../../context/restaurant";

const PromotionTable = ({ list }) => {
  const { activeRestaurant } = useRestaurant();
  const endHandler = usePost({
    url: `${url}/v1/sponsored/end`,
    queryKey: "sponsored",
    title: "Promotion ended",
    onSuccess: () => toast.success("Promotion ended"),
  });

  return (
    <Box bg="white" overflowX="scroll" p={4}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th whiteSpace="nowrap">S/No</Th>
            <Th whiteSpace="nowrap">Name</Th>
            <Th whiteSpace="nowrap">Image</Th>
            <Th whiteSpace="nowrap">Discount</Th>
            <Th whiteSpace="nowrap">Discount Price (₦)</Th>
            <Th whiteSpace="nowrap">Original Price (₦)</Th>
            <Th whiteSpace="nowrap">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list?.map((item, index) => (
            <Tr key={index}>
              <Td whiteSpace="nowrap">{index + 1}</Td>
              <Td textTransform="capitalize" whiteSpace="nowrap">
                {item?.name}
              </Td>
              <Td whiteSpace="nowrap">
                <Avatar
                  src={item?.image}
                  alt={item?.name}
                  size={{ lg: "md", base: "sm" }}
                />
              </Td>
              <Td whiteSpace="nowrap">{item?.discount || 0}%</Td>
              <Td whiteSpace="nowrap">₦{amountFormater(item?.price || 0)}</Td>
              <Td whiteSpace="nowrap">
                ₦{amountFormater(item?.originalPrice || 0)}
              </Td>
              <Td whiteSpace="nowrap">
                <Button
                  isLoading={endHandler.isPending}
                  isDisabled={endHandler.isPending}
                  onClick={() =>
                    endHandler.mutate({
                      menu: item?._id,
                      restaurant: activeRestaurant?._id,
                    })
                  }
                  size={{ lg: "sm", base: "xs" }}
                  colorScheme="red">
                  End
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default PromotionTable;
