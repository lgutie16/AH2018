import React from 'react';
import { List, Avatar, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import { Link } from 'react-router-dom';

const PlayersRanking = ({ data = [], loading, hasMore }) => (
  <div className="demo-infinite-container">
    <InfiniteScroll
      initialLoad={false}
      pageStart={0}
      /*  loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore} */
      useWindow={false}
    >
      <List
        dataSource={data}
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={
                <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Ua1kNXKh-SwzIt9jQtkDR9dbRK3jS-zkDLN2pPPBvDBgFuJDjA" />
              }
              title={item.name}
              description={item.name}
            />
            <div>
              <Link to={`/ranking/${item.name}`}>See details</Link>
            </div>
          </List.Item>
        )}
      >
        {loading &&
          hasMore && (
            <div className="demo-loading-container">
              <Spin />
            </div>
          )}
      </List>
    </InfiniteScroll>
  </div>
);

export default PlayersRanking;
