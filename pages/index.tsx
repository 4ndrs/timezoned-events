import { EventsProvider } from "@/context";
import EventManger from "@/components/eventManager";

const Home = () => (
  <EventsProvider>
    <EventManger />
  </EventsProvider>
);

export default Home;
