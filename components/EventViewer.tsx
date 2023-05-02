import Image from "next/image";

import { EditIcon, DeleteIcon, LinkIcon } from "@chakra-ui/icons";
import { Box, Button, Card, Heading, Link, Text } from "@chakra-ui/react";

import TimeVisualizer from "./TimeVisualizer";
import AddEventDialog from "./AddEventDialog";
import DeleteDialog from "./DeleteDialog";

import { useEvents } from "@/context";
import { useState } from "react";

import type { TimezonedEvent } from "@/interfaces";

const EventViewer = () => {
  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);

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

  const handleDelete = (remove?: boolean) => {
    if (remove) {
      dispatch({ type: "delete", id: event.id });
      dispatch({ type: "updateSelectedEvent", id: "" });
    }

    setDeleteDialogIsOpen(false);
  };

  const handleEdit = (event?: TimezonedEvent) => {
    if (event) {
      dispatch({ type: "edit", payload: event });
    }

    setEditDialogIsOpen(false);
  };

  return (
    <>
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
          <Button
            rightIcon={<EditIcon />}
            variant="link"
            colorScheme="teal"
            onClick={() => setEditDialogIsOpen(true)}
          >
            Edit
          </Button>
          <Button
            rightIcon={<DeleteIcon />}
            variant="link"
            colorScheme="teal"
            onClick={() => setDeleteDialogIsOpen(true)}
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

      <DeleteDialog
        isOpen={deleteDialogIsOpen}
        onClose={handleDelete}
        eventTitle={event.title}
      />

      <AddEventDialog
        isOpen={editDialogIsOpen}
        onClose={handleEdit}
        editEvent={event}
      />
    </>
  );
};

export default EventViewer;
