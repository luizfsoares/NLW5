import '../styles/global.scss';

import Header from '../components/Header';
import Player from '../components/Player';

import styles from '../styles/app.module.scss';


//O app é um arquivo global, sempre vai ficar por volta de todas as páginas do APP
// Sempre que chama qualquer rota, o APP vai ser chamado também
// o Component do return é a rota que se ta chamando
// Dessa forma, sempre que tiver algo presente em TODAS as telas, pode botar aqui como é o caso do HEADER
function MyApp({ Component, pageProps }) {
  return(

      <div className={styles.wrapper}>

        <main>
          <Header/>
          <Component {...pageProps} />
        </main>
        <Player/>
      </div>
      
    
  )
}

export default MyApp
