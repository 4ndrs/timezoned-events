import { useEvents } from "@/context";
import TimeVisualizer from "./timeVisualizer";

const EventManager = () => {
  const { state: events, dispatch } = useEvents();

  const handleClick = () => {
    const date = "2023-03-28T13:55:31";
    const event = { name: "test", utcOffset: "+02:00" as const, date };

    dispatch({ type: "add", payload: event });
  };

  if (events.length < 1) {
    return (
      <>
        <div>No events set, yet.</div>
        <button onClick={handleClick}>Click here to add an event</button>
      </>
    );
  }

  const selectedEventDate = new Date(events[0].date + events[0].utcOffset);

  return <TimeVisualizer date={selectedEventDate} />;
};

export default EventManager;
