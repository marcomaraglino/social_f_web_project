// AlertContext.jsx
import { createContext, useState } from "react";

export const AlertContext = createContext();

export function AlertProvider({ children }) {
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type = "success", duration = 3000) => {
        setAlert({ message, type });
        if (duration > 0) {
            setTimeout(() => setAlert(null), duration);
        }
    };

    const hideAlert = () => setAlert(null);

    return (
        <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
            {children}
            {alert && (
                <div
                    className={`alert alert-${alert.type} position-fixed top-0 start-50 translate-middle-x mt-3 shadow`}
                    role="alert"
                    style={{ zIndex: 1055, minWidth: "300px" }}
                >
                    {alert.message}
                    <button
                        type="button"
                        className="btn-close float-end"
                        onClick={hideAlert}
                    />
                </div>
            )}
        </AlertContext.Provider>
    );
}