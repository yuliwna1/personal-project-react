import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    async function getData() {
      try {
        let data;
        // This API has only username: https://api.github.com/users
        // This API has githubUserName, information about users' forks: https://api.github.com/users/pkanal/repos
        let response = await fetch(
          `https://api.github.com/users/${userNameOutput}/events`
        );
        data = await response.json();
        const filteredEventData = data.filter(item => {
          return item.type === "PullRequestEvent" || item.type === "ForkEvent";
        });
        getAPIData(filteredEventData);
      } catch (err) {
        console.log("There is an error:", err.message);
      }
    }
    getData();
  }, [userNameOutput, getAPIData]);

  useEffect(() => {
    function filterData(data) {
      const groupData = groupBy(data, "type");
      if (groupData.PullRequestEvent) {
        getPullRequestData(groupData.PullRequestEvent);
      }

      if (groupData.ForkEvent) {
        getForkData(groupData.ForkEvent);
      }
    }

    function checkLoad(data) {
      if (data.length === 0) {
        getStatus(true);
      }

      if (data.length > 0) {
        getStatus(false);
      }
    }

    filterData(githubAPIData);
    checkLoad(githubAPIData);
  }, [githubAPIData]);

  console.log("show data:", isLoading, githubAPIData);

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

function SearchField() {
  const [githubUserName, getName] = useState("");
  const [userNameOutput, passUserNameToAPI] = useState(githubUserName);

  const handleSubmit = e => {
    e.preventDefault();
    passUserNameToAPI(githubUserName);
  };

  return (
    <>
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
    </>
  );
}

export default SearchField;
