import axios from "axios";

export const retrieveTodos = async (username: string) => {
  try {
     return axios.get("http://localhost:3001/api/get/todos", {
      params: {
        username: username,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export default retrieveTodos;
