import { useState } from "react";
import { useNavigate } from "react-router";
import { Shield, User, Building2, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useApp } from "../context/AppContext";
import { motion } from "motion/react";
import TopPerformers from "../components/TopPerformers";

export default function LandingPage() {
  const navigate = useNavigate();
  const { setCurrentUser } = useApp();
  const [citizenEmail, setCitizenEmail] = useState("");
  const [citizenName, setCitizenName] = useState("");
  const [officerEmail, setOfficerEmail] = useState("");
  const [ministryName, setMinistryName] = useState("");

  const handleCitizenLogin = (isSignup: boolean) => {
    if (isSignup && citizenName) {
      setCurrentUser({ id: "c" + Date.now(), name: citizenName, role: "citizen" });
      navigate("/citizen");
    } else if (!isSignup && citizenEmail) {
      setCurrentUser({ id: "c1", name: "Arjun Mehta", role: "citizen" });
      navigate("/citizen");
    }
  };

  const handleOfficerLogin = () => {
    if (officerEmail) {
      setCurrentUser({ id: "o1", name: "Rajesh Kumar", role: "officer" });
      navigate("/officer");
    }
  };

  const handleMinistryLogin = () => {
    if (ministryName) {
      setCurrentUser({ id: "m1", name: ministryName, role: "ministry" });
      navigate("/ministry");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="w-10 h-10" />
              <div className="absolute inset-0 bg-orange-500 opacity-20 blur-sm rounded-full"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">National Grievance Portal</h1>
              <p className="text-sm opacity-90">Government of India | जन शिकायत पोर्टल</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm">Helpline: 1800-11-9000</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full mb-4">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Trusted by 50+ Crore Citizens</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Voice Matters
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A secure, transparent platform for citizens to register grievances and track resolution in real-time
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="text-center border-t-4 border-t-green-500">
            <CardHeader>
              <CardTitle className="text-3xl text-green-600">2.5 Cr+</CardTitle>
              <CardDescription>Grievances Resolved</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle className="text-3xl text-blue-600">87%</CardTitle>
              <CardDescription>Resolution Rate</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-t-4 border-t-purple-500">
            <CardHeader>
              <CardTitle className="text-3xl text-purple-600">15 Days</CardTitle>
              <CardDescription>Average Resolution Time</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-t-4 border-t-orange-500">
            <CardHeader>
              <CardTitle className="text-3xl text-orange-600">24 Hrs</CardTitle>
              <CardDescription>Officer Assignment</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Authentication Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <Tabs defaultValue="citizen" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="citizen" className="gap-2">
                <User className="w-4 h-4" />
                Citizen
              </TabsTrigger>
              <TabsTrigger value="officer" className="gap-2">
                <Shield className="w-4 h-4" />
                Officer
              </TabsTrigger>
              <TabsTrigger value="ministry" className="gap-2">
                <Building2 className="w-4 h-4" />
                Ministry
              </TabsTrigger>
            </TabsList>

            {/* Citizen Tab */}
            <TabsContent value="citizen">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle>Citizen Login</CardTitle>
                    <CardDescription>Access your dashboard and track complaints</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="citizen-email">Email / Mobile Number</Label>
                      <Input
                        id="citizen-email"
                        type="text"
                        placeholder="Enter email or mobile"
                        value={citizenEmail}
                        onChange={(e) => setCitizenEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="citizen-password">Password</Label>
                      <Input id="citizen-password" type="password" placeholder="Enter password" />
                    </div>
                    <Button className="w-full gap-2" onClick={() => handleCitizenLogin(false)}>
                      Login
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle>New Citizen Registration</CardTitle>
                    <CardDescription>Create an account to register your first grievance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="citizen-name">Full Name</Label>
                      <Input
                        id="citizen-name"
                        type="text"
                        placeholder="As per Aadhaar"
                        value={citizenName}
                        onChange={(e) => setCitizenName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="citizen-mobile">Mobile Number</Label>
                      <Input id="citizen-mobile" type="tel" placeholder="10-digit mobile" />
                    </div>
                    <Button className="w-full gap-2 bg-green-600 hover:bg-green-700" onClick={() => handleCitizenLogin(true)}>
                      Sign Up
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Officer Tab */}
            <TabsContent value="officer">
              <Card className="max-w-md mx-auto border-2 border-blue-300">
                <CardHeader>
                  <CardTitle>Officer Login</CardTitle>
                  <CardDescription>Secure access for government officials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="officer-email">Official Email ID</Label>
                    <Input
                      id="officer-email"
                      type="email"
                      placeholder="officer@gov.in"
                      value={officerEmail}
                      onChange={(e) => setOfficerEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="officer-password">Password</Label>
                    <Input id="officer-password" type="password" placeholder="Enter password" />
                  </div>
                  <div>
                    <Label htmlFor="officer-otp">OTP (Sent to registered mobile)</Label>
                    <Input id="officer-otp" type="text" placeholder="6-digit OTP" />
                  </div>
                  <Button className="w-full gap-2" onClick={handleOfficerLogin}>
                    Secure Login
                    <Shield className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Ministry Tab */}
            <TabsContent value="ministry">
              <Card className="max-w-md mx-auto border-2 border-purple-300">
                <CardHeader>
                  <CardTitle>Ministry / Government Body</CardTitle>
                  <CardDescription>Register or access ministry portal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="ministry-name">Ministry / Department Name</Label>
                    <Input
                      id="ministry-name"
                      type="text"
                      placeholder="e.g., Ministry of Road Transport"
                      value={ministryName}
                      onChange={(e) => setMinistryName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ministry-code">Ministry Code</Label>
                    <Input id="ministry-code" type="text" placeholder="Official ministry code" />
                  </div>
                  <div>
                    <Label htmlFor="ministry-auth">Authorization Key</Label>
                    <Input id="ministry-auth" type="password" placeholder="Secure key" />
                  </div>
                  <Button className="w-full gap-2 bg-purple-600 hover:bg-purple-700" onClick={handleMinistryLogin}>
                    Access Registry
                    <Building2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </section>

      {/* Features */}
      <section className="bg-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-8">Platform Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Secure & Transparent</h4>
              <p className="text-sm text-gray-600">End-to-end encrypted grievance tracking</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">AI-Powered Assistance</h4>
              <p className="text-sm text-gray-600">24/7 chatbot support in multiple languages</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Direct Communication</h4>
              <p className="text-sm text-gray-600">Chat directly with assigned officers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Performers */}
      <TopPerformers />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-75">
            © 2026 Government of India. All Rights Reserved. | National Informatics Centre (NIC)
          </p>
          <p className="text-xs opacity-50 mt-2">
            Best viewed in Chrome, Firefox, Safari • Last updated: February 28, 2026
          </p>
        </div>
      </footer>
    </div>
  );
}