export const stayLoggedIn = (username:string, stayLoggedIn: boolean) => {

    window.localStorage.setItem('username', username)
    window.localStorage.setItem('stayLoggedIn', 'true');
}

export const logOut = (username: string) => {
    window.localStorage.removeItem(username);
    window.localStorage.removeItem('stayLoggedIn');
}