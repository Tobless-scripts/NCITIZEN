import React, { createContext, useContext, useState } from "react";

interface ImageContextType {
    imageSrc: string;
    setImageSrc: React.Dispatch<React.SetStateAction<string>>;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [imageSrc, setImageSrc] = useState<string>("");

    return (
        <ImageContext.Provider value={{ imageSrc, setImageSrc }}>
            {children}
        </ImageContext.Provider>
    );
};

export const useImage = () => {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error("useImage must be used within an ImageProvider");
    }
    return context;
};
