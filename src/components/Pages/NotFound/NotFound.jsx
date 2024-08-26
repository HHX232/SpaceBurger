import { Link } from 'react-router-dom';
import img404 from '../../../images/404 error lost in space-amico.svg'
import style from './NotFound.module.css'
const NotFoundPage = () =>{

   return <section className={style.not_found_container}>
   <img className={style.not_found_image} src={img404} alt="" />
   <Link className={`${style.not_found_link} text text_type_main-medium`}>Вернуться <span>домой!</span></Link>
   </section>

}
export default NotFoundPage; 