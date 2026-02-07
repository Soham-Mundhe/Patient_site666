import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Stethoscope, Map, LayoutGrid, Bell, User } from 'lucide-react';

const BottomNav = () => {
    const navItems = [
        { name: 'Home', icon: Home, path: '/home' },
        { name: 'Doctors', icon: Stethoscope, path: '/doctors' },
        { name: 'Map', icon: Map, path: '/map' },
        { name: 'Services', icon: LayoutGrid, path: '/services' },
        { name: 'Alerts', icon: Bell, path: '/alerts' },
        { name: 'Profile', icon: User, path: '/profile' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-sky-500' : 'text-gray-400 hover:text-gray-600'
                            }`
                        }
                    >
                        <item.icon size={24} strokeWidth={2} />
                        <span className="text-[10px] font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default BottomNav;
