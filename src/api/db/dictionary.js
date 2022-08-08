import DictionaryData from "../../../models/dictionaryData";

export async function getWords() {
  const words = DictionaryData.findAll({});
  return words;
}

export async function getWordById(keyword) {
  const words = DictionaryData.findOne({
    where: {
      loanword: keyword,
    },
  });
  return words;
}
