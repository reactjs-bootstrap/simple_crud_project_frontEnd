import React from "react";
import { List as AntList, Typography } from "antd";

const data = ["Item 1", "Item 2", "Item 3", "Item 4"];

const List = () => {
  return (
    <div style={{ padding: "50px" }}>
      <Typography.Title level={2}>List Page</Typography.Title>
      <AntList
        bordered
        dataSource={data}
        renderItem={(item) => <AntList.Item>{item}</AntList.Item>}
      />
    </div>
  );
};

export default List;
