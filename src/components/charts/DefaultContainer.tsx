import React from 'react';

const DefaultContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ width: '100%', height: '100%' }}>{children}</div>
    </div>
  );
};

export default DefaultContainer;
