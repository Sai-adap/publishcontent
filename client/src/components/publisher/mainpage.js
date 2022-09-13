import { NavLink} from 'react-router-dom';
import Logout from './logout';


function Mainpage(){
    return (
        <>
        <header className='login_head'>
            <header>10x Academy</header>
        </header>
        <aside>
            <NavLink style={{ textDecoration: 'none' }} to='/create' >create</NavLink>
            <NavLink to='/history' style={{ textDecoration: 'none' }} >History</NavLink>
            <NavLink to='/comments' style={{ textDecoration: 'none' }} >comments</NavLink>
            <Logout/>
        </aside>
        <article>
        </article>
        </>
    )
}

export default Mainpage