import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
//import { Center, VStack, Text, Box, Input, HStack } from "@chakra-ui/react";

//import DayOvMonth_Row from "./DayOvMonth_Row";

//import DayOvWeekTitle from "./DayOvWeekTitle";

export default function YearBlock() {
  const getDaysInMonth = (month, year) =>
    new Array(31)
      .fill("")
      .map((v, i) => new Date(year, month - 1, i + 1))
      .filter((v) => v.getMonth() === month - 1);

  const monthNumbers = Array(12)
    .fill(0)
    .map((e, i) => i + 1);

  return (
    <>
      {/* <DayOvMonth_Row
        getDaysInMonth={getDaysInMonth}
        monthNumbers={monthNumbers}
      /> */}
    </>
  );
}
