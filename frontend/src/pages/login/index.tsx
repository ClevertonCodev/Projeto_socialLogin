import axios from "axios";
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.scss";
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from "@greatsumini/react-facebook-login";
import { access } from "fs";

const Login = () => {

    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [tokenGoogle, setGoogle] = useState('');
    const[tokenFacebook,setFacebook] = useState('');
    const navigate = useNavigate();
    const trueLoogin = () => {
        navigate('/adm/produtos');
        window.location.reload();
    }
    
    const login = useGoogleLogin({
        onSuccess: async response =>
            setGoogle(response.access_token)
    });

    if (tokenGoogle) {
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/oauth/token',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                grant_type: 'social',
                client_id: 2,
                client_secret: 'm3RSoLUrc6dMSGbQiL0no2vQ7M7M7CY6f9G9t8wk',
                provider: 'google',
                access_token: tokenGoogle
            }
        })
            .then((responseT: { data: { access_token: string; } }) => {
                
                    localStorage.setItem("token", responseT.data.access_token)
                    document.cookie = 'token=' + responseT.data.access_token;
                trueLoogin()

            })
            .catch(function (error) {
                if (error) {
                    alert(error.response.data.erro)
                }
            });
    }
   
    
    if (tokenFacebook ) {
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/oauth/token',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                grant_type: 'social',
                client_id: 2,
                client_secret: '7RmxOpUmztJEILMUVZs8P9NNnuY0inxnNC4Rzjem',
                provider: 'facebook',
                access_token: tokenFacebook
            }
        })
            .then((responseT: { data: any; }) => {
                if (responseT.data)
                    localStorage.setItem("token", responseT.data.access_token)
                    document.cookie = 'token=' + responseT.data.access_token;
                    trueLoogin()

            })
            .catch(function (error) {
                if (error) {
                    alert(error.response.data.erro)
                }
            });
    }



    const FormLogin = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/oauth/token',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                username: email,
                password: password,
                grant_type: 'password',
                client_id: 2,
                client_secret: 'm3RSoLUrc6dMSGbQiL0no2vQ7M7M7CY6f9G9t8wk'
            }
        })

            .then((response: { data: any; }) => {

                if (response.data) {
                    localStorage.setItem("token", response.data.access_token)
                    document.cookie = 'token=' + response.data.access_token;
                    trueLoogin()
                }
            })
            .catch(function (error) {
                if (error) {
                    alert(error.response.data.erro)
                }
            });
          
    }
    return (
        <div className="login" >
            <div className="limiter">
                <div className="container-login100" >

                    <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">

                        <form onSubmit={FormLogin} id='formlogin' className="login100-form validate-form flex-sb flex-w">
                            <span className="login100-form-title p-b-53">
                                Login
                            </span>

                            <a className="btn-face m-b-20">
                                <FacebookLogin
                                    appId="745138653705769"
                                    style={{
                                        color: '#fff',
                                      }}
                                    onSuccess={(response) => {
                                        console.log(response)
                                        setFacebook(response.accessToken)
                                    }}
                                    onFail={(error) => {
                                      alert('Login Failed!');
                                    }}
                                > Entrar com Facebook</FacebookLogin>
                            </a>

                            <a onClick={() => login()} className="btn-google m-b-20">
                                Entrar com Google
                            </a>


                            <div className=" email p-t-31 p-b-9">
                                <span className="txt1">
                                    Email:
                                </span>
                            </div>
                            <div className="wrap-input100 validate-input" data-validate="Username is required">

                                <input className="input100" type="email" value={email} onChange={evento => setemail(evento.target.value)} required />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="p-t-13 p-b-9">
                                <span className="txt1">
                                    Senha:
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <input className="input100" type="password" value={password} onChange={evento => setPassword(evento.target.value)} />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="container-login100-form-btn m-t-17">
                                <button className="login100-form-btn">
                                    Entrar
                                </button>
                            </div>

                            <div className="w-full text-center p-t-55">
                                <span className="txt2">
                                    Não é um membro?
                                </span>

                                <a type="submit" className="txt2 bo1" href="/cadastrar/usuario/ex">
                                    Cadastre-se
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="dropDownSelect1"></div>
            </div>
        </div>
    );

}
export default Login;


