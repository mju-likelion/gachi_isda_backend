import axios from 'axios';
import request from 'request';

const addr =
  'http://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo';
const key =
  'OJnr70EELGdU7KhcHXbaxTFuw1QEc8G2PkRahfzpu3KurXUT9P9PrbX640NSBMWd6weDfbblmWRaujlyXsh5jg==';
const depPlaceId = 'NAT010000';
const arrPlaceId = 'NAT011668';
const depPlandTime = '20220731';

const url = `${addr}?serviceKey=${key}&depPlaceId=${depPlaceId}&arrPlaceId=${arrPlaceId}&depPlandTime=${depPlandTime}&_type=json`;

async function getTrainsByURL(depPlaceId, arrPlaceId, depPlandTime) {
  const url = `${addr}?serviceKey=${key}&depPlaceId=${depPlaceId}&arrPlaceId=${arrPlaceId}&depPlandTime=${depPlandTime}&_type=json`;
  const trains = await axios
    .get(url)
    .then((res) => res.data.response.body.items.item);
  return data;
}

const data = await getTrainsByURL(depPlaceId, arrPlaceId, depPlandTime);
console.log(data);
