import React from 'react';

const If = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};

export default If;
