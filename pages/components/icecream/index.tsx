import React, { useEffect, useState, useRef } from "react";
import {
  Center,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Input,
  HStack,
} from "@chakra-ui/react";

import { IconButton } from "@chakra-ui/react";
import { ExternalLinkIcon, DownloadIcon } from "@chakra-ui/icons";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

import SideBar from "../common/SideBar";

export default function Index() {
  const inputRef_from = useRef(null);
  const inputRef_to = useRef(null);

  const [serialNoFrom, setSerialNoFrom] = useState("");
  const [serialNoTo, setSerialNoTo] = useState("");

  function check_if_every_caracter_is_number(_str: string) {
    let returnValue: boolean = null;
    _str.split("").forEach((character) => {
      if (isNaN(+character) || !character.trim()) {
        returnValue = true;
      } else {
        returnValue = false;
      }
    });

    return returnValue;
  }

  async function GenerateTaxReceiptPDF() {
    if (!serialNoFrom.trim()) {
      alert("serialNoFrom input cannot be blank");
      inputRef_from.current.focus();
      return;
    }
    if (!serialNoTo.trim()) {
      alert("serialNoTo input cannot be blank");
      inputRef_to.current.focus();
      return;
    }
    if (check_if_every_caracter_is_number(serialNoFrom)) {
      alert("serialNoFrom input number");
      inputRef_from.current.focus();
      return;
    }
    if (check_if_every_caracter_is_number(serialNoTo)) {
      alert("serialNoTo input number");
      inputRef_to.current.focus();
      return;
    }

    const numberFrom = parseInt(serialNoFrom);
    const numberTo = parseInt(serialNoTo);

    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port ? ":" + window.location.port : "";
    const filename_pdf_template = "icecream_template.pdf";
    const url = protocol + "//" + hostname + port + "/" + filename_pdf_template;

    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const existingPdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await existingPdfDoc.embedFont(
      StandardFonts.Helvetica
    );

    const pdfDoc = await PDFDocument.create();

    const [secondDonorPage] = await pdfDoc.copyPages(existingPdfDoc, [1]);

    const current = new Date();
    const taxreceipt_No =
      "PPD_" +
      current.getFullYear() +
      current.getUTCMonth() +
      1 +
      current.getDate() +
      "_" +
      current.getHours() +
      (current.getMinutes() < 10
        ? "0" + current.getMinutes()
        : current.getMinutes()) +
      current.getUTCSeconds();

    for (let i = numberFrom; i <= numberTo; i += 4) {
      const [firstDonorPage] = await pdfDoc.copyPages(existingPdfDoc, [0]);
      const { width, height } = firstDonorPage.getSize();

      firstDonorPage.drawText(i.toString(), {
        x: 13,
        y: height - 60,
        size: 25,
        font: helveticaFont,
        color: rgb(1, 0, 0),
        //rotate: degrees(-45),
      });

      firstDonorPage.drawText((i + 1).toString(), {
        x: 408,
        y: height - 60,
        size: 25,
        font: helveticaFont,
        color: rgb(1, 0, 0),
        //rotate: degrees(-45),
      });

      firstDonorPage.drawText((i + 2).toString(), {
        x: 13,
        y: height - 335,
        size: 25,
        font: helveticaFont,
        color: rgb(1, 0, 0),
        //rotate: degrees(-45),
      });

      firstDonorPage.drawText((i + 3).toString(), {
        x: 408,
        y: height - 335,
        size: 25,
        font: helveticaFont,
        color: rgb(1, 0, 0),
        //rotate: degrees(-45),
      });

      pdfDoc.addPage(firstDonorPage);
      pdfDoc.addPage(secondDonorPage);
    }

    const pdfBytes = await pdfDoc.save();
    const fileName = taxreceipt_No;

    let blob = new Blob([pdfBytes], { type: "application/pdf" });
    var fileURL = URL.createObjectURL(blob);

    const tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = fileURL;
    tempLink.setAttribute("download", fileName);
    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(fileURL);
    }, 100);

    //window.open(fileURL);
  }

  return (
    <HStack width={"100%"} h="100vh" borderWidth={0} bgColor="">
      <SideBar />
      <VStack width={"full"} h="100%" borderWidth={0} p="10px" bgColor="white">
        <Center w="300px" h="100%" borderWidth={1}>
          <VStack>
            <Input
              ref={inputRef_from}
              placeholder="Serial Number From..."
              onChange={(event) => setSerialNoFrom(event.target.value)}
            ></Input>

            <Input
              ref={inputRef_to}
              placeholder="Serial Number To..."
              onChange={(event) => setSerialNoTo(event.target.value)}
            ></Input>

            <IconButton
              w={"full"}
              color="gray.300"
              borderWidth={1}
              variant="outline"
              aria-label="edit application info"
              fontSize="20px"
              icon={<DownloadIcon />}
              _hover={{
                background: "gray.100",
                color: "black",
              }}
              onClick={GenerateTaxReceiptPDF}
            />
          </VStack>
        </Center>
      </VStack>
    </HStack>
  );
}
