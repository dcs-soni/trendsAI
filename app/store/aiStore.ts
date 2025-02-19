import { create } from "zustand";
import { AIApp, AIModel } from "../dashboard/page";

interface AIStore {
  aiApps: AIApp[];
  aiModels: AIModel[];
  setAIApps: (app: AIApp[]) => void;
  setAIModels: (model: AIModel[]) => void;
}

export const useAIStore = create<AIStore>((set) => ({
  aiApps: [],
  aiModels: [],
  setAIApps: (apps) => set({ aiApps: apps }),
  setAIModels: (models) => set({ aiModels: models }),
}));
