import React from "react";
import {
  Center,
  VStack,
  HStack,
  Text,
  Input,
  Box,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

// interface IApplication {
//   application: {
//     type: string;
//     newApplication: any;
//     renewalApplication: any;
//     replacementApplication: any;
//   };
// }

export default function OverLay_showDetails({ application_data }) {
  return (
    <>
      <li>{application_data&&application_data.id}</li>
      <li>{JSON.stringify(application_data)}</li>
    </>
  );
}
