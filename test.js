const { format, add, getDay } = require('date-fns');

function getDate() {
  const now = new Date();
  const dates = [];
  let nextDate = now;
  for (let i = 0; i < 31; i++) {
    const date = format(nextDate, 'dd');
    const day = getDate2(getDay(nextDate));
    dates.push({ date, day });
    nextDate = add(nextDate, { days: 1 });
  }
  console.log(dates);
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
getDate();
