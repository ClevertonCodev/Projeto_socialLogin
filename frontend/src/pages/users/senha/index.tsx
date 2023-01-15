import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Botao from "../../../components/botao";
import Navbar from "../../../components/navbar";
import TokenJWT from "../../../components/token";
import User from "../adm/users";

const Password = () => {
    const [password, setPassword] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    var url = location.pathname;
    var cadastrarEx: string = ''
    if (url == '/recuperar/senha/user/') {
        cadastrarEx = 'true'

    }
    function FormPass(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        if (id) {
            axios({
                method: 'patch',
                url: `http://127.0.0.1:8000/api/v1/user/${id}`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': TokenJWT()
                },
                data:{
                    password:password
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

        }

        
        }
    return(
        <div>
            {
                cadastrarEx ? '' : <Navbar />
            }
            <div>
                <div className="containeer">
                    <form className="formUser" onSubmit={FormPass} >
            
                            <div>
                                <div className="p-t-13 p-b-9">
                                    <span className="txt1">
                                        Senha:
                                    </span>
                                </div>
                                <div className="wrap-input100 validate-input" data-validate="Password is required">
                                    <input className="input100" type="password" value={password} onChange={evento => setPassword(evento.target.value)} required />
                                    <span className="focus-input100"></span>
                                </div>
                            </div>
                    
                        <div className="container-login100-form-btn m-t-17">
                            <Botao
                                type="submit"
                            >
                                 Atualizar
                            </Botao>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Password


