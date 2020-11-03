import React, { Fragment } from "react";
import Header from "./header";

export default function Layout({ children }) {
  return (
    <Fragment>
      <Header></Header>
      <div>{children}</div>
    </Fragment>
  );
}
