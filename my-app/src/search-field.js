import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { fetchDataThunk } from "./store/github-info-actions";
import Container from "./Container";

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

function ShowData({ userNameOutput }) {
  const [githubAPIData, getAPIData] = useState([]);
  const [pullRequestData, getPullRequestData] = useState([]);
  const [forkData, getForkData] = useState([]);
  const [isLoading, getStatus] = useState(true);

  console.log("data", githubAPIData, forkData);

  return (
    <React.Fragment>
      {Object.keys(githubAPIData).length === 0 && isLoading && (
        <h1>Loading...</h1>
      )}

      {Object.keys(githubAPIData).length > 0 && (
        <h1 className="text-right">{userNameOutput}</h1>
      )}

      {forkData.length > 0 && (
        <Container data={forkData} title={"Recent Forks"} name={"fork"} />
      )}
      {pullRequestData.length > 0 && (
        <Container
          data={pullRequestData}
          title={"Recent Pull Request"}
          name={"pullRequest"}
        />
      )}
    </React.Fragment>
  );
}

function SearchField(props) {
  const [githubUserName, getName] = useState("");
  const [userNameOutput, passUserNameToAPI] = useState(githubUserName);

  const handleSubmit = e => {
    e.preventDefault();
    props.storeData(githubUserName);

  };
 // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
  // Update the document title using the browser API
  //    props.storeData(githubUserName); <--- i did it here too but its dangerous because it fetches all the time

  });

  return (
    <React.Fragment>
      {!userNameOutput && (
        <form>
          <label>
            Github Username:
            <input
              type="text"
              placeholder="Type something..."
              value={githubUserName}
              onChange={e => getName(e.target.value)}
            ></input>
          </label>
          <input type="submit" onClick={handleSubmit}></input>
        </form>
      )}

      {userNameOutput && <ShowData userNameOutput={userNameOutput} />}
    </React.Fragment>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  storeData: (data) => dispatch(fetchDataThunk(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchField);
