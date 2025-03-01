import MissionVision from '../models/company.model.js'

// Crear un nuevo producto en la base de datos
export const createMisionVision = async (req, res) => {
  try {
    const { mision, vision } = req.body;

    const newMisionVision = new MissionVision({
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
