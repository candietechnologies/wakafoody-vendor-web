import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Box,
  Text,
  HStack,
  IconButton,
  Tooltip,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCheckDouble } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { formatDate } from "../../utils/format-date";
import { formatTime } from "../../utils/formatTime";
import amountFormater from "../../utils/amount-formatter";
import { useQueryClient } from "@tanstack/react-query";
import { useRestaurant } from "../../context/restaurant";
import { usePatch } from "../../hooks/usePatch";
import { url } from "../../utils/lib";
import { useNavigate } from "react-router-dom";

const statusColor = {
  paid: "orange",
  accepted: "pink",
  declined: "red",
  delivered: "green",
  "ready for pickup": "pink",
  "pickup accepted": "pink",
  "picked up": "pink",
};

const OrderTable = ({ list }) => {
  const tableBg = useColorModeValue("gray.100", "gray.700");
  const queryClient = useQueryClient();
  const { activeRestaurant } = useRestaurant();
  const navigate = useNavigate();

  const restaurantId = activeRestaurant?._id;

  const [selectedOrder, setOrder] = useState("");

  function viewOrder(orderId) {
    navigate(`/orders/${orderId}`);
  }

  function handleSuccess() {
    queryClient.invalidateQueries([`orders-${restaurantId}`]);
  }

  const acceptHandler = usePatch({
    url: `${url}/v1/order/${selectedOrder?.id}/vendor/accept?restaurant=${restaurantId}`,
    queryKey: `orders-${restaurantId}`,
    title: "Order accepted",
    onSuccess: handleSuccess,
  });

  const declineHandler = usePatch({
    url: `${url}/v1/order/${selectedOrder?.id}/vendor/decline?restaurant=${restaurantId}`,
    queryKey: `orders-${restaurantId}`,
    title: "Order declined",
    onSuccess: handleSuccess,
  });

  return (
    <Box bg="white" w="100%" overflowX="auto">
      <Table bg="white" variant="simple">
        <Thead bg={tableBg}>
          <Tr>
            <Th>S/N</Th>
            <Th>Order ID</Th>
            <Th>Customer</Th>
            <Th>Price</Th>
            <Th>Menu</Th>
            <Th>Status</Th>
            <Th>Date</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list && list?.length > 0 ? (
            <>
              {list?.map((order, index) => (
                <Tr key={order.id}>
                  <Td>{index + 1}</Td>
                  <Td>{order?.orderId}</Td>
                  <Td textTransform="capitalize">
                    {order?.user?.length > 0
                      ? `${order?.user[0]?.firstName} ${order?.user[0]?.lastName}`
                      : "-"}
                  </Td>
                  <Td>₦{amountFormater(order.price || 0)}</Td>
                  <Td>
                    <Box display="flex" alignItems="center">
                      <Avatar src={order.menu.image} size="sm" mr={2} />
                      <Text textTransform="capitalize">{order.menu.name}</Text>
                    </Box>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={statusColor[order.status]}
                      fontSize="12px"
                      px={2}
                      py="0.3rem"
                      style={{ fontFamily: "Poppins" }}
                      rounded="md">
                      {order.status.toUpperCase()}
                    </Badge>
                  </Td>
                  <Td>
                    {formatDate(order.date)},{formatTime(order.date)}
                  </Td>
                  <Td>
                    <HStack align="center" justify="center" spacing={2}>
                      {order?.status === "paid" && (
                        <>
                          <Tooltip label="Accept Order">
                            <IconButton
                              colorScheme="green"
                              icon={<FaCheckDouble />}
                              size="xs"
                              isLoading={
                                acceptHandler.isPending &&
                                selectedOrder?.id === order?.id
                              }
                              isDisabled={
                                acceptHandler.isPending &&
                                selectedOrder?.id === order?.id
                              }
                              onClick={() => {
                                setOrder(order);
                                acceptHandler.mutate({});
                              }}
                            />
                          </Tooltip>

                          <Tooltip label="Decline Order">
                            <IconButton
                              colorScheme="red"
                              icon={<MdCancel />}
                              size="xs"
                              isLoading={
                                declineHandler.isPending &&
                                selectedOrder?.id === order?.id
                              }
                              isDisabled={
                                declineHandler.isPending &&
                                selectedOrder?.id === order?.id
                              }
                              onClick={() => {
                                setOrder(order);
                                declineHandler.mutate({});
                              }}
                            />
                          </Tooltip>
                        </>
                      )}

                      <Tooltip label="View Order">
                        <IconButton
                          colorScheme="orange"
                          icon={<FaEye />}
                          size="xs"
                          onClick={() => {
                            setOrder(order);
                            viewOrder(order?.orderId);
                          }}
                        />
                      </Tooltip>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </>
          ) : (
            <Tr>
              <Td colSpan={8}>
                <Text textAlign="center" color="gray.500" py={4}>
                  No orders available.
                </Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default OrderTable;
