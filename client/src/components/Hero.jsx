import React, { useState } from 'react';

const Hero = ({ onSearch }) => {
  const [make, setMake] = useState('All Makes');
  const [model, setModel] = useState('');
  const [type, setType] = useState('All Types');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      make: make === 'All Makes' ? '' : make,
      model,
      type: type === 'All Types' ? '' : (type === 'Coupe' || type === 'Sedan' || type === 'SUV' ? 'car' : type.toLowerCase())
      // Note: mapping standard form inputs.
    });
  };

  return (
    <section className="relative h-[870px] min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDKSl6_vxzQ1atmgmecwQcDXV4f_-_nn4kNlq4l92umh_AyimUkjo8hVZi9dRhbetfT3vm4pXuVwqq5Q2zcvgZoYi7OFf8-ZXz1XbDmcMjwPsNN10dD-z85ix5zB4Eeu46PjI9PzP6zKto-R2acKeZaeD8N5pNmrdpGKKxiN6H-Kv3_-j4pSkCXwv5UYG7w3fAbXPsdKgN1mwJ6tcZohQC-RyUvNGtjCnuYg3mwiQrDlAVbJtiXGDOY')" 
          }}
        ></div>
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="max-w-2xl mb-12">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">
            Precision machines, <br/>curated for enthusiasts.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Discover the most exclusive automotive collection. From vintage classics to modern hypercars, every listing is verified.
          </p>
        </div>
        
        {/* Search Bar Component */}
        <form 
          onSubmit={handleSubmit}
          className="bg-surface-container-lowest p-2 md:p-4 rounded-xl shadow-[0px_8px_30px_rgba(0,0,0,0.08)] flex flex-col md:flex-row items-center gap-2 max-w-4xl border border-outline-variant"
        >
          <div className="w-full md:w-1/3 px-4 py-2 border-b md:border-b-0 md:border-r border-outline-variant">
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase">Make</label>
            <select 
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="w-full bg-transparent border-none p-0 focus:ring-0 text-primary font-semibold outline-none"
            >
              <option>All Makes</option>
              <option>Porsche</option>
              <option>Ferrari</option>
              <option>BMW</option>
              <option>Ducati</option>
              <option>Triumph</option>
            </select>
          </div>
          <div className="w-full md:w-1/3 px-4 py-2 border-b md:border-b-0 md:border-r border-outline-variant">
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase">Model</label>
            <input 
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-transparent border-none p-0 focus:ring-0 text-primary font-semibold placeholder:text-outline-variant outline-none" 
              placeholder="e.g. 911 GT3"
            />
          </div>
          <div className="w-full md:w-1/3 px-4 py-2">
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase">Type</label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-transparent border-none p-0 focus:ring-0 text-primary font-semibold outline-none"
            >
              <option>All Types</option>
              <option>Coupe</option>
              <option>Sedan</option>
              <option>SUV</option>
              <option>Bike</option>
            </select>
          </div>
          <button 
            type="submit"
            className="w-full md:w-auto px-10 py-4 bg-primary text-on-primary rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined">search</span>
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
