import { createContext, useState, useContext, useEffect } from 'react';
import { registerRequest, loginRequest, verityTokenRequet, getQuestionsRequest, createUserRequest, getRolesRequest, getUsersRequest } from '../api/auth';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data);
            Cookies.set('user', JSON.stringify(res.data)); 
            return true; // Registro exitoso
        } catch (error) {
            setErrors(error.response.data);
            return false; // Hubo un error
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
            Cookies.set('user', JSON.stringify(res.data));
            //console.log(res.data);
            return res.data.rol;
        } catch (error) {
            setErrors([error.response.data.message]);
            setIsAuthenticated(false);
            return null;
        }
    };

    const createUser = async (user) => {
        try {
            await createUserRequest(user); //solo se ejecuta la funcionpara poder crear el usuario, el await es importante señorwersegwfqd
            await getUsers(); 
            return true;
        } catch (error) {
            setErrors(error.response.data);
            return false; // Hubo un error
        }
    };

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('user'); // Elimina los datos del usuario
        setIsAuthenticated(false);
        setUser(null);
    };

    const [questions, setQuestions] = useState([]);

    const getQuestions = async () => {
        try {
            const res = await getQuestionsRequest();
            setQuestions(res.data);
            return res.data;
        } catch (error) {
            console.error("Error al obtener las preguntas:", error);
            return [];
        }
    };

    const [roles, setRoles] = useState([]);

    const getRoles = async () => {
        try {
            const res = await getRolesRequest();
            setRoles(res.data);
            return res.data;
        } catch (error) {
            console.error("Error al obtener las preguntas:", error);
            return [];
        }
    };

    const [users, setUsers] = useState([]);
    //pa obtener los usuarios
    const getUsers = async () => {
        try {
            const res = await getUsersRequest();
            setUsers(res.data);
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    // Funcion para limpiar errores
    const clearErrors = () => {
        setErrors([]);
    };

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
            try {
                const res = await verityTokenRequet(cookies.token);
                if (!res.data) {
                    setLoading(false);
                    setIsAuthenticated(false);
                    return;
                }
                setIsAuthenticated(true);
                setUser(JSON.parse(cookies.user));
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
                console.log(error);
            }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ signup, signin, user, users, logout, isAuthenticated, errors, loading, clearErrors, getQuestions, questions, createUser, roles, getRoles, getUsers }}>
            {children}
        </AuthContext.Provider>
    );
};
