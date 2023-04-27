import { Box, Link, Text } from "@chakra-ui/react";

const Footer = () => (
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
        color="teal.500"
        href="https://github.com/4ndrs/timezoned-events"
        isExternal
      >
        GitHub
      </Link>
      .
    </Text>
  </Box>
);

export default Footer;
