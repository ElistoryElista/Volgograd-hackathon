import { DateTime } from "luxon";

export function dayDeclension(number: number): string {
  if (number === 1) {
    return "день";
  } else if (number === 2 || number === 3 || number === 4) {
    return "дня";
  } else {
    return "дней";
  }
}

export function formatSecondsToHoursMinutes(seconds: number) {
  function getDeclension(number: number, words: string[]) {
    const cases = [2, 0, 1, 1, 1, 2];
    return words[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const hoursString = getDeclension(hours, ["час", "часа", "часов"]);
  const minutesString = getDeclension(minutes, ["минута", "минуты", "минут"]);

  if (hours > 0) {
    return `${hours} ${hoursString}`;
  } else {
    return `${minutes} ${minutesString}`;
  }
}

export function isDateGreaterThanNow(dateProp: string) {
  const currentDate = DateTime.now();
  const dateToCompare = DateTime.fromISO(dateProp);
  return dateToCompare > currentDate;
}

export function getCurrentDateISO(): string {
  return DateTime.now().startOf("minute").toISO({ includeOffset: false });
}

export function formatTime(inputTime: string, plusMin: number = 0) {
  let timeObject = DateTime.fromISO(`1970-01-01T${inputTime}`);
  if (plusMin)
    timeObject = timeObject.plus({
      minutes: plusMin,
    });

  const formattedTime = timeObject.toFormat("HH:mm");
  return formattedTime;
}

export function formatDate(inputDate: string, isOnlyNumber: boolean = false) {
  const currentDate = DateTime.now();
  const parsedDate = DateTime.fromISO(inputDate);

  if (isOnlyNumber) return parsedDate.toFormat("dd.MM.yy");
  if (parsedDate.hasSame(currentDate, "day")) {
    return "Сегодня";
  } else if (parsedDate.hasSame(currentDate.plus({ days: 1 }), "day")) {
    return "Завтра";
  } else if (parsedDate.hasSame(currentDate.plus({ days: 2 }), "day")) {
    return "Послезавтра";
  } else {
    return parsedDate.toFormat("dd.MM.yy");
  }
}

export function getNext120Days() {
  const today = DateTime.local();

  interface Months {
    [key: number]: { days: DateTime[] };
  }

  const months: Months = {};

  for (let i = 0; i < 120; i++) {
    const day = today.plus({ days: i });
    if (months[day.month]) months[day.month].days.push(day);
    else months[day.month] = { days: [day] };
  }
  return months;
}

export function isWorking(openingTime: string, closingTime: string): boolean {
  if (openingTime === "00:00:00" && closingTime === "00:00:00") return true;

  const now = DateTime.local();
  const opening = DateTime.fromFormat(openingTime, "HH:mm:ss");
  const closing = DateTime.fromFormat(closingTime, "HH:mm:ss");

  if (!opening.isValid || !closing.isValid) {
    return false;
  }

  if (opening > closing) {
    if (now >= opening.minus({ days: 1 }) && now <= closing.plus({ days: 1 })) {
      return true;
    }
  } else {
    if (now >= opening && now <= closing) {
      return true;
    }
  }

  return false;
}

export function isWeekend(): boolean {
  const today = DateTime.local().weekday;
  return today === 6 || today === 7;
}

export function isSunday() {
  const today = DateTime.local().weekday;
  return today === 7;
}

export function isFriday() {
  const today = DateTime.local().weekday;
  return today === 5;
}

export function getNow(): string {
  const currentTime = DateTime.now();
  const formattedTime = currentTime.toFormat("HH:mm:ss");
  return formattedTime;
}
