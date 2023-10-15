import React, { forwardRef } from "react";
import { useRef } from "react";
import { WebSocketClient } from "./WebSocket.tsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export interface NotificationRef {
    notify: (notification: string | React.ReactNode) => void;
    errorNotify: (notification: string | React.ReactNode) => void;
    promiseNotify: (promise: Promise<any>, successMessage: string, loadingMessage: string, errorMessage: string) => void;
}

const NotificationsHandler: React.ForwardRefRenderFunction<NotificationRef> = (props, ref) => {
    const notificationRef = useRef(null);
    React.useImperativeHandle(ref, () => ({ notify, errorNotify, promiseNotify }));

    const notify = (notification: string | React.ReactNode) => toast.info(notification, { 
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const errorNotify = (notification: string | React.ReactNode) => toast.error(notification, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const promiseNotify = (promise: Promise<any>, successMessage: string, loadingMessage: string, errorMessage: string) => {
        toast.promise(promise, {
            pending: loadingMessage,
            success: successMessage,
            error: errorMessage,
        });
    }
    
    return (
        <ToastContainer />
    );
}

export default forwardRef(NotificationsHandler);

export const NewCommentNotification: React.FC<{ sensorId: string, y: string, expected: string }> = ({ sensorId, y, expected }) => {
    return (
        <div>
            <p>🚨 Alerte sur le capteur {sensorId}, mesure trop { y > expected ? "haute" : "basse" }</p>
            <a href={`/sensors/${sensorId}`}><button className="btn btn-primary">Voir</button></a>
        </div>
    );
}
