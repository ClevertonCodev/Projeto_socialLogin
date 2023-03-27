import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.scss'
import useCookies from "react-cookie/cjs/useCookies";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import TokenJWT from '../token';

const Navbar = () => {
  var [cookie, setCookie, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const [name, setName] = useState('');
 
  const logout = (e:any) => 
  {     e.preventDefault() 
        removeCookie('token')
        if(cookie == null){
          console.log('oi')
          window.location.href = '/';
        }else{
          localStorage.removeItem('token')
          window.location.href = '/';
        }
       
       
  };

  axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/v1/me',
    headers: {
      'Accept': 'application/json',
      'Authorization': TokenJWT()
    }
  })
    .then((response: { data: any; }) => {
        setName(response.data.name)
        
    })
    .catch(function (error) {
        alert(error);
    });
 
  return (
    <nav id='navbar' className="navbar navbar-expand-lg static-top" data-bs-theme="dark">
      <div className="container-sm">
        <a id='name' className="navbar-brand" href="/me" >Bem-vindo {name} </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul id='rotas' className='navbar-nav ms-auto '>
          <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Produtos
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a id='botao' className="dropdown-item" href="/produtos">Cadastrar novo produto</a></li>
                <li><a id='botao' className="dropdown-item" href="/adm/produtos">Administração</a></li>
              </ul>
            </li>
           
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Usuários
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a id='botao' className="dropdown-item" href="/user">Cadastrar novo usuário</a></li>
                <li><a id='botao' className="dropdown-item" href="/adm/user">Administração</a></li>
              </ul>
            </li>
            <li className="nav-i
              tem">
              <a id='botao' className="nav-link" onClick={(e) => logout(e)}>Sair </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

