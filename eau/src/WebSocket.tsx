import { ToastContainer, toast } from "react-toastify";
import { NewCommentNotification } from "./NotificationHandler.tsx";
import React, { useEffect } from 'react';
import { io, Socket } from "socket.io-client";

interface WebSocketClientProps {
    onError: (message: string | React.ReactNode) => void;
}

export const WebSocketClient: React.FC<WebSocketClientProps> = (props) => {

    useEffect(() => {
        const socket = io("ws://localhost:3000");

        socket.on("connect", () => {
            console.log("Connected to WebSocket server");
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from WebSocket server");
        });

        socket.on("alert", (data : {sensorId: string, y: number, expected: number}) => {
            // props.onError(<NewCommentNotification sensorId={data.sensorId} y={data.y} expected={data.expected} /> as React.ReactNode);
            props.onError(<NewCommentNotification sensorId={data.sensorId} y={data.y} expected={data.expected} />);
        });

        return () => {
            socket.close();
        };
    }, [props.onError]);


    return <></>;
};
