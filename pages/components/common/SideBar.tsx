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
  BoxProps,
  Drawer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  DrawerContent,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import {
  AiOutlineUser,
  AiOutlineHeart,
  AiOutlineWallet,
  AiOutlineRedEnvelope,
  AiOutlineSearch,
  AiOutlineSketch,
  AiOutlineHistory,
} from "react-icons/ai";
import { BsFolder2, BsCalendarCheck } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { useRouter } from "next/router";
import { RiFlashlightFill } from "react-icons/ri";

export default function Index() {
  const BtnMain = (url) => {
    alert(url);
    const router = useRouter();
    router.push(url);
  };

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box
      width={"200px"}
      h="full"
      borderWidth={"0px"}
      shadow={"lg"}
      marginRight="30px"
    >
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

const SidebarContent = ({ ...props }: BoxProps) => (
  <Stack
    //as="nav"
    //pos="fixed"

    width={"200px"}
    height={"full"}
    // pb="10"
    //overflowX="hidden"
    //overflowY="auto"
    bg={useColorModeValue("white", "gray.800")}
    borderColor={"green.100"}

    //borderRightWidth="1px"
  >
    <VStack h="full" w="full" alignItems="flex-start" justify="space-between">
      <Box w="full">
        <Flex px="4" py="5" align="center">
          <Icon as={RiFlashlightFill} h={8} w={8} color="green.600" />
          <Text fontSize="2xl" ml="2" color="green.600" fontWeight="semibold">
            APPOP
          </Text>
        </Flex>
        <Flex
          direction="column"
          as="nav"
          fontSize="md"
          color="gray.600"
          aria-label="Main Navigation"
        >
          <NavItem icon={AiOutlineUser} url={"/components/monthlyRenewalList"}>
            Renewal
          </NavItem>
          <NavItem icon={AiOutlineHeart} url={"/components/doctorInfo"}>
            Doctor
          </NavItem>
          <NavItem icon={AiOutlineWallet} url={"/components/walletCard"}>
            Wallet
          </NavItem>
          <NavItem
            icon={AiOutlineRedEnvelope}
            url={"/components/donationTaxReceipt"}
          >
            Donation
          </NavItem>
          <NavItem icon={AiOutlineSketch} url={"/components/icecream"}>
            Ice Cream
          </NavItem>
          <NavItem icon={AiOutlineHistory} url={"/components/leaves"}>
            Leaves
          </NavItem>
        </Flex>
      </Box>

      <Flex px="4" py="5" mt={10} justify="center" alignItems="center">
        <Menu>
          <MenuButton
            as={Button}
            size={"sm"}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            _hover={{ textDecoration: "none" }}
          >
            <Image src="/coffee_3.png" alt="take 5 mins break" />
          </MenuButton>
          <MenuList fontSize={20} zIndex={5555}>
            <MenuItem as={Link} to="#">
              My profile
            </MenuItem>
            <MenuItem as={Link} to="#">
              Change password
            </MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </VStack>
  </Stack>
);

const NavItem = (props: any) => {
  const color = useColorModeValue("gray.600", "gray.300");

  const { icon, url, children } = props;
  return (
    <Link
      href={url}
      style={{ textDecoration: "none" }}
      borderWidth={"0px"}
      w="full"
      h="full"
    >
      <Flex
        align="center"
        px="4"
        py="3"
        cursor="pointer"
        role="group"
        fontWeight="semibold"
        fontSize={"18px"}
        transition=".15s ease"
        color={"gray.500"}
        _hover={{
          shadow: "lg",
          bgColor: useColorModeValue("green.50", "green.100"),
          //bg: useColorModeValue("gray.100", "gray.900"),
          color: "green.700",
        }}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="5"
            mr={"15px"}
            _groupHover={{
              color: color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
