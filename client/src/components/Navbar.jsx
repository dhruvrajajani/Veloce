import React, { useEffect, useState } from 'react';

const Navbar = ({ onOpenListModal, onSelectType, onSearch, currentUser, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchVal);
    }
  };

  const isAdmin = currentUser && (
    currentUser.email.toLowerCase() === 'ajanidhruvraj@gmail.com' ||
    currentUser.email.toLowerCase() === 'ajanidhruvraj@gmail..com'
  );

  return (
    <nav className={`bg-surface dark:bg-surface-container-lowest docked full-width top-0 sticky z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : 'shadow-[0px_4px_20px_rgba(0,0,0,0.04)]'}`}>
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <div className="flex items-center gap-12">
          <a 
            className="font-display-lg text-display-lg-mobile md:text-display-lg tracking-tighter text-primary dark:text-primary-fixed select-none cursor-pointer" 
            onClick={() => {
              setSearchVal('');
              onSelectType(null);
            }}
          >
            Veloce
          </a>

          {/* Nav links — only visible when logged in */}
          {currentUser && (
            <div className="hidden md:flex items-center gap-8">
              <button 
                className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md font-semibold cursor-pointer"
                onClick={() => onSelectType('all')}
              >
                Browse
              </button>
              <button 
                className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md font-semibold cursor-pointer"
                onClick={onOpenListModal}
              >
                Sell
              </button>
              {isAdmin && (
                <button 
                  className="text-primary hover:opacity-85 font-bold transition-colors font-body-md text-body-md cursor-pointer flex items-center gap-1 ring-1 ring-primary/20 px-2 py-0.5 rounded"
                  onClick={() => onSelectType('admin')}
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">shield_person</span>
                  Admin Panel
                </button>
              )}

            </div>
          )}
        </div>
        
        <div className="flex items-center gap-6">
          {/* Search — only visible when logged in */}
          {currentUser && (
            <form 
              onSubmit={handleSearchSubmit}
              className="hidden lg:flex items-center bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant"
            >
              <span className="material-symbols-outlined text-outline text-[20px] mr-2">search</span>
              <input 
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-body-md p-0 w-48 text-primary outline-none font-semibold" 
                placeholder="Search marketplace..." 
              />
            </form>
          )}

          <div className="flex items-center gap-4 text-on-surface-variant">
            {/* List Vehicle — only visible when logged in */}
            {currentUser && (
              <button 
                onClick={onOpenListModal}
                className="hidden md:flex items-center px-6 py-2 bg-primary text-on-primary rounded-lg font-bold hover:opacity-80 transition-all active:scale-[0.98] cursor-pointer"
              >
                List Vehicle
              </button>
            )}

            {/* User Session Profile display */}
            {currentUser ? (
              <div className="flex items-center gap-2 border-l border-outline-variant pl-4">
                <span 
                  onClick={() => onSelectType('dashboard')}
                  className="text-body-md font-bold text-primary cursor-pointer hover:underline"
                  title="My Dashboard"
                >
                  Hi, {currentUser.firstName}
                </span>
                <button 
                  onClick={onLogout}
                  title="Logout"
                  className="material-symbols-outlined cursor-pointer hover:text-red-600 transition-colors flex items-center justify-center p-1 rounded hover:bg-surface-container-low"
                >
                  logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => onSelectType('auth')}
                className="flex items-center gap-2 px-5 py-2 bg-primary text-white font-bold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer text-sm"
              >
                <span className="material-symbols-outlined text-[18px]">account_circle</span>
                Login / Sign Up
              </button>
            )}


          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
