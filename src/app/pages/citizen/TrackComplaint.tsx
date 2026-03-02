import { useNavigate, useParams } from "react-router";
import { Shield, ArrowLeft, CheckCircle, Clock, FileText, MessageSquare, User } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { useApp } from "../../context/AppContext";
import AIChatbot from "../../components/AIChatbot";
import { motion } from "motion/react";

export default function TrackComplaint() {
  const { complaintId } = useParams();
  const navigate = useNavigate();
  const { complaints } = useApp();

  const complaint = complaints.find(c => c.id === complaintId);

  if (!complaint) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Complaint Not Found</CardTitle>
            <CardDescription>The complaint ID you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/citizen")}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusSteps = [
    { status: "submitted", label: "Submitted", icon: FileText, completed: true },
    { status: "assigned", label: "Assigned to Officer", icon: User, completed: complaint.status !== "submitted" },
    { status: "in-progress", label: "In Progress", icon: Clock, completed: complaint.status === "in-progress" || complaint.status === "resolved" },
    { status: "resolved", label: "Resolved", icon: CheckCircle, completed: complaint.status === "resolved" },
  ];

  const currentStepIndex = statusSteps.findIndex(s => s.status === complaint.status);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">Track Complaint</h1>
              <p className="text-xs opacity-90">{complaint.id}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={() => navigate("/citizen")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Status Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Complaint Status</CardTitle>
              <CardDescription>Track the progress of your grievance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

                {/* Status Steps */}
                <div className="space-y-8">
                  {statusSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === currentStepIndex;
                    const isPast = index < currentStepIndex;
                    const isFuture = index > currentStepIndex;

                    return (
                      <motion.div
                        key={step.status}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative flex items-center gap-4"
                      >
                        {/* Icon */}
                        <div
                          className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${
                            isPast || isActive
                              ? "bg-green-600 text-white"
                              : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          <Icon className="w-8 h-8" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3
                              className={`font-semibold ${
                                isPast || isActive ? "text-gray-900" : "text-gray-400"
                              }`}
                            >
                              {step.label}
                            </h3>
                            {isActive && (
                              <Badge className="bg-blue-100 text-blue-800">Current</Badge>
                            )}
                            {isPast && (
                              <Badge className="bg-green-100 text-green-800">Completed</Badge>
                            )}
                          </div>
                          <p
                            className={`text-sm ${
                              isPast || isActive ? "text-gray-600" : "text-gray-400"
                            }`}
                          >
                            {step.status === "submitted" &&
                              `Submitted on ${complaint.submittedAt.toLocaleDateString()}`}
                            {step.status === "assigned" &&
                              (complaint.assignedOfficerName
                                ? `Assigned to ${complaint.assignedOfficerName}`
                                : "Waiting for officer assignment")}
                            {step.status === "in-progress" &&
                              (complaint.status === "in-progress"
                                ? "Officer is working on your complaint"
                                : "Pending action")}
                            {step.status === "resolved" &&
                              (complaint.status === "resolved"
                                ? "Your complaint has been resolved"
                                : "Awaiting resolution")}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Complaint Details */}
          <Card>
            <CardHeader>
              <CardTitle>Complaint Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Complaint ID</p>
                  <p className="font-semibold">{complaint.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ministry</p>
                  <p className="font-semibold">{complaint.ministryName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-semibold">{complaint.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold">{complaint.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Urgency</p>
                  <Badge
                    variant="outline"
                    className={
                      complaint.urgency === "high"
                        ? "border-red-500 text-red-700"
                        : complaint.urgency === "medium"
                        ? "border-yellow-500 text-yellow-700"
                        : "border-blue-500 text-blue-700"
                    }
                  >
                    {complaint.urgency.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="font-semibold">{complaint.updatedAt.toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Description</p>
                <p className="text-gray-800">{complaint.description}</p>
              </div>

              {complaint.documents.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Attached Documents</p>
                  <div className="space-y-2">
                    {complaint.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Officer Information */}
          {complaint.assignedOfficerId && (
            <Card>
              <CardHeader>
                <CardTitle>Assigned Officer</CardTitle>
                <CardDescription>Contact officer for updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-lg">{complaint.assignedOfficerName}</p>
                    <p className="text-sm text-gray-600">{complaint.ministryName}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/citizen/officer/${complaint.assignedOfficerId}`)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                    <Button onClick={() => navigate(`/citizen/chat/${complaint.id}`)}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resolution */}
          {complaint.status === "resolved" && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-6 h-6" />
                  <CardTitle>Complaint Resolved</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Your complaint has been successfully resolved. Please rate the officer's service.
                </p>
                <Button className="bg-green-600 hover:bg-green-700">
                  Rate Officer
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot userRole="citizen" />
    </div>
  );
}
