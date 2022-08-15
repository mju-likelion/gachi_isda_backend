import sequelize from 'sequelize';
import Station from '../../../models/station';
import Train from '../../../models/train';
import Seat from '../../../models/seat';
import {
  add,
  differenceInMinutes,
  getDay,
  format,
  setDate,
  set,
  setHours,
  endOfDay,
  addHours,
} from 'date-fns';
import { Op } from 'sequelize';
import Comp from '../../../models/comp';

export async function getStations() {
  return await Station.findAll();
}

export async function getStationById(stationId) {
  return await Station.findByPk(stationId);
}

export async function getDate() {
  const now = new Date();
  const dates = [];
  let nextDate = now;
  for (let i = 0; i < 31; i++) {
    const date = format(nextDate, 'dd');
    const day = getDate2(getDay(nextDate));
    dates.push({ date, day });
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

export async function getTrains(depPlaceId, arrPlaceId, depPlandTime) {
  const depPlaceName = (await getStationById(depPlaceId)).dataValues
    .station_name;
  const arrPlaceName = (await getStationById(arrPlaceId)).dataValues
    .station_name;
  const start = new Date(depPlandTime);
  const tomorrow = set(start, { hours: 9, minutes: 0 });
  console.log(start);
  console.log(tomorrow);
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
