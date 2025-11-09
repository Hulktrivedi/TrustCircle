import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { LoanRequestDetail } from "./LoanRequestDetail";

interface LenderReviewScreenProps {
  onBack: () => void;
}

export interface LoanRequest {
  id: string;
  borrower: {
    name: string;
    avatar: string;
    trustScore: number;
    loanHistory: {
      total: number;
      successful: number;
      onTime: number;
    };
  };
  amount: number;
  purpose: string;
  duration: number;
  proposedInterest: number;
  status: "pending" | "reviewed" | "approved" | "rejected";
  requestDate: string;
}

// Mock data for loan requests
const mockRequests: LoanRequest[] = [
  {
    id: "1",
    borrower: {
      name: "Rahul Verma",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
      trustScore: 850,
      loanHistory: {
        total: 5,
        successful: 5,
        onTime: 5,
      },
    },
    amount: 15000,
    purpose: "Medical Emergency",
    duration: 6,
    proposedInterest: 3.5,
    status: "pending",
    requestDate: "2025-10-10",
  },
  {
    id: "2",
    borrower: {
      name: "Sneha Patel",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      trustScore: 920,
      loanHistory: {
        total: 8,
        successful: 8,
        onTime: 7,
      },
    },
    amount: 25000,
    purpose: "Education",
    duration: 12,
    proposedInterest: 4.0,
    status: "pending",
    requestDate: "2025-10-09",
  },
  {
    id: "3",
    borrower: {
      name: "Amit Singh",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop",
      trustScore: 780,
      loanHistory: {
        total: 3,
        successful: 2,
        onTime: 2,
      },
    },
    amount: 10000,
    purpose: "Business Expansion",
    duration: 9,
    proposedInterest: 5.0,
    status: "reviewed",
    requestDate: "2025-10-08",
  },
  {
    id: "4",
    borrower: {
      name: "Pooja Reddy",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
      trustScore: 950,
      loanHistory: {
        total: 12,
        successful: 12,
        onTime: 12,
      },
    },
    amount: 30000,
    purpose: "Home Renovation",
    duration: 10,
    proposedInterest: 3.0,
    status: "approved",
    requestDate: "2025-10-07",
  },
];

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  reviewed: {
    label: "Reviewed",
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  approved: {
    label: "Approved",
    color: "bg-green-100 text-green-700 border-green-200",
  },
  rejected: {
    label: "Rejected",
    color: "bg-red-100 text-red-700 border-red-200",
  },
};

export function LenderReviewScreen({ onBack }: LenderReviewScreenProps) {
  const [selectedRequest, setSelectedRequest] = useState<LoanRequest | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [requests, setRequests] = useState(mockRequests);

  const filteredRequests = requests.filter((req) =>
    req.borrower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.purpose.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusUpdate = (requestId: string, newStatus: LoanRequest["status"]) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: newStatus } : req
      )
    );
    setSelectedRequest(null);
  };

  if (selectedRequest) {
    return (
      <LoanRequestDetail
        request={selectedRequest}
        onBack={() => setSelectedRequest(null)}
        onStatusUpdate={handleStatusUpdate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-6 py-6 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="size-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="size-5" />
          </button>
          <div>
            <h2 className="text-white">Loan Requests</h2>
            <p className="text-sm text-blue-100 mt-0.5">
              {filteredRequests.length} requests
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-blue-300" />
          <Input
            placeholder="Search by name or purpose"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:bg-white/15"
          />
        </div>
      </div>

      {/* Requests List */}
      <div className="px-6 py-6 space-y-3 max-w-md mx-auto">
        {filteredRequests.map((request) => {
          const config = statusConfig[request.status];
          return (
            <Card
              key={request.id}
              className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-blue-300"
              onClick={() => setSelectedRequest(request)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <Avatar className="size-14 border-2 border-white shadow-md">
                    <AvatarImage src={request.borrower.avatar} />
                    <AvatarFallback>
                      {request.borrower.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-foreground truncate">
                        {request.borrower.name}
                      </h4>
                      <Badge className={`${config.color} border shrink-0`}>
                        {config.label}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                      {request.purpose}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg text-blue-600">
                          ₹{request.amount.toLocaleString("en-IN")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {request.duration} months • {request.proposedInterest}% p.a.
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <div className="size-2 rounded-full bg-green-500" />
                          <p className="text-sm text-foreground">
                            {request.borrower.trustScore}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Trust Score
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No requests found</p>
          </div>
        )}
      </div>
    </div>
  );
}
