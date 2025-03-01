import mongoose from 'mongoose';

const MissionVisionSchema = new mongoose.Schema({
    mision: {
      type: String,
      required: true,
    },
    vision: {
      type: String,
      required: true,
    },
    date: {
      type: Date,  // Asegúrate de que sea tipo Date
      required: false, // No es obligatorio si es opcional
    }
  });
  

export default mongoose.model('MisionVision', MissionVisionSchema);