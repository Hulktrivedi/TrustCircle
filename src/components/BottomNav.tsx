import { useState } from "react";
import { Home, Bell, MessageCircle, User } from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  badge?: number;
}

function NavItem({ icon, label, isActive, onClick, badge }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors relative"
    >
      <div className="relative">
        <div
          className={`transition-colors ${
            isActive ? "text-blue-600" : "text-slate-400"
          }`}
        >
          {icon}
        </div>
        {badge && badge > 0 && (
          <div className="absolute -top-1 -right-1 size-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
            {badge > 9 ? "9+" : badge}
          </div>
        )}
      </div>
      <span
        className={`text-xs transition-colors ${
          isActive ? "text-blue-600" : "text-slate-500"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

interface BottomNavProps {
  onTabChange?: (tab: string) => void;
  unreadNotifications?: number;
}

export function BottomNav({ onTabChange, unreadNotifications = 3 }: BottomNavProps) {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
      <div className="flex items-center max-w-md mx-auto">
        <NavItem
          icon={<Home className="size-6" />}
          label="Home"
          isActive={activeTab === "home"}
          onClick={() => handleTabClick("home")}
        />
        <NavItem
          icon={<Bell className="size-6" />}
          label="Notifications"
          isActive={activeTab === "notifications"}
          onClick={() => handleTabClick("notifications")}
          badge={unreadNotifications}
        />
        <NavItem
          icon={<MessageCircle className="size-6" />}
          label="Messages"
          isActive={activeTab === "messages"}
          onClick={() => handleTabClick("messages")}
        />
        <NavItem
          icon={<User className="size-6" />}
          label="Profile"
          isActive={activeTab === "profile"}
          onClick={() => handleTabClick("profile")}
        />
      </div>
    </div>
  );
}
