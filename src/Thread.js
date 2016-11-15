import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function Thread(props) {
  debugger;
  return (
    <div>
      {JSON.stringify(props, null, 4)}
    </div>
  )
}

const mapDispatch = (dispatch) => {
  return {
    doSomethingInteresting: bindActionCreators((a) => {return {type: 'a'}}, dispatch),
  }
}

export default connect((state) => state, mapDispatch)(Thread);