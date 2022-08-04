//TEMPORARY DATAS

let stations = [
  {
    stationId: 'NAT010000',
    stationName: '서울',
  },
  {
    stationId: 'NAT010032',
    stationName: '용산',
  },
];

let trains = [
  {
    trainNo: 13,
    trainGradeName: 'KTX',
    depPlandTime: '20220731090200',
    arrPlandTime: '20220731080000',
    depPlaceName: '대전',
    arrPlaceName: '서울',
  },
  {
    trainNo: 121,
    trainGradeName: '무궁화호',
    depPlandTime: '20220731095500',
    arrPlandTime: '20220731081400',
    depPlaceName: '대전',
    arrPlaceName: '서울',
  },
];

let comps = [
  { compId: 1, compName: '1호차', compType: 'economy', trainNo: 13 },
  { compId: 2, compName: '1호차', compType: 'economy', trainNo: 13 },
];

let seats = [
  { seatId: 1, seatName: '1A', isBooked: false, compId: 1 },
  { seatId: 2, seatName: '2A', isBooked: false, compId: 1 },
  { seatId: 3, seatName: '3A', isBooked: false, compId: 1 },
  { seatId: 1, seatName: '4A', isBooked: false, compId: 2 },
  { seatId: 2, seatName: '5A', isBooked: false, compId: 2 },
  { seatId: 3, seatName: '6A', isBooked: false, compId: 2 },
];

let tickets = [];

export async function getStations() {
  return stations;
}

export async function getStationById(stationId) {
  return stations.find((station) => station.stationId === stationId);
}

export async function getDate() {
  return new Date();
}

export async function getTrainById(trainNo) {
  return trains.find((train) => train.trainNo === trainNo);
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
