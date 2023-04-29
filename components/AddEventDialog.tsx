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
  Select,
  Textarea,
} from "@chakra-ui/react";

import { useForm, type SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { UTC_OFFSETS, LOCAL_OFFSET, type UTCOffset } from "@/lib/offsets";

import type { TimezonedEvent } from "@/interfaces";

type Props = { isOpen: boolean; onClose: (event?: TimezonedEvent) => void };
type Inputs = { title: string; date: string; time: string; offset: UTCOffset };

const AddEventDialog = ({ isOpen, onClose }: Props) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const event: TimezonedEvent = {
      id: uuidv4(),
      title: data.title,
      date: data.date + "T" + data.time,
      offset: data.offset,
    };

    reset();
    onClose(event);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add event</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody display="flex" flexDirection="column" gap="20px">
            <FormControl>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input id="title" {...register("title")} />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea minHeight="134px" />
            </FormControl>

            <Box display="flex" gap="16px">
              <FormControl flex="1" minWidth="0">
                <FormLabel htmlFor="date">Date</FormLabel>
                <Input id="date" type="date" {...register("date")} />
              </FormControl>

              <FormControl flex="1" minWidth="0">
                <FormLabel htmlFor="time">Time</FormLabel>
                <Input id="time" type="time" {...register("time")} />
              </FormControl>

              <FormControl flex="1" minWidth="0">
                <FormLabel htmlFor="offset">UTC offset</FormLabel>
                <Select
                  id="offset"
                  defaultValue={LOCAL_OFFSET}
                  {...register("offset")}
                >
                  {UTC_OFFSETS.map((offset) => (
                    <option key={offset}>{offset}</option>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" type="submit">
              Add
            </Button>
            <Button type="button" onClick={() => onClose()} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddEventDialog;
