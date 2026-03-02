import { useState } from "react";
import { useNavigate } from "react-router";
import { Shield, ArrowLeft, Building2, Search, Phone, Mail } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { useApp } from "../../context/AppContext";
import AIChatbot from "../../components/AIChatbot";
import { motion } from "motion/react";

export default function MinistryRegistry() {
  const navigate = useNavigate();
  const { ministries, currentUser, setCurrentUser } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMinistries = ministries.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.categories.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
              <h1 className="text-xl font-bold">Ministry Registry</h1>
              <p className="text-xs opacity-90">Central Government Bodies Directory</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {currentUser && (
              <>
                <div className="text-right">
                  <div className="text-sm font-medium">{currentUser.name}</div>
                  <div className="text-xs opacity-75">Ministry Administrator</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
            {!currentUser && (
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Search Ministries & Departments</CardTitle>
                <CardDescription>
                  Find the right government body for your grievance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search by ministry name or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 text-lg h-12"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Ministries</CardDescription>
                <CardTitle className="text-3xl">{ministries.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Categories</CardDescription>
                <CardTitle className="text-3xl">
                  {new Set(ministries.flatMap(m => m.categories)).size}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Escalation Levels</CardDescription>
                <CardTitle className="text-3xl">3</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Ministry List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">
              {searchQuery ? `Search Results (${filteredMinistries.length})` : "All Ministries"}
            </h2>

            {filteredMinistries.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Ministries Found</h3>
                  <p className="text-gray-600">Try adjusting your search query</p>
                </CardContent>
              </Card>
            ) : (
              filteredMinistries.map((ministry, index) => (
                <motion.div
                  key={ministry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-6">
                        {/* Icon */}
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-8 h-8 text-white" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold mb-1">{ministry.name}</h3>
                              <p className="text-sm text-gray-600">
                                Jurisdiction: {ministry.jurisdiction}
                              </p>
                            </div>
                            <Badge variant="outline" className="ml-4">
                              Level {ministry.escalationLevel}
                            </Badge>
                          </div>

                          {/* Categories */}
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                              Handles Categories:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {ministry.categories.map((category) => (
                                <Badge
                                  key={category}
                                  variant="secondary"
                                  className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                                >
                                  {category}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Contact */}
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Phone className="w-4 h-4" />
                              <span className="font-medium">Helpline: {ministry.contact}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <Mail className="w-4 h-4" />
                              <span>contact@{ministry.id}.gov.in</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          {/* Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">About Escalation Levels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-blue-900">
                  <p>
                    <strong>Level 1:</strong> Standard government departments handling routine
                    public services
                  </p>
                  <p>
                    <strong>Level 2:</strong> Security and law enforcement agencies requiring
                    immediate attention
                  </p>
                  <p>
                    <strong>Level 3:</strong> Anti-corruption and vigilance bodies with highest
                    priority
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot userRole="ministry" />
    </div>
  );
}
