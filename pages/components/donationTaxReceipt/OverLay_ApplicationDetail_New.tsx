import React from "react";
import Link from "next/link";
import {
  Center,
  VStack,
  HStack,
  Text,
  Input,
  Box,
  Flex,
  Divider,
  Radio,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  MdLocationOn,
  MdImportantDevices,
  MdAccessibility,
  MdFavoriteBorder,
  MdDragIndicator,
  MdOutlineLocationOn,
} from "react-icons/md";
import GoogleMaps from "./GoogleMaps";

export default function OverLay_ApplicationDetail_New(props) {
  // {
  //   application,
  //   applicationContent,
  // }

  const { application } = props;

  const applicationContent =
    application && application.newApplication
      ? application && application.newApplication
      : application && application.renewalApplication
      ? application && application.renewalApplication
      : application && application.replacementApplication;

  const address: string =
    (application && application.addressLine1) +
    " " +
    (application && application.city) +
    " " +
    (application && application.province) +
    ", " +
    (application && application.country) +
    ", " +
    (application && application.postalCode);

  //const applicationJSON = JSON.stringify(application);
  const show_Reason_For_Replacement = () => {
    if (
      application &&
      application.newApplication &&
      application.renewalApplication
    ) {
      return (
        <>
          <Doctor_disability_assessment_Info
            application={application}
            applicationContent={applicationContent}
          />
        </>
      );
    } else {
      return (
        <>
          <Reason_for_replacement
            application={application}
            applicationContent={applicationContent}
          />
        </>
      );
    }
  };

  return (
    <VStack maxW="100%" h="600px" borderWidth={0}>
      **********************************===== First Last Name
      <Flex
        w="100%"
        h={"full"}
        borderWidth={0}
        overflowX={"auto"}
        verticalAlign={"top"}
        p={0}
      >
        <VStack borderWidth={0} w="500px" p={0}>
          <Box borderWidth={0} w="100%" p={0}>
            <Box borderWidth={0} fontWeight="bold" color={"green"}>
              <Flex w="500px" borderWidth={0} margin={0}>
                <Text fontWeight={"semibold"} marginRight={10}>
                  {application && application.firstName}{" "}
                  {application && application.lastName}{" "}
                </Text>
                <Text fontWeight={"light"}>User ID:</Text>
                <Text fontWeight={"light"}>
                  {" "}
                  {application && application.applicantId}
                </Text>
              </Flex>
            </Box>
            <Center height="20px" w={"80%"}></Center>

            <Box>
              <Text fontWeight={"semibold"}> Current APP:</Text>
            </Box>
            <HStack w="100%" m={0} borderWidth={0} marginLeft={15}>
              <Text w="80px">
                # {application && application.permit.rcdPermitId}{" "}
              </Text>
              <Text
                rounded={"full"}
                color={"brown"}
                bgColor="yellow.200"
                w={"100px"}
                h={"18px"}
                fontSize={13}
                fontWeight={"semibold"}
                textAlign={"center"}
              >
                {application && application.permit.expiryDate.substring(0, 10)}
              </Text>

              <Text
                rounded={"full"}
                color={"green"}
                bgColor="green.100"
                w={"70px"}
                h={"18px"}
                fontSize={12}
                fontWeight={"semibold"}
                textAlign={"center"}
              >
                {application && application.permit.active
                  ? "ACTIVE"
                  : "Inactive"}
              </Text>

              <Text
                rounded={"full"}
                color={"green"}
                bgColor="green.100"
                w={"70px"}
                h={"18px"}
                fontSize={12}
                fontWeight={"semibold"}
                textAlign={"center"}
              >
                {application && application.permit.type.substring(0, 4)}
              </Text>

              <Text
                rounded={"full"}
                color={"green"}
                bgColor="green.100"
                w={"70px"}
                h={"18px"}
                fontSize={12}
                fontWeight={"semibold"}
                textAlign={"center"}
              >
                {application && application.type.substring(0, 3)}
              </Text>
            </HStack>
            <Box h={3}></Box>
            <HStack w="100%"></HStack>
            <Text fontWeight={"semibold"}> All APPs:</Text>
            <Text marginLeft={15}>
              {application &&
                application.applicant.permits
                  .sort((a, b) => (a.expiryDate > b.expiryDate ? -1 : 1))
                  .map((item, index) => {
                    return (
                      <>
                        <HStack key={index}>
                          <Text w="80px"># {item.rcdPermitId}</Text>
                          <Text
                            rounded={"full"}
                            color={"brown"}
                            bgColor="yellow.200"
                            w={"100px"}
                            h={"18px"}
                            fontSize={14}
                            fontWeight={"semibold"}
                            textAlign={"center"}
                          >
                            {item.expiryDate.substring(0, 10)}
                          </Text>
                          <Text
                            rounded={"full"}
                            color={"green"}
                            bgColor="green.100"
                            w={"70px"}
                            h={"18px"}
                            fontSize={12}
                            fontWeight={"semibold"}
                            textAlign={"center"}
                            marginLeft={"20px"}
                          >
                            {application && application.permit.active
                              ? "ACTIVE"
                              : "Inactive"}
                          </Text>
                          <Text
                            rounded={"full"}
                            color={"green"}
                            bgColor="green.100"
                            w={"70px"}
                            h={"18px"}
                            fontSize={12}
                            fontWeight={"semibold"}
                            textAlign={"center"}
                          >
                            {application &&
                              application.permit.type.substring(0, 4)}
                          </Text>
                          <Text
                            rounded={"full"}
                            color={"green"}
                            bgColor="green.100"
                            w={"70px"}
                            h={"18px"}
                            fontSize={12}
                            fontWeight={"semibold"}
                            textAlign={"center"}
                          >
                            {application && application.type.substring(0, 3)}
                          </Text>
                        </HStack>
                      </>
                    );
                  })}
            </Text>
          </Box>
          <Center height="20px" w={"80%"}></Center>
          **********************************===== Personal Information
          <Box borderWidth={0} w="100%" p={0}>
            <HStack w={"100%"} color="green">
              <MdAccessibility />
              <Text fontWeight={"bold"}> Personal Information</Text>
            </HStack>

            <HStack width={"fit-content"} borderWidth={0} marginLeft={6}>
              <Text fontWeight={"light"}>DoB: </Text>
              <Text>
                {" "}
                {application &&
                  application.applicant.dateOfBirth.substring(0, 10)}
              </Text>
            </HStack>

            <HStack width={"fit-content"} borderWidth={0} marginLeft={6}>
              <Text fontWeight={"light"}>Gender: </Text>
              <Text>{application && application.applicant.gender}</Text>{" "}
            </HStack>
          </Box>
          <Center height="20px" w={"80%"}></Center>
          **********************************===== Contact Info
          <Box borderWidth={0} w="100%" p={0}>
            <HStack w={"100%"} borderWidth={0} color="green">
              <MdImportantDevices />
              <Text fontWeight={"bold"}>Contact Info</Text>
            </HStack>

            <Flex width={"fit-content"} borderWidth={0} marginLeft={6}>
              <Text fontWeight={"light"}>Tel: </Text>
              <Text>
                {application &&
                  application.applicant.dateOfBirth.substring(0, 10)}
              </Text>
            </Flex>

            <Box width={"fit-content"} borderWidth={0} marginLeft={6}>
              <Text fontWeight={"light"}>Renewal updates through email: </Text>
              <Text>{application && application.email}</Text>{" "}
            </Box>
          </Box>
          <Center height="20px" w={"80%"}></Center>
          **********************************===== Address
          <Box borderWidth={0} w="100%" p={0}>
            <HStack w={"100%"} borderWidth={0} color="green">
              <Link
                href={"https://maps.google.com/?q=" + address}
                target={"_blank"}
              >
                <MdLocationOn color="red" />
              </Link>
              <Text fontWeight={"bold"}>Address</Text>
              <GoogleMaps />
            </HStack>

            <Box width={"fit-content"} borderWidth={0} marginLeft={6}>
              <Link
                href={"https://maps.google.com/?q=" + address}
                target={"_blank"}
              >
                <Text>{application && application.addressLine1}</Text>
                <Text>
                  {application && application.city}{" "}
                  {application && application.province}{" "}
                  {application && application.country} {", "}
                  {application && application.postalCode}
                </Text>
              </Link>
            </Box>
          </Box>
        </VStack>
        {show_Reason_For_Replacement()}

        {/* **************************************************************************
         ***************Payment, shipping, Billing Info
         ************************************************************************** */}

        <VStack borderWidth={0} w="400px" p={2}>
          *********************************Payment, shipping, Billing Info
          <VStack borderWidth={0} w="100%" p={0}>
            <Box w={"100%"}>
              <Text fontWeight={"bold"}>Fee</Text>
              <Flex>
                <Text w="200px">Permit Fee (Fixed)</Text>
                <Text>${application && application.processingFee} </Text>
              </Flex>
              <Flex>
                <Text w="200px">Donation</Text>
                <Text>${application && application.donationAmount} </Text>
              </Flex>
              <Flex>
                <Text w="200px">Paid By</Text>
                <Text>{application && application.paymentMethod} </Text>
              </Flex>

              <Center height="20px" w={"90%"}>
                <Divider />
              </Center>

              <Text fontWeight={"bold"}>Shipping Address</Text>
              <Text>
                {application && application.shippingAddressSameAsHomeAddress
                  ? application && application.addressLine1
                  : application && application.shippingAddressLine1}
              </Text>
              <Text>
                {application && application.shippingAddressSameAsHomeAddress
                  ? application && application.city
                  : application && application.shippingCity}{" "}
                {application && application.shippingAddressSameAsHomeAddress
                  ? application && application.province
                  : application && application.shippingProvince}{" "}
                {application && application.shippingAddressSameAsHomeAddress
                  ? application && application.country
                  : application && application.shippingCountry}
                {", "}
                {application && application.shippingAddressSameAsHomeAddress
                  ? application && application.postalCode
                  : application && application.shippingPostalCode}{" "}
              </Text>

              <Center height="20px" w={"90%"}>
                <Divider />
              </Center>

              <Text fontWeight={"bold"}>Billing Address</Text>
              <Text>
                {application && application.billingAddressSameAsHomeAddress
                  ? application && application.addressLine1
                  : application && application.billingAddressLine1}
              </Text>
              <Text>
                {application && application.billingAddressSameAsHomeAddress
                  ? application && application.city
                  : application && application.billingCity}{" "}
                {application && application.billingAddressSameAsHomeAddress
                  ? application && application.province
                  : application && application.billingProvince}{" "}
                {application && application.billingAddressSameAsHomeAddress
                  ? application && application.country
                  : application && application.billingCountry}
                {", "}
                {application && application.billingAddressSameAsHomeAddress
                  ? application && application.postalCode
                  : application && application.billingPostalCode}{" "}
              </Text>

              <Center height="20px" w={"90%"}>
                <Divider />
              </Center>
              <Flex>
                <Text fontWeight={"bold"} w="100px">
                  {" "}
                  Created At:
                </Text>
                <Text>
                  {application && application.createdAt}{" "}
                </Text>
              </Flex>
              <Flex>
                <Text fontWeight={"bold"} w="100px">
                  {" "}
                  Updated At:
                </Text>
                <Text>
                  {application && application.updatedAt
                    ? application.updatedAt
                    : ""}{" "}
                </Text>
              </Flex>
              <Center height="20px" w={"90%"}>
                <Divider />
              </Center>
            </Box>
          </VStack>
          {/* <Box w="full" height="500px" overflowY={"auto"} borderWidth={2}>
            {application &&
              Object.getOwnPropertyNames(application).map((item) => {
                return (
                  <>
                    <li>{item + "==" + JSON.stringify(application[item])}</li>
                  </>
                );
              })}
          </Box> */}
        </VStack>
      </Flex>
    </VStack>
  );
}

function Doctor_disability_assessment_Info({
  application,
  applicationContent,
}) {
  return (
    <VStack borderWidth={0} w="400px" p={0}>
      *********************************===== Doctor Info
      <VStack borderWidth={0} w="100%" p={0}>
        <Box w={"100%"}>
          <HStack w={"100%"} borderWidth={0} color="green">
            <MdFavoriteBorder />
            <Text fontWeight={"bold"}>Doctor Info</Text>
          </HStack>

          <Text width={"fit-content"} borderWidth={0} marginLeft={6}>
            {applicationContent && applicationContent.physicianFirstName}{" "}
            {applicationContent && applicationContent.physicianLastName}
          </Text>
          <Text
            color={"gray.400"}
            fontSize="15"
            width={"fit-content"}
            borderWidth={0}
            marginLeft={6}
          >
            MSP #: {applicationContent && applicationContent.physicianMspNumber}{" "}
          </Text>

          <Text width={"fit-content"} borderWidth={0} marginLeft={6}>
            Phone:{" "}
            {applicationContent &&
              applicationContent.physicianPhone.slice(0, 3) +
                "-" +
                applicationContent.physicianPhone.slice(3, 6) +
                "-" +
                applicationContent.physicianPhone.slice(6)}{" "}
          </Text>

          <Text width={"fit-content"} borderWidth={0} marginLeft={6}>
            {applicationContent && applicationContent.physicianAddressLine1}{" "}
          </Text>
          <Text width={"fit-content"} borderWidth={0} marginLeft={6}>
            {applicationContent && applicationContent.physicianCity}{" "}
            {applicationContent && applicationContent.physicianProvince}{" "}
            {applicationContent && applicationContent.physicianCountry}
            {", "}
            {applicationContent && applicationContent.physicianPostalCode}
          </Text>
        </Box>
      </VStack>
      <Center height="20px" w={"80%"}>
        <Divider />
      </Center>
      *********************************===== Physician Assessment
      <VStack borderWidth={0} w="100%" p={0}>
        <Box w={"100%"}>
          <HStack w={"100%"} borderWidth={0} color="green">
            <MdDragIndicator />
            <Text fontWeight={"bold"}>Physician Assessment</Text>
          </HStack>
          <Text width={"fit-content"} borderWidth={0} marginLeft={6}>
            Disability:{" "}
            <li>
              {application &&
                application.applicant.medicalInformation.disability}{" "}
            </li>
          </Text>
          <Text width={"fit-content"} borderWidth={0} marginLeft={6}>
            Certification Date:{" "}
            <li>
              {application &&
                application.applicant.medicalInformation.disabilityCertificationDate.substring(
                  0,
                  10
                )}
            </li>
          </Text>
          <Text width={"fit-content"} borderWidth={0} marginLeft={6}>
            Condition:{" "}
            {application &&
              application.applicant.medicalInformation.patientCondition.map(
                (item) => {
                  return (
                    <>
                      <li>{item.replace(/_/g, " ").toLowerCase()}</li>
                    </>
                  );
                }
              )}
          </Text>
        </Box>
      </VStack>
      {/* <Box w="full" height="500px" overflowY={"auto"} borderWidth={2}>
           {application &&
             Object.getOwnPropertyNames(application).map((item) => {
               return (
                 <>
                   <li>{item + "==" + JSON.stringify(application[item])}</li>
                 </>
               );
             })}
         </Box> */}
    </VStack>
  );
}

function Reason_for_replacement({ application, applicationContent }) {
  return (
    <VStack borderWidth={0} w="400px" p={0}>
      *********************************===== Reason for Replacemewnt
      <VStack borderWidth={0} w="100%" p={0}>
        <Box w={"100%"}>
          <HStack w={"100%"} borderWidth={0} color="green">
            <MdFavoriteBorder />
            <Text fontWeight={"bold"}>Reason for Replacemewnt</Text>
          </HStack>

          <Text width={"fit-content"} borderWidth={0} marginLeft={6}></Text>

          <Text width={"fit-content"} borderWidth={0} marginLeft={6}></Text>
          <Text width={"fit-content"} borderWidth={0} marginLeft={6}></Text>
        </Box>
      </VStack>
      <Center height="20px" w={"80%"}>
        <Divider />
      </Center>
      *********************************===== Physician Assessment
      <VStack borderWidth={0} w="100%" p={0}>
        <Box w={"100%"}>
          <HStack w={"100%"} borderWidth={0} color="green">
            <MdDragIndicator />
            <Text fontWeight={"bold"}>Physician Assessment</Text>
          </HStack>
          <Text width={"fit-content"} borderWidth={0} marginLeft={6}>
            Disability:{" "}
            <li>
              ddd
              {applicationContent && applicationContent.reason}{" "}
            </li>
          </Text>
          <Text width={"fit-content"} borderWidth={0} marginLeft={6}>
            Certification Date:{" "}
            <li>
              {application &&
                application.applicant.medicalInformation.disabilityCertificationDate.substring(
                  0,
                  10
                )}
            </li>
          </Text>
          <Text width={"fit-content"} borderWidth={0} marginLeft={6}>
            Condition:{" "}
            {application &&
              application.applicant.medicalInformation.patientCondition.map(
                (item) => {
                  return (
                    <>
                      <li>{item.replace(/_/g, " ").toLowerCase()}</li>
                    </>
                  );
                }
              )}
          </Text>
        </Box>
      </VStack>
      {/* <Box w="full" height="500px" overflowY={"auto"} borderWidth={2}>
           {application &&
             Object.getOwnPropertyNames(application).map((item) => {
               return (
                 <>
                   <li>{item + "==" + JSON.stringify(application[item])}</li>
                 </>
               );
             })}
         </Box> */}
    </VStack>
  );
}
