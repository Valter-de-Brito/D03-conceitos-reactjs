import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [ repositories, setRepositories] = useState([]);

  useEffect( () => {
    api.get('repositories').then( response => {
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    
    const data = {
      title: `Novo item ${Date.now()}`,
      url: "http://github.com/...",
      techs: ["A", "B", "C"]
    }

    try {
      const result = await api.post('repositories', data);

      const respository = result.data;
      setRepositories([ ...repositories, respository ]);

      alert(`O repositório "${respository.title}" foi adicionado com sucesso.`);

    }catch(error) {
      alert('Erro no cadastro. Tente novamente.');
    }
    
  }

  async function handleRemoveRepository(id) {
    
    try {
      await api.delete(`repositories/${id}`);

      setRepositories(repositories.filter( respository => respository.id !== id));

    }catch(error) {
      alert('Erro no remover. Tente novamente.');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map( repository => (
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
      )
      )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
