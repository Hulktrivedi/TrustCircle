import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Building2,
  ShieldCheck,
  Upload,
  Bell,
  CheckCircle2,
  ChevronRight,
  LogOut,
  Edit2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Badge } from "./ui/badge";

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

interface NotificationPreferences {
  paymentReminders: boolean;
  loanRequests: boolean;
  paymentReceived: boolean;
  agreementUpdates: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export function ProfileScreen({ onBack, onLogout }: ProfileScreenProps) {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [showKYC, setShowKYC] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPreferences>({
    paymentReminders: true,
    loanRequests: true,
    paymentReceived: true,
    agreementUpdates: true,
    emailNotifications: true,
    pushNotifications: true,
  });

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    address: "123 MG Road, Bangalore, Karnataka 560001",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    bankAccount: "XXXX XXXX 5678",
    upiId: "johndoe@upi",
    ifscCode: "HDFC0001234",
    kycStatus: "verified",
  };

  const handleNotificationToggle = (key: keyof NotificationPreferences) => {
    setNotificationPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-6 py-6 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="size-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="size-5" />
          </button>
          <div>
            <h2 className="text-white">Profile & Settings</h2>
            <p className="text-sm text-blue-100 mt-0.5">Manage your account</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="size-20 border-4 border-white shadow-lg">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-foreground">{userData.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{userData.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    <CheckCircle2 className="size-3 mr-1" />
                    Verified
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Trust Score: 850
                  </Badge>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEditProfile(true)}
                className="shrink-0"
              >
                <Edit2 className="size-4 mr-1" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <User className="size-5 text-blue-600" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Phone className="size-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="text-foreground">{userData.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="size-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <Mail className="size-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Email Address</p>
                <p className="text-foreground">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="size-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <MapPin className="size-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="text-foreground text-sm">{userData.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank & UPI Details */}
        <Card
          className="border-2 cursor-pointer hover:shadow-md transition-all"
          onClick={() => setShowBankDetails(true)}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <CreditCard className="size-5 text-green-600" />
                Bank & UPI Details
              </CardTitle>
              <ChevronRight className="size-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="size-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Building2 className="size-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Bank Account</p>
                <p className="text-foreground">{userData.bankAccount}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <CreditCard className="size-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">UPI ID</p>
                <p className="text-foreground">{userData.upiId}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KYC Verification */}
        <Card
          className="border-2 cursor-pointer hover:shadow-md transition-all"
          onClick={() => setShowKYC(true)}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <ShieldCheck className="size-5 text-blue-600" />
                KYC Verification
              </CardTitle>
              <Badge className="bg-green-100 text-green-700 border-green-200">
                <CheckCircle2 className="size-3 mr-1" />
                Verified
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your identity has been verified. This helps build trust in the TrustCircle community.
            </p>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Bell className="size-5 text-yellow-600" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="text-foreground text-sm">Payment Reminders</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Get notified about upcoming payments
                </p>
              </div>
              <Switch
                checked={notificationPrefs.paymentReminders}
                onCheckedChange={() => handleNotificationToggle("paymentReminders")}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="text-foreground text-sm">Loan Requests</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Alerts for new loan requests
                </p>
              </div>
              <Switch
                checked={notificationPrefs.loanRequests}
                onCheckedChange={() => handleNotificationToggle("loanRequests")}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="text-foreground text-sm">Payment Received</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  When you receive a payment
                </p>
              </div>
              <Switch
                checked={notificationPrefs.paymentReceived}
                onCheckedChange={() => handleNotificationToggle("paymentReceived")}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="text-foreground text-sm">Agreement Updates</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Changes to loan agreements
                </p>
              </div>
              <Switch
                checked={notificationPrefs.agreementUpdates}
                onCheckedChange={() => handleNotificationToggle("agreementUpdates")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="text-foreground text-sm">Email Notifications</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Receive updates via email
                </p>
              </div>
              <Switch
                checked={notificationPrefs.emailNotifications}
                onCheckedChange={() => handleNotificationToggle("emailNotifications")}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="text-foreground text-sm">Push Notifications</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Mobile app notifications
                </p>
              </div>
              <Switch
                checked={notificationPrefs.pushNotifications}
                onCheckedChange={() => handleNotificationToggle("pushNotifications")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          size="lg"
          onClick={() => setShowLogoutDialog(true)}
          className="w-full h-14 border-2 border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300"
        >
          <LogOut className="size-5 mr-2" />
          Logout
        </Button>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your personal information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                defaultValue={userData.name}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                defaultValue={userData.email}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="edit-phone">Phone Number</Label>
              <Input
                id="edit-phone"
                type="tel"
                defaultValue={userData.phone}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="edit-address">Address</Label>
              <Input
                id="edit-address"
                defaultValue={userData.address}
                className="mt-2"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowEditProfile(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setShowEditProfile(false)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bank Details Dialog */}
      <Dialog open={showBankDetails} onOpenChange={setShowBankDetails}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Bank & UPI Details</DialogTitle>
            <DialogDescription>
              Manage your payment methods
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="bank-name">Bank Name</Label>
              <Input
                id="bank-name"
                placeholder="HDFC Bank"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="account-number">Account Number</Label>
              <Input
                id="account-number"
                defaultValue={userData.bankAccount}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="ifsc">IFSC Code</Label>
              <Input
                id="ifsc"
                defaultValue={userData.ifscCode}
                className="mt-2"
              />
            </div>

            <Separator />

            <div>
              <Label htmlFor="upi">UPI ID</Label>
              <Input
                id="upi"
                defaultValue={userData.upiId}
                placeholder="yourname@upi"
                className="mt-2"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowBankDetails(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setShowBankDetails(false)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* KYC Dialog */}
      <Dialog open={showKYC} onOpenChange={setShowKYC}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>KYC Verification</DialogTitle>
            <DialogDescription>
              Upload documents to verify your identity
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-8 text-green-600 shrink-0" />
                <div>
                  <p className="text-foreground">Verification Complete</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Your identity has been verified successfully
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-foreground">Verified Documents:</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-foreground">Aadhaar Card</span>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-foreground">PAN Card</span>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    Verified
                  </Badge>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowKYC(false)}
            >
              <Upload className="size-4 mr-2" />
              Upload Additional Documents
            </Button>
          </div>

          <Button
            onClick={() => setShowKYC(false)}
            className="w-full mt-4"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="size-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <LogOut className="size-8 text-red-600" />
            </div>
            <AlertDialogTitle className="text-center">
              Logout from TrustCircle?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Are you sure you want to logout? You'll need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
