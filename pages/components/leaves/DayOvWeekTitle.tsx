import React from "react";
import { Center, VStack, Text, Box, Input, HStack } from "@chakra-ui/react";
import moment from "moment";

export default function DayOvWeekTitle() {
  const getDaysInMonth = (month, year) =>
    new Array(31)
      .fill("")
      .map((v, i) => new Date(year, month - 1, i + 1))
      .filter((v) => v.getMonth() === month - 1);

  const daysOfMonth = getDaysInMonth(1, 2023);
  return (
    <>
      <HStack borderWidth={1}>
        <Box borderWidth={1} w="100px">
          Month
        </Box>
        {daysOfMonth &&
          daysOfMonth.map((eachDay, key) => {
            const weekday = moment(eachDay).day();
            const monthday = moment(eachDay).date();

            const dayOvMonth_gbclr = weekday in [6, 0] ? "pink" : "";

            return (
              <>
                <Center key={key} w="35px" bgColor={dayOvMonth_gbclr}>
                  {weekday}
                </Center>
              </>
            );
          })}
      </HStack>
    </>
  );
}
