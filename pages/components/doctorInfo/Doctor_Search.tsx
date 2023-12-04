import React from "react";
import {
  Center,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Box,
  IconButton,
  Flex,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

// interface Prop_SearchKeywords {
//   setSearchMspNo: string;
//   setSearchFName: string;
//   setSearchLName: string;
//   setSearchPhone: string;
// }

export default function Doctor_Search({
  setSearchMspNo,
  setSearchFName,
  setSearchLName,
  setSearchPhone,
}: any) {
  return (
    <HStack spacing={5}>
      <Input
        w={"150px"}
        placeholder="MSP #"
        onChange={(e) => setSearchMspNo(e.target.value)}
      />
      <Input
        w={"150px"}
        placeholder="F Name"
        onChange={(e) => setSearchFName(e.target.value)}
      />
      <Input
        w={"150px"}
        placeholder="L Name"
        onChange={(e) => setSearchLName(e.target.value)}
      />
      <Input
        w={"150px"}
        placeholder="phone"
        onChange={(e) => setSearchPhone(e.target.value)}
      />
      {/* <Input placeholder="MSP #" {...register("mspNo")}   />
    <Input placeholder="F Name" {...register("fName")}   />
    <Input placeholder="L Name" {...register("lName")}   />
    <Input placeholder="phone" {...register("phone")}  /> */}
      <Box>
        <Button type="submit" w={"200px"} hidden={true}>
          Search Dr Info
        </Button>
      </Box>
    </HStack>
  );
}
