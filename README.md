# Legal Draft Pro 📋⚖️

> An AI-powered legal document generation platform that helps lawyers, law students, and legal assistants create professional legal drafts efficiently.

![Legal Draft Pro](https://img.shields.io/badge/Legal%20Draft%20Pro-v1.0.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![React](https://img.shields.io/badge/React-v18+-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-orange)

## 🎯 Overview

Legal Draft Pro is a comprehensive web application that streamlines the legal document creation process. Users can select case types, provide key details, and generate professional legal drafts using AI technology powered by OpenAI's GPT models.

### Key Features
- 🤖 **AI-Powered Generation** - Uses OpenAI GPT-3.5 for intelligent legal draft creation
- 📝 **Multiple Case Types** - Supports Civil, Criminal, Contract, and other legal document types
- 👤 **User Management** - Secure authentication and user-specific draft storage
- 💾 **Draft Management** - Save, edit, and organize legal documents
- 🎨 **Modern UI** - Clean, professional interface with dark theme
- 🔒 **Secure** - Protected API keys and user authentication

## 🛠️ Tech Stack

### Frontend
- **React.js** - User interface framework
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Router** - Navigation and routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Token authentication
- **bcrypt.js** - Password hashing
- **OpenAI API** - AI-powered text generation

## 🏗️ Project Structure

```
Legal-Draft-Pro/
├── backend/                 # Node.js Express server
│   ├── middleware/         # Authentication middleware
│   ├── models/            # MongoDB data models
│   ├── routes/            # API route handlers
│   ├── prompts/           # AI prompt templates
│   ├── .env               # Environment variables
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── frontend/              # React application
│   ├── public/           # Static assets
│   ├── src/              # React source code
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── utils/        # Utility functions
│   │   └── App.js        # Main App component
│   └── package.json      # Frontend dependencies
├── README.md             # Project documentation
└── .gitignore            # Git ignore rules
```

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB Atlas** account (free tier available)
- **OpenAI API** key
- **Git** version control

### 1. Clone the Repository
```bash
git clone https://github.com/HarikaMurali/LAW_DRAFT-EDITOR.git
cd LAW_DRAFT-EDITOR
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file (.env)
```

**Environment Variables** (create `backend/.env` file):
```env
# Database
MONGO_URI=your_mongodb_atlas_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key

# AI Service
OPENAI_API_KEY=your_openai_api_key

# Server
PORT=5000
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

### 4. Run the Application

**Start Backend Server:**
```bash
cd backend
npm run dev
# Server will run on http://localhost:5000
```

**Start Frontend (in a new terminal):**
```bash
cd frontend
npm start
# Application will open on http://localhost:3000
```

## 🔧 Configuration

### MongoDB Setup
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Set up database access and network access
4. Get your connection string
5. Add it to your `backend/.env` file

### OpenAI API Setup
1. Create an account at [OpenAI Platform](https://platform.openai.com/)
2. Generate an API key
3. Add billing information (if needed)
4. Add the API key to your `backend/.env` file

## 🎮 Usage

### For Users
1. **Register/Login** - Create an account or sign in
2. **Select Case Type** - Choose from Civil, Criminal, Contract, etc.
3. **Provide Details** - Enter case facts and relevant information
4. **Generate Draft** - AI creates a professional legal document
5. **Edit & Save** - Modify the draft and save it to your account
6. **Manage Drafts** - View and organize your saved documents

### Sample Input Example:
```
Case Type: Contract
Key Details: ABC Pvt Ltd entered into a contract with XYZ Enterprises for supply of office furniture. XYZ failed to deliver the goods on time, causing losses to ABC.
Jurisdiction: India
```

## 📋 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Draft Routes
- `GET /api/drafts` - Get user's saved drafts
- `POST /api/drafts` - Save a new draft
- `GET /api/drafts/:id` - Get specific draft

### Generation Routes
- `POST /api/generate` - Generate new legal draft
- `POST /api/generate/save` - Generate and save draft
- `POST /api/generate/mock` - Generate mock draft (testing)

## 🚀 Deployment

### Backend (Heroku/Railway/DigitalOcean)
1. Set environment variables on your platform
2. Deploy the backend folder
3. Ensure MongoDB Atlas is accessible

### Frontend (Netlify/Vercel)
1. Build the React app: `npm run build`
2. Deploy the `build` folder
3. Update API base URL for production

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

## 🐛 Known Issues & Limitations

- OpenAI API has rate limits and costs
- Generated drafts require legal review
- Currently supports English language only
- Mock generator available for testing when API quota is exceeded

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **Harika Murali** - *Lead Developer* - [@HarikaMurali](https://github.com/HarikaMurali)

## 🙏 Acknowledgments

- **OpenAI** for providing the GPT API
- **MongoDB** for the database platform
- **React & Node.js** communities

## 📞 Support

If you encounter any issues:
- 🐛 **Issues**: [GitHub Issues](https://github.com/HarikaMurali/LAW_DRAFT-EDITOR/issues)

---

**⚖️ Legal Disclaimer**: This application generates draft legal documents using AI. All generated content should be reviewed by qualified legal professionals before use. The developers are not responsible for the accuracy or legal validity of generated documents.