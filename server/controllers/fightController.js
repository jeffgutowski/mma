import Fight from '../models/Fight.js';

export const createFight = async (req, res) => {
  try {
    const fight = await Fight.create(req.body);
    res.status(201).json(fight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getFights = async (req, res) => {
  try {
    const fights = await Fight.find({})
      .populate('fighter1')
      .populate('fighter2')
      .sort({ eventDate: 1 });
    res.json(fights);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const voteFight = async (req, res) => {
  try {
    const { fightId, fighterNumber } = req.body;
    const fight = await Fight.findById(fightId);
    
    if (!fight) {
      return res.status(404).json({ message: 'Fight not found' });
    }

    fight.votes[`fighter${fighterNumber}`] += 1;
    await fight.save();
    
    res.json(fight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};