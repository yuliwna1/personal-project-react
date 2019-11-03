import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchDataThunk } from "./store/github-info-actions";
import Container from "./Container";

const ShowData = data => {
  return (
    <div>
      {(data.data.forkEventData.length > 0 ||
        data.data.pullRequestData.length > 0) && (
        <h1 className="text-right">{data.data.userNameOutput}</h1>
      )}

      {data.data.forkEventData.length === 0 &&
        data.data.pullRequestData.length === 0 && <h1>Loading...</h1>}

      {data.data.forkEventData.length > 0 && (
        <Container
          data={data.data.forkEventData}
          title={"Recent Forks"}
          name={"fork"}
        />
      )}
      {data.data.pullRequestData.length > 0 && (
        <Container
          data={data.data.pullRequestData}
          title={"Recent Pull Request"}
          name={"pullRequest"}
        />
      )}
    </div>
  );
};

function SearchField(props) {
  const [githubUserName, getName] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    props.storeData(githubUserName);
  };

  return (
    <React.Fragment>
      {!props.userNameOutput && (
        <div className="container">
          <form>
            <label>
              <h2 className="bold text-left">Github Username:</h2>
              <input
                type="text"
                placeholder="Type something..."
                value={githubUserName}
                onChange={e => getName(e.target.value)}
              ></input>
            </label>
            <input
              className="upperCase"
              type="submit"
              onClick={handleSubmit}
              value="Get User"
            ></input>
          </form>
        </div>
      )}

      {props.userNameOutput && <ShowData data={props} />}
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  userNameOutput: state.userNameOutput,
  forkEventData: state.forkEventData,
  pullRequestData: state.pullRequestData
});

const mapDispatchToProps = dispatch => ({
  storeData: data => dispatch(fetchDataThunk(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchField);
