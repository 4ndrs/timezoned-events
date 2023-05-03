import { DeleteIcon } from "@chakra-ui/icons";
import { useRef } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: (remove?: boolean) => void;
  eventTitle: string;
};

const DeleteDialog = ({ isOpen, onClose, eventTitle }: Props) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const bgColor = useColorModeValue("primary.whitish", "dark.whitish");

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={() => onClose()}
    >
      <AlertDialogOverlay />
      <AlertDialogContent
        borderTop="solid red 5px"
        backgroundColor={bgColor}
        ml="25px"
        mr="25px"
      >
        <Box
          p="10px"
          left="50%"
          transform="translateX(-50%)"
          top="-24px"
          position="absolute"
          backgroundColor="red"
          borderRadius="full"
        >
          <DeleteIcon boxSize={6} color="white" />
        </Box>
        <AlertDialogHeader>Delete event</AlertDialogHeader>

        <AlertDialogBody>
          Are you sure you want to delete <strong>{eventTitle}</strong>?
          <br />
          This action cannot be undone.
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={() => onClose()} mr={3}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={() => onClose(true)}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
