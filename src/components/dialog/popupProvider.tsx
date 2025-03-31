import React, { createContext, useContext, useState } from 'react';
import { PopupContent } from './popupContent';

interface PopupContentProps {
    title?: string;
    message?: string;
    backgroundColor?: string;
    textColor?: string;
    iconType?: 'success' | 'warning' | 'error' | 'info' | 'question' | 'none';
    confirmText?: string;
    cancelText?: string;
    showCancel?: boolean;
    inputLabel?: string;
    inputPlaceholder?: string;
    inputDefaultValue?: string;
    showInput?: boolean;
    onConfirm?: (inputText: string) => void;
    onClose?: () => void;
}

type PopupContextType = {
    showPopup: (options: PopupContentProps) => void;
};

const PopupContext = createContext<PopupContextType | null>(null);

export const PopupProvider = ({ children }: any) => {
    const [popupOptions, setPopupOptions] = useState<any>(null);

    const showPopup = (options: PopupContentProps) => {
        setPopupOptions({
            ...options,
            onClose: () => setPopupOptions(null),
        });
    };

    return (
        <PopupContext.Provider value={{ showPopup }}>
            {children}
            {popupOptions && <PopupContent {...popupOptions} />}
        </PopupContext.Provider>
    );
};

export const usePopup = () => {
    const context = useContext(PopupContext);
    if (!context) {
        throw new Error('usePopup must be used within a PopupProvider');
    }
    return context;
};
