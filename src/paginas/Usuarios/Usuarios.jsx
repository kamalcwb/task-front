import React, { useState } from 'react';
import './Usuarios.css';
import api from '../../api/api';

const Usuarios = () => {
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [erroSenha, setErroSenha] = useState(false);
  const [msgEndpoint, setMsgEndpoint] = useState('');

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleUsuarioChange = (event) => {
    setUsuario(event.target.value);
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const handleConfirmacaoSenhaChange = (event) => {
    setConfirmacaoSenha(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (senha !== confirmacaoSenha) {
      setErroSenha(true);
      return;
    }
    setErroSenha(false);

    const novoUsuario = {
      nome: nome,
      username: usuario,
      senha: senha
    };

    try {
      const response = await api.post(`/usuarios/cadastro`, novoUsuario);
      if (response.data.message) {
        setMsgEndpoint(response.data.message);
      }

    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };

  return (
    <form className="usuarios" onSubmit={handleSubmit}>
      <label>
        Nome:
        <input type="text" value={nome} onChange={handleNomeChange} />
      </label>
      <br />
      <label>
        Nome de usuário:
        <input type="text" value={usuario} onChange={handleUsuarioChange} />
      </label>
      <br />
      <label>
        Senha:
        <input type="password" value={senha} onChange={handleSenhaChange} />
      </label>
      <br />
      <label>
        Confirmação de senha:
        <input type="password" value={confirmacaoSenha} onChange={handleConfirmacaoSenhaChange} />
      </label>
      {erroSenha && <p className="erro">As senhas não coincidem.</p>}
      {msgEndpoint && <p className="erro">{msgEndpoint}</p>}
      <br />
      <button type="submit">Cadastrar</button>
      <p>Já tem cadastro? <a href="/">Clique aqui para entrar</a></p>
    </form>
  );
};

export default Usuarios;
