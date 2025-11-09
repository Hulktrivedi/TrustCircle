import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  IndianRupee,
  FileText,
  Clock,
  Percent,
  User,
  Send,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Card, CardContent } from "./ui/card";

interface LoanRequestScreenProps {
  onBack: () => void;
}

// Mock lender data
const lenders = [
  {
    id: "1",
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    trustScore: 920,
  },
  {
    id: "2",
    name: "Raj Kumar",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    trustScore: 880,
  },
  {
    id: "3",
    name: "Anita Desai",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    trustScore: 950,
  },
  {
    id: "4",
    name: "Vikram Singh",
    avatar: "https://images.unsplash.com/photo-1500648067791-00dcc994a43e?w=100&h=100&fit=crop",
    trustScore: 890,
  },
];

const loanPurposes = [
  "Medical Emergency",
  "Education",
  "Business Expansion",
  "Home Renovation",
  "Debt Consolidation",
  "Wedding Expenses",
  "Vehicle Purchase",
  "Other",
];

export function LoanRequestScreen({ onBack }: LoanRequestScreenProps) {
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [customPurpose, setCustomPurpose] = useState("");
  const [duration, setDuration] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [selectedLender, setSelectedLender] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const selectedLenderData = lenders.find((l) => l.id === selectedLender);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    // Reset form
    setAmount("");
    setPurpose("");
    setCustomPurpose("");
    setDuration("");
    setInterestRate("");
    setSelectedLender("");
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
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
            <h2 className="text-white">Request Loan</h2>
            <p className="text-sm text-blue-100 mt-0.5">Fill in the details below</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 py-6 pb-8">
        <div className="space-y-5 max-w-md mx-auto">
          {/* Amount */}
          <div>
            <Label htmlFor="amount" className="text-foreground mb-2 block">
              Loan Amount
            </Label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <IndianRupee className="size-5" />
              </div>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-20 h-14 text-lg border-2 bg-white"
                required
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Maximum: ₹50,000
            </p>
          </div>

          {/* Purpose */}
          <div>
            <Label htmlFor="purpose" className="text-foreground mb-2 block">
              Purpose
            </Label>
            <div className="relative">
              <div className="absolute left-4 top-[18px] size-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 z-10">
                <FileText className="size-5" />
              </div>
              <Select value={purpose} onValueChange={setPurpose} required>
                <SelectTrigger className="pl-20 h-14 text-lg border-2 bg-white">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  {loanPurposes.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {purpose === "Other" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3"
              >
                <Textarea
                  placeholder="Please specify the purpose"
                  value={customPurpose}
                  onChange={(e) => setCustomPurpose(e.target.value)}
                  className="border-2 bg-white min-h-20"
                  required
                />
              </motion.div>
            )}
          </div>

          {/* Duration */}
          <div>
            <Label htmlFor="duration" className="text-foreground mb-2 block">
              Duration
            </Label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <Clock className="size-5" />
              </div>
              <Input
                id="duration"
                type="number"
                placeholder="Enter duration in months"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="pl-20 h-14 text-lg border-2 bg-white"
                required
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Repayment period (1-12 months)
            </p>
          </div>

          {/* Interest Rate */}
          <div>
            <Label htmlFor="interest" className="text-foreground mb-2 block">
              Preferred Interest Rate
            </Label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Percent className="size-5" />
              </div>
              <Input
                id="interest"
                type="number"
                step="0.1"
                placeholder="Enter rate per annum"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="pl-20 h-14 text-lg border-2 bg-white"
                required
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Suggested: 2-5% per annum
            </p>
          </div>

          {/* Select Lender */}
          <div>
            <Label className="text-foreground mb-2 block">Select Lender</Label>
            <div className="space-y-2">
              {lenders.map((lender) => (
                <Card
                  key={lender.id}
                  className={`cursor-pointer transition-all ${
                    selectedLender === lender.id
                      ? "border-2 border-blue-500 bg-blue-50/50"
                      : "border-2 border-transparent hover:border-blue-200"
                  }`}
                  onClick={() => setSelectedLender(lender.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="size-12 border-2 border-white shadow-md">
                          <AvatarImage src={lender.avatar} />
                          <AvatarFallback>
                            {lender.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 size-5 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="size-3 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground">{lender.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Trust Score: {lender.trustScore}/1000
                        </p>
                      </div>
                      {selectedLender === lender.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="size-6 rounded-full bg-blue-600 flex items-center justify-center"
                        >
                          <svg
                            className="size-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-200/50 mt-8"
            disabled={!selectedLender}
          >
            <Send className="size-5 mr-2" />
            Submit Request
          </Button>
        </div>
      </form>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <svg
                  className="size-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
            </div>
            <DialogTitle className="text-center">Request Sent!</DialogTitle>
            <DialogDescription className="text-center">
              Your loan request has been sent to{" "}
              <span className="text-foreground">{selectedLenderData?.name}</span>.
              They will review and respond shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 mt-4">
            <div className="bg-slate-50 rounded-lg p-3 flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="text-foreground">₹{amount}</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 flex justify-between">
              <span className="text-muted-foreground">Duration:</span>
              <span className="text-foreground">{duration} months</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 flex justify-between">
              <span className="text-muted-foreground">Interest Rate:</span>
              <span className="text-foreground">{interestRate}% p.a.</span>
            </div>
          </div>
          <Button
            onClick={handleConfirmationClose}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            Back to Dashboard
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
