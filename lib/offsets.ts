const UTC_OFFSETS = [
  "-12:00",
  "-11:00",
  "-10:00",
  "-09:30",
  "-09:00",
  "-08:30",
  "-08:00",
  "-07:00",
  "-06:00",
  "-05:00",
  "-04:00",
  "-03:30",
  "-03:00",
  "-02:00",
  "-01:00",
  "+00:00",
  "+01:00",
  "+02:00",
  "+03:00",
  "+03:30",
  "+04:00",
  "+04:30",
  "+05:00",
  "+05:30",
  "+06:00",
  "+06:30",
  "+07:00",
  "+08:00",
  "+08:45",
  "+09:00",
  "+09:30",
  "+10:00",
  "+10:30",
  "+11:00",
  "+11:30",
  "+12:00",
  "+12:45",
  "+13:00",
  "+14:00",
] as const;

const assertUTCOffset: (value: unknown) => asserts value is UTCOffset = (
  value
) => {
  if (!UTC_OFFSETS.includes(value as UTCOffset)) {
    throw new Error("Invalid UTC offset");
  }
};

const normalizeOffset = (offsetInMinutes: number): UTCOffset => {
  const hours = Math.trunc(Math.abs(offsetInMinutes / 60));
  const minutes = Math.abs(offsetInMinutes % 60);
  const sign = offsetInMinutes < 1 ? "+" : "-";

  const padZero = (num: number) => ("0" + num).slice(-2);

  const offset = `${sign}${padZero(hours)}:${padZero(minutes)}`;

  assertUTCOffset(offset);

  return offset;
};

const LOCAL_OFFSET = normalizeOffset(new Date().getTimezoneOffset());

const exportedForTesting = {
  LOCAL_OFFSET,
  normalizeOffset,
};

export type UTCOffset = typeof UTC_OFFSETS[number];

export { exportedForTesting };
