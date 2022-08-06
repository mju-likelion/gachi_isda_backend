import * as korailRepository from "../db/korail.js";
import axios from "axios";

//추후 .env로
const addr =
  "http://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo";
const key =
  "e9q6FRryTM2vX8VQxrb8dJwbnlvpvHu447HuwfJQw0zl%2B7cnoIu6HdJElNMaGpaKQ3sQ2GAEsOad%2BOWNCwJ%2FVg%3D%3D";

export async function getStations(req, res) {
  const data = await korailRepository.getStations();
  return res.status(200).json({ data });
}

export async function getStationById(req, res) {
  const id = req.params.id;
  const data = await korailRepository.getStationById(id);
  return res.status(200).json({ data });
}

export async function getDate(req, res) {
  const data = await korailRepository.getDate();
  return res.status(200).json({ data });
}

export async function getTrains(req, res) {
  const { depPlaceId, arrPlaceId, depPlandTime, person } = req.query;
  const trains = await getTrainsByAxios(depPlaceId, arrPlaceId, depPlandTime);

  return res.status(200).json({ data: trains });
}

export async function getCompById(req, res) {
  const trainNo = req.params.trainNo;
  const compId = req.params.compId;
  const data = await korailRepository.getCompById(trainNo, compId);
  return res.status(200).json({ data });
}

export async function createTicket(req, res) {
  const { trainNo, compId, seats } = req.body;
  const data = await korailRepository.createTicket(trainNo, compId, seats);
  return res.cookie("sessionId", data.sessionId).status(200).json({ data });
}

export async function getTicket(req, res) {
  const sessionId = req.cookies.sessionId;
  const data = await korailRepository.getTicket(sessionId);
  return res.status(200).json({ data });
}

async function getTrainsByAxios(depPlaceId, arrPlaceId, depPlandTime) {
  const url = `${addr}?serviceKey=${key}&depPlaceId=${depPlaceId}&arrPlaceId=${arrPlaceId}&depPlandTime=${depPlandTime}&_type=json&numOfRows=100`;
  return await axios.get(url).then((res) => res.data.response.body.items.item);
}
