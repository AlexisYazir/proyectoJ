import User from '../models/user.model.js'
import Pregunta from '../models/question.model.js'; // Importa el modelo de preguntas
import Roles from '../models/roles.model.js';
import bcrypt from 'bcryptjs'  
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const register = async (req, res) => {
    const { email, password, password2, username, name, apellidoP, telefono, pregunta, respuesta } = req.body;

    // Aquí hace las consultas para evitar duplicación
    const emailFound = await User.findOne({ email });
    const userFound = await User.findOne({ username });
    const telFound = await User.findOne({ telefono });

    if (userFound) return res.status(400).json(["El nombre de usuario ingresado ya está en uso. Por favor, elige otro"]);
    if (emailFound) return res.status(400).json(["El correo ingresado ya está en uso. Por favor, elige otro"]);
    if (telFound) return res.status(400).json(["El número de teléfono ingresado ya está en uso. Por favor, elige otro"]);
    if (password != password2) return res.status(400).json(["Las contraseñas no son iguales. Intenta nuevamente"]);

    try {
        const passwordHash = await bcrypt.hash(password, 10); // Aquí se encripta la contraseña
        let rol = "Usuario";

        // Aquí se crea el usuario con el campo recuperacion_contrasena
        const newUser = new User({
            username,
            name,
            apellidoP,
            telefono,
            email,
            password: passwordHash,
            rol,
            recuperacion_contrasena: [ // Incluye el campo embebido
                {
                    pregunta,
                    respuesta
                }
            ]
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id }); // Aquí se le pasa el dato que quiero que se guarde en el token
        res.cookie("token", token); // El id del usuario se guarda en una cookie

        res.json({
            _id: userSaved._id,
            username: userSaved.username,
            name: userSaved.name,
            apellidoP: userSaved.apellidoP,
            telefono: userSaved.telefono,
            email: userSaved.email,
            rol: userSaved.rol,
            recuperacion_contrasena: userSaved.recuperacion_contrasena, // Incluye el campo en la respuesta
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

//ruta para poder usar el login
export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userFound = await User.findOne({ username });

        if (!userFound) 
            return res.status(400).json({ message: "Usuario no encontrado" });

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) 
            return res.status(400).json({ message: "Contraseña incorrecta" });

        // se guarda el username y rol en el token
        const tokenPayload = {
            id: userFound._id,
            username: userFound.username,
            name: userFound.name,
            telefono: userFound.telefono,
            email: userFound.email,
            apellidoP: userFound.apellidoP,
            rol: userFound.rol
        };

        const token = await createAccessToken(tokenPayload);

        res.cookie("token", token);

        res.json({
            _id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            rol: userFound.rol, 
            name: userFound.name,
            telefono: userFound.telefono,
            apellidoP: userFound.apellidoP,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout =  (req, res ) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    //en esta funcion se pueden extender mas consultas como datos de sesion
    const userFound = await User.findById(req.user.id)

    if(!userFound) return res.status(400).json({messagge:"usuario no encontrado"})

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        name: userFound.name,
        apellidoP: userFound.apellidoP,
        telefono: userFound.telefono,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
}

export const verifyToken = async (req, res) => {
    //en esta funcion se pueden extender mas consultas como datos de sesion
    const {token} = req.cookies

    if(!token) return res.status(401).json({messagge:"No autorizado"})

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if(err) return res.status(401).json({messagge:"No autorizado"})

        const userFound = await User.findById(user.id)

        if(!userFound) return res.status(400).json({messagge:"No autorizado"})

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email, //aqui es donde se pueden traer los roles para los diferentes niveles de acceso en la aplicacion
            name: userFound.name,
            telefono: userFound.telefono,
            apellidoP: userFound.apellidoP,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        })
    })
    
    
}

export const createUser = async (req, res) => {
    const { email, password, password2, username, name, apellidoP, telefono, pregunta, rol, respuesta } = req.body;

    // Aquí hace las consultas para evitar duplicación
    const emailFound = await User.findOne({ email });
    const userFound = await User.findOne({ username });
    const telFound = await User.findOne({ telefono });

    if (userFound) return res.status(400).json(["El nombre de usuario ingresado ya está en uso. Por favor, elige otro"]);
    if (emailFound) return res.status(400).json(["El correo ingresado ya está en uso. Por favor, elige otro"]);
    if (telFound) return res.status(400).json(["El número de teléfono ingresado ya está en uso. Por favor, elige otro"]);
    if (password != password2) return res.status(400).json(["Las contraseñas no son iguales. Intenta nuevamente"]);

    try {
        const passwordHash = await bcrypt.hash(password, 10); // Aquí se encripta la contraseña

        // Aquí se crea el usuario con el campo recuperacion_contrasena
        const newUser = new User({
            username,
            name,
            apellidoP,
            telefono,
            email,
            password: passwordHash,
            rol,
            recuperacion_contrasena: [ // Incluye el campo embebido
                {
                    pregunta,
                    respuesta
                }
            ]
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id }); // Aquí se le pasa el dato que quiero que se guarde en el token
        res.cookie("token", token); // El id del usuario se guarda en una cookie

        res.json({
            _id: userSaved._id,
            username: userSaved.username,
            name: userSaved.name,
            apellidoP: userSaved.apellidoP,
            telefono: userSaved.telefono,
            email: userSaved.email,
            rol: userSaved.rol,
            recuperacion_contrasena: userSaved.recuperacion_contrasena, // Incluye el campo en la respuesta
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const questions = async (req, res) => {
    try {
        const preguntasFound = await Pregunta.find(); //aqui consulta las preguntas
        res.json(preguntasFound); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

export const roles = async (req, res) => {
    try {
        const rolesFound = await Roles.find(); //aqui consulta las preguntas
        res.json(rolesFound); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

// Obtener todos los usuarios de la base de datos
export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users);
    } catch (error) {
        return res.status(500).json({ message: "Ocurrió un error al obtener los usuarios" });
    }
};
