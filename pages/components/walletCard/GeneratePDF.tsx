import React from "react";
import { jsPDF } from "jspdf";

export default function GeneratePDF(application): any {
  //alert(application);
  //const doc = new jsPDF();
  const doc = new jsPDF("p", "mm", [500, 250]);

  doc.text("Richmond Centre for Disability", 10, 30);

  doc.text("permit#:", 20, 30);

  const permitID: string = application.permit
    ? application.permit.rcdPermitId.tostring()
    : " N/A";

  const applicantName =
    application.firstName +
    " " +
    application.middleName +
    " " +
    application.lastName;
  doc.text(permitID, 20, 50);
  doc.text(applicantName, 40, 50);

  doc.save("a4.pdf"); // will save the file in the current working directory
  return <></>;
}
