import axios from "axios";

export const checkAvailability = async (username: string) => {
  return axios.get("http://localhost:3001/api/get/username/", {
    params: { username: username },
  });
};


export const changeUsername = async (newUsername: string, oldUsername: string) => {
    return axios.put("http://localhost:3001/api/put/username", {
        newUsername: newUsername, 
        oldUsername: oldUsername
    })
}