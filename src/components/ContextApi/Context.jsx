import React, { createContext, useState } from 'react';

export const GroupingContext = createContext();

export const GroupingProvider = ({ children }) => {
  const [grouping, setGrouping] = useState('status'); 

  return (
    <GroupingContext.Provider value={{ grouping, setGrouping }}>
      {children}
    </GroupingContext.Provider>
  );
};
