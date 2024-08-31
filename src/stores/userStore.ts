import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/lib/types";

type UserState = User & {
  fid: string;
  userName: string;
  profileImage: string;
};

interface UserActions {
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const createUserStore = () =>
  create(
    persist(
      immer<UserState & UserActions>((set) => ({
        fid: "",
        userName: "",
        profileImage: "",
        setUser: (user) =>
          set((state) => {
            state.fid = user.fid;
            state.userName = user.userName;
            state.profileImage = user.profileImage;
          }),
        clearUser: () =>
          set((state) => {
            state.fid = "";
            state.userName = "";
            state.profileImage = "";
          }),
      })),
      {
        name: "user-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
