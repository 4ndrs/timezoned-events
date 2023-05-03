import {
  Box,
  Heading,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";

import { MoonIcon, SunIcon, SettingsIcon, AddIcon } from "@chakra-ui/icons";

import { useEffect, useState } from "react";
import { useEvents } from "@/context";

import AddEventDialog from "./AddEventDialog";

import type { TimezonedEvent } from "@/interfaces";

const Sidebar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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
      dispatch({ type: "updateSelectedEvent", id: event.id });
    }

    setAddEventDialogIsOpen(false);
  };

  const bgColor = useColorModeValue("primary.whitish", "dark.whitish");
  const textColor = useColorModeValue("primary.darkish", "dark.darkish");
  const hoverColor = useColorModeValue("primary.sideHover", "dark.sideHover");

  return (
    <>
      <Box
        as="aside"
        pos="sticky"
        top="0"
        h="100vh"
        w="307px"
        backgroundColor={bgColor}
        boxShadow="2xl"
        display="flex"
        flexDirection="column"
        alignItems="center"
        flexShrink="0"
      >
        <Heading color={textColor} as="h1" fontSize="26px" mt="59" mb="67">
          Timezoned Events
        </Heading>

        <Box display="flex" gap="37px" alignItems="center">
          <Tooltip
            label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
          >
            <IconButton
              onClick={toggleColorMode}
              aria-label={`Switch to ${
                colorMode === "light" ? "dark" : "light"
              } mode`}
              icon={
                colorMode === "light" ? (
                  <MoonIcon color="gray.500" w="30" h="30" />
                ) : (
                  <SunIcon color="gray.500" w="35" h="35" />
                )
              }
              variant="ghost"
            />
          </Tooltip>
          <SettingsIcon color="gray.500" w="30" h="30" />
        </Box>

        <Tooltip label="Synchronization disabled">
          <Box
            w="10px"
            h="10px"
            mt="9"
            mb="35"
            borderRadius="full"
            backgroundColor="gray.600"
          />
        </Tooltip>

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
            color={textColor}
            fontSize="2xl"
            borderColor={
              selectedEventId === event.id ? "teal.500" : "transparent"
            }
            _hover={{
              backgroundColor: hoverColor,
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
                dispatch({ type: "updateSelectedEvent", id: event.id })
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
