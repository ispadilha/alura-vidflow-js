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
                            <p class="categoria" hidden>${video.categoria}</p>
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

const barraDePesquisa = document.querySelector(".pesquisar__input")

barraDePesquisa.addEventListener("input", filtrarPesquisa)

// function filtrarPesquisa() {
//     const videos = document.querySelectorAll('.videos__item');
//     const valorFiltro = barraDePesquisa.value.toLowerCase();
  
//     videos.forEach((video) => {
//       const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
  
//       video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
//     });
//   }
  
function filtrarPesquisa(){
    const videos = document.querySelectorAll(".videos__item")

    if(barraDePesquisa.value != ""){
        for(let video of videos){
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase()
            let valorFiltro = barraDePesquisa.value.toLowerCase()

            if(!titulo.includes(valorFiltro)){
                video.style.display = "none"
            } else {
                video.style.display = "block"
            }
        }
    } else {
        videos.style.display = "block"
    }
}

const botaoCategoria = document.querySelectorAll(".superior__item")

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name")
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria))
})

function filtrarPorCategoria(filtro){
    const videos = document.querySelectorAll(".videos__item")

    for(let video of videos){
        let categoria = video.querySelector(".categoria").textContent.toLowerCase()
        let valorFiltro = filtro.toLowerCase()

        if(!categoria.includes(valorFiltro) && valorFiltro != 'tudo'){
            video.style.display = "none"
        } else {
            video.style.display = "block"
        }
    }
}