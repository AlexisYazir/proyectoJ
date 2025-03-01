import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    nombre_producto: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0 // Asegura que el precio no sea negativo
    },
    categoria: {
        type: String,
        required: true,
        trim: true
    },
    marca: {
        type: String,
        required: true,
        trim: true
    },    
    stock: {
        type: Number,
        required: true,
        min: 0 // Evita valores negativos en el stock
    },
    imagen: {
        type: String,
        required: true,
        trim: true,
       
    },
    // proveedor: [
    //     {
    //         nombre_proveedor: {
    //             type: String,
    //             required: true,
    //             trim: true
    //         },
    //         telefono: {
    //             type: String,
    //             required: true,
    //             trim: true
    //         },
    //         correo: {
    //             type: String,
    //             required: true,
    //             trim: true
    //         }
    //     }
    // ]
}, {
    timestamps: true
});

export default mongoose.model('Product', productSchema);
