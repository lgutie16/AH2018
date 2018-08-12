import React from 'react';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

const colors = {
  player1: { color: 'blue' },
  player2: { color: 'red' },
};

const MovesList = ({ movesRecord, ...rest }) => {

  const error = movesRecord.length === 0
  return (
    <div>{error && <div></div>}
      {!error && <Tabs
        defaultActiveKey="1"
        tabPosition={'top'}
        style={{ height: 220 }}
      >

        {movesRecord.map(move => {
          const color = rest[move.roundWinner]
            ? rest[move.roundWinner].color
            : 'black';

          return <TabPane tab={move.roundWinner} key="1"> </TabPane>

        })}
      </Tabs>}</div>
  );
};

export default MovesList;
