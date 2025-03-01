import { useAuth } from '../../../context/AuthContext';

function DashboardUserPage(){
    const { user } = useAuth();
    const username = user && user.username ? user.username : '';
    return(
        <h1>Hola {username && <span className="navbar-user">{username}</span>} Bienvenido REGISTRADOS  </h1>
        
    )
}

export default DashboardUserPage