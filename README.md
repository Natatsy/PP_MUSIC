# PP Music 🎵

A music search app integrated with Spotify's API.

## Features

- 🔍 Search for artists, albums, and tracks
- 🎧 Play previews via Spotify Web Player
- 🔐 User authentication with JWT
- 🛠️ Backend powered by **Express.js** & **MongoDB**
- 🎵 Spotify OAuth 2.0 authentication

---

## **1️⃣ Prerequisites**

Before running the app, make sure you have:

- **Node.js v18+** installed
- **MongoDB** (or **PostgreSQL**)
- A **Spotify Developer Account**

---

## **2️⃣ Getting Started**

### **📌 Step 1: Clone the Repository**

```sh
git clone https://github.com/your-username/PP_MUSIC.git
cd PP_MUSIC
npm install
```

## **3️⃣ Set up the Backend Server**

### **📌 Step 1: Environment Variables**

Create a .env file in the root of your project and add:

```sh
PORT=5000
MONGO_URI=your_mongodb_connection_string
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_key

```

### **📌 Step 2: Start the Server**

```sh
node server.js
or
npm run dev
```

## **4️⃣ Set up a Spotify Developer Account & OAuth**

### **📌 Step 1: Create a Spotify Developer App**

1. Go to Spotify Developer Dashboard
2. Log in and create a new app.
3. Copy Client ID and Client Secret.

### **📌 Step 2: Store Credentials in .env**

```sh
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
```

### **📌 Step 3: Install Spotify API Package**

```sh
npm install spotify-web-api-node dotenv
```

## **4️5️⃣ Links **

Backend (Local Server):

```sh
http://localhost:5000
```

Frontend:

```sh
http://localhost:3000

```
