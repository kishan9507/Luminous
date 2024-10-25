// src/context/EnergyContext.js
import React, { createContext, useContext, useReducer } from 'react';

const EnergyContext = createContext();

const initialState = {
  tariffs: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TARIFFS':
      return { ...state, tariffs: action.payload };
    default:
      return state;
  }
};

export const EnergyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <EnergyContext.Provider value={{ state, dispatch }}>
      {children}
    </EnergyContext.Provider>
  );
};

export const useEnergy = () => {
  return useContext(EnergyContext);
};
