import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <div className="flex-1 pb-20">
                <Outlet />
            </div>
            <BottomNav />
        </div>
    );
};

export default MainLayout;
