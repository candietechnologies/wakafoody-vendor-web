import React, { useEffect } from "react";
import Wrapper from "../../components/Wrapper";
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import PromotionTable from "./PromotionTable";
import { useRestaurant } from "../../context/restaurant";
import useGet from "../../hooks/useGet";
import { url } from "../../utils/lib";
import PromotionTableSkeleton from "./PromotionSkeleton";
import EmptyComponent from "../../components/EmptyComponent";
import { useQueryClient } from "@tanstack/react-query";
import CreatePromotionModal from "./CreatePromotion";

export default function Promotion() {
  const { activeRestaurant } = useRestaurant();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const queryclient = useQueryClient();

  const restaurantId = activeRestaurant?._id;

  const { data, isPending } = useGet(
    `${url}/v1/sponsored?restaurant=${restaurantId}`,
    "sponsored"
  );
  useEffect(() => {
    queryclient.invalidateQueries({ queryKey: ["sponsored"] });
  }, [restaurantId, queryclient]);
  return (
    <Wrapper>
      {isOpen && <CreatePromotionModal isOpen={isOpen} onClose={onClose} />}
      <Flex
        w="100%"
        h="100%"
        direction="column"
        gap="1rem"
        p={{ lg: 4, base: 1 }}>
        <Flex w="100%" align="end" justify="end">
          <Button
            onClick={onOpen}
            colorScheme="orange"
            bg="brand.100"
            color="#fff">
            Create Promotion
          </Button>
        </Flex>
        {isPending && <PromotionTableSkeleton />}
        {data?.data && data?.data?.length > 0 && (
          <PromotionTable list={data?.data} />
        )}
        {data?.data && data?.data?.length === 0 && <EmptyComponent />}
      </Flex>
    </Wrapper>
  );
}
