
//Como estamos usando o formato module.scss (aplicar o css apenas no componente especifico)
//importa o styles e acessa a classe a partir dele.
import styles from './styles.module.scss';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

export default function Header(){

    //baixando biblioteca date-fns para lidar com datas em javascript
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {locale: ptBR,});

    return(

        <header className={styles.headerContainer}>
            <img src="/logo.svg" alt="logo"/>
            <p>O melhor para você ouvir sempre.</p>
            <span>{currentDate}</span>
        </header>
    );
}