import React, { useState } from 'react';

import api from '../../api/api';

import './Login.css';

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [erroLogin, setErroLogin] = useState(false);

    const handleUsuarioChange = (event) => {
        setUsuario(event.target.value);
    };

    const handleSenhaChange = (event) => {
        setSenha(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginUsuario = {
            username: usuario,
            senha: senha
        };

        try {
            const response = await api.post(`/usuarios/login`, loginUsuario);
            if (response.data.message === 'Success') {
                const id = response.data.id
                window.location.href = `http://localhost:3000/tarefas/${id}`;
            } else if (response.data.message !== 'Success') {
                setErroLogin(response.data.message);
            }

        } catch (error) {
            console.error('Erro ao efetuar o login', error);
        }
    };
    return (
        <form className="login" onSubmit={handleSubmit}>
            <label>
                Usuário:
                <input type="text" value={usuario} onChange={handleUsuarioChange} />
            </label>
            <br />
            <label>
                Senha:
                <input type="password" value={senha} onChange={handleSenhaChange} />
            </label>
            {erroLogin}
            <br />
            <button type="submit">Entrar</button>
            <p>Ainda não é cadastrado? <a href="/cadastro">Clique aqui para se cadastrar</a></p>
        </form>
    );
};

export default Login;
