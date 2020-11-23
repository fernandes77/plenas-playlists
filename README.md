## Plenas Playlists

Um web app mobile que cria e edita playlists utilizando a API do Spotify.

## Visitar

Visite o app em https://plenas-playlists.herokuapp.com.

## Instruções de Instalação

Faça um clone deste repositório. Você vai precisar de `node` e `npm` instalados globalmente na sua máquina.

Instalação:

`npm install`  

Iniciar app:

`cd client`
`npm start` 

Iniciar servidor:

`node server.js`

O app vai abrir em:

`localhost:3000`  

## Considerações

Este foi um projeto feito para o processo seletivo de uma vaga na empresa Yube. O objetivo foi fazer um web app mobile com o príncipio de atomic design e que integra com a API do Spotify para criar e editar playlists. A escolha do design era livre.

Eu comecei o app pela parte da autenticação, que foi bem simples, já que a documentação do Spotify providencia o código em node pronto. Porém, a manipulação do token de acesso requeriu um pouco mais de atenção. Um dos maiores desafios foi formatar os dados das músicas, pois a resposta da API a uma procura por músicas é um pouco difícil de formatar.

Não estou 100% satisfeito com o layout do app. Alguns botões são muito pequenos e isso dificulta o uso.

As tecnologias implementadas foram React, React-Router, Spotify-Web-Api-Js, Node, Express, bastante JS vanilla e Heroku.

Consolidei vários conhecimentos e gostei de fazer o projeto!
