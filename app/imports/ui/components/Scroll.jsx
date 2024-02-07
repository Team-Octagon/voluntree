import React from 'react';

const Scroll = (props) => (
  <div style={{ overflowY: 'scroll', height: '70vh' }}>
    {/* eslint-disable-next-line react/prop-types,react/destructuring-assignment */}
    {props.children}
  </div>
);

export default Scroll;
