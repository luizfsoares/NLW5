//SPA (single page aplication) -  Dados carregados apenas no momento em que se acessa a tela da aplicação. 
//Problema: Problemas com indexação do Google, pois os dados não estariam disponiveis assim que acessar e sim depois
//useEffect é um Hook do React que dispara efeitos colaterais, ou seja, executa uma ação se determinada coisa mudar
//Para executar a ação apenas uma vez, ou seja, uma vez quando carregar aquele componente pela primeira vez, basta passar um array sozinho
/*useEffect(() =>{
    fetch('http://localhost:3333/episodes')
    .then(response => response.json())
    .then(data => console.log(data))

  }, []) */


//SSR (server side rendering) - Só de exportar uma função com getServerSideProps(){} (em qualquer arquivo de 'pages') será entendido que deve executar ela antes do resto e assim estaria disponivel antes.
//Quando entrar na pagina os dados já estarão disponiveis, não precisará fazer nenhum tipo de requisição para o backend, pois isso foi feito na camada do next


//SSG (static side generation) - Gera uma page estática e todas as pessoas depois que acessarem, em um determinado periodo de tempo, vao consumir aquela mesma page.
// Pois no caso do podcast, lançando um a cada semana, a pagina nao vai mudar nesse espaço de tempo. Portanto, não é necessário fazer o carregamento dos mesmos dados sempre.
// A diferença é apenas no nome da função. Basta trocar para getStaticProps(){}
//Podendo retornar um novo parâmetro REVALIDATE que é o espaço de tempo até fazer um novo carregamento da página: Passando 60*60*8, significa uma chamada acada 8 horas, ou seja, apenas 3 requisições por dia.
//Porém este recurso só funciona em produção, necessitando criar uma build do projeto para simular

export default function Home(props) {

  console.log(props.episodes)

  return (
      <h1>Index</h1>

  )
}


export async function getStaticProps(){

  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()
    
  //precisa sempre retornar o props aqui dentro, por isso, getServerSidePROPS
  //tudo que é retornado pelo props aqui, é repassado pelo props do componente la em cima
  return{
    props: {
      episodes: data,
    },
    
    revalidate: 60 * 60 * 8,
  }

}