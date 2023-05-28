import {GradientState, ImageColors} from '.';

type GradientActionType =
  | {
      type: 'SET_GRADIENT_COLOR';
      payload: ImageColors;
    }
  | {
      type: 'SET_GRADIENT_PREVCOLOR';
      payload: ImageColors;
    };

export const gradientReducer = (
  state: GradientState,
  action: GradientActionType,
) => {
  switch (action.type) {
    case 'SET_GRADIENT_COLOR':
      return {
        ...state,
        colors: action.payload,
      };
    case 'SET_GRADIENT_PREVCOLOR':
      return {
        ...state,
        prevColors: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
