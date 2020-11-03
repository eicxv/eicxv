import React from "react";

export default function Paragraph(props) {
  const isImage =
    props?.children?.props?.className === "gatsby-resp-image-wrapper";
  return <p className={isImage ? "full-bleed" : ""} {...props} />;
}
