import React from "react";
import {
  Center,
  Button,
  Avatar,
  VStack,
  HStack,
  Text,
  Input,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import {
  ArrowUpDownIcon,
  ExternalLinkIcon,
  SettingsIcon,
} from "@chakra-ui/icons";

import Test_OverLay_ApplicationDetail from "./Test_OverLay_ApplicationDetail";
import OverLay_ApplicationDetail_New from "./OverLay_ApplicationDetail_New";
interface FullName {
  applicationId: string;
}

export default function Test({ applicationId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [application_data, setApplication_data] = React.useState();

  function handle_ClickTest() {
    //console.log("e.target.value==", applicationID);

    const fun_FetchApplicationDetail = async () => {
      //console.log("applicationId==", applicationId);
      //setApplication_data(null);
      const body = {
        applicationId: applicationId,
      };
      console.log("body==: ", body);

      const data = await (
        await fetch("/api/donationTaxReceipt/test", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      ).json();
      console.log("handle_Click_result-data", data);
      setApplication_data(data);
    };

    fun_FetchApplicationDetail();
  }

  console.log("handle_Click_result-data", application_data);

  function handle_onOpen(e) {
    onOpen();
    console.log("open:==", e);
    handle_ClickTest();
  }

  return (
    <>
      <Button
        w="100px"
        h="25px"
        borderWidth={0}
        rounded={"full"}
        paddingX={"5px"}
        //bgColor={type_bgclr_clr(application && application.type).bgclr}
        //color={type_bgclr_clr(application && application.type).clr}
        //onClick={(e) => onClick_Comp_Temp(e)}
        onClick={() => handle_onOpen(applicationId)}
        _hover={{
          background: "white",
          borderWidth: "1px",
          //borderColor:
          //  type_bgclr_clr(application && application.type).clr + ".300",
        }}
      >
        <Text p="1px" w={"70px"} borderWidth={0} align={"center"}>
          {applicationId}
        </Text>

        <ExternalLinkIcon
          fontSize={"15px"}
          //color={type_bgclr_clr(application && application.type).clr + ".500"}
          w="24px"
        />
      </Button>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent borderWidth={0} maxW="1200px" maxH="750px">
          <ModalHeader borderWidth={0}>
            {
              //new_renewal_replacement().componentName
            }
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <React.Suspense
              fallback={
                <div>
                  <Spinner color="red.500" />
                </div>
              }
            >
              <Box>
                {application_data ? (

                  <OverLay_ApplicationDetail_New
                  application={application_data}
                  />
                ) : (
                  <Center w="100%" h="100px">
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                  </Center>
                )}
              </Box>
            </React.Suspense>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>

    // <>
    //   <Center w={"100px"} h="20px">
    //     <Button
    //       colorScheme="gray"
    //       onClick={(e) => handle_ClickTest(e)}
    //       value={applicationID}
    //     >
    //       {applicationID}
    //     </Button>
    //   </Center>
    //   <Box>{JSON.stringify(fetchData_Details)}</Box>
    // </>
  );
}
