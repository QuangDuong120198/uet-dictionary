export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const DOUBLE = 'DOUBLE';

export function increment() {
  return {
    type: INCREMENT
  };
}

export function decrement() {
  return {
    type: DECREMENT
  };
}

export function double() {
  return {
    type: DOUBLE
  };
}
