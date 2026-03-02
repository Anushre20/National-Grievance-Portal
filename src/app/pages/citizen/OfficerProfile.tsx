import { useNavigate, useParams } from "react-router";
import { Shield, ArrowLeft, Star, Award, Phone, Mail, Building2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { useApp } from "../../context/AppContext";
import AIChatbot from "../../components/AIChatbot";
import { motion } from "motion/react";

export default function OfficerProfile() {
  const { officerId } = useParams();
  const navigate = useNavigate();
  const { officers, complaints } = useApp();

  const officer = officers.find(o => o.id === officerId);
  const officerComplaints = complaints.filter(c => c.assignedOfficerId === officerId);

  if (!officer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Officer Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/citizen")}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">Officer Profile</h1>
              <p className="text-xs opacity-90">Government Official Details</p>
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
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Photo */}
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={officer.photo} alt={officer.name} />
                    <AvatarFallback className="text-3xl">
                      {officer.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold mb-1">{officer.name}</h2>
                        <p className="text-gray-600 mb-2">{officer.designation}</p>
                        <Badge className="bg-blue-100 text-blue-800">
                          <Building2 className="w-3 h-3 mr-1" />
                          Government Official
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-yellow-500 mb-1">
                          <Star className="w-5 h-5 fill-yellow-500" />
                          <span className="font-semibold text-lg">{officer.rating.toFixed(1)}</span>
                        </div>
                        <p className="text-xs text-gray-600">Officer Rating</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{officer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{officer.phone}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Ministry</p>
                      <p className="font-medium">{officer.ministryName}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600">Total Resolved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Award className="w-8 h-8 text-green-600" />
                  <span className="text-3xl font-bold">{officer.totalResolved}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600">Average Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                  <span className="text-3xl font-bold">{officer.rating.toFixed(1)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600">Active Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Shield className="w-8 h-8 text-blue-600" />
                  <span className="text-3xl font-bold">
                    {officerComplaints.filter(c => c.status !== "resolved").length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-700">Resolution Rate</span>
                  <span className="font-semibold">94%</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-700">Average Response Time</span>
                  <span className="font-semibold">4.2 hours</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-700">Citizen Satisfaction</span>
                  <span className="font-semibold">4.5/5.0</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-700">Years of Service</span>
                  <span className="font-semibold">8 years</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-500" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">by Ramesh Kumar</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Excellent service! The officer was very responsive and resolved my complaint within 5 days.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-500">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-500" />
                      ))}
                      <Star className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-gray-600">by Priya Sharma</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Good communication throughout the process. Issue was resolved satisfactorily.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-500" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">by Amit Patel</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Very professional and efficient. Kept me updated at every step.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot userRole="citizen" />
    </div>
  );
}
