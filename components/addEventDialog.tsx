import { createPortal } from "react-dom";
import { useForm, type SubmitHandler } from "react-hook-form";

import { UTC_OFFSETS, LOCAL_OFFSET, type UTCOffset } from "@/lib/offsets";

import type { TimezonedEvent } from "@/interfaces";

type Props = { open: boolean; onClose: (event?: TimezonedEvent) => void };
type Inputs = { name: string; date: string; time: string; offset: UTCOffset };

const AddEventDialog = ({ open, onClose }: Props) => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const event: TimezonedEvent = {
      name: data.name,
      date: data.date + "T" + data.time,
      utcOffset: data.offset,
    };

    onClose(event);
  };

  const content = (
    <div className="dialog">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input {...register("name")} />

        <label>Date</label>
        <input type="date" {...register("date")} />

        <label>Time</label>
        <input type="time" {...register("time")} />

        <label>UTC offset</label>
        <select defaultValue={LOCAL_OFFSET} {...register("offset")}>
          {UTC_OFFSETS.map((offset) => (
            <option key={offset}>{offset}</option>
          ))}
        </select>

        <button type="submit">Add</button>
        <button type="button" onClick={() => onClose()}>
          Cancel
        </button>
      </form>
    </div>
  );

  if (open && typeof window === "object") {
    return createPortal(content, document.body);
  }

  return null;
};

export default AddEventDialog;
