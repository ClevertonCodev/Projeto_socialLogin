import { useCookies } from "react-cookie";
import Authorization from "./auth";

function TokenJWT(){
    let token:any = document.cookie.split(';').find(indice => {
        return indice.includes('token=')
    })

    token = token.split('=')[1];
    token = 'Bearer ' + token;

    return token
}

export default TokenJWT;