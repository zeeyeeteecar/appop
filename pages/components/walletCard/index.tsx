import React from "react";
import {
  Center,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
} from "@chakra-ui/react";

import WalletCard_Proc_Cmpl from "./WalletCard_Proc_Cmpl";
import WalletCard_Search from "./WalletCard_Search"

import SideBar from "../common/SideBar";

export default function index() {
  const tabInfo = [
    {
      tabTitle: "Completed",
      tabUrl: "/api/walletCard/waletCard_Completed_find",
    },
    {
      tabTitle: "In Processing",
      tabUrl: "/api/walletCard/walletCard_Processing_find",
    },
  ];
  return (
    <HStack width={"100%"} h="100vh" borderWidth={0} bgColor="">
      <SideBar />
      <VStack width={"full"} h="100%" borderWidth={0} p="10px" bgColor="white">
        <Tabs
          variant="enclosed"
          colorScheme="red"
          width={"100%"}
          borderWidth={0}
          h={"100%"}
        >
          <TabList fontWeight={"bold"}>
            {tabInfo.map((item) => {
              return (
                <>
                  <Tab fontWeight={"semibold"}>{item.tabTitle}</Tab>
                </>
              );
            })}
            <Tab fontWeight={"semibold"}>Search</Tab>
          </TabList>

          <TabPanels>
            {tabInfo.map((item, key) => {
              return (
                <>
                  <TabPanel key={key} textAlign={"center"}>
                    <WalletCard_Proc_Cmpl apiUrl={item.tabUrl} />
                  </TabPanel>
                </>
              );
            })}
             <TabPanel textAlign={"center"}>
                    <WalletCard_Search />
                  </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </HStack>
  );
}
