import React from "react";
import { Box, Text, Center, HStack } from "@chakra-ui/react";

export default function ListCount({ count }) {
  return (
    <Center h="20px" w="150px" bgColor={"yellow.200"} alignContent="center" rounded={"full"} padding={5} borderWidth={0}>
      <HStack >
        <Text
          color="red.300"
          w="50px"
          alignContent="center"
          align={"center"}
          fontSize="lg"
          borderWidth={0}
          verticalAlign="middle"
        >
          Total:
        </Text>
        <Text
          color="red.500"
          w="40px"
          alignContent="center"
          align={"center"}
          fontSize="lg"
          borderWidth={0}
          verticalAlign="middle"
          fontWeight={"semibold"}
        >
          {count}
        </Text>
      </HStack>
    </Center>
  );
}
