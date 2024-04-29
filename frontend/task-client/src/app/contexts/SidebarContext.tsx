// contexts/SidebarContext.tsx

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SidebarContextType {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = (): SidebarContextType => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};

interface SidebarProviderProps {
    children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
    // Initialize state with the value from localStorage to maintain state across reloads
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
        const savedState = localStorage.getItem('sidebarOpen');
        return savedState ? JSON.parse(savedState) : true; // Default to true if not in localStorage
    });

    useEffect(() => {
        // Save state to localStorage whenever it changes
        localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
    }, [isSidebarOpen]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};
