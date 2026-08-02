import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Chess } from "chess.js";
import { Play } from "lucide-react";

import ChessBoard from "./ChessBoard";
import { useSocket } from "../hooks/useSocket";

export const INIT_GAME = "start";
export const MOVE = "move";
export const GAME_OVER = "gameOver";

export default function Game() {

    const socket = useSocket();

    const chess = useRef(new Chess());

    const [fen, setFen] = useState(chess.current.fen());

    const [playerColor, setPlayerColor] =
        useState<"white" | "black" | null>(null);

    const [gameStarted, setGameStarted] = useState(false);

    const [searching, setSearching] = useState(false);

    const [opponentConnected, setOpponentConnected] =
        useState(false);

    const [status, setStatus] =
        useState("Press Start Game to begin.");

    const [lastMove, setLastMove] = useState<{
        from: string;
        to: string;
    } | null>(null);

    

    useEffect(() => {

        if (!socket) return;

        socket.onmessage = (event) => {

            const message = JSON.parse(event.data);

            console.log("SERVER:", message);

            switch (message.type) {

                case INIT_GAME:

                    chess.current.load(message.fen);

                    setFen(chess.current.fen());

                    setSearching(false);

                    setGameStarted(true);

                    setOpponentConnected(true);

                    setPlayerColor(message.color);

                    setStatus(
                        `Game Started • Playing as ${message.color}`
                    );

                    break;

                case MOVE:

                    chess.current.load(message.fen);

                    setFen(chess.current.fen());

                    setLastMove(message.move);

                    break;

                case "invalidMove":

                    alert(message.reason);

                    break;

                case "check":

                    setStatus("Check!");

                    break;

                case GAME_OVER:

                    setStatus("Game Over");

                    alert(
                        `Winner : ${message.winner}`
                    );

                    break;
            }

        };

        return () => {

            socket.onmessage = null;

        };

    }, [socket]);

    const sendMove = (
        from: string,
        to: string
    ) => {

        if (!socket) return;

        socket.send(

            JSON.stringify({

                type: MOVE,

                move: {
                    from,
                    to
                }

            })

        );

    };

    const startGame = () => {

        if (!socket) return;

        socket.send(

            JSON.stringify({

                type: INIT_GAME

            })

        );

        setSearching(true);

        setStatus("Searching for opponent...");

    };

    return (

        <div className="min-h-screen bg-[#1f1f1f] text-white">

            {/* Navbar */}

            <nav className="border-b border-neutral-800">

                <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between">

                    <Link to="/">

                        <h1 className="text-3xl font-bold">

                            ♟ Chess

                            <span className="text-green-500">

                                Arena

                            </span>

                        </h1>

                    </Link>

                </div>

            </nav>

            {/* Body */}

            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10 p-8">

                {/* Chessboard */}

                <div className="lg:col-span-2 flex justify-center">
                    <div className="w-full max-w-[650px]">

                    <ChessBoard

                        fen={fen}

                        orientation={
                            playerColor === "black"
                                ? "black"
                                : "white"
                        }

                        sendMove={sendMove}

                        gameStarted={gameStarted}

                        lastMove={lastMove}

                    />
                    </div>
                </div>

                {/* Sidebar */}

                <div className="space-y-6">

                    <div className="bg-[#2b2b2b] rounded-xl p-6">

                        <h2 className="font-semibold text-xl">

                            Opponent

                        </h2>

                        <p className="mt-3">

                            {

                                opponentConnected

                                    ? "🟢 Connected"

                                    : searching

                                        ? "Searching..."

                                        : "Waiting..."

                            }

                        </p>

                    </div>

                    <div className="bg-[#2b2b2b] rounded-xl p-6">

                        <h2 className="font-semibold text-xl">

                            Status

                        </h2>

                        <p className="mt-3 text-neutral-400">

                            {status}

                        </p>

                        <button

                            disabled={
                                searching ||
                                gameStarted
                            }

                            onClick={startGame}

                            className="mt-5 w-full bg-green-600 hover:bg-green-700 disabled:bg-neutral-700 rounded-lg py-3 flex items-center justify-center gap-2"

                        >

                            <Play size={18}/>

                            {

                                searching

                                    ? "Searching..."

                                    : gameStarted

                                        ? "Game Started"

                                        : "Start Game"

                            }

                        </button>

                    </div>

                    <div className="bg-[#2b2b2b] rounded-xl p-6">

                        <h2 className="font-semibold text-xl">

                            You

                        </h2>

                        <p className="mt-3">

                            {

                                playerColor

                                    ? `Playing as ${playerColor}`

                                    : "Not Connected"

                            }

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}