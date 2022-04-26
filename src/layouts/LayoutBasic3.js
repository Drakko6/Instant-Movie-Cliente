import React from "react";

import { Container } from "semantic-ui-react";

import Header from "../components/Header";

const LayoutBasic3 = (props) => {
  const { children } = props;
  return (
    <>
      <Header searchUsers={true} />
      <Container className="layout-basic">{children}</Container>
    </>
  );
};

export default LayoutBasic3;
