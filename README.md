# Royal Traders

A full-stack application for Royal Traders.

## Project Structure

This project is split into two main parts:

### Frontend (`/frontend`)
- React + TypeScript application
- Built with Vite
- Uses Tailwind CSS for styling
- Shadcn UI components
- Located in the `frontend` directory

### Backend (`/backend`)
- Express.js + TypeScript server
- MongoDB database
- RESTful API
- Located in the `backend` directory

## Development

### Frontend Development
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Development
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The backend API will be available at `http://localhost:5000`

## Production Deployment

Each part (frontend and backend) can be deployed independently:

### Frontend
1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the contents of the `dist` directory to your web server.

### Backend
1. Build the backend:
```bash
cd backend
npm run build
```

2. Start the production server:
```bash
npm start
```

## Environment Variables

### Frontend
Create a `.env` file in the frontend directory with:
```
VITE_API_URL=http://localhost:5000
```

### Backend
Create a `.env` file in the backend directory with:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
NODE_ENV=production
``` 