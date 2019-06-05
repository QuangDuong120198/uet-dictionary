import { INCREMENT, DECREMENT, DOUBLE } from '../actions';

export function number(state = 0, action) {
  switch (action.type) {
    case INCREMENT: {
      return state + 1;
    }
    case DECREMENT: {
      return state - 1;
    }
    case DOUBLE: {
      return state * 2;
    }
    default: {
      return state;
    }
  }
}

