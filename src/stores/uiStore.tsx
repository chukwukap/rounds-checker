import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface UIState {
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  theme: "light" | "dark";
}

interface UIActions {
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  toggleTheme: () => void;
}

export const createUIStore = () =>
  create<UIState & UIActions>()(
    immer((set) => ({
      isLoading: false,
      error: null,
      isModalOpen: false,
      modalContent: null,
      theme: "light",
      setLoading: (isLoading) =>
        set((state) => {
          state.isLoading = isLoading;
        }),
      setError: (error) =>
        set((state) => {
          state.error = error;
        }),
      openModal: (content) =>
        set((state) => {
          state.isModalOpen = true;
          state.modalContent = content;
        }),
      closeModal: () =>
        set((state) => {
          state.isModalOpen = false;
          state.modalContent = null;
        }),
      toggleTheme: () =>
        set((state) => {
          state.theme = state.theme === "light" ? "dark" : "light";
        }),
    }))
  );
