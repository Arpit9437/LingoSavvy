# 📝 LingoSavvy

**LingoSavvy** is an AI-powered writing assistant that improves your writing through advanced grammar checking, style suggestions, and real-time language enhancement — powered by Google’s Gemini AI.

---

## 🚀 Features

- 🔍 **AI-Powered Analysis** – Advanced writing analysis using Google Gemini AI  
- ⚡ **Real-time Feedback** – Instant grammar, tone, clarity, and vocabulary suggestions  
- 🔐 **User Authentication** – Secure login and registration with JWT  
- 📱 **Responsive Design** – Works seamlessly across all devices  
- 🎯 **Limited Preview** – Try basic features without registration  
- 📊 **Detailed Analysis** – Comprehensive writing feedback for registered users  

---

## 🛠 Tech Stack

### 🔷 Frontend
- React.js  
- React Router DOM  
- Tailwind CSS  
- Axios  
- Lucide React Icons  

### 🔶 Backend
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT Authentication  
- Google Generative AI  
- bcrypt.js  

---

## ⚙️ Getting Started

### ✅ Prerequisites
- Node.js (v16 or higher)  
- MongoDB  
- Google Gemini API Key  

---

### 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Arpit9437/lingosavvy.git
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Set up environment variables**

   **Frontend: `frontend/.env`**
   ```
   VITE_API_URL="paste-your-url"
   ```

   **Backend: `backend/.env`**
   ```
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   PORT=4000
   ```

5. **Start the development servers**

   **Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

   **Backend**
   ```bash
   cd backend
   node index.js
   ```

---

## 📡 API Endpoints

### 🔐 Authentication
- `POST /api/auth/register` – Register a new user  
- `POST /api/auth/login` – User login  

### ✍️ Text Analysis
- `POST /api/ai/analyze` – Analyze submitted text content  

---

## 🤝 Contributing

1. Fork the repository  
2. Create your feature branch:  
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:  
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. Push to the branch:  
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request  

---