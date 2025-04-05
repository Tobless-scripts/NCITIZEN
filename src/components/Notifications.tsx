import { createContext, useContext, useState, ReactNode } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define types for notifications
type Notification = {
    id: string;
    message: string;
    type: "success" | "error" | "info";
};

type NotificationContextType = {
    notifications: Notification[];
    addNotification: (
        message: string,
        type: "success" | "error" | "info"
    ) => void;
    removeNotification: (id: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (
        message: string,
        type: "success" | "error" | "info"
    ) => {
        const id = Date.now().toString();
        setNotifications((prev) => [...prev, { id, message, type }]);
        toast[type](message); // ✅ Automatically show toast
    };

    const removeNotification = (id: string) => {
        setNotifications((prev) =>
            prev.filter((notification) => notification.id !== id)
        );
    };

    return (
        <NotificationContext.Provider
            value={{ notifications, addNotification, removeNotification }}
        >
            {children}
            <ToastContainer position="top-right" autoClose={5000} />
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error(
            "useNotifications must be used within a NotificationProvider"
        );
    }
    return context;
};
