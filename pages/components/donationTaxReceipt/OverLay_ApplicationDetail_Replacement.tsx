import React from 'react'

import {
    Center,
    VStack,
    HStack,
    Text,
    Input,
    Box,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from "@chakra-ui/react";

export default function OverLay_ApplicationDetail_Replace({newApplication,applicationContent}) {
  return (
    <Box w="full" height="full" overflowY={"auto"}>
                {applicationContent && Object.getOwnPropertyNames(applicationContent).map(
                  (item) => {
                    return (
                      <>
                        <Text>
                          {item + "==" + applicationContent[item]}
                        </Text>
                      </>
                    );
                  }
                )}
              </Box>
  )
}
