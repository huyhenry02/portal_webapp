import React from 'react';
import { testActions } from '../../stores/slices/test.slice';
import { connect } from 'react-redux';

const Test = ({ count, increment, decrement }) => {
  return (
    <div className="app-container">
      Count: {count}
      <div className="row">
        <div className="col-sm-1">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => increment(10)}
          >
            Increment
          </button>
        </div>
        <div className="col-sm-1">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => decrement(1)}
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ test }) => ({
  count: test.count,
});

const mapDispatchToProps = dispatch => ({
  increment: (size: number) =>
    dispatch({ type: `${testActions.increment.type}_saga`, payload: size }),
  decrement: (size: number) =>
    dispatch({ type: `${testActions.decrement.type}_saga`, payload: size }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);
