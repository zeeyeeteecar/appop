import React from "react";

import {
  Center,
  VStack,
  HStack,
  Text,
  IconButton,
  Box,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Grid,
  SimpleGrid,
} from "@chakra-ui/react";
import { ExternalLinkIcon, DeleteIcon } from "@chakra-ui/icons";

export default function Doctor_Row(props) {
  const { doctors } = props;

  const PhysicianStatus_bgclr_clr = (PhysicianStatus: string): any => {
    const bgclr_clr = [
      { PhysicianStatus: "ACTIVE", clr: "green", bgclr: "green.100" },
      { PhysicianStatus: "INACTIVE", clr: "purple", bgclr: "purple.100" },
    ];
    return bgclr_clr.find((e) => e.PhysicianStatus === PhysicianStatus);
  };

  const randomAvatarLink = () => {
    const url =
      "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/";
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    return url + randomNumber.toString() + ".png";
  };

  const FormatPhone = (phoneNo): string => {
    const result: string =
      phoneNo.substring(0, 3) +
      "-" +
      phoneNo.substring(3, 6) +
      "-" +
      phoneNo.substring(6);
    return result;
  };

  return (
    <>
      {doctors &&
        doctors.map((doctor: any, index: number) => {
          return (
            <>
              <HStack
                key={index}
                minHeight={"90px"}
                spacing={5}
                paddingLeft={"20px"}
                borderWidth={0}
                borderBottomWidth={1}
                borderBottomColor="gray.100"
                color="gray.500"
                _hover={{
                  background: "gray.50",
                  color: "black",
                }}
              >
                <Avatar
                  name={doctor.firstName + " " + doctor.lastName}
                  src={randomAvatarLink()}
                />
                <VStack w="220px" borderWidth={0} align="start" spacing={0}>
                  <Text
                    w={"full"}
                    fontWeight="semibold"
                    borderWidth={0}
                    fontSize={"18px"}
                  >
                    {doctor.firstName + " " + doctor.lastName}
                  </Text>
                  <Text w={"200px"} borderWidth={0} color="gray.400">
                    {"MSP#: " + doctor.mspNumber}
                  </Text>
                </VStack>
                <Text
                  w={"90px"}
                  h={"25px"}
                  rounded="full"
                  bgColor={PhysicianStatus_bgclr_clr(doctor.status).bgclr}
                  color={PhysicianStatus_bgclr_clr(doctor.status).clr}
                  align="center"
                  padding={"3px"}
                  fontSize={"13px"}
                  fontWeight={"semibold"}
                >
                  {doctor.status}
                </Text>
                <Text w={"150px"}>{FormatPhone(doctor.phone)}</Text>

                <SimpleGrid columns={1} spacing={2} width={"300px"}>
                  <Text w={"full"}>
                    {doctor.addressLine1 + " " + doctor.city}
                  </Text>
                  <Text w={"full"}>
                    {doctor.province + " " + doctor.postalCode}
                  </Text>
                </SimpleGrid>
                <Text w={"50px"}>{doctor.addressLine2}</Text>

                <IconButton
                  color="gray.200"
                  borderWidth={0}
                  variant="outline"
                  aria-label=" edit doctor info "
                  fontSize="20px"
                  icon={<ExternalLinkIcon />}
                  _hover={{
                    background: "white",
                    color: "black",
                  }}
                />
                <IconButton
                  color="gray.200"
                  borderWidth={0}
                  variant="outline"
                  aria-label="edit doctor info"
                  fontSize="20px"
                  icon={<DeleteIcon />}
                  _hover={{
                    background: "white",
                    color: "black",
                  }}
                />
              </HStack>
            </>
          );
        })}
    </>
  );
}
