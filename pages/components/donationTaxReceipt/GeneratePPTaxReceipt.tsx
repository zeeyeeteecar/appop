import React from "react";
import { IconButton } from "@chakra-ui/react";
import { ExternalLinkIcon, DownloadIcon } from "@chakra-ui/icons";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default function GeneratePPTaxReceipt({ application, donationAmount }) {
  //const donaAmount = async () => await application.donationAmount;

  async function GenerateTaxReceiptPDF() {
    //alert("GenerateTaxReceiptPDF");

    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port ? ":" + window.location.port : "";
    const filename_pdf_template = "Template_PP_Donation_Tax_Receipt.pdf";
    const url = protocol + "//" + hostname + port + "/" + filename_pdf_template;

    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    //******************************************** */

    const donationReceived = application.createdAt
      .substring(0, 10)
      .replace(/-/g, "");

    const taxreceipt_No =
      "PPD_" +
      donationReceived +
      "_" +
      (application.permit ? application.permit.rcdPermitId.toString() : "");

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    //console.log("donationReceived", donationReceived);

    const donorFnameMnameLname =
      application.firstName +
      " " +
      (application.middleName ? application.middleName : "") +
      " " +
      application.lastName;

    const addressUnitNo = application.addressLine2
      ? "# " + application.addressLine2 + " - "
      : "";
    const donorAddress = addressUnitNo + application.addressLine1;
    const donorCityProvPostal =
      application.city +
      " " +
      application.province +
      " " +
      application.postalCode;

    const donorEmail = application.email ? application.email : "";
    const donorID: string = application.applicant
      ? "P" + application.applicantId
      : "N/A";
    const donorDonationAmount = "$" + application.donationAmount + ".00";

    //******************************************** */

    firstPage.drawText(taxreceipt_No, {
      x: 125,
      y: height - 105,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      //rotate: degrees(-45),
    });

    firstPage.drawText(donationReceived, {
      x: 500,
      y: height - 105,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      //rotate: degrees(-45),
    });

    firstPage.drawText(donorFnameMnameLname, {
      x: 65,
      y: height - 150,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      //rotate: degrees(-45),
    });

    firstPage.drawText(donorAddress, {
      x: 65,
      y: height - 165,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      //rotate: degrees(-45),
    });

    firstPage.drawText(donorCityProvPostal, {
      x: 65,
      y: height - 180,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      //rotate: degrees(-45),
    });

    firstPage.drawText(donorEmail, {
      x: 90,
      y: height - 275,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      //rotate: degrees(-45),
    });

    firstPage.drawText(donationReceived, {
      x: 150,
      y: height - 298,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      //rotate: degrees(-45),
    });

    firstPage.drawText(donorID, {
      x: 520,
      y: height - 155,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      //rotate: degrees(-45),
    });

    firstPage.drawText(donorDonationAmount, {
      x: 525,
      y: height - 183,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      //rotate: degrees(-45),
    });

    firstPage.drawText(donorDonationAmount, {
      x: 525,
      y: height - 280,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      //rotate: degrees(-45),
    });

    firstPage.drawText(donorFnameMnameLname, {
      x: 75,
      y: height - 465,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      //rotate: degrees(-45),
    });
    //******************************************** */

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

  if (donationAmount >= 20.0) {
    return (
      <>
        <IconButton
          color="gray.300"
          borderWidth={0}
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
      </>
    );
  } else {
    return <></>;
  }
}
