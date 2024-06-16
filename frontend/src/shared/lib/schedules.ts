import { TSchedule } from "@/shared/model/types";
import { DateTime } from "luxon";

type ScheduleItem = {
  id: number;
  time: string;
  price: number;
};

export function groupByDateWithTimeAndPrice(
  schedules: TSchedule[]
): Record<string, ScheduleItem[]> {
  const result: Record<string, ScheduleItem[]> = {};

  schedules.forEach((schedule) => {
    const dateKey = schedule.date;
    let datesTimesPrices = result[dateKey];

    if (!datesTimesPrices) {
      datesTimesPrices = [];
      result[dateKey] = datesTimesPrices;
    }

    datesTimesPrices.push({
      id: schedule.id,
      time: schedule.time,
      price: schedule.price,
    });
  });

  return result;
}

export function filterSchedules(records: TSchedule[]) {
  const now = DateTime.now();

  return records.filter((record) => {
    const dateTime = DateTime.fromISO(record.date + "T" + record.time);
    const timeInMs = dateTime.toMillis();
    const nowInMs = now.toMillis();
    return timeInMs > nowInMs;
  });
}

export function getFirstRecordWithDateLessThanNow(records: TSchedule[]) {
  const now = DateTime.now();

  return records.find((record) => {
    const dateTime = DateTime.fromISO(record.date + "T" + record.time);
    const timeInMs = dateTime.toMillis();
    const nowInMs = now.toMillis();
    return timeInMs > nowInMs;
  });
}
