import React from 'react';
import LoginPage from './components/LoginPage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 overflow-hidden bg-[#0f0f0f]">
       {/* 
         Shopify 'Aurora' Ambient Background 
         Uses large blurred orbs to create a rich, deep mesh gradient effect.
       */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-[#2E2B5F] blur-[140px] opacity-70 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-[#0F4C4C] blur-[120px] opacity-60" />
      <div className="absolute top-[30%] left-[40%] w-[50%] h-[50%] rounded-full bg-[#202a35] blur-[100px] opacity-50" />
      <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-[#364d4b] blur-[80px] opacity-40" />

      {/* Main Content */}
      <div className="relative z-10 w-full flex justify-center">
        <LoginPage />
      </div>
      
      {/* Bottom Footer - Standard Identity Footer */}
      <div className="absolute bottom-6 w-full text-center z-10">
        <div className="flex justify-center space-x-6 text-[13px] font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Help</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </div>
  );
};

export default App;