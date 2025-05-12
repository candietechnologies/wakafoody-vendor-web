import React from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Container,
  Button,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import AddPayoutModal from "./AddPayoutInfo";
import useGet from "../../hooks/useGet";
import { url } from "../../utils/lib";
import Spinner from "../../components/Spinner";
import { useRestaurant } from "../../context/restaurant";

const PayoutInfo = () => {
  const bg = useColorModeValue("white", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activeRestaurant } = useRestaurant();

  const { data, isPending } = useGet(
    `${url}/v1/payment-information?restaurant=${activeRestaurant?._id}`,
    "payout info"
  );

  const payout = data?.data;

  if (isPending) return <Spinner />;

  return (
    <Container mt={10}>
      <AddPayoutModal isOpen={isOpen} onClose={onClose} />
      {payout ? (
        <Box
          p={6}
          borderWidth={1}
          borderRadius="lg"
          bg={bg}
          boxShadow="sm"
          maxW="500px">
          <VStack align="start" spacing={4}>
            <Text fontSize="xl" fontWeight="bold">
              Payout Information
            </Text>

            <HStack>
              <Text fontWeight="semibold" minW="120px">
                Bank Name:
              </Text>
              <Text color="gray.600">{payout?.bankName}</Text>
            </HStack>

            <HStack>
              <Text fontWeight="semibold" minW="120px">
                Account Name:
              </Text>
              <Text color="gray.600">{payout?.accountName}</Text>
            </HStack>

            <HStack>
              <Text fontWeight="semibold" minW="120px">
                Account Number:
              </Text>
              <Text color="gray.600">{payout?.accountNumber}</Text>
            </HStack>

            <Box pt={4}>
              <Text fontSize="sm" color="gray.500">
                To change your payout information, please contact support at{" "}
                <Text as="span" color="orange.500" fontWeight="medium">
                  support@wakafoody.ng
                </Text>
                .
              </Text>
            </Box>
          </VStack>
        </Box>
      ) : (
        <Center flexDirection="column" py={10}>
          <Text fontSize="lg" mb={4} color="gray.600">
            You haven’t added your payout information yet.
          </Text>
          <Button
            bg="brand.100"
            color="#fff"
            colorScheme="orange"
            onClick={onOpen}>
            Add Payout Info
          </Button>
        </Center>
      )}
    </Container>
  );
};

export default PayoutInfo;
