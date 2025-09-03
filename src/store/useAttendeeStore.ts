// ...existing code...
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AttendeeStore = {
  attendee: {
    id: string;
    name: string;
    email: string;
    callStatus: string;
    createdAt: Date;
    updatedAt: Date;
    attendanceId?: string;
    attendeeId?: string;
  } | null;
  setAttendee: (attendee: {
    id: string;
    name: string;
    email: string;
    callStatus: string;
    createdAt: Date;
    updatedAt: Date;
    attendanceId?: string;
    attendeeId?: string;
  }) => void;
  clearAttendee: () => void;
};
// Create the Zustand stare with persistence
export const useAttendeeStore = create<AttendeeStore>()(
    //persist is used to store the values in local storage
  persist(
    (set) => ({
      attendee: null,
      setAttendee: (attendee) => set({ attendee }),
      clearAttendee: () => set({ attendee: null }),
    }),
    {
      name: "attendee-storage", // unique name for LocalStorage
    }
  )
);
