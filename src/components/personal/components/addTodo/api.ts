import axios from "axios";


export const createTodo = async (username: string, title: string, category: string) => {
        let date = new Date();
        date.setUTCHours(date.getUTCHours() + 4);
        const currentDate = date.toISOString().split('T')[0] + " " + date.toISOString().split('T')[1].split('.')[0];
        console.log(currentDate);
        const checked = false;
        const toBeSent = {
            title: title,
            category: category,
            checked: checked,
            date: currentDate,
            username: username
        }

        return axios.post('http://localhost:3001/api/create/todo', toBeSent)
}


export default createTodo;