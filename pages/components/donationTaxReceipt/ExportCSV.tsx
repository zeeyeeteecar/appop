import React from "react";
import moment from "moment";
import { Box, Flex, Center, Button } from "@chakra-ui/react";

import { CSVLink, CSVDownload } from "react-csv";

export default function ExportCSV({ fetchData }) {
  const csvData = [
    [
      "UserID",
      "Status",
      "Type",
      "PP#",
      "Tax#",
      "FName",
      "LName",
      "phone",
      "address",
      "city",
      "province",
      "postal",
      "Fee",
      "Dona",
      "Total",
    ],
  ];

  fetchData &&
    fetchData.map((application, index) => {
      const csvDataEachLine = [];
      csvDataEachLine.push(application.applicantId);
      csvDataEachLine.push(application.applicationProcessing.status);
      csvDataEachLine.push(application.type);
      csvDataEachLine.push(
        application.permit ? application.permit.rcdPermitId : ""
      );

      csvDataEachLine.push(
        application.donationAmount >= 20
          ? moment(application.createdAt).format("YYYYMMDD") +
              "_" +
              application.permit.rcdPermitId
          : ""
      );
      csvDataEachLine.push(application.firstName);
      csvDataEachLine.push(application.lastName);
      csvDataEachLine.push(application.phone);
      csvDataEachLine.push(application.addressLine1);
      csvDataEachLine.push(application.city);
      csvDataEachLine.push(application.province);
      csvDataEachLine.push(application.postalCode);
      csvDataEachLine.push(application.processingFee);
      csvDataEachLine.push(application.donationAmount);
      csvDataEachLine.push(
        parseFloat(application.processingFee) +
          parseFloat(application.donationAmount)
      );
      csvData.push(csvDataEachLine);
    });
  //console.log(csvData);
  return (
    <>
      <Button
        rounded={5}
        backgroundColor={"white"}
        w={"150px"}
        h={"40px"}
        colorScheme={"teal"}
        variant={"outline"}
        fontWeight={"semibold"}
        _hover={{
          background: "teal.500",
          color: "white",
        }}
      >
        <CSVLink data={csvData} filename={"my-file.csv"}>
          Export
        </CSVLink>
      </Button>
    </>
  );
}
