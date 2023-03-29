import { EventsProvider } from "@/context";
import EventManager from "@/components/eventManager";

const Home = () => (
  <EventsProvider>
    <EventManager />
  </EventsProvider>
);

export default Home;
