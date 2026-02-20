import dayjs, { Dayjs } from 'dayjs';

/**
 * Format datetime to the ISO standard 'YYYY-MM-DD HH:mm:ss.SSS'
 */
export function datetimeFormatEN(datetime: Dayjs | Date): string {
  if (!datetime) {
    return null;
  }
  if (datetime instanceof Date) {
    return dayjs(datetime).format('YYYY-MM-DD HH:mm:ss.SSS');
  }
  return datetime.format('YYYY-MM-DD HH:mm:ss.SSS');
}

/**
 * Format date to the ISO standard 'YYYY-MM-DD'
 */
export function dateFormatEN(datetime: Dayjs | Date): string {
  if (!datetime) {
    return null;
  }
  if (datetime instanceof Date) {
    return dayjs(datetime).format('YYYY-MM-DD');
  }
  return datetime.format('YYYY-MM-DD');
}

/**
 * Format date to the BRAZIL standard 'DD/MM/YYYY'
 */
export function dateFormatBR(datetime: Dayjs | Date): string {
  if (!datetime) {
    return null;
  }
  if (datetime instanceof Date) {
    return dayjs(datetime).format('DD/MM/YYYY');
  }
  return datetime.format('DD/MM/YYYY');
}

/**
 * Format datetime to the BRAZIL standard 'DD/MM/YYYY HH:mm:ss.SSS'
 */
export function datetimeFormatBR(datetime: Dayjs | Date): string {
  if (!datetime) {
    return null;
  }
  if (datetime instanceof Date) {
    return dayjs(datetime).format('DD/MM/YYYY HH:mm:ss.SSS');
  }
  return datetime.format('DD/MM/YYYY HH:mm:ss.SSS');
}

/**
 * Converts a string to a Date object (keeping hour, minute and second)
 */
export function convertToDatetime(datetime: string): Date {
  if (!datetime) {
    return null;
  }
  return dayjs(datetime).toDate();
}

/**
 * Converts a string to a Date object (only date, zeroing time)
 */
export function convertToDate(datetime: string): Date {
  if (!datetime) {
    return null;
  }
  return dayjs(datetime).startOf('day').toDate();
}

/**
 * Return the current datetime (Dayjs)
 */
export function currentDatetime(): Dayjs {
  return dayjs();
}
