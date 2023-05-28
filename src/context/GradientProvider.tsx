import React, {FC, useReducer, PropsWithChildren} from 'react';
import {gradientReducer, GradientContext, ImageColors} from './';

export interface GradientState {
  colors: ImageColors;
  prevColors: ImageColors;
}

const GRADIENT_INITIAL_STATE: GradientState = {
  colors: {
    primary: 'transparent',
    secondary: 'transparent',
  },
  prevColors: {
    primary: 'transparent',
    secondary: 'transparent',
  },
};

export const GradientProvider: FC<PropsWithChildren> = ({children}) => {
  const [state, dispatch] = useReducer(gradientReducer, GRADIENT_INITIAL_STATE);

  const setMainColors = (colors: ImageColors) => {
    dispatch({type: 'SET_GRADIENT_COLOR', payload: colors});
  };

  const setPrevMainColors = (colors: ImageColors) => {
    dispatch({type: 'SET_GRADIENT_PREVCOLOR', payload: colors});
  };

  return (
    <GradientContext.Provider
      value={{
        colors: state.colors,
        prevColors: state.prevColors,
        setMainColors,
        setPrevMainColors,
      }}>
      {children}
    </GradientContext.Provider>
  );
};
