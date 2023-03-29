import { useState } from "react";
import { useEvents } from "@/context";

import TimeVisualizer from "./timeVisualizer";
import AddEventDialog from "./addEventDialog";
import { TimezonedEvent } from "@/interfaces";

const EventManager = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);

  const { state: events, dispatch } = useEvents();

  const handleCloseAddDialog = (event?: TimezonedEvent) => {
    if (event) {
      dispatch({ type: "add", payload: event });
    }

    setShowAddDialog(false);
  };

  if (events.length < 1) {
    return (
      <>
        <AddEventDialog open={showAddDialog} onClose={handleCloseAddDialog} />

        <div>No events set, yet.</div>

        <button onClick={() => setShowAddDialog(true)}>
          Click here to add an event
        </button>
      </>
    );
  }

  const selectedEventDate = new Date(events[0].date + events[0].utcOffset);

  return <TimeVisualizer date={selectedEventDate} />;
};

export default EventManager;
