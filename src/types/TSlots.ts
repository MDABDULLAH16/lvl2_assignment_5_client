import { Schema } from "inspector/promises";
import { Key } from "readline";

export type TSlot = {
  _id: Key | null | undefined;
  service: Schema.Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked" | "canceled";
};
