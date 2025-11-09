import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wallet,
  FileText,
  TrendingUp,
  Calendar,
  Shield,
  ChevronRight,
  DollarSign,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { BottomNav } from "./BottomNav";
import { LoanRequestScreen } from "./LoanRequestScreen";
import { LenderReviewScreen } from "./LenderReviewScreen";
import { DigitalAgreementScreen } from "./DigitalAgreementScreen";
import { RepaymentTrackerScreen } from "./RepaymentTrackerScreen";
import { NotificationsScreen } from "./NotificationsScreen";
import { ProfileScreen } from "./ProfileScreen";

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  onClick: () => void;
}

function ActionCard({ icon, title, description, badge, onClick }: ActionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className="cursor-pointer"
    >
      <Card className="hover:shadow-md transition-shadow border-2 hover:border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                {icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-foreground">{title}</h4>
                  {badge && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {badge}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="size-5 text-muted-foreground" />
            </motion.div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClick();
                    }}
                    className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Open {title}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface DashboardProps {
  onLogout?: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [isLender, setIsLender] = useState(false);
  const [showLoanRequest, setShowLoanRequest] = useState(false);
  const [showLenderReview, setShowLenderReview] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [showRepaymentTracker, setShowRepaymentTracker] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleBottomNavChange = (tab: string) => {
    if (tab === "notifications") {
      setShowNotifications(true);
    } else if (tab === "profile") {
      setShowProfile(true);
    }
  };

  if (showLoanRequest) {
    return <LoanRequestScreen onBack={() => setShowLoanRequest(false)} />;
  }

  if (showLenderReview) {
    return <LenderReviewScreen onBack={() => setShowLenderReview(false)} />;
  }

  if (showAgreement) {
    return <DigitalAgreementScreen onBack={() => setShowAgreement(false)} />;
  }

  if (showRepaymentTracker) {
    return <RepaymentTrackerScreen onBack={() => setShowRepaymentTracker(false)} />;
  }

  if (showNotifications) {
    return <NotificationsScreen onBack={() => setShowNotifications(false)} />;
  }

  if (showProfile) {
    return (
      <ProfileScreen
        onBack={() => setShowProfile(false)}
        onLogout={() => {
          setShowProfile(false);
          onLogout?.();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 pb-20">
      {/* Top Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-6 pt-8 pb-12 rounded-b-3xl shadow-lg">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="size-14 border-2 border-white/30">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-white">John Doe</h2>
              <p className="text-sm text-blue-100 mt-0.5">Welcome back!</p>
            </div>
          </div>
        </div>

        {/* Role Toggle */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-100">My Role</p>
              <p className="mt-1 text-white">
                {isLender ? "Lender" : "Borrower"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm ${!isLender ? "text-white" : "text-blue-200"}`}>
                Borrower
              </span>
              <Switch
                checked={isLender}
                onCheckedChange={setIsLender}
                className="data-[state=checked]:bg-white data-[state=unchecked]:bg-white/30"
              />
              <span className={`text-sm ${isLender ? "text-white" : "text-blue-200"}`}>
                Lender
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Summary Cards */}
      <div className="px-6 -mt-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <Card className="shadow-lg border-0">
            <CardContent className="p-4 text-center">
              <div className="size-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-2">
                <Wallet className="size-4" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">Balance</p>
              <p className="text-foreground">₹2,450</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-4 text-center">
              <div className="size-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mx-auto mb-2">
                <Clock className="size-4" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">Pending</p>
              <p className="text-foreground">₹500</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-4 text-center">
              <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mx-auto mb-2">
                <CheckCircle2 className="size-4" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">Active</p>
              <p className="text-foreground">3 loans</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Actions */}
      <div className="px-6">
        <h3 className="mb-4 text-foreground">Quick Actions</h3>
        <div className="space-y-3">
          <ActionCard
            icon={<DollarSign className="size-5" />}
            title="Request Loan"
            description="Create a new loan request"
            onClick={() => setShowLoanRequest(true)}
          />

          {isLender && (
            <ActionCard
              icon={<FileText className="size-5" />}
              title="View Requests"
              description="See pending loan requests"
              badge="4 new"
              onClick={() => setShowLenderReview(true)}
            />
          )}

          <ActionCard
            icon={<Calendar className="size-5" />}
            title="Repayment Schedule"
            description="Track your payment timeline"
            onClick={() => setShowRepaymentTracker(true)}
          />

          <ActionCard
            icon={<FileText className="size-5" />}
            title="Agreements"
            description="View and manage agreements"
            onClick={() => setShowAgreement(true)}
          />

          <ActionCard
            icon={<Shield className="size-5" />}
            title="Trust & History"
            description="Your trust score and transaction history"
            onClick={() => console.log("Trust & History")}
          />
        </div>

        {/* Quick Stats */}
        <Card className="mt-6 border-0 bg-gradient-to-br from-blue-50 to-slate-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="size-5 text-blue-600" />
              Trust Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-3xl text-blue-600">850</span>
              <span className="text-muted-foreground mb-1">/1000</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full mt-3 overflow-hidden">
              <div className="h-full w-[85%] bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Excellent standing • 12 successful transactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNav onTabChange={handleBottomNavChange} unreadNotifications={3} />
    </div>
  );
}
