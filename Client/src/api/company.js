//estas constantes las uso en auth Context  y las mando al backend
//
import axios from './axios'

//para registro de usuarios por administrador
export const createMisionVisionRequest = (datos) => axios.post(`/mission`, datos)
