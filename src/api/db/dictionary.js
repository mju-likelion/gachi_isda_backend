import dictionaryData from "../../../models/dictionaryData";

export async function getWords() {
  const words = dictionaryData.findAll({});
  return words;
}

export async function getWordById(keyword) {
  const words = dictionaryData.findOne({
    where: {
      loanword: keyword,
    },
  });
  return words;
}
