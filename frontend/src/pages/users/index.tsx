import axios from "axios";
import React, { useEffect, useState } from "react"
import "./users.scss"
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navbar from "../../components/navbar";
import Botao from "../../components/botao";
import TokenJWT from "../../components/token";
import User from "./adm/users";



const Users = () => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [Valipassword, setValiPassword] = useState('');
    const [email, setEmail] = useState('');;
    const { id } = useParams();
    var [idMe, setId]=useState('')
    const navigate = useNavigate();

    const data = {
        name: name,
        email: email,
        password: password,

    }
    const location = useLocation();
    var url = location.pathname;
    var cadastrarEx: string = ''
    var me = ''
    const voltar = () => {
        navigate('/login');
        window.location.reload();
    }
    useEffect(() => {


        if (id) {

            axios({
                method: 'get',
                url: `http://127.0.0.1:8000/api/v1/user/${id}`,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': TokenJWT()
                }

            })

                .then((resposta: { data: any; }) => {
                    setName(resposta.data.name);
                    setEmail(resposta.data.email);
                    setPassword(resposta.data.password);

                })
        }
    }, [id]);

    if (url == '/cadastrar/usuario/ex') {
        cadastrarEx = 'true'

    }

    if (url == '/me') {
        me = url;
        

            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/v1/me',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': TokenJWT()
                }
            })
                .then((response: { data: any; }) => {
                    setName(response.data.name);
                    setEmail(response.data.email);
                    setPassword(response.data.password);
                    setId(response.data.id);
                })
                .catch(function (error) {

                });
        
    }
    function FormUser(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        if (id) {
            axios({
                method: 'put',
                url: `http://127.0.0.1:8000/api/v1/user/${id}`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': TokenJWT()
                },
                data: {
                    name: name,
                    email: email,
                }
            })
                .then((response: { data: any; }) => {
                    if (response.data) {
                        console.log()
                        alert('Atualizou com sucesso!');
                        navigate("/adm/user")
                    }
                })

                .catch(function (error) {
                    console.log(error)
                });

        } else  if(me){
            if(password == Valipassword){
        
                axios({
                    method: 'put',
                    url: `http://127.0.0.1:8000/api/v1/user/${idMe}`,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': TokenJWT()
                    },
                    data: {
                        name: name,
                        email: email,
                        password: password
                    }
                })
                    .then((response: { data: any; }) => {
                        if (response.data) {
                            console.log()
                            alert('Atualizou com sucesso!');
                            navigate("/adm/user")
                        }
                    })
    
                    .catch(function (error) {
                        console.log(error)
                    });
            }else{
                alert('Senha incompativeis!')
            }

        }else{
            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/resister',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },

                data: data
            })
                .then((response: { data: any; }) => {
                    if (response.data) {
                        alert('cadastrou com sucesso!');
                        setName('');
                        setEmail('');
                        setPassword('');
                        voltar()
                    }
                })

                .catch(function (error) {
                    if (error?.response?.data?.errors?.name) {
                        alert(error.response.data.errors.name);
                    }
                    if (error?.response?.data?.errors?.email) {
                        alert(error.response.data.errors.email);
                    }
                    if (error?.response?.data?.password) {
                        alert(error.response.data.password);
                    }
                    console.log(error)



                });
                
        }

        
           
           
        
    }
    const editar = (editarSenha: any) => {
        console.log(editarSenha);
        if (editarSenha) {
            navigate(`/recuperar/senha/user/${editarSenha}`)
        }

    }
    return (
        <div>
            {
                cadastrarEx ? '' : <Navbar />
            }
            <div>
                <div className="containeer">
                    <form className="formUser" onSubmit={FormUser} >
                        <div className=" p-t-31 p-b-9">
                            <span className="txt1">
                                Nome:
                            </span>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Username is required">

                            <input className="input100" type="text" value={name} onChange={evento => setName(evento.target.value)} required />

                        </div>
                        <div className="p-t-31 p-b-9">
                            <span className="txt1">
                                Email:
                            </span>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Username is required">

                            <input className="input100" type="email" value={email} onChange={evento => setEmail(evento.target.value)} required />
                            <span className="focus-input100"></span>
                        </div>
                        {id ? false :
                            <div>
                                <div className="p-t-13 p-b-9">
                                    <span className="txt1">
                                        Senha:
                                    </span>
                                </div>
                                <div className="wrap-input100 validate-input" data-validate="Password is required">
                                    <input className="input100" type="password" value={password} onChange={evento => setPassword(evento.target.value)} required={id ? false : true} />
                                    <span className="focus-input100"></span>
                                </div>
                            </div>
                            
                        }
                        { me ?
                                <div>
                                    <div className="p-t-13 p-b-9">
                                        <span className="txt1">
                                           Confimar Senha:
                                        </span>
                                    </div>
                                    <div className="wrap-input100 validate-input" data-validate="Password is required">
                                        <input className="input100" type="password" value={Valipassword} onChange={evento => setValiPassword(evento.target.value)} required={id ? false : true} />
                                        <span className="focus-input100"></span>
                                    </div>
                                </div>
                        : false}
                        <div className="container-login100-form-btn m-t-17">
                            <Botao
                                type="submit"
                            >
                                {id ? 'Atualizar' : 'Cadastrar'}
                            </Botao>
                        </div>
                    </form>
                    {id ?
                        <div className="container-login100-form-btn m-t-17">
                            <a id="senha" href="" className="btn btn-warning" onClick={() => editar(id)} >
                                Click aqui para alterar sua senha
                            </a>
                        </div>
                        : false}
                </div>
            </div>
        </div>
    );

}

export default Users;
