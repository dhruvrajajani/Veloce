import React from 'react';

const ListingsGrid = ({ title, subtitle, listings, type, onSelectVehicle }) => {
  if (listings.length === 0) {
    return (
      <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">{title}</h2>
        <p className="text-on-surface-variant font-body-lg">No listings found matching your criteria.</p>
      </section>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatMileage = (mi) => {
    return new Intl.NumberFormat('en-US').format(mi) + ' mi';
  };

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">{title}</h2>
          {subtitle && <p className="text-on-surface-variant font-body-lg">{subtitle}</p>}
        </div>
        <a className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline" href="#">
          View All {type === 'car' ? 'Cars' : 'Bikes'}
          <span className="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>

      {type === 'car' ? (
        // Cars Grid (3 columns, 16:9 ratio cards)
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {listings.map((car) => (
            <div 
              key={car._id} 
              onClick={() => onSelectVehicle && onSelectVehicle(car._id)}
              className="group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-4 bg-surface-container">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    src={car.imageUrl} 
                    alt={car.title}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  {car.isFeatured && (
                    <div className="absolute top-4 right-4 bg-surface-container-lowest/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="text-label-sm font-bold text-primary">Featured</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="font-headline-md text-primary font-bold">{car.title}</h3>
                  <p className="font-headline-md text-primary font-bold">{formatPrice(car.price)}</p>
                </div>
                <div className="flex items-center gap-4 text-on-surface-variant mb-4 font-semibold">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">speed</span>
                    <span className="text-sm">{formatMileage(car.mileage)}</span>
                  </div>
                  {car.transmission && (
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-lg">settings</span>
                      <span className="text-sm">{car.transmission}</span>
                    </div>
                  )}
                  {car.fuelType && (
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-lg">local_gas_station</span>
                      <span className="text-sm">{car.fuelType}</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <hr className="border-outline-variant mb-4"/>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-on-surface-variant font-medium">{car.location || 'Unknown Location'}</p>
                  <button className="text-primary hover:underline font-bold text-sm cursor-pointer">Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Bikes Grid (4 columns, 4:3 ratio cards)
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {listings.map((bike) => (
            <div 
              key={bike._id} 
              onClick={() => onSelectVehicle && onSelectVehicle(bike._id)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4 bg-surface-container">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src={bike.imageUrl} 
                  alt={bike.title}
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                {bike.isFeatured && (
                  <div className="absolute top-4 right-4 bg-surface-container-lowest/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-label-sm font-bold text-primary">Featured</span>
                  </div>
                )}
              </div>
              <h3 className="font-headline-md text-primary text-lg font-bold">{bike.title}</h3>
              <p className="font-bold text-primary mb-2">{formatPrice(bike.price)}</p>
              <div className="flex items-center gap-3 text-xs text-on-surface-variant font-semibold">
                <span>{bike.year}</span>
                <span>•</span>
                <span>{formatMileage(bike.mileage)}</span>
                {bike.engineSize && (
                  <>
                    <span>•</span>
                    <span>{bike.engineSize}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ListingsGrid;
