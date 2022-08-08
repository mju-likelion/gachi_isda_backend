import sequelize from 'sequelize';
import { comp, seat, station, train } from '../../../models';

export async function getStations() {
  return await station.findAll();
}

export async function getStationById(stationId) {
  return await station.findByPk(stationId);
}

export async function getDate() {
  return new Date();
}

export async function getCompAndSeatById(trainNo, compId) {
  return await comp.findAll({
    where: { train_id: trainNo, id: compId },
    include: [
      {
        model: seat,
        attributes: ['id', 'seat_name', 'is_booked'],
        where: { comp_id: compId },
      },
    ],
  });
}

export async function getTrains(depPlaceId, arrPlaceId, depPlandTime) {
  const depPlaceName = (await getStationById(depPlaceId)).dataValues
    .station_name;
  const arrPlaceName = (await getStationById(arrPlaceId)).dataValues
    .station_name;
  return await train.findAll({
    where: {
      dep_place_name: depPlaceName,
      arr_place_name: arrPlaceName,
    },
  });
}

export async function createTicket(trainNo, compId, seats) {
  const seatIds = seats.map((s) => {
    seat.update({ is_booked: true }, { where: { id: s.seatId } });
    return s.seatId;
  });
  console.log(seatIds);
  return await train.findByPk(trainNo, {
    include: [
      {
        model: comp,
        attributes: ['id', 'comp_name', 'comp_type'],
        where: {
          id: compId,
        },
        include: [
          {
            model: seat,
            attributes: ['id', 'seat_name'],
            where: { id: { [sequelize.Op.or]: seatIds } },
          },
        ],
      },
    ],
  });
}
