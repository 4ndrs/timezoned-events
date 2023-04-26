import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { UTC_OFFSETS, LOCAL_OFFSET, type UTCOffset } from "@/lib/offsets";

import styles from "./AddEventDialog.module.css";

import type { TimezonedEvent } from "@/interfaces";

type Props = { isOpen: boolean; onClose: (event?: TimezonedEvent) => void };
type Inputs = { title: string; date: string; time: string; offset: UTCOffset };

const AddEventDialog = ({ isOpen, onClose }: Props) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const event: TimezonedEvent = {
      id: crypto.randomUUID(),
      title: data.title,
      date: data.date + "T" + data.time,
      offset: data.offset,
    };

    reset();
    onClose(event);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formChild}>
            <label htmlFor="title">Event title</label>
            <input id="title" {...register("title")} />
          </div>

          <div className={styles.formChild}>
            <label htmlFor="date">Date</label>
            <input id="date" type="date" {...register("date")} />
          </div>

          <div className={styles.formChild}>
            <label htmlFor="time">Time</label>
            <input id="time" type="time" {...register("time")} />
          </div>

          <div className={styles.formChild}>
            <label htmlFor="offset">UTC offset</label>
            <select
              id="offset"
              defaultValue={LOCAL_OFFSET}
              {...register("offset")}
            >
              {UTC_OFFSETS.map((offset) => (
                <option key={offset}>{offset}</option>
              ))}
            </select>
          </div>

          <div className={styles.formChild}>
            <button type="submit">Add</button>
            <button type="button" onClick={() => onClose()}>
              Cancel
            </button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddEventDialog;
