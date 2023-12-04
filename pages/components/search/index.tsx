import React from "react";
import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  Link,
  Image,
  Button,
  Heading,
  Stack,
  VStack,
  HStack,
} from "@chakra-ui/react";
import SideBar from "../common/SideBar";
import SpinnerOverlay from "../common/SpinnerOverlay";

export default function Search_index() {
  return (
    <HStack
      borderWidth={"0px"}
      h="100vh"
      w="100%"
      spacing={0}
      overflow={"true"}
    >
      {/* <SpinnerOverlay fetchData={fetchData} setFetchData={setFetchData} /> */}
      <SideBar />
      <Text>coming up soon..</Text>
    </HStack>
  );
}
