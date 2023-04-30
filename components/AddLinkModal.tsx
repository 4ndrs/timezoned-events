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

type Props = { isOpen: boolean; onClose: (link?: Link) => void };

const AddLinkModal = ({ isOpen, onClose }: Props) => {
  const { register, reset, handleSubmit } = useForm<Link>();

  const onSubmit: SubmitHandler<Link> = (link) => {
    onClose(link);
    reset();
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
                <Input {...register("title", { required: true })} />
              </FormControl>
              <FormControl>
                <FormLabel>URL</FormLabel>
                <Input {...register("url", { required: true })} />
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
