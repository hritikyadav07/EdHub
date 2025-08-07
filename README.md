# 🎓 EdHub – Create & Sell Online Courses  

EdHub is a modern **course creation and selling platform** that allows **instructors** to create and sell their courses seamlessly. This platform provides an intuitive UI for course creation, pricing, and publishing.  

🚀 **Status:** In Development - Frontend ✅ Backend ✅ Integration ⚠️  
📖 **Documentation:** [API Integration Status](./docs/api-integration-status.md)  

---

## 🌟 Features  

### ✅ **For Students**  
- **Browse Courses** – Explore courses with advanced filtering and search
- **Course Details** – View detailed course information with previews
- **Secure Enrollment** – Enroll in courses with authentication
- **Learning Dashboard** – Track progress and manage enrolled courses  
- **User Profile** – Manage account settings and preferences

### ✅ **For Instructors (Course Creators)**  
- **Easy Course Creation** – Create comprehensive courses with lessons
- **Course Management** – Update and manage existing courses  
- **Student Analytics** – Track enrollment and course performance
- **Instructor Dashboard** – Manage all courses from one place

### ✅ **Admin Panel**  
- **User Management** – Manage students, instructors, and roles
- **Course Approval** – Review and approve new courses  
- **Analytics Dashboard** – Monitor platform statistics and performance
- **System Administration** – Configure platform settings

### 🚧 **Coming Soon**
- **Payment Integration** – Stripe/PayPal for course purchases
- **Certificate Generation** – Issue certificates upon completion
- **Video Streaming** – Secure video hosting and streaming
- **Discussion Forums** – Course-specific discussion boards

---

## 💻 Tech Stack  

### **Frontend**  
- **React** – Modern UI library with hooks
- **React Router** – Client-side routing
- **Framer Motion** – Smooth animations and transitions
- **Tailwind CSS** – Utility-first CSS framework
- **Vite** – Fast build tool and development server

### **Backend**  
- **Node.js & Express.js** – REST API server
- **MongoDB** – NoSQL database for flexible data storage
- **Mongoose** – MongoDB object modeling
- **JWT** – Authentication and authorization
- **bcryptjs** – Password hashing

### **Development Tools**
- **Hot Module Replacement** – Fast development experience
- **ESLint** – Code linting and formatting
- **Environment Configuration** – Secure environment variable management

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EdHub
   ```

2. **Install backend dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Backend (.env in Backend folder):
   ```env
   MONGO_URI=mongodb://localhost:27017/edhub
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   FRONTEND_URL=http://localhost:5173
   PORT=5000
   ```

   Frontend (.env in frontend folder):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start Development Servers**
   
   **Option 1: Using startup scripts**
   ```bash
   # Windows
   start-dev.bat
   
   # Linux/Mac
   chmod +x start-dev.sh
   ./start-dev.sh
   ```

   **Option 2: Manual start**
   ```bash
   # Terminal 1 - Backend
   cd Backend
   npm start
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

---

## 🔧 API Integration Status

### ✅ Working Endpoints
- Authentication (login, register, logout)
- Course management (CRUD operations)
- User enrollment in courses
- Admin dashboard statistics

### ⚠️ Known Issues
- Course listing endpoint has pagination issues
- Some response formats need standardization

### ❌ Missing Endpoints
- User profile management
- Course reviews and ratings  
- Notification system
- Payment integration
- Advanced search and filtering

For detailed API documentation, see [API Integration Status](./docs/api-integration-status.md)

---

## � Project Structure

```
EdHub/
├── Backend/                 # Node.js/Express API server
│   ├── controller/         # Route controllers
│   ├── middleware/         # Authentication & validation
│   ├── model/             # MongoDB models
│   ├── routes/            # API routes
│   └── docs/              # Backend documentation
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages/routes  
│   │   ├── context/       # React context providers
│   │   ├── services/      # API service layer
│   │   └── assets/        # Static assets
│   └── public/            # Public static files
├── docs/                  # Project documentation
└── start-dev.*           # Development startup scripts
```

---

## 🧪 Testing

### Test Accounts
```
Admin Account:
Email: admin@edhub.com
Password: password123

Student Account:  
Email: student@edhub.com
Password: password123
```

### API Testing
- Use Postman or similar tool to test API endpoints
- Refer to backend route files for endpoint details
- Authentication required for protected routes

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📋 Development Roadmap

### Phase 1: Core Features ✅
- [x] Basic authentication system
- [x] Course creation and management
- [x] User enrollment system  
- [x] Admin dashboard
- [x] Responsive UI design

### Phase 2: Enhanced Features 🚧
- [ ] Payment integration
- [ ] Course progress tracking
- [ ] Certificate generation
- [ ] User profile management
- [ ] Search and filtering

### Phase 3: Advanced Features 📋
- [ ] Video streaming platform
- [ ] Discussion forums
- [ ] Mobile application
- [ ] Advanced analytics
- [ ] Multi-language support

---

## 🐛 Known Issues

1. Course listing API returns inconsistent data format
2. Some frontend components need error boundary implementation
3. Mobile responsiveness needs testing on various devices
4. Performance optimization needed for large course lists

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support & Contact

- **Issues:** Create an issue in this repository
- **Documentation:** Check the `/docs` folder for detailed guides
- **API Status:** See [API Integration Status](./docs/api-integration-status.md)

---

**Happy Learning! 🎓**  


