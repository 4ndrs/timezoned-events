import { createContext, useContext, useReducer } from "react";

import type { TimezonedEvent } from "@/interfaces";

type Action = { type: "add"; payload: TimezonedEvent };
type Dispatch = (action: Action) => void;
type State = TimezonedEvent[];

const eventsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];

    default:
      return assertNever(action.type);
  }
};

const assertNever = (value: never) => {
  throw new Error(`Unhanlded case: `, value);
};

const EventsContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(eventsReducer, []);

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
