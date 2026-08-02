import { Chess } from "chess.js";
import { useEffect, useRef } from "react";
import { Chessboard } from "react-chessboard";

interface Move {
    from: string;
    to: string;
}

interface ChessBoardProps {
    fen: string;
    orientation: "white" | "black";
    sendMove: (from: string, to: string) => void;
    gameStarted: boolean;
    lastMove: Move | null;
}

export default function ChessBoard({
    fen,
    orientation,
    sendMove,
    gameStarted,
    lastMove,
}: ChessBoardProps) {
    // Local board only for validating the drag before sending
    const chess = useRef(new Chess());

    useEffect(() => {
        chess.current.load(fen);
    }, [fen]);

    const chessboardOptions = {
        id: "board",
        position: fen,
        boardOrientation: orientation,
        allowDragging: gameStarted, // replaces old arePiecesDraggable
        darkSquareStyle: { backgroundColor: "#769656" },
        lightSquareStyle: { backgroundColor: "#EEEED2" },
        boardStyle: { borderRadius: "12px" },
        squareStyles: lastMove
            ? {
                  [lastMove.from]: { backgroundColor: "rgba(255,255,0,0.45)" },
                  [lastMove.to]: { backgroundColor: "rgba(255,255,0,0.45)" },
              }
            : {},
        onPieceDrop: ({
            sourceSquare,
            targetSquare,
        }: {
            sourceSquare: string;
            targetSquare: string | null;
        }) => {
            if (!targetSquare) return false;

            // Optional client-side legality pre-check before hitting the server
            const legalMoves = chess.current.moves({
                square: sourceSquare as any,
                verbose: true,
            });
            const isLegal = legalMoves.some((m) => m.to === targetSquare);
            if (!isLegal) return false;

            sendMove(sourceSquare, targetSquare);
            return true; // optimistic; server will correct via the "move"/"invalidMove" message
        },
    };

    return (
        <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-700">
            <Chessboard options={chessboardOptions} />
        </div>
    );
}