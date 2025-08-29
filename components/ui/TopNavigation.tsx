'use client'

import { useState, useEffect } from 'react';
import { Search, Volume2, Moon, Rss } from 'lucide-react';
import VolumeToggleIcon from './VolumeToggleIcon';
import ModeToggleButton from './ModeToggleButton';

const TopNavigation = () => {
  const [iconsVisible, setIconsVisible] = useState(false);

  useEffect(() => {
    // 组件挂载后触发动画
    const timer = setTimeout(() => {
      setIconsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { name: 'Categories', href: '#' },
    { name: 'Goodies', href: '#' },
    { name: 'About', href: '#' }
  ];

  const iconItems = [
    // { icon: Search, style: { width: '36px', height: '36px' }, delay: 0 },
    { icon: VolumeToggleIcon, style: { position: 'relative', top: '-2px', width: '36px', height: '36px' }, delay: 100 },
    { icon: ModeToggleButton, style: { width: '36px', height: '36px' }, delay: 200 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 px-2 sm:px-6 py-2 sm:py-4 h-16 sm:h-20 backdrop-blur-lg">
      {/* Glassy Backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-2xl"
        style={{
          // backdropFilter: 'blur(8px)'
        }}
      >
        {/* Additional glass overlay for extra effect */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 to-gray-800/10"></div> */}
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between pl-4 h-full">
        {/* Logo */}
        <div className="flex items-center">
          <div className="text-lg sm:text-2xl font-bold">
            <span style={{ color: 'var(--color-primary)' }}>Shane</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className="transition-colors duration-200 relative group text-base"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {iconItems.map(({ icon: Icon, style, delay }, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ease-out ${
                iconsVisible
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-8 opacity-0'
              }`}
              style={{
                ...style,
                transitionDelay: iconsVisible ? `${delay}ms` : '0ms'
              } as React.CSSProperties}
            >
              <div className="p-1 sm:p-2 rounded-lg transition-colors duration-200 group">
                <Icon 
                  className="" 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile menu button */}
        {/* <div className="md:hidden">
          <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200">
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className="block w-full h-0.5 bg-gray-300"></span>
              <span className="block w-full h-0.5 bg-gray-300"></span>
              <span className="block w-full h-0.5 bg-gray-300"></span>
            </div>
          </button>
        </div> */}
      </div>
    </nav>
  );
};

export default TopNavigation;