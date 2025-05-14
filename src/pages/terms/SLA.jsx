import React from "react";
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

const SLA = ({ onAccept, isOpen, onClose }) => {
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
          <ModalHeader>Service Level Agreement (SLA)</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box fontSize="sm" lineHeight="1.6" h="400px" overflowY="auto">
              <Text fontWeight="bold" mb={2}>
                Effective Date: {new Date().toLocaleString()}
              </Text>

              <Text>
                <b>1. Parties</b>
              </Text>
              <Text>
                Platform Provider: WakaFoody Store Limited ("We", "Us",
                "Platform")
              </Text>
              <Text>Vendor: Food & Beverage Vendor ("You", "Vendor")</Text>

              <Text mt={4}>
                <b>2. Purpose</b>
              </Text>
              <Text>
                This SLA outlines service standards and responsibilities for
                vendors on WakaFoody's food delivery platform in Akure City.
              </Text>

              <Text mt={4}>
                <b>3. Vendor Responsibilities</b>
              </Text>
              <Text>
                <u>3.1 Order Fulfillment</u>
              </Text>
              <ul>
                <li>✅ Prepare orders on time</li>
                <li>✅ Maintain food quality and hygiene</li>
                <li>✅ Reject unfulfillable orders within 2 minutes</li>
              </ul>
              <Text>
                <u>3.2 Service Hours</u>
              </Text>
              <ul>
                <li>✅ Adhere to listed operational hours</li>
                <li>✅ Update availability when closed</li>
              </ul>
              <Text>
                <u>3.3 Pricing & Promotions</u>
              </Text>
              <ul>
                <li>✅ Maintain price parity with in-store rates</li>
                <li>✅ Honor all listed promotions</li>
              </ul>
              <Text>
                <u>3.4 Hygiene & Compliance</u>
              </Text>
              <ul>
                <li>✅ Ensure sanitary operations</li>
                <li>✅ Comply with local food safety laws</li>
              </ul>

              <Text mt={4}>
                <b>4. Platform Responsibilities</b>
              </Text>
              <ul>
                <li>✅ 99.9% uptime for order processing</li>
                <li>✅ Reliable logistics system</li>
                <li>✅ Daily payment processing (after 24 hours per order)</li>
                <li>✅ Support available 8 hrs/day, 7 days/week</li>
              </ul>

              <Text mt={4}>
                <b>5. Fees & Commission</b>
              </Text>
              <Text>
                💰 <b>Commission:</b> 12% per order
              </Text>
              <Text>
                📌 Extra fees may apply for premium services or marketing
              </Text>

              <Text mt={4}>
                <b>6. Performance Metrics</b>
              </Text>
              <ul>
                <li>📌 Order Acceptance Rate ≥ 90%</li>
                <li>📌 On-Time Preparation Rate ≥ 90%</li>
                <li>📌 Customer Rating ≥ 3.5★</li>
              </ul>
              <Text>
                🔴 Repeated violations may lead to suspension or reduced
                visibility
              </Text>

              <Text mt={4}>
                <b>7. Termination</b>
              </Text>
              <Text>
                Either party may terminate with 30 days' notice. Immediate
                termination applies for fraud or ongoing non-compliance.
              </Text>

              <Text mt={4}>
                <b>8. Confidentiality & Data Protection</b>
              </Text>
              <ul>
                <li>🔒 Protect customer data</li>
                <li>🔒 Do not share sensitive business data without consent</li>
              </ul>

              <Text mt={4}>
                <b>9. Dispute Resolution</b>
              </Text>
              <Text>
                Disputes will be handled via negotiation and, if necessary,
                resolved in the courts of Akure City.
              </Text>

              <Text mt={4}>
                <b>10. Agreement Acceptance</b>
              </Text>
              <Text>
                By accepting, you acknowledge and agree to all terms outlined in
                this SLA for vendors on the WakaFoody platform.
              </Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="orange"
              bg="brand.100"
              color="#fff"
              onClick={onAccept}>
              Accept SLA
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SLA;
