const timestamp = '1637589823';
const apikey = '13d1cc09cb1e7b951e10cbfeb6258d8a';
const md5 = '9537c7938569686c8d12039f068f9d9a';
const promise = fetch(`http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apikey}&hash=${md5}&limit=20`)

let conversao = ''
let resultado = []
const spinner = document.querySelector('#spinner')
spinner.style.display = 'block'

promise.then(response => {
   console.log(response)

   response.json().then(res =>{
       resultado = res.data['results']
       console.log(resultado)
       
       resultado.map(item => (mostrarConteudo(item)))
       spinner.style.display = 'none' 
       })
   }, error => {
       console.log(error)
})

function mostraModal(idPersonagem){
   const modal = document.getElementById('modal');
   modal.style.display = 'flex';
   
   const infoPersonagens = document.getElementById('modalConteudo')
  
   for(let i = 0; i < resultado.length; i++ ){
       if(resultado[i].id == idPersonagem){
           
           infoPersonagens.innerHTML = `<h2>${resultado[i].name}</h2>
           <div class="uls">
               <ul>
                   <h3>comics</h3>
                   ${listarConteudo(resultado[i].series.items)}
               </ul>
               <ul>
                   <h3>stories</h3>
                   ${listarConteudo(resultado[i].comics.items)}
               </ul>
           </div>`
       }  
   }  
}
function listarConteudo(lista){
   let listaCont = ''
   for(let c = 0; c < lista.length; c++){
       listaCont = listaCont + `<li>${lista[c].name}</li>`
   }
   return listaCont
}

function fecharModal(){
   const modal = document.getElementById('modal');
   modal.style.display = 'none';
}

function mostrarConteudo(item){
   let conteudo = document.getElementById('herois')
   conversao = conversao + '<div class="card"> ' + '<img src="' + item.thumbnail.path  + '.' + item.thumbnail.extension + '">' +  
   '<div class="box"> ' + ' <h4 class="titulo"> ' + item.name + ' </h4> ' + ' <button id="btn-details" onclick="mostraModal('+ item.id  
   +')">Detalhes</button> ' + ' </div> ' + ' </div> '
   conteudo.innerHTML = conversao   
}