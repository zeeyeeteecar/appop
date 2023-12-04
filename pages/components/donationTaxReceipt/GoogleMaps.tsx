import React from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";

export default function GoogleMaps() {
  return (
    <>
      <Popover placement="top-start">
        <PopoverTrigger>
          <Button h={"20px"}>Click me</Button>
        </PopoverTrigger>
        <PopoverContent shadow={"2xl"}>
          <PopoverHeader fontWeight="semibold">Popover placement</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10433.2712569802!2d-123.1322222!3d49.1755556!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54867531948f3ff9%3A0x3aba1171a6577966!2sLansdowne%20Centre!5e0!3m2!1sen!2sca!4v1677187604556!5m2!1sen!2sca" width="600" height="450"  loading="lazy" ></iframe>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
