import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  AlertCircle,
  Info,
  Calendar,
  FileText,
  DollarSign,
  UserPlus,
  Clock,
  XCircle,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface NotificationsScreenProps {
  onBack: () => void;
}

type NotificationType = "success" | "alert" | "info" | "urgent";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  person?: {
    name: string;
    avatar: string;
  };
  amount?: number;
  read: boolean;
  actionLabel?: string;
  icon: React.ReactNode;
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "alert",
    title: "Payment Due Tomorrow",
    message: "Your payment of ₹2,575 to Priya Sharma is due on Nov 1, 2025",
    timestamp: "2025-10-31T10:00:00",
    person: {
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    amount: 2575,
    read: false,
    actionLabel: "Pay Now",
    icon: <Calendar className="size-5" />,
  },
  {
    id: "2",
    type: "info",
    title: "New Loan Request",
    message: "Amit Singh has requested a loan of ₹10,000 for 9 months",
    timestamp: "2025-10-30T14:30:00",
    person: {
      name: "Amit Singh",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop",
    },
    amount: 10000,
    read: false,
    actionLabel: "Review",
    icon: <FileText className="size-5" />,
  },
  {
    id: "3",
    type: "success",
    title: "Payment Received",
    message: "Sneha Patel paid ₹2,083 for the loan installment",
    timestamp: "2025-10-29T09:15:00",
    person: {
      name: "Sneha Patel",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    amount: 2083,
    read: true,
    icon: <CheckCircle2 className="size-5" />,
  },
  {
    id: "4",
    type: "success",
    title: "Agreement Signed",
    message: "Your loan agreement with Rahul Verma has been finalized",
    timestamp: "2025-10-28T16:45:00",
    person: {
      name: "Rahul Verma",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    },
    read: true,
    icon: <FileText className="size-5" />,
  },
  {
    id: "5",
    type: "urgent",
    title: "Payment Overdue",
    message: "Your payment of ₹1,700 to Raj Kumar is 3 days overdue",
    timestamp: "2025-10-27T08:00:00",
    person: {
      name: "Raj Kumar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    amount: 1700,
    read: false,
    actionLabel: "Pay Immediately",
    icon: <AlertCircle className="size-5" />,
  },
  {
    id: "6",
    type: "info",
    title: "Loan Request Approved",
    message: "Priya Sharma approved your loan request of ₹15,000",
    timestamp: "2025-10-26T11:20:00",
    person: {
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    amount: 15000,
    read: true,
    icon: <CheckCircle2 className="size-5" />,
  },
  {
    id: "7",
    type: "alert",
    title: "Payment Due in 3 Days",
    message: "Reminder: ₹1,700 payment due on Oct 15, 2025",
    timestamp: "2025-10-12T09:00:00",
    person: {
      name: "Raj Kumar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    amount: 1700,
    read: true,
    actionLabel: "View Details",
    icon: <Clock className="size-5" />,
  },
  {
    id: "8",
    type: "info",
    title: "New Circle Member",
    message: "Pooja Reddy joined your trust circle",
    timestamp: "2025-10-10T15:30:00",
    person: {
      name: "Pooja Reddy",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    },
    read: true,
    icon: <UserPlus className="size-5" />,
  },
];

const notificationConfig = {
  success: {
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    badgeColor: "bg-green-100 text-green-700 border-green-200",
    iconColor: "text-green-600",
    label: "Success",
  },
  alert: {
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    badgeColor: "bg-yellow-100 text-yellow-700 border-yellow-200",
    iconColor: "text-yellow-600",
    label: "Alert",
  },
  info: {
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    iconColor: "text-blue-600",
    label: "Info",
  },
  urgent: {
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    badgeColor: "bg-red-100 text-red-700 border-red-200",
    iconColor: "text-red-600",
    label: "Urgent",
  },
};

function NotificationCard({ notification }: { notification: Notification }) {
  const config = notificationConfig[notification.type];
  const timeAgo = getTimeAgo(notification.timestamp);

  return (
    <Card
      className={`border-2 ${config.borderColor} ${config.bgColor} hover:shadow-md transition-all ${
        !notification.read ? "shadow-sm" : ""
      }`}
    >
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Icon */}
          <div
            className={`size-10 rounded-full ${config.bgColor} border ${config.borderColor} flex items-center justify-center shrink-0 ${config.iconColor}`}
          >
            {notification.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 className={`text-foreground ${!notification.read ? "" : "opacity-80"}`}>
                {notification.title}
              </h4>
              {!notification.read && (
                <div className="size-2 rounded-full bg-blue-600 shrink-0 mt-2" />
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>

            {/* Person & Amount */}
            {notification.person && (
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="size-6 border">
                  <AvatarImage src={notification.person.avatar} />
                  <AvatarFallback className="text-xs">
                    {notification.person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-foreground">{notification.person.name}</span>
                {notification.amount && (
                  <>
                    <span className="text-slate-400">•</span>
                    <span className="text-sm text-blue-600">
                      ₹{notification.amount.toLocaleString("en-IN")}
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between gap-2 mt-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`${config.badgeColor} border text-xs`}>
                  {config.label}
                </Badge>
                <span className="text-xs text-muted-foreground">{timeAgo}</span>
              </div>

              {notification.actionLabel && (
                <Button
                  size="sm"
                  variant="ghost"
                  className={`h-7 text-xs ${config.iconColor} hover:${config.bgColor}`}
                >
                  {notification.actionLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getTimeAgo(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return `${diffMins}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return past.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  }
}

export function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | NotificationType>("all");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const urgentCount = notifications.filter((n) => n.type === "urgent").length;
  const alertCount = notifications.filter(
    (n) => n.type === "alert" && !n.read
  ).length;

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-6 py-6 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="size-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="size-5" />
            </button>
            <div>
              <h2 className="text-white">Notifications</h2>
              <p className="text-sm text-blue-100 mt-0.5">
                {unreadCount} unread
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Button
              onClick={markAllAsRead}
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              Mark all read
            </Button>
          )}
        </div>

        {/* Smart Summary */}
        {(alertCount > 0 || urgentCount > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <Bell className="size-5 text-yellow-300 shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-sm">
                  {urgentCount > 0 && (
                    <span className="text-red-300">
                      {urgentCount} urgent {urgentCount === 1 ? "issue" : "issues"}
                    </span>
                  )}
                  {urgentCount > 0 && alertCount > 0 && <span> and </span>}
                  {alertCount > 0 && (
                    <span className="text-yellow-300">
                      {alertCount} payment {alertCount === 1 ? "reminder" : "reminders"} this
                      week
                    </span>
                  )}
                </p>
                <p className="text-xs text-blue-100 mt-1">
                  Review and take action to stay on track
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="px-6 py-4 sticky top-[140px] bg-gradient-to-b from-slate-50 to-transparent z-[9]">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Button
            size="sm"
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={
              filter === "all"
                ? "bg-blue-600 hover:bg-blue-700"
                : "border-2 hover:border-blue-300"
            }
          >
            All
          </Button>
          <Button
            size="sm"
            variant={filter === "urgent" ? "default" : "outline"}
            onClick={() => setFilter("urgent")}
            className={
              filter === "urgent"
                ? "bg-red-600 hover:bg-red-700"
                : "border-2 hover:border-red-300"
            }
          >
            Urgent {urgentCount > 0 && `(${urgentCount})`}
          </Button>
          <Button
            size="sm"
            variant={filter === "alert" ? "default" : "outline"}
            onClick={() => setFilter("alert")}
            className={
              filter === "alert"
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "border-2 hover:border-yellow-300"
            }
          >
            Alerts
          </Button>
          <Button
            size="sm"
            variant={filter === "info" ? "default" : "outline"}
            onClick={() => setFilter("info")}
            className={
              filter === "info"
                ? "bg-blue-600 hover:bg-blue-700"
                : "border-2 hover:border-blue-300"
            }
          >
            Info
          </Button>
          <Button
            size="sm"
            variant={filter === "success" ? "default" : "outline"}
            onClick={() => setFilter("success")}
            className={
              filter === "success"
                ? "bg-green-600 hover:bg-green-700"
                : "border-2 hover:border-green-300"
            }
          >
            Success
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-6 pb-6 space-y-3 max-w-4xl mx-auto">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))
        ) : (
          <div className="text-center py-12">
            <Bell className="size-12 text-slate-300 mx-auto mb-3" />
            <p className="text-muted-foreground">No notifications in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
