import React from "react";

export default function FormatDate() {
  const formatDate = (dateFormatNeeded: Date) => {
    const expiryYear = new Date(dateFormatNeeded).getFullYear();
    const expiryMonth = new Date(dateFormatNeeded).getUTCMonth() + 1;
    const expiryDate = new Date(dateFormatNeeded).getUTCDate();
    //console.log("expiryYear", expiryYear);
    return expiryYear + "-" + expiryMonth + "-" + expiryDate;
  };
  return <div>FormatDate</div>;
}
