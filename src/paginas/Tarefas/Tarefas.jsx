import React, { useState } from 'react';
import './Tarefas.css';

import api from '../../api/api';

const Tarefas = () => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataConclusao, setDataConclusao] = useState('');
    const [tarefas, setTarefas] = useState([]);

    const handleTituloChange = (event) => {
        setTitulo(event.target.value);
    };

    const handleDescricaoChange = (event) => {
        setDescricao(event.target.value);
    };

    const handleDataConclusaoChange = (event) => {
        setDataConclusao(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (titulo.trim() !== '' && descricao.trim() !== '') {
            const novaTarefa = {
                id: new Date().getTime(),
                titulo: titulo,
                descricao: descricao,
                data_conclusao: dataConclusao,
            };

            try {
                const response = await api.post(`/tarefas/salvar`, novaTarefa);
                if (response.data.message) {
                    // setMsgEndpoint(response.data.message);
                }

            } catch (error) {
                console.error('Erro ao enviar o formulário:', error);
            }
            setTarefas([...tarefas, novaTarefa]);
            setTitulo('');
            setDescricao('');
            setDataConclusao('');
        }
    };

    return (
        <div className="tarefas">
            <form className="tarefas-form" onSubmit={handleSubmit}>
                <label>
                    Título:
                    <input type="text" value={titulo} onChange={handleTituloChange} />
                </label>
                <br />
                <label>
                    Descrição:
                    <textarea value={descricao} onChange={handleDescricaoChange} />
                </label>
                <br />
                <label>
                    Data de Conclusão:
                    <input type="date" value={dataConclusao} onChange={handleDataConclusaoChange} />
                </label>
                <br />
                <button type="submit">Adicionar Tarefa</button>
            </form>
            <div className="tarefas-lista">
                <h2>Tarefas Criadas:</h2>
                {tarefas.length === 0 ? (
                    <p>Não há tarefas criadas ainda.</p>
                ) : (
                    <ul>
                        {tarefas.map((tarefa) => (
                            <li key={tarefa.id}>
                                <strong>{tarefa.titulo}</strong>
                                <p>{tarefa.descricao}</p>
                                <p>Data de Conclusão: {tarefa.dataConclusao}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Tarefas;
