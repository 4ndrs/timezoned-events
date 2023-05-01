import { createContext, useContext, useReducer } from "react";

import type { TimezonedEvent } from "@/interfaces";

type Action =
  | { type: "add"; payload: TimezonedEvent }
  | { type: "delete"; id: string }
  | { type: "updateSelectedEvent"; payload: string };

type State = { events: TimezonedEvent[]; selectedEventId?: string };
type Dispatch = (action: Action) => void;

const eventsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "add":
      return { ...state, events: [...state.events, action.payload] };

    case "delete":
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.id),
      };

    case "updateSelectedEvent":
      return { ...state, selectedEventId: action.payload };

    default:
      return assertNever(action);
  }
};

const assertNever = (value: never) => {
  throw new Error(`Unhanlded case: `, value);
};

const EventsContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(eventsReducer, { events: [] });

  const value = { state, dispatch };

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
};

const useEvents = () => {
  const context = useContext(EventsContext);

  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }

  return context;
};

export { EventsProvider, useEvents };
