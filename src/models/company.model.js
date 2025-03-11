import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
    mision: {
      type: String,
      required: true,
    },
    vision: {
      type: String,
      required: true,
    },
    acerca_de: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: false,
    }
});

export default mongoose.model('Empresa', CompanySchema);
