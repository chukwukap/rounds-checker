import { createUserStore } from "./userStore";
import { createRoundsStore } from "./roundsStore";
import { createUIStore } from "./uiStore";

export const createRootStore = () => ({
  user: createUserStore(),
  rounds: createRoundsStore(),
  ui: createUIStore(),
});

export type RootStore = ReturnType<typeof createRootStore>;
