"use client"

import { createContext, useContext, useState, ReactNode } from "react";

type MuteContextType = {
  isMuted: boolean;
  toggleMute: () => void;
};

const MuteContext = createContext<MuteContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <MuteContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </MuteContext.Provider>
  );
}

// 4. Un petit Hook personnalisé pour lire facilement l'état plus tard
export const useMute = () => {
  const context = useContext(MuteContext);
  if (!context) {
    throw new Error("useMute doit être utilisé à l'intérieur d'un MuteProvider");
  }
  return context;
};
