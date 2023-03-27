import { useTimer } from "@/hooks";

const TimeVisualizer = ({ date }: { date: Date }) => {
  const timer = useTimer(date.getTime());
  const time = parseTime(Math.abs(timer));

  return (
    <>
      {time.days} days {time.hours} hours {time.minutes} minutes and{" "}
      {time.seconds} seconds {timer > 0 ? "until" : "have passed since"}
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
