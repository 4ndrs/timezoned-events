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

import { UTC_OFFSETS, LOCAL_OFFSET } from "@/lib/offsets";

import LinksInput from "./LinksInput";
import ImagePicker from "./ImagePicker";

import type { TimezonedEvent } from "@/interfaces";

type Props = {
  isOpen: boolean;
  onClose: (event?: TimezonedEvent) => void;
  editEvent?: TimezonedEvent;
};

type Inputs = Omit<TimezonedEvent, "id"> & { time: string };

const AddEventDialog = ({ isOpen, onClose, editEvent }: Props) => {
  const defaultValues = {
    title: editEvent?.title,
    description: editEvent?.description,
    date: editEvent?.date.split("T")[0],
    time: editEvent?.date.split("T")[1],
    offset: editEvent ? editEvent.offset : LOCAL_OFFSET,
    links: editEvent ? editEvent.links : [],
    image: editEvent ? editEvent.image : "",
  };

  const { register, handleSubmit, reset, control } = useForm<Inputs>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const event: TimezonedEvent = {
      id: editEvent ? editEvent.id : uuidv4(),
      title: data.title,
      description: data.description,
      date: data.date + "T" + data.time,
      offset: data.offset,
      links: data.links,
      image: data.image,
    };

    onClose(event);

    if (!editEvent) {
      reset();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{editEvent ? "Edit" : "Add"} event</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody display="flex" flexDirection="column" gap="20px">
            <FormControl>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input id="title" {...register("title")} />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                id="description"
                minHeight="134px"
                {...register("description")}
              />
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
                <Select id="offset" {...register("offset")}>
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
            <Button type="button" onClick={handleClose} mr={3}>
              Cancel
            </Button>
            <Button colorScheme="teal" type="submit">
              {editEvent ? "Edit" : "Add"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddEventDialog;
