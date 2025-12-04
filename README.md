# Expense Tracker Application

A comprehensive financial tracking application built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to track their incomes and expenses with a beautiful, modern UI and insightful visualizations.

![Expense Tracker App](./Frontend/public/4.png)

## Features

- **User Authentication**: Secure login and registration system with JWT tokens
- **Interactive Dashboard**: Visualize your financial data with pie charts and statistics
- **Income & Expense Tracking**: Add, view, and delete both income and expense entries
- **Transaction History**: Track your recent financial activities
- **Category Management**: Organize transactions by categories with visual icons
- **Dark Mode**: Toggle between light and dark themes
- **Fully Responsive Design**: Optimized for mobile phones, tablets, and desktop/laptop devices
- **Modern UI**: Beautiful gradient backgrounds, glassmorphism effects, and smooth animations
- **Real-time Updates**: Data updates immediately when changes are made
- **Currency Support**: All amounts displayed in Indian Rupees (₹)
- **Secure**: Password hashing with bcryptjs and protected API routes

## Tech Stack

### Frontend
- React.js
- Styled Components
- Chart.js (Doughnut charts)
- Axios
- FontAwesome Icons
- React DatePicker
- React Context API (Global state, Auth, Theme)

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- JWT (JSON Web Tokens) for authentication
- bcryptjs for password hashing
- CORS for cross-origin resource sharing
- Dotenv for environment variables

## Project Structure

```
Expense_Tracker_FullStack/
├── Frontend/                 # React frontend
│   ├── public/
│   └── src/
│       ├── Components/       # React components
│       │   ├── Dashboard/    # Dashboard with stats and charts
│       │   ├── Navigation/   # Sidebar navigation
│       │   ├── Header/       # Top header with search
│       │   ├── LandingPage/  # Login/Register page
│       │   ├── Incomes/      # Income management
│       │   ├── Expenses/     # Expense management
│       │   ├── History/      # Transaction history
│       │   ├── Form/         # Income form
│       │   ├── PieChart/     # Expense breakdown chart
│       │   └── Transactions/ # Recent transactions list
│       ├── Context/          # Context providers (Global, Auth, Theme)
│       ├── Styles/           # Global styles and layouts
│       ├── Utils/            # Utility functions and icons
│       ├── img/              # Image assets
│       ├── App.js            # Main application component
│       └── index.js          # Entry point
└── Backend/                  # Express backend
    ├── controllers/          # Route controllers
    │   ├── auth.js          # Authentication logic
    │   ├── income.js        # Income operations
    │   └── expense.js       # Expense operations
    ├── middleware/          # Express middleware
    │   └── auth.js          # JWT authentication middleware
    ├── models/              # MongoDB models
    │   ├── userModel.js     # User schema
    │   ├── incomeModel.js   # Income schema
    │   └── expenseModel.js  # Expense schema
    ├── routes/              # API routes
    │   ├── auth.js          # Authentication routes
    │   └── transactions.js  # Income/Expense routes
    ├── db/                  # Database connection
    └── app.js               # Express app setup
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database (local or MongoDB Atlas)
- Git

### Clone the Repository
```bash
git clone https://github.com/Mahesh-Vijaykumar/expense_tracker.git
cd Expense_Tracker_FullStack
```

### Backend Setup
1. Navigate to the backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
FRONTEND_URL=http://localhost:3000
```

**Note**: Generate a secure JWT_SECRET (you can use any random string or use an online generator).

4. Start the backend server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional for local development):
```env
REACT_APP_API_URL=http://localhost:5000/api/v1
```

4. Start the frontend development server:
```bash
npm start
```

5. Access the application at `http://localhost:3000`

**Note**: The frontend will automatically open in your browser. You'll see the landing page where you can register a new account or login.

## API Endpoints

### Authentication Endpoints
- **POST** `/api/v1/auth/register`: Register a new user
  - Body: `{ name, email, password }`
- **POST** `/api/v1/auth/login`: Login user
  - Body: `{ email, password }`
- **GET** `/api/v1/auth/user`: Get current user (requires authentication)

### Income Endpoints (All require authentication)
- **POST** `/api/v1/add-income`: Add new income
  - Body: `{ title, amount, date, category, description }`
- **GET** `/api/v1/get-incomes`: Get all incomes for logged-in user
- **DELETE** `/api/v1/delete-income/:id`: Delete specific income

### Expense Endpoints (All require authentication)
- **POST** `/api/v1/add-expense`: Add new expense
  - Body: `{ title, amount, date, category, description }`
- **GET** `/api/v1/get-expenses`: Get all expenses for logged-in user
- **DELETE** `/api/v1/delete-expense/:id`: Delete specific expense

**Note**: All transaction endpoints require a valid JWT token in the Authorization header: `Bearer <token>`

## Component Overview

### Main Components
- **LandingPage**: Beautiful login/registration page with gradient background
- **Dashboard**: Displays financial overview with stat cards, pie charts, and recent transactions
- **Navigation**: Responsive sidebar navigation with hamburger menu for mobile
- **Header**: Top header with search functionality and user profile
- **Incomes**: Manages income transactions with form and list
- **Expenses**: Manages expense transactions with form and list
- **History**: Shows recent transaction history
- **PieChart**: Visual breakdown of expenses by category
- **Transactions**: List of recent transactions with icons
- **Form/ExpenseForm**: Forms for adding income and expenses

### State Management
The application uses React Context API for global state management:
- **GlobalContext**: Manages income/expense data and operations
- **AuthContext**: Handles user authentication, login, logout, and token management
- **ThemeContext**: Manages dark/light mode theme switching

### Authentication Flow
1. User registers/logs in on the landing page
2. JWT token is stored in localStorage
3. Token is sent with all API requests via Authorization header
4. Protected routes verify token before allowing access
5. User data is fetched and displayed in navigation and header

## Styling

The application uses styled-components for styling, with a modern design system:

- **Dark Mode**: Full dark mode support with theme toggle
- **Gradient Backgrounds**: Beautiful gradient backgrounds for landing page and dark mode
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Orb Animation**: Animated gradient orb background element
- **Custom Buttons**: Styled buttons with hover effects and icons
- **Card Design**: Modern card layouts with shadows and borders
- **Responsive Design**: 
  - Mobile: < 768px (hamburger menu, stacked layouts)
  - Tablet: 768px - 1024px (optimized spacing)
  - Desktop: > 1024px (full layout)
- **Touch-Friendly**: All interactive elements meet 44px minimum size for mobile
- **Typography**: Responsive font sizes using CSS clamp()
- **Icons**: FontAwesome icons throughout the application

## Deployment

The application is deployed on free hosting platforms:

- **Frontend**: [Vercel](https://vercel.com) - Automatic deployments from GitHub
- **Backend**: [Render](https://render.com) - Free tier with auto-sleep
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Free tier (512MB)

### Environment Variables for Deployment

**Backend (Render)**:
- `MONGO_URL`: MongoDB Atlas connection string
- `JWT_SECRET`: Your JWT secret key
- `FRONTEND_URL`: Your Vercel frontend URL
- `PORT`: Automatically set by Render

**Frontend (Vercel)**:
- `REACT_APP_API_URL`: Your Render backend URL (e.g., `https://your-app.onrender.com/api/v1`)

See `DEPLOYMENT.md` for detailed deployment instructions.

## Future Enhancements

- Budget planning and alerts
- Financial goals tracking
- Export data to CSV/PDF
- Multiple currency support
- Recurring transactions
- Transaction search and filtering
- Category-wise spending limits
- Monthly/yearly reports
