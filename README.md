# Notiq

A scalable multi-channel notification service built with Node.js and TypeScript. It enables applications to send notifications across multiple channels such as email, in-app (WebSocket), and webhooks using an asynchronous, queue-based architecture.

---

## Overview

Notiq is designed as a centralized notification system that decouples notification logic from core application services. Instead of handling notifications in multiple places, applications can send a single request and Notiq manages delivery, retries, and tracking.

---

## Features

- Multi-channel notification delivery (Email, Webhook, In-app)
- Asynchronous processing using Bull queues
- Redis-backed job queue for scalability
- PostgreSQL-based notification persistence
- Delivery status tracking (queued, processing, delivered, failed)
- Channel-level logging for observability
- User preference-based delivery control
- Real-time in-app notifications via WebSocket
- Retry mechanism with backoff strategy
- Analytics endpoints for monitoring delivery metrics

---

## Architecture

The system follows a queue-based, event-driven architecture:

1. Incoming notification requests are received via API
2. Notifications are stored in PostgreSQL
3. Jobs are pushed to a Redis-backed Bull queue
4. Dedicated workers process each delivery channel
5. Delivery results are logged and tracked
6. WebSocket enables real-time in-app delivery

---

## Tech Stack

- Node.js
- TypeScript
- Express
- PostgreSQL
- Redis
- Bull Queue
- Socket.io

---

## Project Structure
src/
├── config/
├── models/
├── routes/
├── services/
├── workers/
├── websocket/
├── app.ts
└── server.ts

---

## Getting Started

### Install dependencies
npm install

### Run development server
npm run dev

### Build project
npm run build

### Start production server
npm start

---

## API

### POST /notify
{
"userId": 1,
"message": "Your Good Name",
"channels": ["email", "webhook", "inapp"]
}

---

## Database Setup

To run the project locally, create the following PostgreSQL tables:

- users  
- user_preferences  
- notifications  
- notification_logs  

Schema definitions are available in the codebase.

---

## Future Improvements

- Dead-letter queue support
- Rate limiting per user
- Notification templates
- Dashboard for analytics visualization

---
