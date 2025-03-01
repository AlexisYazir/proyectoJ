import { useForm } from 'react-hook-form';
import { useCompany } from '../../../../context/CompanyContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';

export const MissionFormPage = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { createMisionVision, errors: missionErrors = [], clearErrors } = useCompany();
    const navigate = useNavigate();
 
    // Limpiar errores después de 4 segundos
    useEffect(() => {
        if (missionErrors.length > 0) {
            const timer = setTimeout(() => {
                clearErrors();
            }, 4000);
            return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
        }
    }, [missionErrors, clearErrors]);

    // Limpiar errores cuando el usuario comienza a modificar los campos
    useEffect(() => {
        const subscription = watch(() => clearErrors());
        return () => subscription.unsubscribe();
    }, [watch, clearErrors]);

    const onSubmit = handleSubmit(async (values) => {
        const success = await createMisionVision(values); // Intenta registrar al usuario
        if (success) {
            navigate('/add-mv'); // Redirige al login solo si el registro fue exitoso
        }
    });

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fff5eb', minHeight: '100vh' }}>
            <div className="card p-4 shadow" style={{ maxWidth: '450px', minHeight: 'auto', borderRadius: '10px', boxShadow: '0 20px 40px rgba(255, 102, 0, 0.2)', transition: 'all 0.3s ease' }}>
                <h2 className="card-title text-center mb-4">Registro Misión Visión</h2>
                {missionErrors.length > 0 && missionErrors.map((error, i) => (
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
                        <label htmlFor="mision" className="form-label text-custom">Misión</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faAlignLeft} style={{ color: '#db5802' }} />
                            </span>
                            <textarea  rows={10} id="mision" type="text" className="form-control" {...register("mision", { required: true })} placeholder='Ingresa misión de la empresa' />
                        </div>
                        {errors.mision && (
                            <div className="mt-1" style={{ color: '#FF0000', fontWeight: 600, paddingTop: 0 }}>
                                Este campo es obligatorio.
                            </div>
                        )}
                    </div>
                    {/* Input descripcion */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="vision" className="form-label text-custom">Visión</label>
                        <div className="input-group">
                            <span className="input-group-text span">
                                <FontAwesomeIcon icon={faAlignLeft} style={{ color: '#db5802' }} />
                            </span>
                            <textarea  rows={10} id="vision" type="text" className="form-control" {...register("vision", { required: true })} placeholder='Ingresa visión de la empresa' />
                        </div>
                        {errors.vision && (
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

export default MissionFormPage;