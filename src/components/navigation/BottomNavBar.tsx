import React from 'react';
import {
  Home,
  Users,
  TestTube2,
  CalendarCheck,
  Building,
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface BottomNavBarProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  bookingBadgeCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onChangeTab,
  bookingBadgeCount,
}) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'doctors', label: 'Doctors', icon: Users },
    { id: 'diagnostics', label: 'Lab Tests', icon: TestTube2 },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck, badge: bookingBadgeCount },
    { id: 'facilities', label: 'Facilities', icon: Building },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-1.5 px-2 sm:px-6 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeTab(tab.id as ActiveTab)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-orange-600 scale-105' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
                {typeof tab.badge === 'number' && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-orange-600 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight font-bold ${isActive ? 'text-orange-600 font-extrabold' : 'text-slate-500'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-orange-600 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
