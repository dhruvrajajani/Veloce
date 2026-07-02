import React from 'react';

const BentoSection = ({ onOpenListModal }) => {
  return (
    <section className="py-24 bg-surface-container-highest">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full md:h-[500px]">
          {/* Main Bento Box */}
          <div className="md:col-span-8 relative overflow-hidden rounded-2xl group min-h-[300px] md:min-h-0">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFSlIKQOqPPtrGBo2YckF_RBS3k3_rejHUUgNCeysLfBRFaIl5YCtV0mjjkobbULl_g3l5ikVm65eA5DOZWX_4C7vcir-AayY3hZOnG53vMY-AlMM0CafRJAnJ97svNMNOA8YeDMZR6UMTZCC5KSvsBbVD7sDmdTZy9uaw6Na_ocHdldT_EmnU6RLWUoqlhO6ohz_TZBQJT6x7NRvCK5YJKEe5DzrXDJDh82okDBq8F5rCHlLO16eT')"
              }}
            ></div>
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative h-full flex flex-col justify-end p-12 text-white">
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-4">Sell with Confidence</h2>
              <p className="text-lg max-w-md mb-8 opacity-90">
                Reach our global network of qualified buyers. List your vehicle today and get a guaranteed valuation within 24 hours.
              </p>
              <button 
                onClick={onOpenListModal}
                className="w-fit px-8 py-3 bg-white text-primary rounded-lg font-bold hover:bg-opacity-90 transition-all active:scale-[0.98]"
              >
                Start Listing
              </button>
            </div>
          </div>

          {/* Sub Bento Boxes */}
          <div className="md:col-span-4 flex flex-col gap-8">
            <div className="bg-primary h-1/2 rounded-2xl p-8 flex flex-col justify-between text-white group cursor-pointer overflow-hidden relative min-h-[200px] md:min-h-0">
              <div className="relative z-10">
                <h3 className="font-headline-md mb-2">Private Collection</h3>
                <p className="text-sm opacity-80">Exclusive access for VIP members only.</p>
              </div>
              <span className="material-symbols-outlined self-end text-6xl opacity-20 absolute -bottom-4 -right-4 transition-transform group-hover:translate-x-2">lock</span>
              <button className="relative z-10 text-white font-bold text-sm flex items-center gap-2 self-start hover:underline">
                Apply Now <span className="material-symbols-outlined text-sm">arrow_outward</span>
              </button>
            </div>
            
            <div className="bg-surface-container-lowest h-1/2 rounded-2xl p-8 flex flex-col justify-between border border-outline-variant group cursor-pointer min-h-[200px] md:min-h-0">
              <div>
                <h3 className="font-headline-md text-primary mb-2">Market Report</h3>
                <p className="text-sm text-on-surface-variant">Real-time data on luxury car values.</p>
              </div>
              <button className="text-primary font-bold text-sm flex items-center gap-2 self-start hover:underline">
                Read Trends <span className="material-symbols-outlined text-sm">trending_up</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoSection;
