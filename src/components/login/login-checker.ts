

export const formChecker = (username: string, password: string):(string|boolean) => {

        if(username.trim().length === 0 || password.trim().length === 0) {
            return "None of the fields should be empty";
        }
        if(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(password) === false){
            return "Either the username or the password is invalid"
        }   

       
        return true;

}

export const checkReceivedData = (username:string, receivedData: {username: string}[]) => {
    console.log(receivedData)
    if(receivedData[0]?.username !== username){
        return "Either the username or the password is invalid"
    }
    return true;
}


export default formChecker;