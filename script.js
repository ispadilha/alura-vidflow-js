const videosContainer = document.querySelector(".videos__container")

async function buscarEMostrarVideos(){
    try {
        const busca = await fetch("http://localhost:3000/videos")
        const videos = await busca.json()

        // console.log(api)
        // .then((resposta) => {console.log(resposta)})
        // .then((resposta) => {console.log(resposta.json())})

        // .then((resposta) => resposta.json())
        // .then((videos) => {

            videos.forEach((video) => {
                if(video.categoria == ""){
                    throw new Error("Há um vídeo sem categoria")
                }
                videosContainer.innerHTML += `
                    <li class="videos__item">
                        <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                        <div class="descricao-video">
                            <img class="img-canal" src="${video.imagem} alt="Loogo do Canal">
                            <h3 class="titulo-video">${video.titulo}</h3>
                            <p class="titulo-canal">${video.descricao}</p>
                        </div>
                    </li>
                `
            })

        // })

        // .catch((erro) => {
        //     videosContainer.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${erro}</p>`
        // })

    } catch(erro) {
        videosContainer.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${erro}</p>`
    } finally {
        console.log("Videos loaded")
    }
}

buscarEMostrarVideos()