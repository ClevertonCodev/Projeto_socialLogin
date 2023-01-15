import {useCookies } from "react-cookie";
function Authorization(){
   
    let token = localStorage.getItem('token')
    return token
}

export default Authorization;