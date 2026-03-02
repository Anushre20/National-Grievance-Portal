import { useState } from "react";
import { useNavigate } from "react-router";
import { Shield, LogOut, AlertCircle, Clock, Filter, Search } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useApp } from "../../context/AppContext";
import AIChatbot from "../../components/AIChatbot";
import { motion } from "motion/react";
import TopPerformers from "../../components/TopPerformers";

export default function OfficerDashboard() {
  const navigate = useNavigate();
  const { currentUser, complaints, setCurrentUser } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");

  // Get officer's assigned complaints (sorted with oldest first - FIFO)
  const officerComplaints = complaints
    .filter(c => c.assignedOfficerId === currentUser?.id)
    .sort((a, b) => a.submittedAt.getTime() - b.submittedAt.getTime());

  const filteredComplaints = officerComplaints.filter(c => {
    const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.citizenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    const matchesUrgency = urgencyFilter === "all" || c.urgency === urgencyFilter;
    return matchesSearch && matchesStatus && matchesUrgency;
  });

  const stats = {
    total: officerComplaints.length,
    pending: officerComplaints.filter(c => c.status === "submitted" || c.status === "assigned").length,
    inProgress: officerComplaints.filter(c => c.status === "in-progress").length,
    resolved: officerComplaints.filter(c => c.status === "resolved").length,
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
        return "border-red-500 text-red-700 bg-red-50";
      case "medium":
        return "border-yellow-500 text-yellow-700 bg-yellow-50";
      case "low":
        return "border-blue-500 text-blue-700 bg-blue-50";
      default:
        return "border-gray-500 text-gray-700";
    }
  };

  const getDaysAgo = (date: Date) => {
    const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    return days === 0 ? "Today" : days === 1 ? "1 day ago" : `${days} days ago`;
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
              <h1 className="text-xl font-bold">Officer Dashboard</h1>
              <p className="text-xs opacity-90">Complaint Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-medium">{currentUser?.name}</div>
              <div className="text-xs opacity-75">Section Officer</div>
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Assigned</CardDescription>
                <CardTitle className="text-3xl">{stats.total}</CardTitle>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Pending Action</CardDescription>
                <CardTitle className="text-3xl text-yellow-600">{stats.pending}</CardTitle>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>In Progress</CardDescription>
                <CardTitle className="text-3xl text-purple-600">{stats.inProgress}</CardTitle>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Resolved</CardDescription>
                <CardTitle className="text-3xl text-green-600">{stats.resolved}</CardTitle>
              </CardHeader>
            </Card>
          </motion.div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by ID, citizen name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger>
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Complaints List */}
        <Card>
          <CardHeader>
            <CardTitle>Assigned Complaints</CardTitle>
            <CardDescription>
              Showing {filteredComplaints.length} complaint(s) • Oldest complaints appear first
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredComplaints.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Complaints Found</h3>
                <p className="text-gray-600">
                  {searchQuery || statusFilter !== "all" || urgencyFilter !== "all"
                    ? "Try adjusting your filters"
                    : "No complaints assigned yet"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredComplaints.map((complaint, index) => (
                  <motion.div
                    key={complaint.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-lg">{complaint.id}</span>
                          <Badge className={getStatusColor(complaint.status)}>
                            {complaint.status.replace("-", " ").toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className={getUrgencyColor(complaint.urgency)}>
                            {complaint.urgency.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span>{complaint.citizenName}</span>
                          <span>•</span>
                          <span>{complaint.location}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {getDaysAgo(complaint.submittedAt)}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline">{complaint.category}</Badge>
                    </div>

                    <p className="text-gray-800 mb-3">{complaint.description}</p>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => navigate(`/officer/complaint/${complaint.id}`)}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/officer/chat/${complaint.id}`)}
                      >
                        Chat with Citizen
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Chatbot */}
      <AIChatbot userRole="officer" />
      {/* Top Performers */}
      <TopPerformers />
    </div>
  );
}