import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { Center, VStack, Text, Box, Input, HStack } from "@chakra-ui/react";

import { IconButton } from "@chakra-ui/react";
import { ExternalLinkIcon, DownloadIcon } from "@chakra-ui/icons";

import SideBar from "../common/SideBar";
//import YearBlock from "./YearBlock";

export default function Index() {
  return (
    <HStack width={"100%"} h="100vh" borderWidth={0} bgColor="">
      <SideBar />
      <VStack width={"full"} h="100%" borderWidth={0} p="10px" bgColor="white">
        <VStack borderWidth={1} width={"full"}>
          <HStack borderWidth={1}>
            <Input></Input>
            <Input></Input>
            <IconButton
              w={"full"}
              color="gray.300"
              borderWidth={1}
              variant="outline"
              aria-label="edit application info"
              fontSize="20px"
              icon={<DownloadIcon />}
              _hover={{
                background: "gray.100",
                color: "black",
              }}
            />
          </HStack>
          <VStack
            borderWidth={1}
            alignContent="flex-start"
            alignItems={"flex-start"}
          >
            {/* <YearBlock /> */}
          </VStack>
        </VStack>
      </VStack>
    </HStack>
  );
}
