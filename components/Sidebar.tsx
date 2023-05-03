import {
  Box,
  Heading,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";

import {
  MoonIcon,
  SunIcon,
  SettingsIcon,
  AddIcon,
  HamburgerIcon,
  CloseIcon,
} from "@chakra-ui/icons";

import { useEffect, useState } from "react";
import { useEvents } from "@/context";

import AddEventDialog from "./AddEventDialog";

import type { TimezonedEvent } from "@/interfaces";

const Sidebar = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [addEventDialogIsOpen, setAddEventDialogIsOpen] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode();

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
      <IconButton
        aria-label="Open sidebar"
        icon={<HamburgerIcon w="32px" h="32px" />}
        onClick={() => setSidebarIsOpen(true)}
        display={["block", null, null, null, "none"]}
        pos="fixed"
        top="15px"
        left="15px"
        zIndex="1"
        variant="ghost"
      />

      <Box
        zIndex={1}
        display={sidebarIsOpen ? "block" : "none"}
        position="fixed"
        top="0"
        bottom="0"
        right="0"
        left="0"
        backgroundColor="black"
        opacity="0.4"
        overscrollBehavior="none"
        onClick={() => setSidebarIsOpen(false)}
      />

      <Box
        as="aside"
        zIndex={1}
        pos={["fixed", null, null, null, "sticky"]}
        top="0"
        maxH="fill-available"
        h="100vh"
        w={["220px", null, "307px"]}
        backgroundColor={bgColor}
        boxShadow={[null, null, null, null, "2xl"]}
        display="flex"
        flexDirection="column"
        alignItems="center"
        flexShrink="0"
        transition="transform 200ms ease-out"
        transform={[
          sidebarIsOpen ? "translateX(0)" : "translateX(-100%)",
          null,
          null,
          null,
          "translateX(0)",
        ]}
      >
        <IconButton
          aria-label="Close sidebar"
          display={["block", null, null, null, "none"]}
          icon={<CloseIcon />}
          variant="ghost"
          position="absolute"
          top="10px"
          right="10px"
          onClick={() => setSidebarIsOpen(false)}
        />

        <Heading
          color={textColor}
          as="h1"
          fontSize={["20px", null, "26px"]}
          mt="59"
          mb={["45", null, "67"]}
        >
          Timezoned Events
        </Heading>

        <Box display="flex" gap={["25px", null, "37px"]} alignItems="center">
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
                  <MoonIcon color="gray.500" boxSize={["28px", null, "33px"]} />
                ) : (
                  <SunIcon color="gray.500" boxSize={["28px", null, "33px"]} />
                )
              }
              variant="ghost"
            />
          </Tooltip>

          <Tooltip label="Settings unavailable">
            <SettingsIcon color="gray.500" boxSize={["25px", null, "30px"]} />
          </Tooltip>
        </Box>

        <Tooltip label="Synchronization disabled">
          <Box
            w="10px"
            h="10px"
            mt={["5", null, "9"]}
            mb={["25", null, "35"]}
            borderRadius="full"
            backgroundColor="gray.600"
          />
        </Tooltip>

        {events.map((event) => (
          <Tooltip key={event.id} label={event.title}>
            <Box
              as="label"
              alignSelf="stretch"
              h={["45px", null, "65px"]}
              pl={[4, null, 8]}
              borderRight="6px solid"
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              color={textColor}
              fontSize={["xl", null, "2xl"]}
              whiteSpace="nowrap"
              overflow="hidden"
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
          </Tooltip>
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
