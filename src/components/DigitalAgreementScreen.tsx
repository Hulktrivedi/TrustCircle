import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, FileText, CheckCircle2, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { SignaturePad } from "./SignaturePad";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";

interface DigitalAgreementScreenProps {
  onBack: () => void;
}

// Mock loan agreement data
const agreementData = {
  agreementId: "TC-2025-001234",
  date: "October 11, 2025",
  borrower: {
    name: "Rahul Verma",
    address: "123 MG Road, Bangalore, Karnataka 560001",
    phone: "+91 98765 43210",
  },
  lender: {
    name: "Priya Sharma",
    address: "456 Park Street, Mumbai, Maharashtra 400001",
    phone: "+91 98765 12345",
  },
  loanAmount: 15000,
  interestRate: 3.5,
  duration: 6,
  monthlyPayment: 2575,
  startDate: "November 1, 2025",
  endDate: "April 30, 2026",
  purpose: "Medical Emergency",
};

export function DigitalAgreementScreen({ onBack }: DigitalAgreementScreenProps) {
  const [showSignature, setShowSignature] = useState(false);
  const [borrowerSignature, setBorrowerSignature] = useState("");
  const [lenderSignature, setLenderSignature] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (borrowerSignature && lenderSignature) {
      setShowSignature(false);
      setShowSuccess(true);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onBack();
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="size-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="size-5 text-slate-700" />
          </button>
          <div>
            <h2 className="text-slate-900">Loan Agreement</h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Agreement ID: {agreementData.agreementId}
            </p>
          </div>
        </div>
      </div>

      {/* Contract Preview */}
      <div className="px-6 py-8 max-w-4xl mx-auto">
        <Card className="bg-white shadow-lg border-2 border-slate-200 relative overflow-hidden">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <svg
              width="300"
              height="300"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="2" />
              <path
                d="M25 38L30 33C31 32 32.5 32 33.5 33L40 39.5L46.5 33C47.5 32 49 32 50 33L55 38"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M25 38V45C25 46 25.5 47 26.5 47H32"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M55 38V45C55 46 54.5 47 53.5 47H48"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="40" cy="39.5" r="3" fill="currentColor" />
            </svg>
          </div>

          <CardContent className="p-8 md:p-12 relative">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <FileText className="size-8 text-blue-600" />
                <h1 className="text-slate-900">LOAN AGREEMENT</h1>
              </div>
              <p className="text-slate-600">
                This agreement is made on <span className="text-slate-900">{agreementData.date}</span>
              </p>
            </div>

            <Separator className="my-6" />

            {/* Parties */}
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-slate-900 mb-3">BETWEEN</h3>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-slate-900">
                    <span className="text-slate-600">Lender:</span> {agreementData.lender.name}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">{agreementData.lender.address}</p>
                  <p className="text-sm text-slate-600">{agreementData.lender.phone}</p>
                </div>
              </div>

              <div>
                <h3 className="text-slate-900 mb-3">AND</h3>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-slate-900">
                    <span className="text-slate-600">Borrower:</span> {agreementData.borrower.name}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">{agreementData.borrower.address}</p>
                  <p className="text-sm text-slate-600">{agreementData.borrower.phone}</p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Loan Terms */}
            <div className="space-y-4 mb-8">
              <h3 className="text-slate-900">LOAN TERMS</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-slate-600 mb-1">Principal Amount</p>
                  <p className="text-2xl text-blue-600">
                    ₹{agreementData.loanAmount.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">Interest Rate</p>
                  <p className="text-2xl text-slate-900">{agreementData.interestRate}% p.a.</p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">Loan Duration</p>
                  <p className="text-2xl text-slate-900">{agreementData.duration} months</p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">Monthly Payment</p>
                  <p className="text-2xl text-slate-900">
                    ₹{agreementData.monthlyPayment.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <p className="text-sm text-slate-600 mb-1">Purpose</p>
                <p className="text-slate-900">{agreementData.purpose}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">Repayment Start Date</p>
                  <p className="text-slate-900">{agreementData.startDate}</p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">Final Payment Date</p>
                  <p className="text-slate-900">{agreementData.endDate}</p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Terms & Conditions */}
            <div className="mb-8">
              <h3 className="text-slate-900 mb-3">TERMS & CONDITIONS</h3>
              <div className="space-y-2 text-slate-600 text-sm">
                <p>
                  <span className="text-slate-900">1. Repayment:</span> The Borrower agrees to repay
                  the loan amount in {agreementData.duration} equal monthly installments of ₹
                  {agreementData.monthlyPayment.toLocaleString("en-IN")}.
                </p>
                <p>
                  <span className="text-slate-900">2. Interest:</span> Interest will be calculated at
                  {agreementData.interestRate}% per annum on the outstanding principal amount.
                </p>
                <p>
                  <span className="text-slate-900">3. Late Payment:</span> A late fee of 2% may be
                  charged on payments not received within 5 days of the due date.
                </p>
                <p>
                  <span className="text-slate-900">4. Prepayment:</span> The Borrower may prepay the
                  loan in full or in part at any time without penalty.
                </p>
                <p>
                  <span className="text-slate-900">5. Default:</span> Failure to make payments for 30
                  days will constitute default, and the full amount may become due immediately.
                </p>
                <p>
                  <span className="text-slate-900">6. Governing Law:</span> This agreement shall be
                  governed by the laws of India.
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Signature Section */}
            <div className="space-y-6">
              <h3 className="text-slate-900">SIGNATURES</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-2">
                    <p className="text-sm text-slate-600">Lender Signature</p>
                    <p className="text-slate-900">{agreementData.lender.name}</p>
                  </div>
                  {lenderSignature ? (
                    <div className="border-2 border-slate-300 rounded-lg p-2 bg-slate-50">
                      <img src={lenderSignature} alt="Lender signature" className="h-24 w-full object-contain" />
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 bg-slate-50 h-28 flex items-center justify-center">
                      <p className="text-slate-400 text-sm">Pending signature</p>
                    </div>
                  )}
                </div>

                <div>
                  <div className="mb-2">
                    <p className="text-sm text-slate-600">Borrower Signature</p>
                    <p className="text-slate-900">{agreementData.borrower.name}</p>
                  </div>
                  {borrowerSignature ? (
                    <div className="border-2 border-slate-300 rounded-lg p-2 bg-slate-50">
                      <img src={borrowerSignature} alt="Borrower signature" className="h-24 w-full object-contain" />
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 bg-slate-50 h-28 flex items-center justify-center">
                      <p className="text-slate-400 text-sm">Pending signature</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3 max-w-md mx-auto">
          <Button
            onClick={() => setShowSignature(true)}
            size="lg"
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
          >
            <FileText className="size-5 mr-2" />
            Review & Sign Agreement
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full h-14 border-2"
          >
            <Download className="size-5 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Signature Dialog */}
      <Dialog open={showSignature} onOpenChange={setShowSignature}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Sign the Agreement</DialogTitle>
            <DialogDescription>
              Please sign below to confirm your agreement to the loan terms.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-6 pr-4">
              <SignaturePad
                label="Lender Signature"
                onSave={setLenderSignature}
              />

              <SignaturePad
                label="Borrower Signature"
                onSave={setBorrowerSignature}
              />

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-slate-700">
                  By signing this document, both parties agree to the terms and conditions
                  outlined in the loan agreement. This digital signature is legally binding.
                </p>
              </div>
            </div>
          </ScrollArea>

          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowSignature(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!borrowerSignature || !lenderSignature}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              Submit Agreement
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle2 className="size-8 text-green-600" />
              </motion.div>
            </div>
            <DialogTitle className="text-center">Agreement Finalized!</DialogTitle>
            <DialogDescription className="text-center">
              The loan agreement has been successfully signed and submitted. Both parties
              will receive a copy via email.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-slate-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Agreement ID:</span>
              <span className="text-slate-900">{agreementData.agreementId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Amount:</span>
              <span className="text-slate-900">₹{agreementData.loanAmount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Status:</span>
              <span className="text-green-600">Active</span>
            </div>
          </div>

          <Button
            onClick={handleSuccessClose}
            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            Back to Dashboard
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
