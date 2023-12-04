import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Flex,
  Center,
  HStack,
  VStack,
  Input,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

export default function DonationTaxReceipt() {
  const router = useRouter();
  const toast = useToast();

  const [userName, setUserName] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const triggerToast = () => {
    toast({
      title: "Account created.",
      description: "We've created your account for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const handle_login = () => {
    const envUserName: string = process.env.REACT_APP_USER_NAME;
    const envPassword: string = process.env.REACT_APP_USER_PASSWORD;

    if (envUserName === userName && envPassword === userPassword) {
      console.log("okok");
      router.push("/components/walletCard");
    } else {
      console.log("fail");
      toast({
        title: "Wrong Code.",
        description: "Wrong code, try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  console.log(userName);
  console.log(userPassword);

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key

    if (e.key === "Enter") {
      handle_login();
    }
  };

  return (
    <>
      <Head>
        <title>Log in</title>
      </Head>
      <Center
        borderWidth={0}
        h={"100vh"}
        w="100%"
        bgImage={"/coffee_1.jpg"}
        bgPos="center"
        bgSize={"cover"}
        padding-top="300px"
      >
        <VStack
          w="400px"
          spacing={4}
          //bg="rgba(255,255,255,0.5)

          p={5}
          borderWidth="0px"
        >
          <HStack minHeight={"100px"} w={"100px"}>
            <Text
              w={"200px"}
              fontSize="lg"
              fontFamily={"sans-serif"}
              fontWeight="bold"
              color={"white"}
            ></Text>
          </HStack>
          <HStack>
            <Text
              w={"100px"}
              fontSize="lg"
              fontFamily={"sans-serif"}
              fontWeight="bold"
              color={"white"}
            >
              Username:
            </Text>
            <Input
              borderWidth={0}
              color="white"
              fontSize="lg"
              fontFamily={"sans-serif"}
              fontWeight="bold"
              w={"200px"}
              bgColor={"whiteAlpha.400"}
              defaultValue={""}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={handleKeypress}
            />
          </HStack>

          <HStack>
            <Text
              w={"100px"}
              fontSize="lg"
              fontFamily={"sans-serif"}
              fontWeight="bold"
              color={"white"}
            >
              Password:
            </Text>
            <Input
              type="password"
              borderWidth={0}
              color="white"
              fontSize="lg"
              fontFamily={"sans-serif"}
              fontWeight="bold"
              w={"200px"}
              bgColor={"whiteAlpha.400"}
              defaultValue={""}
              onChange={(e) => setUserPassword(e.target.value)}
              onKeyPress={handleKeypress}
            />
          </HStack>

          <HStack>
            <Text
              w={"100px"}
              fontSize="lg"
              fontFamily={"sans-serif"}
              fontWeight="bold"
              color={"white"}
            ></Text>
            <Button
              w={"200px"}
              onClick={handle_login}
              bg={"whiteAlpha.600"}
              color={"white"}
              _hover={{
                bg: "whiteAlpha.800",
                color: "black",
              }}
            >
              Login
            </Button>
          </HStack>
        </VStack>
      </Center>
    </>
  );
}
