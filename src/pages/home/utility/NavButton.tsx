import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface NavButtonProps {
  icon: ReactNode;
  title: string;
  to: string;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, title, to }) => {
  return (
    <Link to={to} className="block">
      <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group flex flex-col items-center justify-center text-center border border-gray-100 hover:border-[#8b2332]/20 min-h-[80px] cursor-pointer">
        <div className="text-[#8b2332] mb-2 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xs font-medium text-gray-900 group-hover:text-[#8b2332] transition-colors duration-300 leading-tight px-1">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default NavButton;