import React, {useContext, useEffect, useState} from 'react';

const MSTContext = React.createContext(null);

export const Provider = MSTContext.Provider;

export function useStore(mapStateToProps) {
  const store = useContext(MSTContext);

  if (typeof mapStateToProps !== 'undefined') {
    return mapStateToProps(store);
  }
  return store;
}
