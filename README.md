# ♟️ Chess Arena

A real-time multiplayer chess application built using **React**, **TypeScript**, **Node.js**, and **WebSockets**. Challenge another player online and experience seamless, low-latency gameplay powered by a WebSocket server.

---

## 🚀 Features

- 🎮 Real-time multiplayer gameplay
- ⚡ Instant move synchronization using WebSockets
- ♟️ Complete chess rules powered by `chess.js`
- 🧩 Interactive drag-and-drop chessboard
- 🎨 Responsive and modern UI with Tailwind CSS
- 🔄 Automatic matchmaking
- 🏁 Game over detection
- ❌ Invalid move validation

---

## 🏗️ Architecture

```text
                        +-----------------------+
                        |      React Client     |
                        |  react-chessboard UI  |
                        +----------+------------+
                                   |
                        WebSocket (ws / wss)
                                   |
             ------------------------------------------
             |                                        |
+------------v------------+              +------------v------------+
|     WebSocket Server    |              |     WebSocket Server    |
|       Player 1          |              |       Player 2          |
+------------+------------+              +------------+------------+
             \                            /
              \                          /
               \                        /
                +----------------------+
                |      Game Engine     |
                |----------------------|
                | chess.js             |
                | Move Validation      |
                | Turn Management      |
                | Checkmate Detection  |
                | Draw Detection       |
                +----------------------+
```

---

## 📂 Project Structure

### Frontend

```
src/
├── components/
│   └── Game.tsx
├── hooks/
│   └── useSocket.ts
├── App.tsx
└── main.tsx
```

### Backend

```
src/
├── Game.ts
├── GameManager.ts
├── index.ts
└── types.ts
```

---

## ⚙️ Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- react-chessboard
- chess.js

### Backend

- Node.js
- TypeScript
- ws (WebSocket)
- chess.js

---

## 🔄 Game Flow

```text
Player A
    │
    │  Start Game
    ▼
WebSocket Server
    │
    │  Wait for another player
    ▼
Player B connects
    │
    ▼
Game Created
    │
    ▼
Both players receive
INIT_GAME
    │
    ▼
Player moves a piece
    │
    ▼
MOVE Event
    │
    ▼
Server validates move
    │
    ├──────────────► Invalid Move
    │                  │
    │                  ▼
    │             Notify Player
    │
    ▼
Broadcast Valid Move
    │
    ▼
Opponent updates board
    │
    ▼
Game continues...
```

---

## 📡 WebSocket Events

### Client → Server

| Event | Description |
|--------|-------------|
| `start` | Find an opponent and start a new game |
| `move` | Send a chess move |

---

### Server → Client

| Event | Description |
|--------|-------------|
| `start` | Game initialized |
| `move` | Broadcast opponent's move |
| `invalidMove` | Illegal move attempted |
| `gameOver` | Match finished |

---

## 🛠️ Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/chess-arena.git
```

---

### Backend

```bash
cd backend

npm install

npm run dev
```

Server starts on

```
ws://localhost:8080
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Runs on

```
http://localhost:5173
```

---

## 🌐 Deployment

### Frontend

Deploy using

- Vercel

### Backend

Deploy using

- Render
- Railway

---

## 🤝 Contributing

Contributions are welcome!

Feel free to fork the repository, create a feature branch, and submit a pull request.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Sahil Adit**

If you found this project useful, consider giving it a ⭐ on GitHub!
