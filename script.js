const api = fetch("http://localhost:3000/videos")
    // console.log(api)
    // .then((resposta) => {console.log(resposta)})
    .then((resposta) => {console.log(resposta.json())})