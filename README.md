# All-in-One Hostel Management App

## Project Overview

This is a full-stack web application for managing hostel operations, including user registration, room allotment, maintenance requests, event calendar, fees reminder, lost & found, visitor management, community chat, feedback & suggestions, push notifications, and an admin dashboard.

## Technology Stack

- Frontend: HTML, CSS (Tailwind CSS), JavaScript
- Backend: Node.js with Express.js
- Database: MongoDB with Mongoose ODM
- Authentication: JWT-based token authentication

## Project Structure

```
/project-root
│
├── server.js                  # Main backend server file
├── README.md                  # Project documentation
│
├── models/                    # Mongoose data models
│   ├── User.js
│   ├── Room.js
│   ├── MaintenanceRequest.js
│   ├── Event.js
│   ├── Fee.js
│   ├── LostItem.js
│   ├── Visitor.js
│   ├── ChatMessage.js
│   └── Feedback.js
│
├── routes/                    # Express route handlers
│   ├── auth.js
│   ├── rooms.js
│   ├── maintenance.js
│   ├── events.js
│   ├── fees.js
│   ├── lostfound.js
│   ├── visitors.js
│   ├── chat.js
│   ├── feedback.js
│   └── admin.js
│
└── public/                    # Frontend static files
    ├── index.html
    ├── login.html
    ├── register.html
    ├── student-dashboard.html
    ├── staff-dashboard.html
    ├── admin-dashboard.html
    ├── profile.html
    ├── room.html
    ├── maintenance.html
    ├── events.html
    ├── fees.html
    ├── lostfound.html
    ├── visitors.html
    ├── chat.html
    └── feedback.html
```

## Setup and Running

1. Ensure you have Node.js and MongoDB installed and running.

2. Install backend dependencies:

```bash
npm install express mongoose cors body-parser bcrypt jsonwebtoken
```

3. Start the MongoDB server (if not already running):

```bash
mongod
```

4. Run the backend server:

```bash
node server.js
```

5. Serve the `public` directory using any static file server or open the HTML files directly in a browser.

## Features

- User registration and login with role-based access (student, staff, admin)
- Room allotment and management
- Maintenance request submission and tracking
- Event calendar with RSVP functionality
- Fees reminder and payment status tracking
- Lost & found item reporting and searching
- Visitor registration and approval
- Community chat for residents
- Feedback and suggestions submission and review
- Admin dashboard for monitoring and managing hostel operations

## Notes

- JWT secret is hardcoded for demonstration; use environment variables in production.
- Push notifications are not implemented in this version.
- Frontend pages use Tailwind CSS via CDN for styling.
- Backend APIs are RESTful and secured with JWT authentication.

## License

This project is provided as-is for demonstration purposes.
