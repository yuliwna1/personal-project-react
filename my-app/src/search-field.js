import React from "react";
import { connect } from "react-redux";
import { fetchDataThunk } from "./store/github-info-actions";

function groupBy(objArr, property) {
  return objArr.reduce((acc, obj) => {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

function SearchField() {
  return (
    <React.Fragment>
      <h1>test</h1>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  storeData: () => dispatch(fetchDataThunk())
});

export const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchField);
