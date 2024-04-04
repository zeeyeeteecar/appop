import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  Button,
  Tag,
  Center,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { ExternalLinkIcon, DownloadIcon } from "@chakra-ui/icons";
import { jsPDF } from "jspdf";

export default function PrintButton({ application }: any) {
  //const permitType:string = (application.permitType);

  async function GeneratePDF(appl) {
    //alert((rcdPermitId))
    const permitID: string = appl.permit
      ? appl.permit.rcdPermitId.toString()
      : "N/A";

    const middleName =
      application.middleName === null ? "" : application.middleName;
    const applicantName =
      appl.firstName +
      " " +
      (application.middleName === null ? "" : application.middleName) +
      " " +
      appl.lastName;
    const expiryDate = appl.permit
      ? application.permit.expiryDate.substring(0, 7)
      : "N/A";

    const Mob = application.applicant
      ? application.applicant.dateOfBirth.substring(0, 7)
      : "N/A";
    const userID = application.applicant
      ? application.applicant.id + ""
      : "N/A";

    const doc = new jsPDF("l", "mm", [90, 38]);

    doc.setFontSize(18);
    doc.setFont("", "bold");
    doc.text("Richmond Centre for Disability", 2, 5);

    doc.setFontSize(13);
    doc.setFont("helvetica", "normal");
    doc.text("Permit # ", 0, 15);

    doc.setFont("helvetica", "bold");
    doc.text(permitID, 20, 15);

    doc.setFont("helvetica", "normal");
    doc.text("Expiry: ", 40, 15);

    doc.setFont("helvetica", "bold");
    doc.text(expiryDate, 55, 15);

    doc.setFont("helvetica", "normal");
    doc.text("Name: ", 0, 23);

    doc.setFont("helvetica", "bold");
    doc.text(applicantName, 15, 23);

    doc.setFont("helvetica", "normal");
    doc.text("MoB: ", 0, 30);

    doc.setFont("helvetica", "bold");
    doc.text(Mob, 15, 30);

    doc.setFont("helvetica", "normal");
    doc.text("User # ", 40, 30);

    doc.setFont("helvetica", "bold");
    doc.text(userID, 55, 30);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("604.232.2404  parkingpermit@rcdrichmond.org", 0, 37);

    await doc.save("user-" + userID + " permit-" + permitID + ".pdf"); // will save the file in the current working directory
  }

  let bgclr = "";
  let fontclr = "";
  let btnDisabled = null;
  const permitType: string = application ? application.permitType : "";

  if (permitType === "PERMANENT") {
    bgclr = "green.100";
    fontclr = "green.500";
    btnDisabled = false;
  } else {
    bgclr = "pink.100";
    fontclr = "pink.500";
    btnDisabled = true;
  }

  return (
    <Center
      margin-left={"10px"}
      borderWidth="0px"
      height="220px"
      w={"100%"}
      bgColor="gray.50"
    >
      <VStack>
        <Tag
          size={"lg"}
          variant="solid"
          bgColor={bgclr}
          w={"200px"}
          height={"40px"}
          rounded="3xl"
          alignContent={"center"}
          textAlign="center"
          color={fontclr}
          borderWidth={0}
        >
          <Text w={"100%"} align={"center"}>
            {permitType}
          </Text>
          <IconButton
            color="white"
            borderWidth={0}
            variant="outline"
            aria-label="edit application info"
            fontSize="20px"
            icon={<DownloadIcon />}
            _hover={{
              background: "",
              color: "green",
            }}
            onClick={() => GeneratePDF(application)}
            isDisabled={btnDisabled}
          />
        </Tag>
      </VStack>
    </Center>
  );
}
