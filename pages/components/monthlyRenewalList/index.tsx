import React, { useEffect, useState, useRef } from "react";
import moment from "moment"
import {
  Center,
  VStack,
  HStack,
  Text,
  Button,
  IconButton,
  Flex,
  Radio,
  RadioGroup,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { SingleDatepicker, RangeDatepicker } from "chakra-dayzed-datepicker";
import { DownloadTableExcel } from "react-export-table-to-excel";
import SpinnerOverlay from "../common/SpinnerOverlay";
import ListCount from "../common/ListCount";
import SideBar from "../common/SideBar";

export default function Index() {
  const tableRef = useRef(null);

  const currentYear = new Date().getFullYear();
  const nextMonth = new Date().getMonth() + 2;
  const nextMonthDay1: string = "01";
  const nextMonthLastDay = new Date(currentYear, nextMonth, 0).getDate();

  const [fetchData, setFetchData] = useState([]);
  const [dateStart, setDateStart] = useState(
    new Date(moment().add(1, 'months').format("YYYY-MM-")+nextMonthDay1)
  );
  const [dateEnd, setDateEnd] = useState(
    new Date(moment().add(1, 'months').format("YYYY-MM-")+ nextMonthLastDay)
  );

  console.log(moment().add(1, 'months').format("YYYY-MM-DD"))
  console.log(currentYear + "-" + nextMonth + "-" + nextMonthLastDay)

  //   const [dateStart, setDateStart] = useState(
  //   new Date("2023-11-01")
  // );
  // const [dateEnd, setDateEnd] = useState(
  //   new Date("2023-11-30")
  // );

  const dataFetch = async () => {
    setFetchData([]);
    const body = { dateStart: dateStart, dateEnd: dateEnd };

    const data = await (
      await fetch("/api/monthlyRenewalList/monthlyRenewalList_find", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
    ).json();
    setFetchData(data);
  };

  useEffect(() => {
    // fetch data
    dataFetch();
  }, []);

  const formatDate = (dateFormatNeeded: Date) => {
    const expiryYear = new Date(dateFormatNeeded).getFullYear();
    const expiryMonth = new Date(dateFormatNeeded).getUTCMonth() + 1;
    const expiryDate = new Date(dateFormatNeeded).getUTCDate();
    //console.log("expiryYear", expiryYear);
    return expiryYear + "-" + expiryMonth + "-" + expiryDate;

    
  };

  const handle_Search = async () => {
    dataFetch();
  };

  return (
    <HStack
      borderWidth={"0px"}
      h="100vh"
      w="100%"
      spacing={0}
      overflow={"true"}
    >
      <SpinnerOverlay fetchData={fetchData} setFetchData={setFetchData} />
      <SideBar />
      <VStack
        width={"100%"}
        height="100vh"
        borderWidth={0}
        p={"10px"}
        spacing={3}
      >
        <HStack borderWidth="100%">
          <Flex borderWidth={"0px"} w="250px" h={"full"}>
            <ListCount count={fetchData.length} />
          </Flex>
          {/* <SingleDatepicker
            name="date-start"
            date={dateStart}
            onDateChange={setDateStart}
          />
          <SingleDatepicker
            name="date-end"
            date={dateEnd}
            onDateChange={setDateEnd}
          /> */}
          <HStack>
            <Button
              width={"250px"}
              colorScheme={"teal"}
              variant={"outline"}
              _hover={{
                background: "teal.500",
                color: "white",
              }}
              onClick={handle_Search}
            >
              Search Renewal List
            </Button>
          </HStack>
          <DownloadTableExcel
            filename={
              "Monthly PP Renewal List " +
              formatDate(dateStart) +
              "--" +
              formatDate(dateEnd)
            }
            sheet="users"
            currentTableRef={tableRef.current}
          >
            <Button
              colorScheme={"teal"}
              w="250px"
              variant={"outline"}
              _hover={{
                background: "teal.500",
                color: "white",
              }}
            >
              Export excel
            </Button>
          </DownloadTableExcel>
        </HStack>
        <TableContainer overflowY={"auto"} ref={tableRef} width="1700px">
          <Table width={"100%"} colorScheme="gray" size="sm">
            <TableCaption>Monthly PP Renewal </TableCaption>
            <Thead h="40px" bgColor={"green.50"}>
              <Tr color="green.300">
                <Th w="20px">User ID</Th>
                <Th>F name</Th>
                <Th w="50px">M name</Th>
                <Th>L name</Th>
                <Th>DoB</Th>
                <Th>Age</Th>
                <Th w="150px">address</Th>
                <Th w="50px"></Th>
                <Th w="80px">city</Th>
                <Th w="40px">prov</Th>
                <Th>post</Th>
                <Th w="100px">Expiry Date</Th>
                <Th>PP #</Th>
                <Th>Area</Th>
                <Th>phone</Th>
                <Th>email</Th>
                {/* <Th>PP History Record</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {fetchData &&
                fetchData.map((applicant, index) => {
                  //console.log("Performer_id==", item.Performer_id);

                  const sortedPermits = [...applicant.permits].sort(
                    (a, b) => b.rcdPermitId - a.rcdPermitId
                  );
                  const latestPermitExpiryDate = formatDate(
                    sortedPermits[0].expiryDate
                  );
                  const latestPermitID = sortedPermits[0].rcdPermitId;
                  const latestPermitType = sortedPermits[0].type;
                  const areaCode = applicant.phone.substring(0, 3);
                  const phone =
                    applicant.phone.substring(3, 3 + 3) +
                    "-" +
                    applicant.phone.substring(3 + 3, 3 + 3 + 4);

                   const addressUnitNo = applicant.addressLine2?("# " + applicant.addressLine2 + " - " ) : ""

                  const bgclr =
                    dateStart <= new Date(latestPermitExpiryDate) &&
                    new Date(latestPermitExpiryDate) <= dateEnd
                      ? "yellow.100"
                      : "red.200";

                  const bgclrPerm_Temp =
                    latestPermitType === "PERMANENT" ? "green.50" : "pink.200";

                  const getAge = (DpB, ppExpiryate) => {
                    let age =
                      new Date(ppExpiryate).getFullYear() -
                      new Date(DpB).getFullYear();

                    const expiryMonth = new Date(ppExpiryate).getUTCMonth() + 1;
                    const expiryDate = new Date(ppExpiryate).getUTCDate();

                    const DoBMonth = new Date(DpB).getUTCMonth() + 1;
                    const DoBDate = new Date(DpB).getUTCDate();

                    const diffMonthDate =
                      +new Date("2000-" + expiryMonth + "-" + expiryDate) <
                      +new Date("2000-" + DoBMonth + "-" + DoBDate);
                    age = diffMonthDate ? age - 1 : age;
                    return age;
                  };

                  return (
                    <Tr
                      key={index}
                      height={"50px"}
                      _hover={{
                        background: "yellow.100",
                        color: "black",
                      }}
                    >
                      <Td>{applicant.id}</Td>
                      <Td>{applicant.firstName}</Td>
                      <Td>{applicant.middleName}</Td>
                      <Td>{applicant.lastName}</Td>
                      <Td>{formatDate(applicant.dateOfBirth)}</Td>
                      <Td>
                        {getAge(applicant.dateOfBirth, latestPermitExpiryDate)}
                      </Td>
                      <Td>{addressUnitNo}{applicant.addressLine1}</Td>
                      
                      <Td>{applicant.city}</Td>
                      <Td>{applicant.province}</Td>
                      <Td>{applicant.postalCode}</Td>
                      <Td bgColor={bgclr}>{latestPermitExpiryDate}</Td>
                      <Td bgColor={bgclr}>{latestPermitID}</Td>
                      <Td bgColor={bgclrPerm_Temp}>{latestPermitType}</Td>

                      <Td>{areaCode}</Td>
                      <Td>{phone}</Td>
                      <Td>{applicant.email}</Td>

                      {/* {sortedPermits.map((permit, index) => {
                        return (
                          <>
                            <Td w={"100px"}>
                              <VStack>
                                <Text>{formatDate(permit.expiryDate)}</Text>
                                <Text color={"gray.300"}>
                                  # {permit.rcdPermitId}
                                </Text>
                              </VStack>
                            </Td>
                          </>
                        );
                      })} */}
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </HStack>
  );
}
