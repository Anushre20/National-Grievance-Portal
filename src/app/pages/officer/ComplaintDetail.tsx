import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Shield, ArrowLeft, Upload, CheckCircle, AlertCircle, FileText, User, MapPin } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useApp } from "../../context/AppContext";
import AIChatbot from "../../components/AIChatbot";
import { toast } from "sonner";
import { motion } from "motion/react";

export default function ComplaintDetail() {
  const { complaintId } = useParams();
  const navigate = useNavigate();
  const { complaints, updateComplaint } = useApp();
  const [notes, setNotes] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const complaint = complaints.find(c => c.id === complaintId);

  if (!complaint) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Complaint Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/officer")}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleUpdateStatus = () => {
    if (!newStatus) {
      toast.error("Please select a status");
      return;
    }

    updateComplaint(complaint.id, { status: newStatus as any });
    toast.success("Status updated successfully");
    setNewStatus("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-yellow-100 text-yellow-800";
      case "assigned":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-purple-100 text-purple-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "border-red-500 text-red-700";
      case "medium":
        return "border-yellow-500 text-yellow-700";
      case "low":
        return "border-blue-500 text-blue-700";
      default:
        return "border-gray-500 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">Complaint Details</h1>
              <p className="text-xs opacity-90">{complaint.id}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={() => navigate("/officer")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Complaint Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status & Priority */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Current Status</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(complaint.status)}>
                        {complaint.status.replace("-", " ").toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className={getUrgencyColor(complaint.urgency)}>
                        {complaint.urgency.toUpperCase()} PRIORITY
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Complaint Details */}
            <Card>
              <CardHeader>
                <CardTitle>Complaint Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Complaint ID</p>
                    <p className="font-semibold">{complaint.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Category</p>
                    <p className="font-semibold">{complaint.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Submitted On</p>
                    <p className="font-semibold">{complaint.submittedAt.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Last Updated</p>
                    <p className="font-semibold">{complaint.updatedAt.toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Description</p>
                  <p className="text-gray-800 bg-gray-50 p-4 rounded-lg">{complaint.description}</p>
                </div>

                {complaint.documents.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Supporting Documents</p>
                    <div className="space-y-2">
                      {complaint.documents.map((doc, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <span className="flex-1">{doc}</span>
                          <Button size="sm" variant="outline">View</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Update Status */}
            <Card>
              <CardHeader>
                <CardTitle>Update Complaint Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select new status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="assigned">Assigned - Acknowledged</SelectItem>
                      <SelectItem value="in-progress">In Progress - Working on it</SelectItem>
                      <SelectItem value="resolved">Resolved - Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Textarea
                    placeholder="Add notes or comments (optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button className="w-full" onClick={handleUpdateStatus}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Update Status
                </Button>
              </CardContent>
            </Card>

            {/* Resolution Proof */}
            {complaint.status === "in-progress" && (
              <Card>
                <CardHeader>
                  <CardTitle>Upload Resolution Proof</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-4">
                      Upload photos or documents showing resolution
                    </p>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Citizen Info & Actions */}
          <div className="space-y-6">
            {/* Citizen Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Citizen Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold">{complaint.citizenName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-sm">{complaint.citizenEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold">{complaint.citizenPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Location</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                    <p className="font-semibold text-sm">{complaint.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => navigate(`/officer/chat/${complaint.id}`)}
                >
                  Chat with Citizen
                </Button>
                <Button className="w-full" variant="outline">
                  Schedule Site Visit
                </Button>
                <Button className="w-full" variant="outline">
                  Request Additional Info
                </Button>
                <Button className="w-full" variant="outline">
                  Escalate to Supervisor
                </Button>
              </CardContent>
            </Card>

            {/* AI Suggestions */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  AI Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-blue-900 space-y-2">
                  <li>• Similar complaint resolved in 7 days</li>
                  <li>• Contact local PWD department</li>
                  <li>• Site inspection recommended</li>
                  <li>• Expected resolution: 10-15 days</li>
                </ul>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                    <div>
                      <p className="font-medium">Complaint Updated</p>
                      <p className="text-gray-600 text-xs">{complaint.updatedAt.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                    <div>
                      <p className="font-medium">Assigned to Officer</p>
                      <p className="text-gray-600 text-xs">{complaint.submittedAt.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mt-1.5"></div>
                    <div>
                      <p className="font-medium">Complaint Registered</p>
                      <p className="text-gray-600 text-xs">{complaint.submittedAt.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot userRole="officer" />
    </div>
  );
}
