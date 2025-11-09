import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  TrendingUp,
  History,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Percent,
  Check,
  X,
  Edit3,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
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
import type { LoanRequest } from "./LenderReviewScreen";

interface LoanRequestDetailProps {
  request: LoanRequest;
  onBack: () => void;
  onStatusUpdate: (requestId: string, status: LoanRequest["status"]) => void;
}

export function LoanRequestDetail({
  request,
  onBack,
  onStatusUpdate,
}: LoanRequestDetailProps) {
  const [interestRate, setInterestRate] = useState(request.proposedInterest.toString());
  const [duration, setDuration] = useState(request.duration.toString());
  const [startDate, setStartDate] = useState("");
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const trustScoreColor =
    request.borrower.trustScore >= 900
      ? "text-green-600"
      : request.borrower.trustScore >= 800
      ? "text-blue-600"
      : request.borrower.trustScore >= 700
      ? "text-yellow-600"
      : "text-red-600";

  const trustScoreBg =
    request.borrower.trustScore >= 900
      ? "bg-green-100"
      : request.borrower.trustScore >= 800
      ? "bg-blue-100"
      : request.borrower.trustScore >= 700
      ? "bg-yellow-100"
      : "bg-red-100";

  const reliabilityPercentage = Math.round(
    (request.borrower.loanHistory.onTime / request.borrower.loanHistory.total) * 100
  );

  const handleApprove = () => {
    onStatusUpdate(request.id, "approved");
    setShowApproveDialog(false);
  };

  const handleReject = () => {
    onStatusUpdate(request.id, "rejected");
    setShowRejectDialog(false);
  };

  const handleRequestChange = () => {
    onStatusUpdate(request.id, "reviewed");
    onBack();
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
            <h2 className="text-white">Request Details</h2>
            <p className="text-sm text-blue-100 mt-0.5">Review and respond</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4 max-w-md mx-auto">
        {/* Borrower Info */}
        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="size-16 border-2 border-white shadow-lg">
                <AvatarImage src={request.borrower.avatar} />
                <AvatarFallback>
                  {request.borrower.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-foreground mb-1">{request.borrower.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Requested on {new Date(request.requestDate).toLocaleDateString("en-IN")}
                </p>
                <Badge variant="outline" className="bg-blue-50">
                  {request.purpose}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl text-blue-600">
                  ₹{request.amount.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Amount</p>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <p className="text-2xl text-foreground">{request.duration}m</p>
                <p className="text-xs text-muted-foreground mt-1">Duration</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trust Score */}
        <Card className={`border-2 ${trustScoreBg}/20`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className={`size-5 ${trustScoreColor}`} />
              Trust Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-3">
              <span className={`text-4xl ${trustScoreColor}`}>
                {request.borrower.trustScore}
              </span>
              <span className="text-muted-foreground mb-1">/1000</span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(request.borrower.trustScore / 1000) * 100}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`h-full ${trustScoreBg} rounded-full`}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              {request.borrower.trustScore >= 900
                ? "Excellent"
                : request.borrower.trustScore >= 800
                ? "Very Good"
                : request.borrower.trustScore >= 700
                ? "Good"
                : "Fair"}{" "}
              standing
            </p>
          </CardContent>
        </Card>

        {/* Loan History */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <History className="size-5 text-purple-600" />
              Loan History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  <span className="text-sm text-foreground">Total Loans</span>
                </div>
                <span className="text-foreground">{request.borrower.loanHistory.total}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Check className="size-5 text-green-600" />
                  <span className="text-sm text-foreground">Successful</span>
                </div>
                <span className="text-green-600">
                  {request.borrower.loanHistory.successful}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="size-5 text-blue-600" />
                  <span className="text-sm text-foreground">On-Time Payments</span>
                </div>
                <span className="text-blue-600">
                  {request.borrower.loanHistory.onTime}/{request.borrower.loanHistory.total}
                </span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="size-5 text-blue-600" />
                <span className="text-sm text-foreground">Repayment Reliability</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl text-blue-600">{reliabilityPercentage}%</span>
                {reliabilityPercentage === 100 && (
                  <Badge className="bg-green-100 text-green-700 border-green-200 mb-1">
                    Perfect Record
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Editable Fields */}
        <Card className="border-2 border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Edit3 className="size-5 text-blue-600" />
              Loan Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="interest" className="text-foreground mb-2 block">
                Interest Rate (% p.a.)
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 size-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Percent className="size-4" />
                </div>
                <Input
                  id="interest"
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="pl-14 h-12 border-2 bg-white"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Proposed: {request.proposedInterest}% p.a.
              </p>
            </div>

            <div>
              <Label htmlFor="duration-edit" className="text-foreground mb-2 block">
                Duration (months)
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 size-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                  <Clock className="size-4" />
                </div>
                <Input
                  id="duration-edit"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="pl-14 h-12 border-2 bg-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="start-date" className="text-foreground mb-2 block">
                Repayment Start Date
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 size-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Calendar className="size-4" />
                </div>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-14 h-12 border-2 bg-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Button
            onClick={() => setShowApproveDialog(true)}
            className="w-full h-14 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-200/50"
          >
            <Check className="size-5 mr-2" />
            Approve Loan
          </Button>

          <Button
            onClick={handleRequestChange}
            variant="outline"
            className="w-full h-14 border-2 border-yellow-300 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 hover:text-yellow-800"
          >
            <AlertCircle className="size-5 mr-2" />
            Request Changes
          </Button>

          <Button
            onClick={() => setShowRejectDialog(true)}
            variant="outline"
            className="w-full h-14 border-2 border-red-300 bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800"
          >
            <X className="size-5 mr-2" />
            Reject Request
          </Button>
        </div>
      </div>

      {/* Approve Dialog */}
      <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Check className="size-8 text-green-600" />
            </div>
            <AlertDialogTitle className="text-center">
              Approve Loan Request?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              You are about to approve a loan of{" "}
              <span className="text-foreground">
                ₹{request.amount.toLocaleString("en-IN")}
              </span>{" "}
              to <span className="text-foreground">{request.borrower.name}</span> for{" "}
              {duration} months at {interestRate}% p.a.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleApprove}
              className="bg-green-600 hover:bg-green-700"
            >
              Confirm Approval
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="size-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <X className="size-8 text-red-600" />
            </div>
            <AlertDialogTitle className="text-center">
              Reject Loan Request?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Are you sure you want to reject this loan request from{" "}
              <span className="text-foreground">{request.borrower.name}</span>? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReject}
              className="bg-red-600 hover:bg-red-700"
            >
              Confirm Rejection
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
