import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Shield, ArrowLeft, Send, Paperclip } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { useApp } from "../../context/AppContext";
import AIChatbot from "../../components/AIChatbot";

export default function OfficerChat() {
  const { complaintId } = useParams();
  const navigate = useNavigate();
  const { complaints, messages, addMessage, currentUser } = useApp();
  const [newMessage, setNewMessage] = useState("");

  const complaint = complaints.find(c => c.id === complaintId);
  const chatMessages = messages.filter(m => m.complaintId === complaintId);

  if (!complaint) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Chat Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/officer")}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: `msg${Date.now()}`,
      complaintId: complaintId!,
      senderId: currentUser!.id,
      senderRole: "officer" as const,
      senderName: currentUser!.name,
      message: newMessage,
      timestamp: new Date(),
    };

    addMessage(message);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">Chat with Citizen</h1>
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
            Back
          </Button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          {/* Citizen Info */}
          <Card className="mb-4">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-green-600 text-white">
                    {complaint.citizenName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{complaint.citizenName}</p>
                  <p className="text-sm text-gray-600">{complaint.location}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/officer/complaint/${complaint.id}`)}
                >
                  View Complaint
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle>Conversation</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 pr-4 mb-4">
                <div className="space-y-4">
                  {chatMessages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>No messages yet. Start the conversation with the citizen.</p>
                    </div>
                  ) : (
                    chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.senderRole === "officer" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-4 ${
                            msg.senderRole === "officer"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm font-medium mb-1">{msg.senderName}</p>
                          <p className="text-sm">{msg.message}</p>
                          <p
                            className={`text-xs mt-2 ${
                              msg.senderRole === "officer" ? "text-blue-100" : "text-gray-500"
                            }`}
                          >
                            {msg.timestamp.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot userRole="officer" />
    </div>
  );
}
