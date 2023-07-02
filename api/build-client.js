import axios from "axios";


export const buildClient = ({req}) => {
  if (typeof window === 'undefined') {
    // we are in the server
    return axios.create({
      baseURL: 'http://www.refactorworks.com',
      headers: req.headers
    });
  } else {
    // we are in the browser
    return axios.create({});
  }
}