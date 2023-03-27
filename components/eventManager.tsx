import { useState } from "react";
import TimeVisualizer from "./timeVisualizer";

import type { TimezonedEvent } from "../interfaces";

const EventManager = () => {
  const [event, setEvent] = useState<TimezonedEvent>();

  const handleClick = () => {
    const date = "2023-03-28T13:55:31";

    setEvent({ name: "test", utcOffset: "+02:00", date });
  };

  if (!event) {
    return (
      <>
        <div>No events set, yet.</div>
        <button onClick={handleClick}>Click here to add an event</button>
      </>
    );
  }

  return <TimeVisualizer date={new Date(event.date + event.utcOffset)} />;
};

export default EventManager;
