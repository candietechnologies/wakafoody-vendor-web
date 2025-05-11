import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import PayoutOverview from "./PayoutOverview";
import SearchAndFilter from "../../components/SearchAndFilter";
import PayoutList from "./PayoutList";
import useGet from "../../hooks/useGet";
import { url } from "../../utils/lib";
import { useRestaurant } from "../../context/restaurant";
import PayoutListSkeleton from "./PayoutListSkeleton";
import RequestPayout from "./RequestPayout";
import { usePost } from "../../hooks/usePost";
import { toast } from "react-toastify";

export default function Payout() {
  const [filter, settFilter] = useState("all");
  const [list, setList] = useState([]);

  const { activeRestaurant } = useRestaurant();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const restaurantId = activeRestaurant?._id;

  const { data, isPending } = useGet(
    `${url}/v1/payout?restaurant=${restaurantId}`,
    `payouts-${restaurantId}`
  );

  function handleSuccess() {
    toast.success("Payout request initialized");
    onOpen();
  }

  const payoutHandler = usePost({
    url: `${url}/v1/payout?restaurant=${restaurantId}`,
    queryKey: `payouts-${restaurantId}`,
    title: "Payout request successful",
    onSuccess: handleSuccess,
  });

  useEffect(() => {
    if (!data?.data) return;
    if (filter && filter !== "all") {
      setList(data?.data?.history?.filter((el) => el.status === filter));
      return;
    }

    setList(data?.data?.history);
  }, [filter, data?.data]);

  const result = data?.data;

  return (
    <Wrapper title="Payout">
      <RequestPayout
        isOpen={isOpen}
        onClose={onClose}
        amount={result?.balance}
        restaurantId={restaurantId}
      />
      <Flex w="100%" direction="column" gap="1rem" p={{ lg: 4, base: 1 }}>
        <PayoutOverview
          balance={result?.balance}
          pending={result?.pending}
          disbursed={result?.disbursed}
        />
        <SearchAndFilter
          FILTERS={["all", "pending", "disbursed", "canceled"]}
          activeFilter={filter}
          setActiveFilter={settFilter}
          showSearch={false}
          component={
            <Button
              fontSize="14px"
              color="white"
              colorScheme="orange"
              isLoading={payoutHandler.isPending}
              isDisabled={payoutHandler.isPending}
              onClick={() => payoutHandler.mutate({})}
              bg="brand.100">
              Request Payout
            </Button>
          }
        />
        {isPending && <PayoutListSkeleton />}
        {!isPending && <PayoutList list={list} />}
      </Flex>
    </Wrapper>
  );
}
