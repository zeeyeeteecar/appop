import React, { useEffect, useState, useRef } from "react";

import {
  Center,
  Flex,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export default function SpinnerOverlay({ fetchData, setFetchData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchData_ArrayOrNot = (Array.isArray(fetchData))?fetchData[0]:fetchData

  const spinnerOverlay = () => {
    return (
      <Modal isOpen={true} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={"100px"} height={"100px"} top="200px">
          <Center width={"100px"} height={"100px"}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        </ModalContent>
      </Modal>
    );
  };

  return <Flex>
    { fetchData_ArrayOrNot? "" : spinnerOverlay()}</Flex>;
}
