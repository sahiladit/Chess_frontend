import {useEffect, useState} from "react";

export const useSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const newSocket = new WebSocket("ws://localhost:8080");
        
        newSocket.onopen = () =>{
            console.log("Connected to WebSocket server");
            setSocket(newSocket);
        }

        newSocket.onclose = () => {
            console.log("Disconnected from WebSocket server");
            setSocket(null);
        }

        newSocket.onerror = (error) => {
            console.error("WebSocket error:", error);
        }

        return () => {
            newSocket.close();
        };
        
    }, []);

    return socket;
}