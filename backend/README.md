# Royal Traders Backend

This is the backend service for the Royal Traders application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb+srv://anshucabji:Password1234@royal-traders-db.tsq3aux.mongodb.net/?retryWrites=true&w=majority&appName=Royal-traders-db
NODE_ENV=development
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Start the production server:
```bash
npm start
```

## API Endpoints

- `GET /`: Welcome message
- More endpoints will be added as the application grows

## Development

- The server runs on port 5000 by default
- Uses TypeScript for type safety
- Express.js for the web framework
- MongoDB for the database
- CORS enabled for frontend communication 