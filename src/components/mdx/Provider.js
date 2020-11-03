import React from "react";
import { MDXProvider } from "@mdx-js/react";
import Paragraph from "./Paragraph";
const components = {
  p: Paragraph,
};
export default (props) => (
  <MDXProvider components={components}>{props.children}</MDXProvider>
);
