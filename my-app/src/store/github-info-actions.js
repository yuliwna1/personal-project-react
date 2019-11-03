export const GITHUB_DATA_ACTION_TYPES = {
  SET_USER_NAME: "get user name",
  SET_API_DATA: "set github API data",
  SET_FORK_EVENT_DATA: "set fork event data",
  SET_PULL_REQUEST_DATA: "set pull request data"
};

export const setName = (userNameOutput = "") => ({
  type: GITHUB_DATA_ACTION_TYPES.SET_USER_NAME,
  payload: userNameOutput
});

export const fetchData = (data = []) => ({
  type: GITHUB_DATA_ACTION_TYPES.SET_API_DATA,
  payload: data
});

export const setForkEventData = (forkEventData = []) => ({
  type: GITHUB_DATA_ACTION_TYPES.SET_FORK_EVENT_DATA,
  payload: forkEventData
});

export const setPullRequestData = (pullRequestData = []) => ({
  type: GITHUB_DATA_ACTION_TYPES.SET_PULL_REQUEST_DATA,
  payload: pullRequestData
});

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

export const fetchDataThunk = userNameOutput => async dispatch => {
  console.log("YOOO ", userNameOutput);
  const storeName = userNameOutput => dispatch(setName(userNameOutput));
  const storeData = data => dispatch(fetchData(data));

  const storeForkEventData = forkEventData =>
    dispatch(setForkEventData(forkEventData));

  const storePullRequestData = pullRequestData =>
    dispatch(setPullRequestData(pullRequestData));

  storeName(userNameOutput);

  try {
    let data;
    let response = await fetch(
      `https://api.github.com/users/${userNameOutput}/events`
    );
    data = await response.json();
    const filteredEventData = data.filter(item => {
      return item.type === "PullRequestEvent" || item.type === "ForkEvent";
    });
    const groupedData = groupBy(filteredEventData, "type");
    storeData(filteredEventData);
    storePullRequestData(groupedData.PullRequestEvent);
    storeForkEventData(groupedData.ForkEvent);
  } catch (err) {
    console.log("There is an error:", err.message);
  }
};
