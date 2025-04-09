import React, { createContext, useState } from "react";

interface AuthContextType {
    name: string;
    email: string;
    setName: (name: string) => void;
    setEmail: (email: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <AuthContext.Provider value={{ name, email, setName, setEmail }}>
            {children}
        </AuthContext.Provider>
    );
};
