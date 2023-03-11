export const stayLoggedIn = (username:string, stayLoggedIn: string) => {
  
    window.localStorage.setItem('username', username)
    window.localStorage.setItem('stayLoggedIn', stayLoggedIn);
}

export const logOut = (username: string) => {
    window.localStorage.removeItem(username);
    window.localStorage.removeItem('stayLoggedIn');
}