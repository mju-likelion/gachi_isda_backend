import * as dictionaryRepository from '../db/dictionary.js';

export async function getWords(req, res) {
  console.log('getwords');
  const { keyword } = req.query;
  if (!keyword) {
    const data = await dictionaryRepository.getWords();
    return res.status(200).json({ data });
  }
  const data = await dictionaryRepository.getWordById(keyword);
  if (!data) {
    return res.status(404).json({ error: '단어가 없습니다.' });
  }
  return res.status(200).json({ data });
}
