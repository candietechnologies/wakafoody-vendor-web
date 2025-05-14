import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";

const PartnershipAgreement = ({ onAccept, isOpen, onClose }) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        scrollBehavior="inside"
        isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Partnership Agreement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box h="400px" overflowY="scroll" fontSize="sm" lineHeight="1.6">
              <Text>
                <b>
                  Partnership Agreement between Wakafoody and the Restaurant
                </b>
              </Text>
              <Text mt={4}>
                This Agreement is entered into between{" "}
                <b>Wakafoody Store Limited</b>, headquartered in Akure, Ondo
                State, Nigeria, and the food service business completing this
                onboarding process ("the Restaurant").
              </Text>

              <Text mt={4}>
                <b>1. Purpose</b>
              </Text>
              <Text>
                This Agreement defines the terms under which the Restaurant will
                list and sell food and beverages through the Wakafoody online
                delivery platform.
              </Text>

              <Text mt={4}>
                <b>2. Duration</b>
              </Text>
              <Text>
                This Agreement is effective from the date of online acceptance
                and continues indefinitely unless terminated in accordance with
                Section 9.
              </Text>

              <Text mt={4}>
                <b>3. Revenue Sharing and Commission</b>
              </Text>
              <Text>
                Wakafoody retains a 12% commission per order. Payouts may be
                requested for orders older than 24 hours and are processed
                within 24–72 hours.
              </Text>

              <Text mt={4}>
                <b>4. Wakafoody’s Responsibilities</b>
              </Text>
              <Text>
                Wakafoody will provide access to the platform, facilitate
                orders, manage payments, and offer support.
              </Text>

              <Text mt={4}>
                <b>5. Restaurant Responsibilities</b>
              </Text>
              <Text>
                Accurate menus, timely order preparation, food quality, and
                compliance with hygiene laws are required.
              </Text>

              <Text mt={4}>
                <b>6. Rules and Regulations</b>
              </Text>
              <Text>
                Maintain price parity, food safety, order timeliness, and
                resolve customer issues jointly.
              </Text>

              <Text mt={4}>
                <b>7. Intellectual Property</b>
              </Text>
              <Text>
                The Restaurant grants Wakafoody a non-exclusive license to use
                brand assets for marketing.
              </Text>

              <Text mt={4}>
                <b>8. Confidentiality</b>
              </Text>
              <Text>
                Both parties agree to keep sensitive business and customer data
                confidential.
              </Text>

              <Text mt={4}>
                <b>9. Termination</b>
              </Text>
              <Text>
                Either party may terminate with 30 days' notice. Wakafoody may
                terminate immediately for serious breaches.
              </Text>

              <Text mt={4}>
                <b>
                  10–13. Indemnity, Force Majeure, Governing Law, Entire
                  Agreement
                </b>
              </Text>
              <Text>
                These sections protect both parties from liability, confirm
                Nigerian jurisdiction, and ensure this is the full agreement.
              </Text>

              <Text mt={4}>
                <b>14. Acceptance</b>
              </Text>
              <Text>
                By checking the box below and submitting, the Restaurant agrees
                to the terms above, the Terms of Service, and SLA.
              </Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onAccept}
              colorScheme="orange"
              bg="brand.100"
              color="#fff">
              Accept & Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PartnershipAgreement;
