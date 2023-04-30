import { useForm, type SubmitHandler } from "react-hook-form";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import type { Link } from "@/interfaces";

type Props = {
  isOpen: boolean;
  onClose: (link?: Link) => void;
  existingTitles: string[];
};

const AddLinkModal = ({ isOpen, onClose, existingTitles }: Props) => {
  const { register, reset, handleSubmit } = useForm<Link>();

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form
        onSubmit={(event) => {
          event.stopPropagation();
          handleSubmit(onSubmit)(event);
        }}
      >
        <ModalContent>
          <ModalHeader>Add link</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Box display="flex" gap="10px">
              <FormControl width="150px">
                <FormLabel>Title</FormLabel>
                <Input
                  {...register("title", {
                    validate: validateTitle,
                  })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>URL</FormLabel>
                <Input
                  {...register("url", {
                    required: true,
                  })}
                />
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
