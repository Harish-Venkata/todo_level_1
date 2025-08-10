import React, { Children } from "react";
import Header from "./Header";
import CopyRightNotice from "./CopyRightNotice";

export const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <CopyRightNotice />
    </div>
  );
};
