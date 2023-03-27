import type { UTCOffset } from "@/lib/offsets";

export interface TimezonedEvent {
  date: string;
  utcOffset: UTCOffset;
  name: string;
  description?: string;
  links?: string[];
}
