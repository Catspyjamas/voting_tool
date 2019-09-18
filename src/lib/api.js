import axios from "axios";
import { possiblePollStates } from "./poll";

const url = "http://127.0.0.1:7999";

export let authToken = localStorage.getItem("authToken");

export async function fetchPolls() {
  try {
    const response = await axios.get(`${url}/polls`);
    return response.data;
  } catch (error) {
    if (error.response.data) {
      return error.response.data;
    } else return error;
  }
}

export async function fetchPoll(pollId) {
  try {
    const response = await axios.get(`${url}/polls/${pollId}`);
    return response.data;
  } catch (error) {
    if (error.response.data) {
      return error.response.data;
    } else return error;
  }
}

export async function savePoll(newPollObject, pollId) {
  try {
    // if there's no pollId, it's a post request
    if (!pollId) {
      const response = await axios.post(`${url}/polls`, newPollObject, {
        headers: {
          Authentication: authToken,
          ContentType: "application/json"
        },
        responseType: "json"
      });
      return response.data;
    }
    // if there is a pollId, it's a patch request
    const response = await axios.patch(
      `${url}/polls/${pollId}`,
      newPollObject,
      {
        headers: {
          Authentication: authToken,
          ContentType: "application/json"
        },
        responseType: "json"
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.data) {
      return error.response.data;
    } else return error;
  }
}

export async function changePollStatus(pollId, status) {
  try {
    if (!possiblePollStates[status]) {
      throw new Error(
        "The status can only be one of these:",
        ...possiblePollStates.values()
      );
    }
    const response = await axios.patch(
      `${url}/polls/${pollId}`,
      { status: status },
      {
        headers: {
          Authentication: authToken,
          ContentType: "application/json"
        },
        responseType: "json"
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.data) {
      return error.response.data;
    } else return error;
  }
}

export async function deletePoll(pollId) {
  try {
    const response = await axios.delete(`${url}/polls/${pollId}`, {
      headers: {
        Authentication: authToken,
        ContentType: "application/json"
      },
      responseType: "json"
    });
    return response.data;
  } catch (error) {
    if (error.response.data) {
      return error.response.data;
    } else return error;
  }
}

// export async function saveVote(pollId, newVoteObject) {

// }

export async function fetchPollResults(pollId) {
  try {
    const responseVote = await axios.get(`${url}/polls/${pollId}/votes`, {
      headers: {
        Authentication: authToken,
        ContentType: "application/json"
      },
      responseType: "json"
    });
    const vote = responseVote.data;
    return vote;
  } catch (error) {
    if (error.response.data) {
      return error.response.data;
    } else return error;
  }
}

export async function fetchVote(pollId, authToken) {
  try {
    //then GET request with authToken
    const responseVote = await axios.get(`${url}/polls/${pollId}/vote/`, {
      headers: {
        Authentication: authToken,
        ContentType: "application/json"
      },
      responseType: "json"
    });
    const vote = responseVote.data;
    return vote;
  } catch (error) {
    if (error.response.data) {
      return error.response.data;
    } else return error;
  }
}

export async function saveVote(pollId, rankedOptions, authToken) {
  try {
    // If it's the user's first vote, it's a post
    const hasUserVoted = await fetchVote(pollId, authToken);
    if (hasUserVoted.usersFirstVote) {
      const responseVote = await axios.post(
        `${url}/polls/${pollId}/vote`,
        rankedOptions,
        {
          headers: {
            Authentication: authToken,
            ContentType: "application/json"
          },
          responseType: "json"
        }
      );
      return responseVote.data;
    } else {
      const responseVote = await axios.patch(
        `${url}/polls/${pollId}/vote`,
        { ranking: rankedOptions },
        {
          headers: {
            Authentication: authToken,
            ContentType: "application/json"
          },
          responseType: "json"
        }
      );
      return responseVote.data;
    }
  } catch (error) {
    if (error.response.data) {
      return error.response.data;
    } else return error;
  }
}

/// OPEN/CLOSE POLLS

/// USER AUTHENTICATION

export async function login(credentials) {
  try {
    const response = await axios.post(`${url}/login`, credentials, {
      headers: {
        ContentType: "application/json"
      },
      responseType: "json"
    });
    console.log(response);
    authToken = response.data.data.token;
    console.log("NEW AUTH TOKEN:", authToken);
    localStorage.setItem("authToken", response.data.data.token);
    localStorage.setItem("userId", response.data.data._id);
    return response.data;
  } catch (error) {
    if (error.response.data) {
      return error.response.data;
    }
  }
}

export async function signup(credentials) {
  try {
    const response = await axios.post(`${url}/signup`, credentials, {
      headers: {
        ContentType: "application/json"
      },
      responseType: "json"
    });
    authToken = response.data.data.token;
    console.log("NEW AUTH TOKEN:", authToken);

    localStorage.setItem("authToken", response.data.data.token);
    localStorage.setItem("userId", response.data.data._id);

    return response.data;
  } catch (error) {
    if (error.response.data.errors[0].err.errmsg.includes("E11000")) {
      console.log("hit");
      return {
        status: "fail",
        errors: [{ msg: "There's another user with this email address." }]
      };
    }
  }
}
