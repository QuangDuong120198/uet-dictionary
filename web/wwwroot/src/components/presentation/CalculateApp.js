import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
  render() {
    const {
      handleIncrement,
      handleDecrement,
      handleDouble,
      currentNumber
    } = this.props;

    return (
      <>
        <div>Try redux</div>
        <input type='number' readOnly={true} value={currentNumber} />
        <button onClick={handleIncrement}>INCREMENT</button>
        <button onClick={handleDecrement}>DECREMENT</button>
        <button onClick={handleDouble}>DOUBLE</button>
      </>
    );
  }
}

App.propTypes = {
  currentNumber: PropTypes.number.isRequired,
  handleIncrement: PropTypes.func.isRequired,
  handleDecrement: PropTypes.func.isRequired,
  handleDouble: PropTypes.func.isRequired
};


export default App;
