import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

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

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>({
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
          <ModalBody
            display="flex"
            flexDirection="column"
            gap="20px"
            color="gray.500"
          >
            <FormControl isInvalid={!!errors.title}>
              <FormLabel>Title</FormLabel>
              <Input {...register("title", { required: "Required" })} />
              <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel>Description (optional)</FormLabel>
              <Textarea minHeight="134px" {...register("description")} />
            </FormControl>

            <Box display="flex" gap="16px">
              <FormControl flex="1" minWidth="0" isInvalid={!!errors.date}>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  {...register("date", { required: "Required" })}
                />
                <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
              </FormControl>

              <FormControl flex="1" minWidth="0" isInvalid={!!errors.time}>
                <FormLabel>Time</FormLabel>
                <Input
                  type="time"
                  {...register("time", { required: "Required" })}
                />
                <FormErrorMessage>{errors.time?.message}</FormErrorMessage>
              </FormControl>

              <FormControl flex="1" minWidth="0" isInvalid={!!errors.offset}>
                <FormLabel>UTC Offset</FormLabel>
                <Select {...register("offset", { required: "Required" })}>
                  {UTC_OFFSETS.map((offset) => (
                    <option key={offset}>{offset}</option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.offset?.message}</FormErrorMessage>
              </FormControl>
            </Box>

            <FormControl>
              <FormLabel htmlFor="links">Links</FormLabel>
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
