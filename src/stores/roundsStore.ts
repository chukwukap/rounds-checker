import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserRoundsData } from "@/lib/types";

interface RoundsState {
  userData: UserRoundsData | null;
  lastUpdated: number | null;
}

interface RoundsActions {
  setUserData: (data: UserRoundsData) => void;
  clearUserData: () => void;
  setLastUpdated: (timestamp: number) => void;
}

export const createRoundsStore = () =>
  create(
    persist(
      immer<RoundsState & RoundsActions>((set) => ({
        userData: null,
        lastUpdated: null,
        setUserData: (data) =>
          set((state) => {
            state.userData = data;
          }),
        clearUserData: () =>
          set((state) => {
            state.userData = null;
          }),
        setLastUpdated: (timestamp) =>
          set((state) => {
            state.lastUpdated = timestamp;
          }),
      })),
      {
        name: "rounds-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
