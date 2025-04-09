import React, { createContext, useContext, useState } from "react";

// Define the structure of the context data
interface ImageContextType {
    imageSrc: string;
    setImageSrc: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context
const ImageContext = createContext<ImageContextType | undefined>(undefined);

// Provider component
export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [imageSrc, setImageSrc] = useState<string>(""); // Start with an empty string

    return (
        <ImageContext.Provider value={{ imageSrc, setImageSrc }}>
            {children}
        </ImageContext.Provider>
    );
};

// Custom hook to use the ImageContext
export const useImage = () => {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error("useImage must be used within an ImageProvider");
    }
    return context;
};
