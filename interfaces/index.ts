import type { UTCOffset } from "@/lib/offsets";

export interface TimezonedEvent {
  id: string;
  title: string;
  date: string;
  offset: UTCOffset;
  description?: string;
  links?: string[];
}
