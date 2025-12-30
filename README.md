# Business Nexus Platform

A comprehensive business networking and collaboration platform connecting entrepreneurs and investors with advanced features for scheduling, communication, document processing, and payments.

## 📋 Overview

The Business Nexus Platform is designed to bridge the gap between entrepreneurs seeking funding and investors looking for promising opportunities. This platform provides a secure, efficient, and user-friendly environment where both parties can connect, collaborate, and conduct business seamlessly.

### Purpose
- **For Entrepreneurs**: Find potential investors, showcase business ideas, schedule meetings, and manage funding processes
- **For Investors**: Discover promising startups, evaluate investment opportunities, communicate with entrepreneurs, and manage investment portfolios
- **For Collaboration**: Secure document sharing, video conferencing, and payment processing for business deals

### Key Features
- **Meeting Scheduling**: Advanced calendar system for managing availability and scheduling meetings
- **Video Conferencing**: Integrated video calling for remote meetings and presentations
- **Document Management**: Secure document processing chamber with e-signature capabilities
- **Payment System**: Mock payment processing for investment transactions
- **Security**: Enhanced security features including password strength meter and 2FA
- **Responsive Design**: Fully responsive interface for all device types

## 👨‍💻 Created By

**Developer**: Imam Sanghaar Chandio  
**Roles**: Prompt Engineer, Web Developer, AI Engineer (Learner), Spec-Driven Developer, SpeckitPro Creator, Book Author

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **File Upload**: react-dropzone
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/           # Layout components (Navbar, Sidebar)
│   ├── ui/              # Reusable UI components
│   ├── chat/            # Chat components
│   ├── collaboration/   # Collaboration components
│   ├── entrepreneur/    # Entrepreneur-specific components
│   └── investor/        # Investor-specific components
├── pages/               # Page components
│   ├── auth/            # Authentication pages
│   ├── calendar/        # Calendar page
│   ├── videocall/       # Video call page
│   ├── documents/       # Document chamber page
│   ├── payment/         # Payment page
│   ├── security/        # Security page
│   ├── dashboard/       # Dashboard pages
│   ├── investors/       # Investor pages
│   ├── entrepreneurs/   # Entrepreneur pages
│   ├── messages/        # Message pages
│   ├── notifications/   # Notification pages
│   ├── settings/        # Settings pages
│   └── help/            # Help pages
├── context/             # React contexts
├── types/               # TypeScript type definitions
└── data/                # Sample data
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/imsanghaar/Nexus-new.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📋 API Endpoints

The application uses mock data for demonstration purposes. In a real implementation, these would connect to backend services:

- `/api/auth` - Authentication endpoints
- `/api/users` - User management
- `/api/calendar` - Calendar and scheduling
- `/api/video` - Video calling (WebRTC signaling)
- `/api/documents` - Document management
- `/api/payments` - Payment processing
- `/api/notifications` - Notifications

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 🚀 Deployment

The application is ready for deployment to platforms like Vercel, Netlify, or any static hosting service.

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Sanghaar** - Initial work and development

## 🐛 Issues

If you encounter any issues, please open an issue on the GitHub repository.

## 🆘 Support

For support, please open an issue on the GitHub repository.