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

export const setForkEventData = (data = []) => ({
  type: GITHUB_DATA_ACTION_TYPES.SET_FORK_EVENT_DATA,
  payload: action
});

export const setPullRequestData = (data = []) => ({
  type: GITHUB_DATA_ACTION_TYPES.SET_PULL_REQUEST_DATA,
  payload: action
});

export const fetchDataThunk = userNameOutput => async dispatch => {
  const storeData = data => dispatch(fetchData(data));
  try {
    let data;
    let response = await fetch(
      `https://api.github.com/users/${userNameOutput}/events`
    );
    data = await response.json();
    const filteredEventData = data.filter(item => {
      return item.type === "PullRequestEvent" || item.type === "ForkEvent";
    });
    storeData(filteredEventData);
  } catch (err) {
    console.log("There is an error:", err.message);
  }
};
