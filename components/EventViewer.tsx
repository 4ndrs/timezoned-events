import Image from "next/image";
import { EditIcon, DeleteIcon, LinkIcon } from "@chakra-ui/icons";
import { Box, Button, Card, Heading, Link, Text } from "@chakra-ui/react";

import lumineHype from "@/assets/images/lumine-hype.webp";

const EventViewer = () => (
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
      <Button rightIcon={<DeleteIcon />} variant="link" colorScheme="teal">
        Delete
      </Button>
    </Box>

    <Heading color="gray.800" mt="60px" mb="25px">
      2 days 3 hours 23 minutes 10 seconds
      <br />
      Until Genshin Stream
    </Heading>

    <Text color="gray.500">
      The stream is coming! new version with new playable characters, let&apos;s
      goooooooooooooo!
    </Text>

    <Box
      w="240px"
      borderRadius="2xl"
      overflow="hidden"
      alignSelf="center"
      mt="98px"
      mb="133px"
    >
      <Image
        src={lumineHype}
        alt="A picture of Lumine hyped with the hands up"
        placeholder="blur"
      />
    </Box>

    <Box display="flex" gap="18">
      <Link isExternal color="teal.500" href="#">
        Bilibili <LinkIcon />
      </Link>
      <Link isExternal color="teal.500" href="#">
        YouTube <LinkIcon />
      </Link>
      <Link isExternal color="teal.500" href="#">
        Twitch <LinkIcon />
      </Link>
    </Box>
  </Card>
);

export default EventViewer;
