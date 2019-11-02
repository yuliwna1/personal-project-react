import { GITHUB_DATA_ACTION_TYPES } from "./github-info-actions";

export const INITIAL_GITHUB_DATA_STATE = {
  githubUserName: "",
  githubAPIData: [],
  forkData: [],
  pullRequestData: []
};

export const githubInfoReducer = (
  state = INITIAL_GITHUB_DATA_STATE,
  action = {}
) => {
  switch (action.type) {
    case GITHUB_DATA_ACTION_TYPES.SET_USER_NAME: {
      return {
        ...state,
        githubUserName: action.payload
      };
    }
    case GITHUB_DATA_ACTION_TYPES.SET_API_DATA: {
      return {
        ...state,
        githubAPIData: action.payload
      };
    }
    case GITHUB_DATA_ACTION_TYPES.SET_FORK_EVENT_DATA: {
      return {
        ...state,
        forkData: action.payload
      };
    }
    case GITHUB_DATA_ACTION_TYPES.SET_PULL_REQUEST_DATA: {
      return {
        ...state,
        pullRequestData: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
