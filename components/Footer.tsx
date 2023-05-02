import { Box, Link, Text, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
  const tealColor = useColorModeValue("primary.teal", "dark.teal");

  return (
    <Box
      as="footer"
      display="flex"
      flexDirection="column"
      alignItems="center"
      fontSize="xs"
      color="gray.500"
      m="13px 0"
    >
      <Text>Made with lvoe by 4ndrs</Text>
      <Text>
        Source code on{" "}
        <Link
          color={tealColor}
          href="https://github.com/4ndrs/timezoned-events"
          isExternal
        >
          GitHub
        </Link>
        .
      </Text>
    </Box>
  );
};

export default Footer;
