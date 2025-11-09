import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Circle,
  AlertCircle,
  CreditCard,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface RepaymentTrackerScreenProps {
  onBack: () => void;
}

interface Payment {
  id: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "completed" | "pending" | "overdue";
}

interface Loan {
  id: string;
  person: {
    name: string;
    avatar: string;
  };
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  nextDueDate: string;
  monthlyPayment: number;
  payments: Payment[];
  status: "active" | "completed" | "overdue";
}

// Mock data for borrower loans
const myLoans: Loan[] = [
  {
    id: "1",
    person: {
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    totalAmount: 15000,
    paidAmount: 7725,
    remainingAmount: 7275,
    nextDueDate: "2025-11-01",
    monthlyPayment: 2575,
    status: "active",
    payments: [
      { id: "p1", amount: 2575, dueDate: "2025-08-01", paidDate: "2025-08-01", status: "completed" },
      { id: "p2", amount: 2575, dueDate: "2025-09-01", paidDate: "2025-09-02", status: "completed" },
      { id: "p3", amount: 2575, dueDate: "2025-10-01", paidDate: "2025-10-01", status: "completed" },
      { id: "p4", amount: 2575, dueDate: "2025-11-01", status: "pending" },
      { id: "p5", amount: 2575, dueDate: "2025-12-01", status: "pending" },
      { id: "p6", amount: 2575, dueDate: "2026-01-01", status: "pending" },
    ],
  },
  {
    id: "2",
    person: {
      name: "Raj Kumar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    totalAmount: 10000,
    paidAmount: 5100,
    remainingAmount: 4900,
    nextDueDate: "2025-10-15",
    monthlyPayment: 1700,
    status: "overdue",
    payments: [
      { id: "p1", amount: 1700, dueDate: "2025-07-15", paidDate: "2025-07-15", status: "completed" },
      { id: "p2", amount: 1700, dueDate: "2025-08-15", paidDate: "2025-08-16", status: "completed" },
      { id: "p3", amount: 1700, dueDate: "2025-09-15", paidDate: "2025-09-15", status: "completed" },
      { id: "p4", amount: 1700, dueDate: "2025-10-15", status: "overdue" },
      { id: "p5", amount: 1600, dueDate: "2025-11-15", status: "pending" },
    ],
  },
];

// Mock data for lender loans
const loansIGave: Loan[] = [
  {
    id: "3",
    person: {
      name: "Sneha Patel",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    totalAmount: 25000,
    paidAmount: 12500,
    remainingAmount: 12500,
    nextDueDate: "2025-11-01",
    monthlyPayment: 2083,
    status: "active",
    payments: [
      { id: "p1", amount: 2083, dueDate: "2025-05-01", paidDate: "2025-05-01", status: "completed" },
      { id: "p2", amount: 2083, dueDate: "2025-06-01", paidDate: "2025-06-01", status: "completed" },
      { id: "p3", amount: 2083, dueDate: "2025-07-01", paidDate: "2025-07-01", status: "completed" },
      { id: "p4", amount: 2083, dueDate: "2025-08-01", paidDate: "2025-08-01", status: "completed" },
      { id: "p5", amount: 2083, dueDate: "2025-09-01", paidDate: "2025-09-01", status: "completed" },
      { id: "p6", amount: 2083, dueDate: "2025-10-01", paidDate: "2025-10-01", status: "completed" },
      { id: "p7", amount: 2083, dueDate: "2025-11-01", status: "pending" },
      { id: "p8", amount: 2083, dueDate: "2025-12-01", status: "pending" },
      { id: "p9", amount: 2083, dueDate: "2026-01-01", status: "pending" },
      { id: "p10", amount: 2083, dueDate: "2026-02-01", status: "pending" },
      { id: "p11", amount: 2083, dueDate: "2026-03-01", status: "pending" },
      { id: "p12", amount: 2085, dueDate: "2026-04-01", status: "pending" },
    ],
  },
  {
    id: "4",
    person: {
      name: "Amit Singh",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop",
    },
    totalAmount: 8000,
    paidAmount: 8000,
    remainingAmount: 0,
    nextDueDate: "",
    monthlyPayment: 0,
    status: "completed",
    payments: [
      { id: "p1", amount: 2000, dueDate: "2025-06-01", paidDate: "2025-06-01", status: "completed" },
      { id: "p2", amount: 2000, dueDate: "2025-07-01", paidDate: "2025-07-01", status: "completed" },
      { id: "p3", amount: 2000, dueDate: "2025-08-01", paidDate: "2025-08-01", status: "completed" },
      { id: "p4", amount: 2000, dueDate: "2025-09-01", paidDate: "2025-09-01", status: "completed" },
    ],
  },
];

function LoanCard({
  loan,
  isBorrower,
  onPayNow,
}: {
  loan: Loan;
  isBorrower: boolean;
  onPayNow: (loan: Loan) => void;
}) {
  const [showTimeline, setShowTimeline] = useState(false);
  const progressPercentage = (loan.paidAmount / loan.totalAmount) * 100;
  const completedPayments = loan.payments.filter((p) => p.status === "completed").length;

  const statusConfig = {
    active: { color: "bg-blue-100 text-blue-700 border-blue-200", label: "Active" },
    completed: { color: "bg-green-100 text-green-700 border-green-200", label: "Completed" },
    overdue: { color: "bg-red-100 text-red-700 border-red-200", label: "Overdue" },
  };

  const config = statusConfig[loan.status];

  return (
    <Card className="border-2 hover:shadow-lg transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-12 border-2 border-white shadow-md">
              <AvatarImage src={loan.person.avatar} />
              <AvatarFallback>
                {loan.person.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-foreground">{loan.person.name}</h4>
              <p className="text-sm text-muted-foreground">
                {isBorrower ? "Lender" : "Borrower"}
              </p>
            </div>
          </div>
          <Badge className={`${config.color} border`}>{config.label}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Amount Info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Remaining</p>
            <p className="text-lg text-blue-600">
              ₹{loan.remainingAmount.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Total</p>
            <p className="text-lg text-foreground">
              ₹{loan.totalAmount.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Progress</p>
            <p className="text-sm text-foreground">
              {completedPayments}/{loan.payments.length} payments
            </p>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {Math.round(progressPercentage)}% completed
          </p>
        </div>

        {/* Next Due Date */}
        {loan.status !== "completed" && (
          <div className={`flex items-center justify-between p-3 rounded-lg ${
            loan.status === "overdue" ? "bg-red-50 border border-red-200" : "bg-blue-50 border border-blue-200"
          }`}>
            <div className="flex items-center gap-2">
              {loan.status === "overdue" ? (
                <AlertCircle className="size-5 text-red-600" />
              ) : (
                <Calendar className="size-5 text-blue-600" />
              )}
              <div>
                <p className="text-xs text-muted-foreground">Next Payment</p>
                <p className={`text-sm ${loan.status === "overdue" ? "text-red-700" : "text-foreground"}`}>
                  {new Date(loan.nextDueDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <p className={`${loan.status === "overdue" ? "text-red-700" : "text-blue-700"}`}>
              ₹{loan.monthlyPayment.toLocaleString("en-IN")}
            </p>
          </div>
        )}

        {/* Timeline Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowTimeline(!showTimeline)}
          className="w-full"
        >
          {showTimeline ? "Hide" : "View"} Payment Timeline
        </Button>

        {/* Payment Timeline */}
        {showTimeline && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 pt-2 border-t"
          >
            {loan.payments.map((payment, index) => (
              <div
                key={payment.id}
                className="flex items-start gap-3 relative"
              >
                {/* Timeline Line */}
                {index < loan.payments.length - 1 && (
                  <div className="absolute left-[11px] top-8 w-0.5 h-8 bg-slate-200" />
                )}

                {/* Status Icon */}
                <div className="shrink-0 mt-1">
                  {payment.status === "completed" ? (
                    <CheckCircle2 className="size-6 text-green-600" />
                  ) : payment.status === "overdue" ? (
                    <AlertCircle className="size-6 text-red-600" />
                  ) : (
                    <Circle className="size-6 text-slate-300" />
                  )}
                </div>

                {/* Payment Info */}
                <div className="flex-1 pb-3">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm ${
                      payment.status === "completed"
                        ? "text-foreground"
                        : payment.status === "overdue"
                        ? "text-red-700"
                        : "text-muted-foreground"
                    }`}>
                      ₹{payment.amount.toLocaleString("en-IN")}
                    </p>
                    {payment.status === "completed" && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                        Paid
                      </Badge>
                    )}
                    {payment.status === "overdue" && (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                        Overdue
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Due: {new Date(payment.dueDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  {payment.paidDate && (
                    <p className="text-xs text-green-600 mt-0.5">
                      Paid: {new Date(payment.paidDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Pay Now Button */}
        {isBorrower && loan.status !== "completed" && (
          <Button
            onClick={() => onPayNow(loan)}
            className={`w-full h-12 shadow-md ${
              loan.status === "overdue"
                ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-red-200/50"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-200/50"
            }`}
          >
            <CreditCard className="size-5 mr-2" />
            {loan.status === "overdue" ? "Pay Overdue Amount" : "Pay Now"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export function RepaymentTrackerScreen({ onBack }: RepaymentTrackerScreenProps) {
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [paymentAmount, setPaymentAmount] = useState("");

  const handlePayNow = (loan: Loan) => {
    setSelectedLoan(loan);
    setPaymentAmount(loan.monthlyPayment.toString());
  };

  const handlePaymentConfirm = () => {
    // Payment logic would go here
    setSelectedLoan(null);
    setPaymentAmount("");
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
            <h2 className="text-white">Repayment Tracker</h2>
            <p className="text-sm text-blue-100 mt-0.5">Track your loans and payments</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-6">
        <Tabs defaultValue="borrower" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="borrower">My Loans</TabsTrigger>
            <TabsTrigger value="lender">Loans I Gave</TabsTrigger>
          </TabsList>

          <TabsContent value="borrower" className="space-y-4">
            {myLoans.length > 0 ? (
              myLoans.map((loan) => (
                <LoanCard
                  key={loan.id}
                  loan={loan}
                  isBorrower={true}
                  onPayNow={handlePayNow}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No active loans as borrower</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="lender" className="space-y-4">
            {loansIGave.length > 0 ? (
              loansIGave.map((loan) => (
                <LoanCard
                  key={loan.id}
                  loan={loan}
                  isBorrower={false}
                  onPayNow={handlePayNow}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No active loans as lender</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Payment Dialog */}
      <Dialog open={!!selectedLoan} onOpenChange={() => setSelectedLoan(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Make Payment</DialogTitle>
            <DialogDescription>
              Pay your installment to {selectedLoan?.person.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Due Amount:</span>
                <span className="text-foreground">
                  ₹{selectedLoan?.monthlyPayment.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Due Date:</span>
                <span className="text-foreground">
                  {selectedLoan?.nextDueDate &&
                    new Date(selectedLoan.nextDueDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                </span>
              </div>
            </div>

            <div>
              <Label htmlFor="payment-amount">Payment Amount</Label>
              <Input
                id="payment-amount"
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="Enter amount"
                className="mt-2"
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setSelectedLoan(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePaymentConfirm}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                Confirm Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
