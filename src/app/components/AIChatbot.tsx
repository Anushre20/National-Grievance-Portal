import { useState } from "react";
import { Bot, Mic, X, Upload, FileText, Minimize2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import { motion, AnimatePresence } from "motion/react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIChatbotProps {
  userRole: "citizen" | "officer" | "ministry";
}

export default function AIChatbot({ userRole }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hello! I'm your AI assistant. I can help you with:
• Explaining the grievance process
• Answering FAQs
• Analyzing uploaded documents
• Providing guidance and support

How can I assist you today?`,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(inputMessage, userRole),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);

    setInputMessage("");
  };

  const getAIResponse = (query: string, role: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("how") && lowerQuery.includes("register")) {
      return "To register a grievance:\n1. Click 'Register Grievance'\n2. Select the relevant ministry\n3. Choose a category\n4. Describe your issue\n5. Upload supporting documents\n6. Submit to receive a unique complaint ID";
    }

    if (lowerQuery.includes("track")) {
      return "You can track your complaint using the unique Complaint ID provided after registration. The status will show: Submitted → Assigned → In Progress → Resolved";
    }

    if (lowerQuery.includes("officer") || lowerQuery.includes("contact")) {
      return "Once your complaint is assigned, you'll be able to see the officer's profile and contact them directly through the built-in chat system.";
    }

    if (lowerQuery.includes("resolve") || lowerQuery.includes("time")) {
      return "Complaints are typically resolved within 15-30 days. High urgency complaints are prioritized. Officers must acknowledge complaints within 24 hours.";
    }

    if (role === "officer") {
      if (lowerQuery.includes("priority") || lowerQuery.includes("urgent")) {
        return "High urgency complaints should be addressed first. Older complaints appear at the top to ensure FIFO resolution. Update status regularly to keep citizens informed.";
      }
      if (lowerQuery.includes("pdf") || lowerQuery.includes("document")) {
        return "I can analyze uploaded PDFs for you. Key points will be extracted: complaint summary, citizen details, urgency level, and recommended actions. Upload a document to get started.";
      }
    }

    return `I understand you're asking about "${query}". ${role === "citizen" ? "For detailed assistance, please contact the relevant ministry or check the FAQ section." : "For specific queries, please refer to the officer handbook or escalate to your supervisor."}`;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: `📄 Uploaded: ${file.name}`,
      timestamp: new Date(),
    };

    setMessages([...messages, uploadMessage]);

    // Simulate PDF analysis
    setTimeout(() => {
      const analysisMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `📊 Document Analysis Complete

**Summary:**
This document contains a grievance regarding infrastructure issues in the specified area.

**Key Points:**
• Issue Type: Road maintenance
• Location: MG Road, Sector 14
• Urgency: High
• Supporting Evidence: Photos attached

**Recommended Actions:**
1. Assign to relevant department
2. Conduct site inspection
3. Provide timeline to citizen

🔊 Playing audio summary...`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, analysisMessage]);
    }, 2000);
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      const voiceMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: "🎤 Listening... Speak now.",
        timestamp: new Date(),
      };
      setMessages([...messages, voiceMessage]);

      setTimeout(() => {
        setIsListening(false);
        const transcriptMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "user",
          content: "How do I track my complaint?",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, transcriptMessage]);

        setTimeout(() => {
          const responseMessage: ChatMessage = {
            id: (Date.now() + 2).toString(),
            role: "assistant",
            content: getAIResponse("track complaint", userRole),
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, responseMessage]);
        }, 1000);
      }, 3000);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "60px" : "500px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 bg-white border border-gray-300 rounded-lg shadow-2xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <div>
                  <div className="font-semibold">AI Assistant</div>
                  <div className="text-xs opacity-90">Always here to help</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-white hover:bg-blue-700"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-white hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Chat Area */}
            {!isMinimized && (
              <>
                <ScrollArea className="h-80 p-4 bg-gray-50">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.role === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-white border border-gray-200"
                          }`}
                        >
                          <div className="text-sm whitespace-pre-line">{msg.content}</div>
                          <div className={`text-xs mt-1 ${msg.role === "user" ? "text-blue-100" : "text-gray-500"}`}>
                            {msg.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex gap-2 mb-2">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <Button size="sm" variant="outline" className="gap-2" asChild>
                        <span>
                          <Upload className="w-4 h-4" />
                          PDF
                        </span>
                      </Button>
                    </label>
                    <Button
                      size="sm"
                      variant={isListening ? "destructive" : "outline"}
                      className="gap-2"
                      onClick={handleVoiceToggle}
                    >
                      <Mic className="w-4 h-4" />
                      {isListening ? "Stop" : "Voice"}
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>Send</Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:shadow-xl transition-shadow"
        >
          <Bot className="w-7 h-7" />
        </motion.button>
      )}
    </>
  );
}
