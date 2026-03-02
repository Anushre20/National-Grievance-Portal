import { useState } from "react";
import { useNavigate } from "react-router";
import { Shield, Plus, FileText, Clock, CheckCircle, AlertCircle, LogOut, User } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { useApp } from "../../context/AppContext";
import AIChatbot from "../../components/AIChatbot";
import { motion } from "motion/react";
import TopPerformers from "../../components/TopPerformers";

export default function CitizenDashboard() {
  const navigate = useNavigate();
  const { currentUser, complaints, setCurrentUser } = useApp();
  
  const myComplaints = complaints.filter(c => c.citizenId === currentUser?.id);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="w-4 h-4" />;
      case "assigned":
        return <FileText className="w-4 h-4" />;
      case "in-progress":
        return <AlertCircle className="w-4 h-4" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
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

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">National Grievance Portal</h1>
              <p className="text-xs opacity-90">Citizen Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-medium">{currentUser?.name}</div>
              <div className="text-xs opacity-75">Citizen ID: {currentUser?.id}</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white border-0">
            <CardHeader>
              <CardTitle className="text-white">Welcome, {currentUser?.name}!</CardTitle>
              <CardDescription className="text-green-100">
                Register a new grievance or track existing complaints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                size="lg"
                className="bg-white text-green-700 hover:bg-gray-100 gap-2"
                onClick={() => navigate("/citizen/register")}
              >
                <Plus className="w-5 h-5" />
                Register New Grievance
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Complaints</CardDescription>
              <CardTitle className="text-3xl">{myComplaints.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>In Progress</CardDescription>
              <CardTitle className="text-3xl text-purple-600">
                {myComplaints.filter(c => c.status === "in-progress").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Resolved</CardDescription>
              <CardTitle className="text-3xl text-green-600">
                {myComplaints.filter(c => c.status === "resolved").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-3xl text-yellow-600">
                {myComplaints.filter(c => c.status === "submitted").length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* My Complaints */}
        <Card>
          <CardHeader>
            <CardTitle>My Grievances</CardTitle>
            <CardDescription>Track and manage your registered complaints</CardDescription>
          </CardHeader>
          <CardContent>
            {myComplaints.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Grievances Yet</h3>
                <p className="text-gray-600 mb-4">Start by registering your first complaint</p>
                <Button onClick={() => navigate("/citizen/register")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Register Grievance
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {myComplaints.map((complaint) => (
                  <motion.div
                    key={complaint.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-lg">{complaint.id}</span>
                          <Badge className={getStatusColor(complaint.status)}>
                            {getStatusIcon(complaint.status)}
                            <span className="ml-1 capitalize">{complaint.status.replace("-", " ")}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{complaint.ministryName}</p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {complaint.category}
                      </Badge>
                    </div>

                    <p className="text-gray-800 mb-3">{complaint.description}</p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-600">
                        <span>Submitted: {complaint.submittedAt.toLocaleDateString()}</span>
                        {complaint.assignedOfficerName && (
                          <span className="ml-4">Officer: {complaint.assignedOfficerName}</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {complaint.assignedOfficerId && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => navigate(`/citizen/officer/${complaint.assignedOfficerId}`)}
                            >
                              <User className="w-4 h-4 mr-1" />
                              View Officer
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => navigate(`/citizen/chat/${complaint.id}`)}
                            >
                              Chat
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          onClick={() => navigate(`/citizen/track/${complaint.id}`)}
                        >
                          Track Status
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Chatbot */}
      <AIChatbot userRole="citizen" />
      <TopPerformers />
    </div>
  );
}