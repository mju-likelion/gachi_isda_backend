import * as korailRepository from '../db/korail.js';
import axios from 'axios';

//추후 .env로
const addr =
  'http://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo';
const key =
  'OJnr70EELGdU7KhcHXbaxTFuw1QEc8G2PkRahfzpu3KurXUT9P9PrbX640NSBMWd6weDfbblmWRaujlyXsh5jg==';

export async function getStations(req, res) {
  const data = await korailRepository.getStations();
  if (!data) {
    return res.status(404).json({ error: `Stations do not exist` });
  }
  return res.status(200).json({ data });
}

export async function getStationById(req, res) {
  const id = req.params.id;
  const data = await korailRepository.getStationById(id);
  if (!data) {
    return res.status(404).json({ error: `Station(id:${id}) does not exist` });
  }
  return res.status(200).json({ data });
}

export async function getDate(req, res) {
  const data = await korailRepository.getDate();
  return res.status(200).json({ data });
}

export async function getTrains(req, res) {
  const { depPlaceId, arrPlaceId, depPlandTime } = req.query;
  const trains = await korailRepository.getTrains(
    depPlaceId,
    arrPlaceId,
    depPlandTime
  );
  if (!trains) {
    return res.status(404).json({ error: `Train do not exist` });
  }
  return res.status(200).json({ data: trains });
}

export async function getCompById(req, res) {
  const trainNo = req.params.trainNo;
  const compId = req.params.compId;
  const data = await korailRepository.getCompAndSeatById(trainNo, compId);
  if (!data) {
    return res.status(404).json({ error: `Comp(id:${compId}) does not exist` });
  }
  return res.status(200).json({ data });
}

export async function createTicket(req, res) {
  const { trainNo, compId, seats } = req.body;
  const data = await korailRepository.createTicket(trainNo, compId, seats);
  if (!data) {
    return res.status(400).json({ error: `Cannot create ticket` });
  }
  return res.status(200).json({ data });
}
