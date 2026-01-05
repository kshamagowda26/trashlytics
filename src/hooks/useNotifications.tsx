import { useState, useEffect, createContext, useContext, ReactNode } from "react";

export interface BinNotification {
  id: string;
  binId: number;
  location: string;
  type: "warning" | "critical" | "maintenance";
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationsContextType {
  notifications: BinNotification[];
  unreadCount: number;
  addNotification: (notification: Omit<BinNotification, "id" | "timestamp" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

// Mock initial notifications for demo
const initialNotifications: BinNotification[] = [
  {
    id: "1",
    binId: 3,
    location: "Tech Hub - Building C",
    type: "critical",
    message: "E-Waste bin at 90% capacity - Immediate collection needed",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
  },
  {
    id: "2",
    binId: 1,
    location: "Central Park - Zone A",
    type: "warning",
    message: "Wet Waste bin at 75% capacity - Schedule collection soon",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
  },
  {
    id: "3",
    binId: 5,
    location: "Market Square - East",
    type: "maintenance",
    message: "Sensor malfunction detected - Maintenance required",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
  },
];

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<BinNotification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = (notification: Omit<BinNotification, "id" | "timestamp" | "read">) => {
    const newNotification: BinNotification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: new Date(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
}
