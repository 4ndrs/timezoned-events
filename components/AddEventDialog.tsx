import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

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

import { UTC_OFFSETS, LOCAL_OFFSET, type UTCOffset } from "@/lib/offsets";

import LinksInput from "./LinksInput";
import ImagePicker from "./ImagePicker";

import type { Link, TimezonedEvent } from "@/interfaces";

type Props = { isOpen: boolean; onClose: (event?: TimezonedEvent) => void };

type Inputs = {
  title: string;
  date: string;
  time: string;
  offset: UTCOffset;
  links: Link[];
  image?: string;
};

const AddEventDialog = ({ isOpen, onClose }: Props) => {
  const { register, handleSubmit, reset, control } = useForm<Inputs>();

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
                <FormLabel htmlFor="offset">UTC Offset</FormLabel>
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

            <FormControl>
              <FormLabel>Links</FormLabel>
              <Controller
                control={control}
                name="links"
                render={({ field: { value, onChange } }) => (
                  <LinksInput id="links" value={value} onChange={onChange} />
                )}
              />
            </FormControl>

            <FormControl>
              <Controller
                control={control}
                name="image"
                render={({ field: { value, onChange } }) => (
                  <ImagePicker value={value} onChange={onChange} />
                )}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="button" onClick={() => onClose()} mr={3}>
              Cancel
            </Button>
            <Button colorScheme="teal" type="submit">
              Add
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddEventDialog;
