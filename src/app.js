import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import authRoutes from './routes/auth.routes.js';
import productsRoutes from './routes/products.routes.js'
import companyRouter from './routes/company.routes.js'

const app = express();
// esto puede ser para solo permitir que se comunique con dominios especificos, para poder acceder a las credenciales y las cookies
app.use(cors({origin: 'http://localhost:5173', credentials: true} )); 
app.use(morgan('dev'));
app.use(express.json()); //para que pueda entender json
app.use(cookieParser());    

app.use("/api",authRoutes)
app.use("/api",productsRoutes)
app.use('/api',companyRouter)

export default app;