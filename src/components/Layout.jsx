import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";

const Layout = ({ children }) => (
  <div>
    <ResponsiveAppBar />
    <main>{children}</main>
  </div>
);

export default Layout;
