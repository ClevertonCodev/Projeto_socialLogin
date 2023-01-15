import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar";
import '../../users/users.scss'
import TokenJWT from "../../../components/token";
import ProdutoS from "./produtos";


const AdmProdutos = () => {
    const navigate = useNavigate();
    const [produtos, setUsers] = useState<ProdutoS[]>([])
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/v1/produtos',
            headers: {
                'Accept': 'application/json',
                'Authorization': TokenJWT()
            }

        })
            .then((resposta: { data: any; }) => {
                setUsers(resposta.data)
            })

    }, []);

    const excluir = (produtosExcluir: ProdutoS) => {
        axios({
            method: 'delete',
            url: `http://127.0.0.1:8000/api/v1/produtos/${produtosExcluir.id}`,
            headers: {
                'Accept': 'application/json',
                'Authorization': TokenJWT()
            }

        })
            .then((excluir: { data: any; }) => {
                if (excluir.data.msg) {
                    alert(excluir.data.msg)
                    window.location.reload()
                }

            });
    }

    const editar = (editar: ProdutoS) => {
        if (editar.id) {
            navigate(`/adm/produtos/${editar.id}`)
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
                            <th scope="col">Acessórios</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">Preço</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map(resposta =>
                            <tr className="tr" key={resposta.id}>
                                <td >{resposta.name}</td>
                                <td> {resposta.description}</td>
                                <td> {resposta.amount}</td>
                                <td> {resposta.price}</td>
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

export default AdmProdutos;