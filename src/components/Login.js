import React, { useState, useEffect } from 'react'

function Login() {
    const [repositories, setRepositories] = useState([]) //valor inicial

    useEffect(async () => {
        const response = await fetch('https://api.github.com/users/Jardelpz/repos')
        const data = await response.json()

        setRepositories(data)
    }, [])  //vai ser executado so uma vez, aqui coloco a condição de mudança em que o método vai ser chamado novamente

    useEffect(() => {
        let filteres = repositories.filter(repo =>  repo.favorite)
        document.title = `Você favoritou ${filteres.length} Projetos`
    }, [repositories])

    function handleFavorite(id) {
        const newFavorite = repositories.map(repo => {
            return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
        })

        setRepositories(newFavorite) //quando favorito altera o repositories e chama o useeffect
    }

    return (
        <>
          <ul>
                {repositories.map(repo => (
                    <li key={repo.id}>
                        {repo.name}
                        {repo.favorite ?  <span>  (Favorito)  </span> : <span></span>}
                        <button onClick={() =>
                            handleFavorite(repo.id)
                        }>
                              Favoritar
                    </button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Login