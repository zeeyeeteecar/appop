import React from "react";
import {
  Center,
  VStack,
  HStack,
  Box,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import WalletCard_Row from "./WalletCard_Row";

import SpinnerOverlay from "../common/SpinnerOverlay";

export default function WalletCard_Search() {
  const [fetchData, setFetchData] = React.useState(null);

  const [searchUserNo, setSearchUserNo] = React.useState("");
  const [searchPermitNo, setSearchPermitNo] = React.useState("");
  const [searchUserFName, setSearchUserFName] = React.useState("");
  const [searchUserLName, setSearchUserLName] = React.useState("");

  const dataFetch = async () => {
    setFetchData(null);
    const body = {
      searchUserNo: searchUserNo,
      searchPermitNo: searchPermitNo,
      searchUserFName: searchUserFName,
      searchUserLName: searchUserLName,
    };

    const url = "/api/walletCard/waletCard_Search_Result";
    const data = await (
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
    ).json();
    console.log("body", body);
    setFetchData(data);
  };

  function handle_onChange_Fname(e) {
    const firstName = e.target.value;
    setSearchUserFName(firstName ? firstName : "");
  }

  function handle_onChange_Lname(e) {
    const lastName = e.target.value;
    setSearchUserLName(lastName ? lastName : "");
  }

  function handle_onChange_PermitNo(e) {
    const permitNo = e.target.value;
    setSearchPermitNo(permitNo ? permitNo : "");
  }

  function handle_onChange_UserNo(e) {
    const userNo = e.target.value;
    setSearchUserNo(userNo ? userNo : "");
  }

  function handle_clickSearch() {
    if (
      searchUserNo +
      "" +
      searchUserFName +
      "" +
      searchUserLName +
      "" +
      searchPermitNo
    ) {
      dataFetch();
    } else {
      alert(
        "plese enter \n 'User #' or \n 'Permit #' or \n 'First Name' or \n  'Last Name'  "
      );
      //alert(searchUserNo + "" + searchUserFName + "" + searchUserLName);
      //alert(searchUserNo + "" + searchUserFName + "" + searchUserLName);
    }
  }

  console.log(fetchData);
  return (
    <VStack
      width={"100%"}
      h="850px"
      borderWidth={0}
      p="10px"
      overflowY="scroll"
    >
      <HStack spacing={"10"}>
        <Input
          w={"150px"}
          placeholder="First Name"
          onChange={(e) => handle_onChange_Fname(e)}
        />
        <Input
          w={"150px"}
          placeholder="Last Name"
          onChange={(e) => handle_onChange_Lname(e)}
        />
        <Input
          w={"150px"}
          placeholder="Permit #"
          onChange={(e) => handle_onChange_PermitNo(e)}
        />

        <Input
          w={"150px"}
          placeholder="User #"
          onChange={(e) => handle_onChange_UserNo(e)}
        />

        <Button
          type="submit"
          colorScheme={"teal"}
          variant={"outline"}
          w={"150px"}
          borderColor="teal.100"
          onClick={handle_clickSearch}
          _hover={{
            background: "teal.500",
            color: "white",
          }}
        >
          Search
        </Button>
      </HStack>

      <HStack>
        <WalletCard_Row fetchData={fetchData} setFetchData={setFetchData} />
      </HStack>
    </VStack>
  );
}
