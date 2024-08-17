import { Link } from 'react-router-dom';
import img404 from '../../images/404 error lost in space-amico.svg'
import style from './NotFound.module.css'
const NotFoundPage = () =>{

   return <div className={`${style.not_found_container}`}> 
   <img src={img404} className={style.not_found_image} alt="This page not found, sorry" />
   <Link className={`text text_type_main-medium ${style.not_found_link}`} to="/">Вернуться <span> домой!</span></Link>
   </div>
}
export default NotFoundPage; 