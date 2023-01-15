
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Botao from "../../components/botao";
import Navbar from "../../components/navbar";
import TokenJWT from "../../components/token";
import './produtos.scss'
const Produtos = () => {

    

    const { id } = useParams();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    var Price = (document.getElementById('decimal') as HTMLInputElement);
    const navigate = useNavigate();
    const data = {

        name: name,
        description: description,
        amount: amount,
        price: price,
    }
    
    function mascaraMoeda(event:any) {
        const onlyDigits = event.target.value
          .split('')
          .filter((s: string) => /\d/.test(s))
          .join('')
          .padStart(3, '0');
        let digitsFloat = onlyDigits.slice(0, -2) + '.' + onlyDigits.slice(-2);
        event.target.value = maskCurrency(digitsFloat);
        setPrice(digitsFloat)
      }
   
      function maskCurrency(valor: any, locale = 'pt-BR', currency = 'BRL') {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency,
        }).format(valor);
      }

      useEffect(() => {

          if (id) {
      
      
            axios({
                method: 'get',
                url: `http://127.0.0.1:8000/api/v1/produtos/${id}`,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': TokenJWT()
                }
      
            })
                .then((resposta: { data: any; }) => {
                    setName(resposta.data.name);
                    setDescription(resposta.data.description);
                    setAmount(resposta.data.amount);
                    setPrice(resposta.data.price);
                })
        }
        
    }, [id]);

    

   
    const FormProdutos = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        if (id) {
            axios({
                method: 'put',
                url: `http://127.0.0.1:8000/api/v1/produtos/${id}`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': TokenJWT()
                },
                data: data
            })
                .then((response: { data: any; }) => {
                    if (response.data) {
                        alert('Atualizou com sucesso!');
                        navigate("/adm/produtos")
                    }
                })

                .catch(function (error) {
                    alert('Erro indesperado!')
                    console.log(error)
                });

        } else {
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/v1/produtos',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': TokenJWT()
            },

            data: data
        })
            .then((response: { data: any; }) => {
                if (response.data) {
                    alert('Cadastrou com sucesso!');
                    setName('');
                    setDescription('');
                    setAmount('');
                    Price.value = '';
                }
            })

            .catch(function (error) {
                alert('Erro indesperado!')
                console.log(error);
            });
        }    
    }
   
    return (
        <div>
            <Navbar />
            <div className="containeer">
                <form className="formUser" onSubmit={FormProdutos} >

                    <div className="p-t-31 p-b-9">
                        <span className="txt1">
                            Nome:
                        </span>
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="Username is required">

                        <input className="input100" type="text" value={name} onChange={evento => setName(evento.target.value)} required />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="p-t-31 p-b-9">
                        <span className="txt1">
                            Acessórios:
                        </span>
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="Username is required">

                        <input className="input100" type="text" value={description} onChange={evento => setDescription(evento.target.value)} required />
                        <span className="focus-input100"></span>
                    </div>

                    <div>
                        <div className="p-t-13 p-b-9">
                            <span className="txt1">
                                Quantidade:
                            </span>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="amountis required">
                            <input className="input100" type="number" value={amount} onChange={evento => setAmount(evento.target.value)} required />
                            <span className="focus-input100"></span>
                        </div>
                    </div>

                    <div>
                        <div className="p-t-13 p-b-9">
                            <span className="txt1">
                                Preço:
                            </span>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="amountis required">
                            { id? <input id="decimal" className="input100"  type="text"
                            value={price}
                            onChange={evento => setPrice(evento.target.value)} 
                            required/>:false
                            }
                            { id? false : 
                            <input id="decimal" className="input100"  type="text"
                            onKeyUp={(e) => mascaraMoeda(e)} 
                              required/>
                            }
                            <span className="focus-input100"></span>
                        </div>
                    </div>
                        

                    <div className="container-login100-form-btn m-t-17">
                        <Botao
                            type="submit"
                        >
                            {id ? 'Atualizar' : 'Cadastrar'}
                        </Botao>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default Produtos;