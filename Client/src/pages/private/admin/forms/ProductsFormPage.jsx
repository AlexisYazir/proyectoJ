import { useForm } from 'react-hook-form';
import { useProducts } from '../../../../context/ProductsContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollar, faAlignLeft, faDatabase } from '@fortawesome/free-solid-svg-icons';

export const ProductsFormPage = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { createProduct, errors: productErrors = [], clearErrors, getMarcas, marcas, getCategorias, categorias } = useProducts();
    const navigate = useNavigate();

    // Obtener las marcas
    useEffect(() => {
        getMarcas();
    }, []);

    // Obtener las marcas
    useEffect(() => {
        getCategorias();
    }, []);

    // Limpiar errores después de 4 segundos
    useEffect(() => {
        if (productErrors.length > 0) {
            const timer = setTimeout(() => {
                clearErrors();
            }, 4000);
            return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
        }
    }, [productErrors, clearErrors]);

    // Limpiar errores cuando el usuario comienza a modificar los campos
    useEffect(() => {
        const subscription = watch(() => clearErrors());
        return () => subscription.unsubscribe();
    }, [watch, clearErrors]);

    const onSubmit = handleSubmit(async (values) => {
        const success = await createProduct(values); // Intenta registrar al usuario
        if (success) {
            navigate('/catalog-products'); // Redirige al login solo si el registro fue exitoso
        }
    });

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fff5eb', minHeight: '100vh' }}>
            <div className="card p-4 shadow" style={{ maxWidth: '450px', minHeight: 'auto', borderRadius: '10px', boxShadow: '0 20px 40px rgba(255, 102, 0, 0.2)', transition: 'all 0.3s ease' }}>
                <h2 className="card-title text-center mb-4">Registro productos</h2>
                {productErrors.length > 0 && productErrors.map((error, i) => (
                    <div
                        className="alert mb-3"
                        key={i}
                        style={{ backgroundColor: "#f8d7da", color: "#c23616" }}>
                        {error}
                    </div>
                ))}

                <form onSubmit={onSubmit}>
                    {/* Input nombre producto */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="nombre_producto" className="form-label text-custom">Nombre producto</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faAlignLeft} style={{ color: '#db5802' }} />
                            </span>
                            <input id="nombre_producto" type="text" className="form-control" {...register("nombre_producto", { required: true })} placeholder='Ingresa tu nombre de usuario' />
                        </div>
                        {errors.nombre_producto && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                    </div>
                    {/* Input descripcion */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="descripcion" className="form-label text-custom">Descripción</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faAlignLeft} style={{ color: '#db5802' }} />
                            </span>
                            <input id="descripcion" type="text" className="form-control" {...register("descripcion", { required: true })} placeholder='Ingresa una descripción' />
                        </div>
                        {errors.descripcion && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                    </div>
                    {/* Input pa precio */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="precio" className="form-label text-custom">Precio</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faDollar} style={{ color: '#db5802' }} />
                            </span>
                            <input id="precio" type="number" className="form-control" {...register("precio", { required: true })} placeholder='Ingresa precio del producto' />
                        </div>
                        {errors.precio && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                    </div>

                    {/* Input pa stock */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="stock" className="form-label text-custom">Stock</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faDatabase} style={{ color: '#db5802' }} />
                            </span>
                            <input id="stock" type="number" className="form-control" {...register("stock", { required: true })} placeholder='Ingresa stock de producto' />
                        </div>
                        {errors.stock && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                    </div>
                    {/* Combobox de marcas */}

                    <div className="mb-3 position-relative">
                        <label htmlFor="marca" className="form-label text-custom">Elije una marca</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faDatabase} style={{ color: '#db5802' }} />
                            </span>
                            <select id="marca" className="form-control" style={{ padding: '5px' }}  {...register("marca", { required: true })} >
                                <option value="">Selecciona una marca</option>
                                {Array.isArray(marcas) && marcas.map((marcas) => (
                                    <option key={marcas._id} value={marcas.marca}>
                                        {marcas.marca}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.pregunta && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                    </div>
                    {/* Combobox de categorias */}

                    <div className="mb-3 position-relative">
                        <label htmlFor="categoria" className="form-label text-custom">Elije una categoría</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faDatabase} style={{ color: '#db5802' }} />
                            </span>
                            <select id="categoria" className="form-control" style={{ padding: '5px' }}  {...register("categoria", { required: true })} >
                                <option value="">Selecciona una categoría</option>
                                {Array.isArray(categorias) && categorias.map((categorias) => (
                                    <option key={categorias._id} value={categorias.categoria}>
                                        {categorias.categoria}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.categoria && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                    </div>

                    {/* Input url imagen*/}
                    <div className="mb-3 position-relative">
                        <label htmlFor="imagen" className="form-label text-custom">URL de imagen</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faAlignLeft} style={{ color: '#db5802' }} />
                            </span>
                            <input id="imagen" type="text" className="form-control" {...register("imagen", { required: true })} placeholder='Escribe URL de imagen' />
                        </div>
                        {errors.imagen && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                    </div>

                    <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-custom-cancel text-white" type="submit">Guardar</button>
                        <button className="btn btn-custom text-white" type="reset">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductsFormPage;