import sequelize from 'sequelize';
import Station from '../../../models/station';
import Train from '../../../models/train';
import Seat from '../../../models/seat';
import {
  add,
  differenceInMinutes,
  getDay,
  format,
  set,
  getYear,
  getMonth,
} from 'date-fns';
import { Op } from 'sequelize';
import Comp from '../../../models/comp';

export async function getStations() {
  return await Station.findAll();
}

export async function getStationById(stationId) {
  return await Station.findByPk(stationId, { raw: true });
}

export async function getDate() {
  const now = new Date();
  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const krTimeCalculate = 9 * 60 * 60 * 1000;
  const kraNow = new Date(utcNow + krTimeCalculate);
  const dates = [];
  let nextDate = kraNow;
  for (let i = 0; i < 31; i++) {
    const year = getYear(nextDate);
    const month = 1 + getMonth(nextDate);
    const date = format(nextDate, 'dd');
    const day = getDate2(getDay(nextDate));
    dates.push({ year, month, date, day });
    nextDate = add(nextDate, { days: 1 });
  }

  let timeTable = [];
  for (let i = 0; i < 24; i++) {
    timeTable[i] = i;
  }

  return { dates, timeTable };
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

export async function getTrainById(trainNo) {
  const depPlaceTime = await Train.findByPk(trainNo, {
    attributes: ['dep_pland_time'],
  });
  const arrPlaceTime = await Train.findByPk(trainNo, {
    attributes: ['arr_pland_time'],
  });
  const minuteDiff = differenceInMinutes(
    arrPlaceTime.dataValues.arr_pland_time,
    depPlaceTime.dataValues.dep_pland_time
  );
  const data = {
    hourDiff: parseInt(minuteDiff / 60),
    minuteDiff: minuteDiff % 60,
  };
  return data;
}
// 1 | KTX              | 2022-08-16 14:46:14 | 2022-08-16 15:46:14 | 서울           | 김천구미       |
export async function getTrains(depPlaceId, arrPlaceId, depPlandTime) {
  const depStation = await getStationById(depPlaceId);
  const arrStation = await getStationById(arrPlaceId);
  if (depStation == null || arrStation == null) {
    return null;
  }
  const depPlaceName = depStation.station_name;
  const arrPlaceName = arrStation.station_name;
  console.log('depPlandTime', depPlandTime);
  const start = new Date(depPlandTime);
  console.log('start', start);
  const tomorrowDate = add(start, { days: 1 });
  const tomorrow = set(tomorrowDate, {
    hours: 9,
    minutes: 0,
  });
  console.log('tomorrow', tomorrow);
  return await Train.findAll({
    where: {
      dep_place_name: depPlaceName,
      arr_place_name: arrPlaceName,
      dep_pland_time: { [Op.and]: [{ [Op.gt]: start }, { [Op.lt]: tomorrow }] },
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
            where: { id: { [Op.or]: seatIds } },
          },
        ],
      },
    ],
  });
}

function getDate2(date) {
  switch (date) {
    case 0:
      return '일';
    case 1:
      return '월';
    case 2:
      return '화';
    case 3:
      return '수';
    case 4:
      return '목';
    case 5:
      return '금';
    case 6:
      return '토';
  }
}
