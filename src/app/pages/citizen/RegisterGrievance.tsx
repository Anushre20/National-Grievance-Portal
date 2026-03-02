import { useState } from "react";
import { useNavigate } from "react-router";
import { Shield, ArrowLeft, Upload, FileText, CheckCircle2, Search } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useApp } from "../../context/AppContext";
import AIChatbot from "../../components/AIChatbot";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function RegisterGrievance() {
  const navigate = useNavigate();
  const { currentUser, ministries, addComplaint, officers } = useApp();
  const [step, setStep] = useState(1);
  const [generatedId, setGeneratedId] = useState("");

  // Form data
  const [selectedMinistry, setSelectedMinistry] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState<"low" | "medium" | "high">("medium");
  const [documents, setDocuments] = useState<File[]>([]);
  const [searchMinistry, setSearchMinistry] = useState("");

  const filteredMinistries = ministries.filter(m =>
    m.name.toLowerCase().includes(searchMinistry.toLowerCase())
  );

  const selectedMinistryData = ministries.find(m => m.id === selectedMinistry);
  const categories = selectedMinistryData?.categories || [];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setDocuments([...documents, ...files]);
  };

  const handleSubmit = () => {
    if (!selectedMinistry || !category || !description || !location) {
      toast.error("Please fill in all required fields");
      return;
    }

    const complaintId = `GRV2026${String(Math.floor(Math.random() * 900000) + 100000)}`;
    const assignedOfficer = officers.find(o => o.ministryId === selectedMinistry);

    const newComplaint = {
      id: complaintId,
      citizenId: currentUser!.id,
      citizenName: currentUser!.name,
      citizenEmail: "citizen@email.com",
      citizenPhone: "9123456789",
      ministryId: selectedMinistry,
      ministryName: selectedMinistryData!.name,
      category,
      description,
      documents: documents.map(d => d.name),
      status: "submitted" as const,
      assignedOfficerId: assignedOfficer?.id,
      assignedOfficerName: assignedOfficer?.name,
      submittedAt: new Date(),
      updatedAt: new Date(),
      location,
      urgency,
    };

    addComplaint(newComplaint);
    setGeneratedId(complaintId);
    setStep(4);
    toast.success("Grievance registered successfully!");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <CardHeader>
              <CardTitle>Step 1: Select Ministry / Department</CardTitle>
              <CardDescription>Choose the government body relevant to your grievance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="search-ministry">Search Ministry</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="search-ministry"
                    placeholder="Type to search..."
                    value={searchMinistry}
                    onChange={(e) => setSearchMinistry(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredMinistries.map((ministry) => (
                  <div
                    key={ministry.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedMinistry === ministry.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setSelectedMinistry(ministry.id)}
                  >
                    <div className="font-medium">{ministry.name}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Jurisdiction: {ministry.jurisdiction} • Contact: {ministry.contact}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {ministry.categories.slice(0, 3).map((cat) => (
                        <span
                          key={cat}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                className="w-full"
                onClick={() => setStep(2)}
                disabled={!selectedMinistry}
              >
                Continue
              </Button>
            </CardContent>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <CardHeader>
              <CardTitle>Step 2: Category & Details</CardTitle>
              <CardDescription>Provide information about your grievance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="City, State"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="urgency">Urgency Level *</Label>
                <Select value={urgency} onValueChange={(v) => setUrgency(v as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Can wait 30+ days</SelectItem>
                    <SelectItem value="medium">Medium - 15-30 days</SelectItem>
                    <SelectItem value="high">High - Immediate attention required</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Complaint Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your grievance in detail..."
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 50 characters. Be specific and provide all relevant details.
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => setStep(3)}
                  disabled={!category || !description || !location}
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <CardHeader>
              <CardTitle>Step 3: Upload Documents</CardTitle>
              <CardDescription>Add supporting evidence (optional)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-4">
                  Upload photos, PDFs, or documents (Max 5MB each)
                </p>
                <label htmlFor="file-upload">
                  <Button variant="outline" asChild>
                    <span>Choose Files</span>
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>

              {documents.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files:</Label>
                  {documents.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-sm flex-1">{file.name}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setDocuments(documents.filter((_, i) => i !== idx))}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button className="flex-1" onClick={handleSubmit}>
                  Submit Grievance
                </Button>
              </div>
            </CardContent>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Grievance Registered Successfully!</CardTitle>
              <CardDescription>Your complaint has been submitted to the relevant authority</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-600 mb-2">Your Complaint ID</p>
                <p className="text-3xl font-bold text-blue-700 mb-2">{generatedId}</p>
                <p className="text-xs text-gray-500">
                  Save this ID for tracking your complaint
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Ministry:</span>
                  <span className="font-medium">{selectedMinistryData?.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{category}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{location}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-yellow-600">Submitted</span>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  ⚠️ An officer will be assigned within 24 hours. You'll receive updates via SMS and email.
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/citizen")}
                >
                  Go to Dashboard
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => navigate(`/citizen/track/${generatedId}`)}
                >
                  Track Complaint
                </Button>
              </div>
            </CardContent>
          </motion.div>
        );

      default:
        return null;
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
              <h1 className="text-xl font-bold">Register Grievance</h1>
              <p className="text-xs opacity-90">National Grievance Portal</p>
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

      {/* Progress Steps */}
      {step < 4 && (
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      step >= s
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-20 h-1 mx-2 ${
                        step > s ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between max-w-2xl mx-auto mt-2 text-xs text-gray-600">
              <span>Ministry</span>
              <span>Details</span>
              <span>Documents</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Form */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>{renderStep()}</Card>
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot userRole="citizen" />
    </div>
  );
}
