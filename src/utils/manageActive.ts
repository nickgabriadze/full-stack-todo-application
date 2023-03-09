export const StayLoggedIn = (username:string, stayLoggedIn: boolean) => {

    window.localStorage.setItem('username', username)
    window.localStorage.setItem('stayLoggedIn', stayLoggedIn ? 'true' : 'false');
}

