import * as dictionaryController from "../db/dictionary.js";

export async function getWords(req, res) {
  const data = await dictionaryController.getWords();
  if (!data) {
    return res.json({ data: [] });
  }
  return res.status(200).json({ data });
}

export async function getWordById(req, res) {
  const { keyword } = req.query;
  const data = await dictionaryController.getWordById(keyword);
  if (!data) {
    return res.json({ error: "찾으시는 단어가 존재하지 않습니다." });
  }
  return res.status(200).json({ data });
}
