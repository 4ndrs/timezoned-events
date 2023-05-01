import { Box, Heading, Button } from "@chakra-ui/react";
import { MoonIcon, SettingsIcon, AddIcon } from "@chakra-ui/icons";

import { useEffect, useState } from "react";
import { useEvents } from "@/context";

import AddEventDialog from "./AddEventDialog";

import type { TimezonedEvent } from "@/interfaces";

const Sidebar = () => {
  const [addEventDialogIsOpen, setAddEventDialogIsOpen] = useState(false);

  const {
    state: { events, selectedEventId },
    dispatch,
  } = useEvents();

  useEffect(() => {
    if (!selectedEventId && events.length > 0) {
      dispatch({ type: "updateSelectedEvent", id: events[0].id });
    }
  }, [selectedEventId, dispatch, events]);

  const handleAddEventDialogClose = (event?: TimezonedEvent) => {
    if (event) {
      dispatch({ type: "add", payload: event });
    }

    setAddEventDialogIsOpen(false);
  };

  return (
    <>
      <Box
        as="aside"
        pos="sticky"
        top="0"
        h="100vh"
        w="307px"
        backgroundColor="white"
        boxShadow="2xl"
        display="flex"
        flexDirection="column"
        alignItems="center"
        flexShrink="0"
      >
        <Heading color="gray.800" as="h1" fontSize="26px" mt="59" mb="67">
          Timezoned Events
        </Heading>

        <Box display="flex" gap="37px">
          <MoonIcon color="gray.500" w="30" h="30" />
          <SettingsIcon color="gray.500" w="30" h="30" />
        </Box>

        <Box
          w="10px"
          h="10px"
          mt="9"
          mb="35"
          borderRadius="full"
          backgroundColor="gray.600"
        >
          {/* Synchronization status indicator */}
        </Box>

        {events.map((event) => (
          <Box
            key={event.id}
            as="label"
            alignSelf="stretch"
            h="65px"
            borderRight="6px solid"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="gray.800"
            fontSize="2xl"
            borderColor={
              selectedEventId === event.id ? "teal.500" : "transparent"
            }
            _hover={{
              backgroundColor: "gray.50",
              cursor: "pointer",
            }}
          >
            <Box
              as="input"
              type="radio"
              name="sidebarEvent"
              pos="absolute"
              visibility="hidden"
              checked={selectedEventId === event.id}
              onChange={() =>
                dispatch({ type: "updateSelectedEvent", payload: event.id })
              }
            />
            {event.title}
          </Box>
        ))}

        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          pos="absolute"
          bottom="34"
          onClick={() => setAddEventDialogIsOpen(true)}
        >
          Add event
        </Button>
      </Box>

      <AddEventDialog
        isOpen={addEventDialogIsOpen}
        onClose={handleAddEventDialogClose}
      />
    </>
  );
};

export default Sidebar;
