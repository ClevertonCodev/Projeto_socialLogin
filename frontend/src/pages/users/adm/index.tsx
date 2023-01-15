import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar";
import '../users.scss'
import Token from "../../../components/token";
import User from "./users";
import TokenJWT from "../../../components/token";


const AdmUser = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([])
    var token = TokenJWT()
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/v1/user',
            headers: {
                'Accept': 'application/json',
                'Authorization': TokenJWT()
            }

        })
            .then((resposta: { data: any; }) => {
                setUsers(resposta.data)
            })

    }, []);

    const excluir = (userExcluir: User) => {
        axios({
            method: 'delete',
            url: `http://127.0.0.1:8000/api/v1/users/${userExcluir.id}`,
            headers: {
                'Accept': 'application/json',
                'Authorization': Token()
            }

        })
            .then((excluir: { data: any; }) => {
                if (excluir.data.msg) {
                    alert(excluir.data.msg)
                    window.location.reload()
                }

            });
    }

    const editar = (editar: User) => {
        if (editar.id) {
            navigate(`/adm/user/${editar.id}`)
        }

    }


    return (
        <div>
            <Navbar />
            <div className="rolagem">

                <table className="table" >
                    <thead className="thead">
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(resposta =>
                            <tr className="tr" key={resposta.id}>
                                <td >{resposta.name}</td>
                                <td> {resposta.email}</td>
                                <td>
                                <button type="button" className="btn btn-primary" onClick={() => editar(resposta)} >
                                Editar</button>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-danger" onClick={() => excluir(resposta)}>
                                    Excluir</button>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default AdmUser;