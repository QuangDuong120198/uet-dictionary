import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CalculateApp from '../presentation/CalculateApp';
import { increment, decrement, double } from '../../redux/actions';

const mapStateToProps = (state) => ({
  currentNumber: state.number
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    handleIncrement: increment,
    handleDecrement: decrement,
    handleDouble: double
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculateApp);
