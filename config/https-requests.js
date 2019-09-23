const fetch = require("node-fetch");

const getRecentlyPlayed = accessToken => {
  const url = "https://api.spotify.com/v1/me/player/currently-playing";

  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  }).then(res => {
    if (res.status == 204) {
      return null;
    }
    return res
      .json()
      .then(data => data.item)
      .catch(error => console.log(error));
  });
};

module.exports = getRecentlyPlayed;
