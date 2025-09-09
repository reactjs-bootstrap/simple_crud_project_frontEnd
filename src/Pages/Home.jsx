import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div style={{ padding: "50px" }}>
      <Title>Welcome to Home Page</Title>
      <Paragraph>You are logged in successfully!</Paragraph>
    </div>
  );
};

export default Home;
