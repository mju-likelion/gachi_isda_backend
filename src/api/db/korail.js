import sequelize from 'sequelize';
import Station from '../../../models/station';
import Train from '../../../models/train';
import Seat from '../../../models/seat';
import { add, getDay, format } from 'date-fns';
import Comp from '../../../models/comp';

export async function getStations() {
  let station = await Station.create({
    station_name: '서울',
  });
  station = await Station.create({
    station_name: '부산',
  });

  return await Station.findAll();
}

export async function getStationById(stationId) {
  return await Station.findByPk(stationId);
}

export async function getDate() {
  const now = new Date();
  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const krTimeCalculate = 9 * 60 * 60 * 1000;
  const kraNow = new Date(utcNow + krTimeCalculate);

  let dayOfWeek = getDay(kraNow); //일요일 : 0, 토요일 : 6)
  const date = format(kraNow, 'yyyyMMdd');
  const time = format(kraNow, 'HHmm');
  switch (dayOfWeek) {
    case 0:
      dayOfWeek = '일요일';
    case 1:
      dayOfWeek = '월요일';
    case 2:
      dayOfWeek = '화요일';
    case 3:
      dayOfWeek = '수요일';
    case 4:
      dayOfWeek = '목요일';
    case 5:
      dayOfWeek = '금요일';
    case 6:
      dayOfWeek = '토요일';
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
      'yyyyMMdd'
    );
  }
  let timeTable = [];
  for (let i = 0; i < 24; i++) {
    timeTable[i] = i + '시';
  }
  return { day, nextDate, timeTable };
}

export async function getCompAndSeatById(trainNo, compId) {
  return await Comp.findAll({
    where: { train_id: trainNo, id: compId },
    include: [
      {
        model: Seat,
        attributes: ['id', 'seat_name', 'is_booked'],
        where: { comp_id: compId },
      },
    ],
  });
}

const timestamps = new Date();

export async function getTrains(depPlaceId, arrPlaceId, depPlandTime) {
  // let trains = await Train.create({
  //   train_grade_name: 'KTX',
  //   dep_pland_time: timestamps,
  //   arr_pland_time: timestamps,
  //   dep_place_name: '서울',
  //   arr_place_name: '부산',
  // });
  // trains = await Train.create({
  //   train_grade_name: 'KTX',
  //   dep_pland_time: timestamps,
  //   arr_pland_time: timestamps,
  //   dep_place_name: '서울',
  //   arr_place_name: '부산',
  // });
  // trains = await Train.create({
  //   train_grade_name: 'KTX',
  //   dep_pland_time: timestamps,
  //   arr_pland_time: timestamps,
  //   dep_place_name: '서울',
  //   arr_place_name: '부산',
  // });

  const depPlaceName = (await getStationById(depPlaceId)).dataValues
    .station_name;
  const arrPlaceName = (await getStationById(arrPlaceId)).dataValues
    .station_name;
  return await Train.findAll({
    where: {
      dep_place_name: depPlaceName,
      arr_place_name: arrPlaceName,
      //날짜
    },
  });
}

export async function createTicket(trainNo, compId, seats) {
  const seatIds = seats.map((s) => {
    Seat.update({ is_booked: true }, { where: { id: s.seatId } });
    return s.seatId;
  });
  console.log(seatIds);
  return await Train.findByPk(trainNo, {
    include: [
      {
        model: Comp,
        attributes: ['id', 'comp_name', 'comp_type'],
        where: {
          id: compId,
        },
        include: [
          {
            model: Seat,
            attributes: ['id', 'seat_name'],
            where: { id: { [sequelize.Op.or]: seatIds } },
          },
        ],
      },
    ],
  });
}
