//TEMPORARY DATAS
import Station from "../../../models/station";
import Train from "../../../models/train";
import { add, getDay, format } from "date-fns";

let stations = [
  {
    stationId: "NAT010000",
    stationName: "서울",
  },
  {
    stationId: "NAT010032",
    stationName: "용산",
  },
];

let trains = [
  {
    trainNo: 13,
    trainGradeName: "KTX",
    depPlandTime: "20220731090200",
    arrPlandTime: "20220731080000",
    depPlaceName: "대전",
    arrPlaceName: "서울",
  },
  {
    trainNo: 121,
    trainGradeName: "무궁화호",
    depPlandTime: "20220731095500",
    arrPlandTime: "20220731081400",
    depPlaceName: "대전",
    arrPlaceName: "서울",
  },
];

let comps = [
  { compId: 1, compName: "1호차", compType: "economy", trainNo: 13 },
  { compId: 2, compName: "1호차", compType: "economy", trainNo: 13 },
];

let seats = [
  { seatId: 1, seatName: "1A", isBooked: false, compId: 1 },
  { seatId: 2, seatName: "2A", isBooked: false, compId: 1 },
  { seatId: 3, seatName: "3A", isBooked: false, compId: 1 },
  { seatId: 1, seatName: "4A", isBooked: false, compId: 2 },
  { seatId: 2, seatName: "5A", isBooked: false, compId: 2 },
  { seatId: 3, seatName: "6A", isBooked: false, compId: 2 },
];

let tickets = [];

export async function getStations() {
  let station = await Station.create({
    id: 1,
    station_name: "서울역",
  });
  station = await Station.create({
    id: 2,
    station_name: "부산역",
  });
  const data = {
    data: {
      id: station["id"],
    },
  };

  return data;
}

export async function getStationById(stationId) {
  return stations.find((station) => station.stationId === stationId);
}

export async function getDate() {
  const now = new Date();
  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const krTimeCalculate = 9 * 60 * 60 * 1000;
  const kraNow = new Date(utcNow + krTimeCalculate);

  let dayOfWeek = getDay(kraNow); //일요일 : 0, 토요일 : 6)
  const date = format(kraNow, "yyyyMMdd");
  const time = format(kraNow, "HHmm");
  switch (dayOfWeek) {
    case 0:
      dayOfWeek = "일요일";
    case 1:
      dayOfWeek = "월요일";
    case 2:
      dayOfWeek = "화요일";
    case 3:
      dayOfWeek = "수요일";
    case 4:
      dayOfWeek = "목요일";
    case 5:
      dayOfWeek = "금요일";
    case 6:
      dayOfWeek = "토요일";
    default:
      break;
  }
  const day = {
    currentDate: date,
    currentTime: time,
    currentDay: dayOfWeek,
  };
  let nextDate = [];
  for (let i = 0; i < 31; i++) {
    nextDate[i] = format(
      add(kraNow, {
        days: 1 + i,
      }),
      "yyyyMMdd"
    );
  }
  let timeTable = [];
  for (let i = 0; i < 24; i++) {
    timeTable[i] = i + "시";
  }
  return { day, nextDate, timeTable };
}
const timestamps = new Date();
export async function getTrains() {
  let trains = await Train.create({
    id: 1,
    train_grade_name: "KTX",
    dep_pland_time: timestamps,
    arr_pland_time: timestamps,
    dep_place_name: "서울",
    arr_place_name: "부산",
  });
  trains = await Train.create({
    id: 2,
    train_grade_name: "KTX",
    dep_pland_time: timestamps,
    arr_pland_time: timestamps,
    dep_place_name: "서울",
    arr_place_name: "부산",
  });
  trains = await Train.create({
    id: 3,
    train_grade_name: "KTX",
    dep_pland_time: timestamps,
    arr_pland_time: timestamps,
    dep_place_name: "서울",
    arr_place_name: "부산",
  });
  const data = {
    data: {
      id: trains["id"],
    },
  };
  return data;
}

export async function createTrain(train) {
  trains = [train, ...trains];
}

export async function getCompById(trainNo, compId) {
  return comps.find((comp) => comp.compId == compId && comp.trainNo == trainNo);
}

function getSeatsByCompId(compId) {
  return seats.filter((seat) => seat.compId === compId);
}

export async function getSeatById(seatId) {
  return seats.find((seat) => seat.seatId === seatId);
}

export async function createTicket(trainNo, compId, seats) {
  const seat = await mappingSeats(seats);
  const sessionId = new Date().toString();
  const ticket = {
    train: await getTrainById(trainNo),
    comp: await getCompById(trainNo, compId),
    seat,
    sessionId,
  };
  tickets = [ticket, ...tickets];
  return ticket;
}

export async function getTicket(sessionId) {
  const ticket = tickets.find((t) => t.sessionId == sessionId);
  return ticket;
}

async function mappingSeats(seats) {
  const data = await Promise.all(
    seats.map(async (seat) => {
      let { seatId, seatName, isBooked } = await getSeatById(seat.seatId);
      isBooked = false;
      return { seatId, seatName };
    })
  );
  return data;
}
