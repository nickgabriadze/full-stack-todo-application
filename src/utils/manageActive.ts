export const stayLoggedIn = (username: string, stayLoggedIn: string) => {
    if(stayLoggedIn === 'true'){
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("stayLoggedIn", stayLoggedIn);
    window.sessionStorage.setItem("username", username);
    }
    
    if(stayLoggedIn === 'false'){
        sessionStorage.setItem("username", username);
    }
};

