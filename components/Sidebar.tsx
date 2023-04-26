import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { MoonIcon, SettingsIcon, AddIcon } from "@chakra-ui/icons";

const Sidebar = () => (
  <Box
    as="aside"
    pos="sticky"
    h="100vh"
    w="307px"
    color="white"
    boxShadow="2xl"
    display="flex"
    flexDirection="column"
    alignItems="center"
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
    <Box
      alignSelf="stretch"
      h="65px"
      borderRight="6px solid"
      borderColor="teal.500"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text color="gray.800" fontSize="2xl">
        Genshin Stream
      </Text>
    </Box>
    <Button
      leftIcon={<AddIcon />}
      colorScheme="teal"
      pos="absolute"
      bottom="34"
    >
      Add event
    </Button>
  </Box>
);

export default Sidebar;
