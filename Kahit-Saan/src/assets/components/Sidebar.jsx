import React from 'react';
import { 
    ChefHat, 
    LayoutDashboard, 
    Users, 
    UtensilsCrossed, 
    Settings, 
    LogOut 
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeItem }) => {
    const menuItems = [
        { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin/dashboard' },
        { id: 'menu', icon: <UtensilsCrossed size={20} />, label: 'Menu Management', path: '/admin/menu' },
        { id: 'users', icon: <Users size={20} />, label: 'User Management', path: '/admin/users' },
        { id: 'settings', icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <div className="bg-brand-black text-white w-64 min-h-screen flex flex-col">
            <div className="p-4 flex items-center border-b border-gray-700">
                <ChefHat className="text-brand-gold mr-2" size={24} />
                <h2 className="font-montserrat font-bold text-xl">
                    <span className="font-kaushan text-brand-gold">Kahit</span> Saan
                </h2>
            </div>
            
            <div className="flex-grow p-4">
                <p className="text-xs text-brand-gray mb-4 uppercase font-semibold">Main Menu</p>
                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <a
                            key={item.id}
                            href={item.path}
                            className={`flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                                activeItem === item.id
                                    ? 'bg-gray-800 text-brand-gold'
                                    : 'text-white hover:bg-gray-800 hover:text-brand-gold'
                            }`}
                        >
                            <span className="text-brand-gold">{item.icon}</span>
                            <span className="font-opensans">{item.label}</span>
                        </a>
                    ))}
                </nav>
            </div>
            
            <div className="p-4 border-t border-gray-700">
                <a
                    href="/"
                    className="flex items-center space-x-3 p-3 rounded-xl text-white hover:bg-gray-800 transition-colors"
                >
                    <LogOut size={20} className="text-brand-gold" />
                    <span className="font-opensans">Logout</span>
                </a>
            </div>
        </div>
    );
};

export default Sidebar;