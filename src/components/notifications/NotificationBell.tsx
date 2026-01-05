import { Bell, AlertTriangle, AlertCircle, Wrench, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNotifications, BinNotification } from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const typeConfig = {
  warning: {
    icon: AlertTriangle,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  critical: {
    icon: AlertCircle,
    color: "text-waste-hazardous",
    bg: "bg-waste-hazardous/10",
  },
  maintenance: {
    icon: Wrench,
    color: "text-waste-ewaste",
    bg: "bg-waste-ewaste/10",
  },
};

function NotificationItem({
  notification,
  onRead,
  onClear,
}: {
  notification: BinNotification;
  onRead: () => void;
  onClear: () => void;
}) {
  const config = typeConfig[notification.type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "p-3 border-b border-border/50 last:border-0 transition-colors",
        !notification.read && "bg-primary/5"
      )}
    >
      <div className="flex gap-3">
        <div className={cn("p-2 rounded-lg shrink-0", config.bg)}>
          <Icon className={cn("h-4 w-4", config.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{notification.location}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {notification.message}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          {!notification.read && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={onRead}
            >
              <Check className="h-3 w-3" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-destructive"
            onClick={onClear}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotification } =
    useNotifications();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-waste-hazardous text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-3 border-b border-border/50">
          <h4 className="font-semibold text-sm">Notifications</h4>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7"
              onClick={markAllAsRead}
            >
              Mark all read
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground text-sm">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={() => markAsRead(notification.id)}
                onClear={() => clearNotification(notification.id)}
              />
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
