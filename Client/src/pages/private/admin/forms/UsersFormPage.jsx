import { useForm } from 'react-hook-form';
import { useAuth } from '../../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faQuestionCircle, faAlignLeft, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

export const UsersFormPage =() => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { createUser, errors: registerErrors = [], clearErrors, getQuestions, questions, roles, getRoles } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // Obtener las preguntas 
    useEffect(() => {
        getQuestions();
    }, []);

       // Obtener los roles 
       useEffect(() => {
        getRoles();
    }, []);


    // Limpiar errores después de 4 segundos
    useEffect(() => {
        if (registerErrors.length > 0) {
            const timer = setTimeout(() => {
                clearErrors();
            }, 4000);
            return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
        }
    }, [registerErrors, clearErrors]);

    // Limpiar errores cuando el usuario comienza a modificar los campos
    useEffect(() => {
        const subscription = watch(() => clearErrors());
        return () => subscription.unsubscribe();
    }, [watch, clearErrors]);

    //pa registrar wl usuario
    const onSubmit = handleSubmit(async (values) => {
        const success = await createUser(values);
        //console.log(success);
        if (success) {
            navigate('/catalog-users'); 
        } else {
            navigate('/add-users')
        }
    });

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fff5eb', minHeight: '100vh' }}>
            <div className="card p-4 shadow" style={{ maxWidth: '450px', minHeight: 'auto', borderRadius: '10px', boxShadow: '0 20px 40px rgba(255, 102, 0, 0.2)', transition: 'all 0.3s ease' }}>
                <h2 className="card-title text-center mb-4">Registro usuarios</h2>
                {registerErrors.length > 0 && registerErrors.map((error, i) => (
                    <div className="alert mb-3" key={i} style={{ backgroundColor: "#f8d7da", color: "#c23616" }}>
                        {error}
                    </div>
                ))}

                <form onSubmit={onSubmit}>
                    {/* Input nombre usuario */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="username" className="form-label text-custom">Nombre de usuario</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faUser} style={{ color: '#db5802' }} />
                            </span>
                            <input id="username" type="text" className="form-control" {...register("username", { required: true })} placeholder='Ingresa tu nombre de usuario' />
                        </div>
                        {errors.username && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                    </div>
                    {/* Input NOMBRE */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="name" className="form-label text-custom">Nombre real</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faUser} style={{ color: '#db5802' }} />
                            </span>
                            <input id="name" type="text" className="form-control" {...register("name", { required: true })} placeholder='Ingresa tu nombre real' />
                        </div>
                        {errors.name && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                    </div>
                    {/* Input pa APELLIDO */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="apellidoP" className="form-label text-custom">Apellido paterno</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faUser} style={{ color: '#db5802' }} />
                            </span>
                            <input id="apellidoP" type="text" className="form-control" {...register("apellidoP", { required: true })} placeholder='Ingresa tu apellido paterno' />
                        </div>
                        {errors.apellidoP && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                    </div>
                    {/* Input TELEFONO */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="telefono" className="form-label text-custom">Número de teléfono</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faPhone} style={{ color: '#db5802' }} />
                            </span>
                            <input id="telefono" type="text" className="form-control" {...register("telefono", { required: true })} placeholder='Ingresa tu número de teléfono' />
                        </div>
                        {errors.telefono && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                    </div>

                    {/* Input correo */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="email" className="form-label text-custom">Correo electrónico</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faEnvelope} style={{ color: '#db5802' }} />
                            </span>
                            <input id="email" type="email" className="form-control" {...register("email", { required: true })} placeholder='ejemplo@ejemplo.com' />
                        </div>
                        {errors.email && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                    </div>

                    {/* Input rol de usuario */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="rol" className="form-label text-custom">Elije una rol</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faQuestionCircle} style={{ color: '#db5802' }} />
                            </span>
                            <select id="pregunta" className="form-control" style={{ padding: '5px' }}  {...register("rol", { required: true })} >
                                <option value="">Selecciona un rol</option>
                                {Array.isArray(roles) && roles.map((rol) => (
                                    <option key={rol._id} value={rol.nombre_rol}>
                                        {rol.nombre_rol}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.rol && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                    </div>

                    {/* Input de contraseña */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label text-custom">Contraseña</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faLock} style={{ color: '#db5802' }} />
                            </span>
                            <input id="password" type={showPassword ? "text" : "password"} className="form-control" {...register("password", { required: true })} placeholder='Ingresa contraseña' />
                            <span className="input-group-text span" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{ color: '#db5802' }} />
                            </span>
                        </div>
                        {errors.password && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                    </div>

                    {/* Input para confirmar contraseña */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="password2" className="form-label text-custom">Confirma contraseña</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faLock} style={{ color: '#db5802' }} />
                            </span>
                            <input id="password2" type={showPassword ? "text" : "password"} className="form-control" {...register("password2", { required: true })} placeholder='Confirma tu contraseña' />
                            <span className="input-group-text span" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{ color: '#db5802' }} />
                            </span>
                        </div>
                        {errors.password2 && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                    </div>
                    {/* Input pregunta secreta */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="pregunta" className="form-label text-custom">Elije una pregunta secreta</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faQuestionCircle} style={{ color: '#db5802' }} />
                            </span>
                            <select id="pregunta" className="form-control" style={{ padding: '5px' }}  {...register("pregunta", { required: true })} >
                                <option value="">Selecciona una pregunta</option>
                                {Array.isArray(questions) && questions.map((question) => (
                                    <option key={question._id} value={question.pregunta}>
                                        {question.pregunta}
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

                    {/* Input RESPUESTA*/}
                    <div className="mb-3 position-relative">
                        <label htmlFor="respuesta" className="form-label text-custom">Respuesta</label>
                        <div className="input-group ">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faAlignLeft} style={{ color: '#db5802' }} />
                            </span>
                            <input id="respuesta" type="text" className="form-control" {...register("respuesta", { required: true })} placeholder='Escribe tu respuesta' />
                        </div>
                        {errors.respuesta && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                    </div>

                    <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-custom-cancel text-white" type="submit">Registrar</button>
                        <button className="btn btn-custom text-white" type="reset">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UsersFormPage;