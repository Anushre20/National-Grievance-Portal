# National Grievance Redressal Platform

A high-fidelity, government-grade digital grievance redressal system inspired by India's CPGRAMS and Central Vigilance Commission (CVC) Complaint Management System.

## Features

### 🔐 Three-Role Authentication System

#### 1. **Citizen Interface**
- **Register Grievance**: Multi-step form with ministry selection, category tagging, and document upload
- **Track Complaints**: Real-time status tracking with visual timeline (Submitted → Assigned → In Progress → Resolved)
- **Direct Communication**: Built-in chat system to message assigned officers
- **Officer Transparency**: View officer profiles and ratings
- **AI Assistance**: 24/7 chatbot with text + voice support, PDF analysis, and FAQs

#### 2. **Officer Interface**
- **Dashboard**: View all assigned complaints with FIFO ordering (oldest first)
- **Complaint Management**: Update status, add notes, upload resolution proof
- **Filtering**: Search and filter by status, urgency, and keywords
- **Officer-Citizen Chat**: Direct messaging with citizens
- **AI Assistant**: Document analysis, resolution suggestions, and guidance
- **Auto-assignment Logic**: Complaints must be assigned within 24 hours

#### 3. **Ministry/Government Body Interface**
- **Central Registry**: Searchable directory of all ministries and departments
- **Public Directory**: Accessible to both citizens and officers
- **Category Management**: Each ministry has defined categories and jurisdictions
- **Contact Information**: Helpline numbers and escalation levels

### 🤖 Universal AI Chatbot

Available to all user roles:
- **Text + Voice Interaction**: Speak or type queries
- **PDF Upload & Analysis**: Upload documents to get summaries, key points, and voice explanations
- **Context-Aware Responses**: Tailored to user role (citizen/officer/ministry)
- **24/7 Availability**: Always accessible on every page.

### 🎨 Design Principles

- **Government-Grade UI**: Clean, minimal, and trustworthy design
- **CPGRAMS-Inspired**: Follows Indian government portal conventions
- **Accessibility-First**: Neutral colors, clear typography, structured layouts
- **Responsive**: Works on desktop and mobile devices
- **Status Indicators**: Clear visual feedback at every stage

## Key Screens

1. **Landing Page** - Role-based authentication (Citizen/Officer/Ministry)
2. **Citizen Dashboard** - Overview of complaints and quick actions
3. **Register Grievance** - 3-step form (Ministry → Details → Documents)
4. **Track Complaint** - Visual timeline with status updates
5. **Citizen-Officer Chat** - Real-time messaging
6. **Officer Dashboard** - Complaint management with filters
7. **Complaint Detail** - Full complaint view with action buttons
8. **Officer Profile** - Ratings, reviews, and performance metrics
9. **Ministry Registry** - Searchable government directory

## Technical Stack

- **React** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Motion** (Framer Motion) for animations
- **Lucide React** for icons
- **Sonner** for notifications
- **Radix UI** for accessible components

## Mock Data

The application includes realistic mock data:
- 6 Government Ministries
- 4 Government Officers
- 3 Sample Complaints
- Message history
- Performance metrics

## Usage

### As a Citizen:
1. Click "Citizen Login/Sign Up" on the landing page
2. Register a new grievance or view existing complaints
3. Track status, chat with officers, view profiles

### As an Officer:
1. Click "Officer Login"
2. View dashboard with assigned complaints (oldest first)
3. Update status, chat with citizens, upload resolution proof

### As Ministry:
1. Click "Ministry/Government Body"
2. Browse the central registry of all government bodies
3. Search by ministry name or category

## Security & Trust Features

- Unique Complaint IDs
- Officer assignment tracking
- 24-hour assignment requirement
- Resolution proof upload
- Officer rating system
- Complete audit trail

---

Built with ❤️ for transparent, efficient, and citizen-first governance.<br>
Built by : Anupama, Mahima Kumari and Anoushka Gupta

