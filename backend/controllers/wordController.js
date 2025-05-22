import Word from '../models/Word.js';

export const getWords = async (req, res) => {
  const words = await Word.find();
  res.json(words);
};

export const createWord = async (req, res) => {
  const { word, public: isPublic } = req.body;
  const newWord = new Word({ word, public: isPublic });
  await newWord.save();
  res.status(201).json(newWord);
};
