import Image from "next/image";
import { EditIcon, DeleteIcon, LinkIcon } from "@chakra-ui/icons";

import {
  Box,
  Button,
  Card,
  Heading,
  Link,
  Text,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";

import TimeVisualizer from "./TimeVisualizer";
import AddEventDialog from "./AddEventDialog";
import DeleteDialog from "./DeleteDialog";

import { useEvents } from "@/context";
import { useState } from "react";

import type { TimezonedEvent } from "@/interfaces";

const EventViewer = () => {
  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);

  const bgColor = useColorModeValue("primary.whitish", "dark.whitish");
  const textColor = useColorModeValue("primary.darkish", "dark.darkish");
  const tealColor = useColorModeValue("primary.teal", "dark.teal");

  const [isSmall] = useMediaQuery("(max-width: 768px)");

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
    <Box display="flex" justifyContent="center">
      <Card
        p={["20px", null, "45px 65px"]}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        maxWidth="1113px"
        m="20px"
        backgroundColor={bgColor}
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

        <Heading
          color={textColor}
          m={["20px 0 10px", null, null, "60px 0 25px"]}
          fontSize={["2xl", null, "3xl", null, "4xl"]}
        >
          <TimeVisualizer date={new Date(event.date + event.offset)} />{" "}
          {event.title}
        </Heading>

        <Text color="gray.500">{event.description}</Text>

        <Box
          borderRadius="2xl"
          overflow="hidden"
          alignSelf="center"
          m={["60px 0 100px", null, "98px 0 133px"]}
        >
          {event.image && (
            <Image
              priority
              src={event.image}
              alt="Image to hype up the mood"
              style={{
                objectFit: "cover",
                width: isSmall ? "140px" : "240px",
                height: isSmall ? "140px" : "240px",
              }}
              width={240}
              height={240}
            />
          )}
        </Box>

        <Box display="flex" gap="18">
          {event.links?.map((link) => (
            <Link key={link.title} isExternal color={tealColor} href={link.url}>
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
    </Box>
  );
};

export default EventViewer;
