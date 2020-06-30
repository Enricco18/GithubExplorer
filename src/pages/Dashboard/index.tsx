import React, { useState, useEffect, FormEvent } from 'react';
import { DashboardTitle, Form, Repositories, Error } from './styles';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');

  const [inputError, setInputError] = useState('');

  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storedItem = localStorage.getItem('@GitHubExplorer:repositories');

    if (storedItem) {
      return JSON.parse(storedItem);
    }
    return [];
  });

  async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newRepo) {
      return setInputError('Digite o autor/nome do repositorio');
    }

    try {
      const { data: repository } = await api.get<Repository>(
        `/repos/${newRepo}`,
      );
      setRepositories([...repositories, repository]);
      setNewRepo('');
      return setInputError('');
    } catch (err) {
      return setInputError('Erro na busca por esse repositorio');
    }
  }

  useEffect(() => {
    localStorage.setItem(
      '@GitHubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  return (
    <>
      <img src={logo} alt="GitHub Explorer"></img>
      <DashboardTitle>Explore repositorios no github.</DashboardTitle>
      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => {
            setNewRepo(e.target.value);
          }}
          type="text"
          placeholder="Digite o nome do repositorio aqui"
        ></input>
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map(repository => {
          return (
            <Link
              key={repository.full_name}
              to={`/repositories/${repository.full_name}`}
            >
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>
              <FiChevronRight size={20}></FiChevronRight>
            </Link>
          );
        })}
      </Repositories>
    </>
  );
};

export default Dashboard;
