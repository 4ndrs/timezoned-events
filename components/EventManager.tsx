import { useState } from "react";
import { useEvents } from "@/context";

import TimeVisualizer from "./TimeVisualizer";
import AddEventDialog from "./AddEventDialog";

import styles from "./EventManager.module.css";

import type { TimezonedEvent } from "@/interfaces";

const EventManager = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);

  const {
    state: { events },
    dispatch,
  } = useEvents();

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

        <div className={styles.displayText}>No events set, yet.</div>

        <button onClick={() => setShowAddDialog(true)}>
          Click here to add an event
        </button>
      </>
    );
  }

  const selectedEventDate = new Date(events[0].date + events[0].offset);

  return (
    <div className={styles.displayText}>
      <TimeVisualizer date={selectedEventDate} /> {events[0].title}
    </div>
  );
};

export default EventManager;
