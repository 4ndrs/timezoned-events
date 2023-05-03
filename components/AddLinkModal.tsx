import { useForm, type SubmitHandler } from "react-hook-form";

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react";

import type { Link } from "@/interfaces";

type Props = {
  isOpen: boolean;
  onClose: (link?: Link) => void;
  existingTitles: string[];
};

const AddLinkModal = ({ isOpen, onClose, existingTitles }: Props) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Link>();

  const onSubmit: SubmitHandler<Link> = (link) => {
    onClose(link);
    reset();
  };

  const validateTitle = (title: string) => {
    if (!title) {
      return "Required";
    }

    if (existingTitles.includes(title)) {
      return "Title must be unique";
    }
  };

  const bgColor = useColorModeValue("primary.whitish", "dark.whitish");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form
        onSubmit={(event) => {
          event.stopPropagation();
          handleSubmit(onSubmit)(event);
        }}
      >
        <ModalContent backgroundColor={bgColor} mr="25px" ml="25px">
          <ModalHeader>Add link</ModalHeader>
          <ModalCloseButton />

          <ModalBody color="gray.500">
            <Box display="flex" gap="10px" flexDirection={["column", "row"]}>
              <FormControl width={[null, "150px"]} isInvalid={!!errors.title}>
                <FormLabel>Title</FormLabel>
                <Input
                  {...register("title", {
                    validate: validateTitle,
                  })}
                />
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.url}>
                <FormLabel>URL</FormLabel>
                <Input
                  {...register("url", {
                    required: "Required",
                  })}
                />
                <FormErrorMessage>{errors.url?.message}</FormErrorMessage>
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} type="button" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="teal">
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddLinkModal;
