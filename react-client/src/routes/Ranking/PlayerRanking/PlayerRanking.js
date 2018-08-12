import React from 'react';
import { Card, Col, Row, Avatar } from 'antd';
const { Meta } = Card;

const PlayerRanking = ({ name, data = [] }) => (
  <Row>
    <Col offset={10} span={8}>
      <Card
        hoverable
        style={{ width: 250 }}
        cover={
          <img
            alt="example"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Ua1kNXKh-SwzIt9jQtkDR9dbRK3jS-zkDLN2pPPBvDBgFuJDjA"
          />
        }
      >
        <Meta
          title={name}
          description={`Score: ${data && data[0] ? data[0].score : 0}`}
        />
      </Card>
    </Col>
  </Row>
);

export default PlayerRanking;
