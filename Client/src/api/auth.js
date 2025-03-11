//estas constantes las uso en auth Context  y las mando al backend

import axios from './axios'

export const registerRequest = (user) => axios.post(`/register`, user)

//para registro de usuarios por administrador
export const createUserRequest = (user) => axios.post(`/createUser`, user)

export const loginRequest = user => axios.post(`/login`, user)

export const verityTokenRequet = () => axios.get(`/verify`)

export const getQuestionsRequest = () => axios.get("/questions")

export const getRolesRequest = () => axios.get("/roles")

//para obtener los usuarios
export const getUsersRequest = () => axios.get("/users")

//para eliminar los usuarios
export const deleteUserRequest = (id) => axios.delete(`user/${id}`)

//para consultar el back y consulultar los datos de un usuario OK
export const getUserRequest = (id) => axios.get(`/add-users/${id}`)

//OK
export const updateUserRequest = (id, product) => axios.put(`/users/${id}`, product)

