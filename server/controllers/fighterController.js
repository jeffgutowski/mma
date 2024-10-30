import Fighter from '../models/Fighter.js';
import cloudinary from '../utils/cloudinary.js';

export const createFighter = async (req, res) => {
  try {
    const { name, record, weight } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);

    const fighter = await Fighter.create({
      name,
      imageUrl: result.secure_url,
      record,
      weight
    });

    res.status(201).json(fighter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getFighters = async (req, res) => {
  try {
    const fighters = await Fighter.find({});
    res.json(fighters);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};