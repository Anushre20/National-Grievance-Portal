import { createContext, useContext, useState, ReactNode } from "react";

// Types
export interface Complaint {
  id: string;
  citizenId: string;
  citizenName: string;
  citizenEmail: string;
  citizenPhone: string;
  ministryId: string;
  ministryName: string;
  category: string;
  description: string;
  documents: string[];
  status: "submitted" | "assigned" | "in-progress" | "resolved";
  assignedOfficerId?: string;
  assignedOfficerName?: string;
  submittedAt: Date;
  updatedAt: Date;
  resolutionProof?: string;
  rating?: number;
  location: string;
  urgency: "low" | "medium" | "high";
}

export interface Officer {
  id: string;
  name: string;
  email: string;
  phone: string;
  ministryId: string;
  ministryName: string;
  designation: string;
  photo: string;
  rating: number;
  totalResolved: number;
}

export interface Ministry {
  id: string;
  name: string;
  jurisdiction: string;
  categories: string[];
  contact: string;
  escalationLevel: number;
}

export interface Message {
  id: string;
  complaintId: string;
  senderId: string;
  senderRole: "citizen" | "officer";
  senderName: string;
  message: string;
  timestamp: Date;
}

interface AppContextType {
  currentUser: { id: string; name: string; role: "citizen" | "officer" | "ministry" } | null;
  setCurrentUser: (user: { id: string; name: string; role: "citizen" | "officer" | "ministry" } | null) => void;
  complaints: Complaint[];
  addComplaint: (complaint: Complaint) => void;
  updateComplaint: (id: string, updates: Partial<Complaint>) => void;
  officers: Officer[];
  ministries: Ministry[];
  messages: Message[];
  addMessage: (message: Message) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockMinistries: Ministry[] = [
  {
    id: "m1",
    name: "Ministry of Road Transport and Highways",
    jurisdiction: "National",
    categories: ["Roads", "Highways", "Traffic", "Road Safety"],
    contact: "1800-111-555",
    escalationLevel: 1,
  },
  {
    id: "m2",
    name: "Ministry of Power",
    jurisdiction: "National",
    categories: ["Electricity", "Power Supply", "Billing", "Load Shedding"],
    contact: "1912",
    escalationLevel: 1,
  },
  {
    id: "m3",
    name: "Ministry of Jal Shakti (Water Resources)",
    jurisdiction: "National",
    categories: ["Water Supply", "Drainage", "Sanitation", "Water Quality"],
    contact: "1800-180-1551",
    escalationLevel: 1,
  },
  {
    id: "m4",
    name: "Ministry of Home Affairs",
    jurisdiction: "National",
    categories: ["Police", "Safety", "Crime", "Emergency"],
    contact: "100",
    escalationLevel: 2,
  },
  {
    id: "m5",
    name: "Central Vigilance Commission",
    jurisdiction: "National",
    categories: ["Corruption", "Bribery", "Malpractice", "Financial Irregularities"],
    contact: "1800-11-9000",
    escalationLevel: 3,
  },
  {
    id: "m6",
    name: "Ministry of Health and Family Welfare",
    jurisdiction: "National",
    categories: ["Healthcare", "Medical Services", "Sanitation", "Public Health"],
    contact: "1800-180-1104",
    escalationLevel: 1,
  },
];

const mockOfficers: Officer[] = [
  {
    id: "o1",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@gov.in",
    phone: "9876543210",
    ministryId: "m1",
    ministryName: "Ministry of Road Transport and Highways",
    designation: "Section Officer",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    rating: 4.5,
    totalResolved: 156,
  },
  {
    id: "o2",
    name: "Priya Sharma",
    email: "priya.sharma@gov.in",
    phone: "9876543211",
    ministryId: "m2",
    ministryName: "Ministry of Power",
    designation: "Assistant Director",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    rating: 4.8,
    totalResolved: 203,
  },
  {
    id: "o3",
    name: "Amit Verma",
    email: "amit.verma@gov.in",
    phone: "9876543212",
    ministryId: "m3",
    ministryName: "Ministry of Jal Shakti (Water Resources)",
    designation: "Deputy Secretary",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    rating: 4.3,
    totalResolved: 178,
  },
  {
    id: "o4",
    name: "Sneha Patel",
    email: "sneha.patel@gov.in",
    phone: "9876543213",
    ministryId: "m5",
    ministryName: "Central Vigilance Commission",
    designation: "Investigation Officer",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    rating: 4.9,
    totalResolved: 89,
  },
  {
    id: "o5",
    name: "Vikram Singh",
    email: "vikram.singh@gov.in",
    phone: "9876543214",
    ministryId: "m6",
    ministryName: "Ministry of Health and Family Welfare",
    designation: "Chief Medical Officer",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    rating: 4.7,
    totalResolved: 245,
  },
  {
    id: "o6",
    name: "Meera Nair",
    email: "meera.nair@gov.in",
    phone: "9876543215",
    ministryId: "m4",
    ministryName: "Ministry of Home Affairs",
    designation: "Senior Inspector",
    photo: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400",
    rating: 4.6,
    totalResolved: 198,
  },
];

const mockComplaints: Complaint[] = [
  {
    id: "GRV2026001234",
    citizenId: "c1",
    citizenName: "Arjun Mehta",
    citizenEmail: "arjun.mehta@email.com",
    citizenPhone: "9123456789",
    ministryId: "m1",
    ministryName: "Ministry of Road Transport and Highways",
    category: "Roads",
    description: "There is a large pothole on MG Road causing accidents. Immediate repair required.",
    documents: [],
    status: "in-progress",
    assignedOfficerId: "o1",
    assignedOfficerName: "Rajesh Kumar",
    submittedAt: new Date("2026-02-25T10:30:00"),
    updatedAt: new Date("2026-02-26T14:20:00"),
    location: "Mumbai, Maharashtra",
    urgency: "high",
  },
  {
    id: "GRV2026001235",
    citizenId: "c2",
    citizenName: "Kavita Singh",
    citizenEmail: "kavita.singh@email.com",
    citizenPhone: "9123456790",
    ministryId: "m2",
    ministryName: "Ministry of Power",
    category: "Electricity",
    description: "Power outage in our area for the past 3 days. No response from local electricity board.",
    documents: [],
    status: "assigned",
    assignedOfficerId: "o2",
    assignedOfficerName: "Priya Sharma",
    submittedAt: new Date("2026-02-26T08:15:00"),
    updatedAt: new Date("2026-02-27T09:00:00"),
    location: "Delhi",
    urgency: "high",
  },
  {
    id: "GRV2026001236",
    citizenId: "c3",
    citizenName: "Rohit Desai",
    citizenEmail: "rohit.desai@email.com",
    citizenPhone: "9123456791",
    ministryId: "m3",
    ministryName: "Ministry of Jal Shakti (Water Resources)",
    category: "Water Supply",
    description: "Irregular water supply in our colony. Water comes only once in 3 days.",
    documents: [],
    status: "submitted",
    submittedAt: new Date("2026-02-27T16:45:00"),
    updatedAt: new Date("2026-02-27T16:45:00"),
    location: "Bangalore, Karnataka",
    urgency: "medium",
  },
];

const mockMessages: Message[] = [
  {
    id: "msg1",
    complaintId: "GRV2026001234",
    senderId: "c1",
    senderRole: "citizen",
    senderName: "Arjun Mehta",
    message: "When will this be resolved? It's been 3 days.",
    timestamp: new Date("2026-02-26T10:00:00"),
  },
  {
    id: "msg2",
    complaintId: "GRV2026001234",
    senderId: "o1",
    senderRole: "officer",
    senderName: "Rajesh Kumar",
    message: "Dear citizen, repair work has been scheduled for tomorrow. We apologize for the inconvenience.",
    timestamp: new Date("2026-02-26T14:20:00"),
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; role: "citizen" | "officer" | "ministry" } | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const addComplaint = (complaint: Complaint) => {
    setComplaints([...complaints, complaint]);
  };

  const updateComplaint = (id: string, updates: Partial<Complaint>) => {
    setComplaints(complaints.map(c => c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c));
  };

  const addMessage = (message: Message) => {
    setMessages([...messages, message]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        complaints,
        addComplaint,
        updateComplaint,
        officers: mockOfficers,
        ministries: mockMinistries,
        messages,
        addMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}