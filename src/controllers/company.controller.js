import Empresa from '../models/company.model.js'

// Crear un nuevo producto en la base de datos
export const createMisionVision = async (req, res) => {
  try {
    const { mision, vision } = req.body;

    const newMisionVision = new Empresa({
      mision,
      vision,
    });

    const savedMisionVision = await newMisionVision.save();
    res.status(201).json(savedMisionVision);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCompany = async (req, res) => {
    try {
        const company = await Empresa.find()
        res.json(company);
    } catch (error) {
        return res.status(500).json({ message: "Ocurrió un error al obtener los datos de la empresa" });
    }
};