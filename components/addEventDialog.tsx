import { createPortal } from "react-dom";
import { useForm, type SubmitHandler } from "react-hook-form";

import { UTC_OFFSETS, LOCAL_OFFSET, type UTCOffset } from "@/lib/offsets";

import styles from "./addEventDialog.module.css";

import type { TimezonedEvent } from "@/interfaces";

type Props = { open: boolean; onClose: (event?: TimezonedEvent) => void };
type Inputs = { title: string; date: string; time: string; offset: UTCOffset };

const AddEventDialog = ({ open, onClose }: Props) => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const event: TimezonedEvent = {
      name: data.title,
      date: data.date + "T" + data.time,
      utcOffset: data.offset,
    };

    onClose(event);
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    onClose();
  };

  const content = (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.dialog}>
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
      </div>
    </div>
  );

  if (open && typeof window === "object") {
    return createPortal(content, document.body);
  }

  return null;
};

export default AddEventDialog;
