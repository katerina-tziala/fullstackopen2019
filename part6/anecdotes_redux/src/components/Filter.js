import React from 'react';
import { setFilter } from '../reducers/filterReducer';
import { connect } from 'react-redux';

const Filter = (props) => {
  const handleChange = (event) => {
    const filter = event.target.value.trim();
    props.setFilter(filter);
  };

  const style = {
    marginBottom: 10
  };

  return (
    <>
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
      setFilter: value => {
          dispatch(setFilter(value))
      },
  }
};

export default connect(
  null,
  mapDispatchToProps
)(Filter);