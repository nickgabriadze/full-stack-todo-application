import axios from "axios";
import { sha256 } from "js-sha256";

export const checkAvailability = async (username: string) => {
  return axios.get("http://localhost:3001/api/get/username/", {
    params: { username: username },
  });
};

export const changeUsername = async (
  newUsername: string,
  oldUsername: string
) => {
  return axios.put("http://localhost:3001/api/put/username", {
    newUsername: newUsername,
    oldUsername: oldUsername,
  });
};

export const checkCurrentPass = async (username: string, password: string) => {
  return axios.get("http://localhost:3001/api/get/password", {
    params: { username: username, password: sha256(password) },
  });
};


export const changePassword = async (username: string, newPassword: string) => {
  return axios.put("http://localhost:3001/api/put/password", {
    username: username,
    newPassword: sha256(newPassword)
  })
}