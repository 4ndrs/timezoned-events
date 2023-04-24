import { useTimer } from "@/hooks";

const TimeVisualizer = ({ date }: { date: Date }) => {
  const timer = useTimer(date.getTime());
  const time = parseTime(Math.abs(timer));

  const days =
    time.days < 1 ? "" : `${time.days} ${time.days > 1 ? "days" : "day"}`;

  const hours =
    time.hours < 1 ? "" : `${time.hours} ${time.hours > 1 ? "hours" : "hour"}`;

  const minutes =
    time.minutes < 1
      ? ""
      : `${time.minutes} ${time.minutes > 1 ? "minutes" : "minute"}`;

  const seconds = `${time.seconds} ${
    time.seconds !== 1 ? "seconds" : "second"
  }`;

  return (
    <>
      {days} {hours} {minutes} {seconds}{" "}
      {timer > 0 ? "until" : "have passed since"}
    </>
  );
};

const parseTime = (secs: number) => ({
  seconds: secs % 60,
  minutes: Math.trunc((secs / 60) % 60),
  hours: Math.trunc((secs / 3600) % 24),
  days: Math.trunc(secs / 86400),
});

export default TimeVisualizer;
