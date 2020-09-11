const { default: Axios } = require("axios");

import axios from "axios";

export const request = {
  get: (url) =>
    axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36",
      },
    }),
};
