

export let user: any;
export const isUser: boolean = localStorage.getItem('user') ? true : false;
if (isUser) {
    user = JSON.parse(localStorage.getItem('user') || '{}')
}


export let isAdman: Boolean;
if (user?.profile?.email === 'salehwebdev2004@gmail.com') {
    isAdman = true
} else {
    isAdman = false
}
