import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/UI/Navbar';
import MobileNav from './components/UI/MobileNav';
import Starfield from './components/Background/Starfield';
import AnimatedRoutes from './components/UI/AnimatedRoutes';
import CustomCursor from './components/UI/CustomCursor';
import SearchOverlay from './components/UI/SearchOverlay';

function App() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen relative overflow-hidden font-sans text-white">
          {/* Custom Interactive Cursor */}
          <CustomCursor />

          {/* Global 3D Background */}
          <Starfield />

          {/* Navigation */}
          <Navbar onOpenSearch={() => setShowSearch(true)} />
          <MobileNav onOpenSearch={() => setShowSearch(true)} />

          <SearchOverlay isOpen={showSearch} onClose={() => setShowSearch(false)} />

          {/* Page Routing */}
          <div className="relative z-10 w-full flex justify-center">
            <AnimatedRoutes />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
