import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-surface dark:bg-surface-container-highest border-t border-outline-variant dark:border-outline full-width mt-16">
      <div className="w-full px-margin-mobile md:px-margin-desktop py-12 max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <a className="font-headline-md text-headline-md text-primary dark:text-primary-fixed" href="#">Veloce</a>
          <p className="text-on-surface-variant text-sm max-w-xs text-center md:text-left">
            The world's premier digital showroom for luxury and enthusiast vehicles.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-body-md font-body-md">
          <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Contact Support</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Buyer Protection</a>
        </div>
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex gap-4 text-on-surface-variant">
            <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">public</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">share</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">mail</span>
          </div>
          <p className="text-on-surface-variant text-xs">© 2024 Veloce Automotive Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
