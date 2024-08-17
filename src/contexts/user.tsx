import React, { createContext, useState, useContext, ReactNode } from "react";

export interface FarcasterUser {
  fid: string;
  userName: string;
  profileImage: string;
}

interface FarcasterUserContextType {
  farcasterUser: FarcasterUser | null;
  setFarcasterUser: (user: FarcasterUser | null) => void;
}

const FarcasterUserContext = createContext<
  FarcasterUserContextType | undefined
>(undefined);

export function FarcasterUserProvider({ children }: { children: ReactNode }) {
  const [farcasterUser, setFarcasterUser] = useState<FarcasterUser | null>(
    null
  );

  return (
    <FarcasterUserContext.Provider value={{ farcasterUser, setFarcasterUser }}>
      {children}
    </FarcasterUserContext.Provider>
  );
}

export function useFarcasterUser() {
  const context = useContext(FarcasterUserContext);
  if (context === undefined) {
    throw new Error(
      "useFarcasterUser must be used within a FarcasterUserProvider"
    );
  }
  return context;
}
