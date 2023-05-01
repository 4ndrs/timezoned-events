import Image from "next/image";

import { EditIcon, DeleteIcon, LinkIcon } from "@chakra-ui/icons";
import { Box, Button, Card, Heading, Link, Text } from "@chakra-ui/react";

import TimeVisualizer from "./TimeVisualizer";

import { useEvents } from "@/context";

const EventViewer = () => {
  const {
    dispatch,
    state: { events, selectedEventId },
  } = useEvents();

  const event = events.find((event) => event.id === selectedEventId);

  if (typeof event === "undefined") {
    return (
      <Box textAlign="center">
        <Heading>No Events</Heading>
      </Box>
    );
  }

  const handleDelete = () => {
    dispatch({ type: "delete", id: event.id });
    dispatch({ type: "updateSelectedEvent", payload: "" });
  };

  return (
    <Card
      p="45px 65px"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      maxWidth="1113px"
      ml="auto"
      mr="auto"
    >
      <Box alignSelf="flex-end" display="flex" gap="21">
        <Button rightIcon={<EditIcon />} variant="link" colorScheme="teal">
          Edit
        </Button>
        <Button
          rightIcon={<DeleteIcon />}
          variant="link"
          colorScheme="teal"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Box>

      <Heading color="gray.800" mt="60px" mb="25px">
        <TimeVisualizer date={new Date(event.date + event.offset)} />{" "}
        {event.title}
      </Heading>

      <Text color="gray.500">{event.description}</Text>

      <Box
        borderRadius="2xl"
        overflow="hidden"
        alignSelf="center"
        mt="98px"
        mb="133px"
      >
        {event.image && (
          <Image
            src={event.image}
            alt="Image to hype up the mood"
            style={{ objectFit: "cover", width: "240px", height: "240px" }}
            width={240}
            height={240}
          />
        )}
      </Box>

      <Box display="flex" gap="18">
        {event.links?.map((link) => (
          <Link key={link.title} isExternal color="teal.500" href={link.url}>
            {link.title} <LinkIcon />
          </Link>
        ))}
      </Box>
    </Card>
  );
};

export default EventViewer;
