import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";

import { UTC_OFFSETS } from "@/lib/offsets";
import { z } from "zod";

import type { TimezonedEvent } from "@/interfaces";

type Action =
  | { type: "add"; payload: TimezonedEvent }
  | { type: "delete"; id: string }
  | { type: "edit"; payload: TimezonedEvent }
  | { type: "setAll"; payload: TimezonedEvent[] }
  | { type: "updateSelectedEvent"; id: string };

type State = { events: TimezonedEvent[]; selectedEventId?: string };
type Dispatch = (action: Action) => void;

const StoredEventsSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    date: z.string(),
    offset: z.enum(UTC_OFFSETS),
    description: z.string().optional(),
    links: z.array(z.object({ title: z.string(), url: z.string() })),
    image: z.string().optional(),
  })
);

const eventsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "add":
      return { ...state, events: [...state.events, action.payload] };

    case "delete":
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.id),
      };

    case "edit":
      return {
        ...state,
        events: state.events.map((event) => {
          if (event.id === action.payload.id) {
            return action.payload;
          }

          return event;
        }),
      };

    case "setAll":
      return { ...state, events: action.payload };

    case "updateSelectedEvent":
      return { ...state, selectedEventId: action.id };

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

const parseStoredEvents = () => {
  let events: TimezonedEvent[] = [];

  const storedEvents = localStorage.getItem("TimezonedEvents");

  if (!storedEvents) {
    return events;
  }

  events = StoredEventsSchema.parse(JSON.parse(storedEvents));

  return events;
};

const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(eventsReducer, { events: [] });

  useEffect(() => {
    try {
      const initialEvents = parseStoredEvents();

      dispatch({ type: "setAll", payload: initialEvents });
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          "Failed parsing the events stored in the local storage\n",
          error.message
        );
      }
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== "TimezonedEvents") {
        return;
      }

      try {
        const events = parseStoredEvents();

        dispatch({ type: "setAll", payload: events });
      } catch (error) {
        if (error instanceof Error) {
          console.error(
            "Detected storage change but failed the parsing\n",
            error.message
          );
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    localStorage.setItem("TimezonedEvents", JSON.stringify(state.events));
  }, [state.events]);

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
