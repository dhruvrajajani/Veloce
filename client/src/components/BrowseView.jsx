import React, { useState, useEffect } from 'react';

const AVAILABLE_MAKES = [
  'Porsche',
  'BMW',
  'Ducati',
  'Ferrari',
  'Tesla',
  'Ford',
  'Land Rover',
  'Triumph',
  'Husqvarna'
];

const YEARS = ['2024', '2023', '2022', '2021', 'Classic (Pre-1990)'];

const BrowseView = ({ 
  listings, 
  onFilterChange, 
  initialFilters, 
  loading,
  onSelectVehicle
}) => {
  const [types, setTypes] = useState(
    initialFilters.type ? [initialFilters.type] : ['car', 'bike']
  );
  const [selectedMakes, setSelectedMakes] = useState(
    initialFilters.makes ? initialFilters.makes.split(',') : []
  );
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || '');
  const [year, setYear] = useState(initialFilters.year || 'Any Year');
  const [sort, setSort] = useState(initialFilters.sort || 'Newest Arrivals');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Synchronize when parent navigation overrides filters (e.g. clicking "Cars" in Navbar)
  useEffect(() => {
    if (initialFilters.type) {
      setTypes([initialFilters.type]);
    } else {
      setTypes(['car', 'bike']);
    }
    setSelectedMakes(initialFilters.makes ? initialFilters.makes.split(',') : []);
    setMinPrice(initialFilters.minPrice || '');
    setMaxPrice(initialFilters.maxPrice || '');
    setYear(initialFilters.year || 'Any Year');
    setSort(initialFilters.sort || 'Newest Arrivals');
    setCurrentPage(1); // Reset page on filter changes
  }, [initialFilters]);

  // Trigger filter changes back to parent
  const applyFilters = (updatedFields = {}) => {
    const currentTypes = updatedFields.types !== undefined ? updatedFields.types : types;
    const currentMakes = updatedFields.makes !== undefined ? updatedFields.makes : selectedMakes;
    const currentMinPrice = updatedFields.minPrice !== undefined ? updatedFields.minPrice : minPrice;
    const currentMaxPrice = updatedFields.maxPrice !== undefined ? updatedFields.maxPrice : maxPrice;
    const currentYear = updatedFields.year !== undefined ? updatedFields.year : year;
    const currentSort = updatedFields.sort !== undefined ? updatedFields.sort : sort;

    const filters = {};
    
    if (currentTypes.length === 1) {
      filters.type = currentTypes[0];
    } else {
      filters.type = '';
    }

    if (currentMakes.length > 0) {
      filters.makes = currentMakes.join(',');
    } else {
      filters.makes = '';
    }

    filters.minPrice = currentMinPrice;
    filters.maxPrice = currentMaxPrice;
    filters.year = currentYear === 'Any Year' ? '' : currentYear;
    filters.sort = currentSort;

    setCurrentPage(1); // Reset pagination page to 1
    onFilterChange(filters);
  };

  const handleTypeChange = (type) => {
    let newTypes;
    if (types.includes(type)) {
      newTypes = types.filter(t => t !== type);
    } else {
      newTypes = [...types, type];
    }
    setTypes(newTypes);
    applyFilters({ types: newTypes });
  };

  const handleMakeChange = (make) => {
    let newMakes;
    if (selectedMakes.includes(make)) {
      newMakes = selectedMakes.filter(m => m !== make);
    } else {
      newMakes = [...selectedMakes, make];
    }
    setSelectedMakes(newMakes);
    applyFilters({ makes: newMakes });
  };

  const handleReset = () => {
    setTypes(['car', 'bike']);
    setSelectedMakes([]);
    setMinPrice('');
    setMaxPrice('');
    setYear('Any Year');
    setSort('Newest Arrivals');
    setCurrentPage(1);
    onFilterChange({
      type: '',
      makes: '',
      minPrice: '',
      maxPrice: '',
      year: '',
      sort: 'Newest Arrivals'
    });
  };

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

  // Calculate Paginated Sub-array
  const totalPages = Math.ceil(listings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedListings = listings.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 flex-grow">
      <div className="flex flex-col md:flex-row gap-gutter">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div className="flex justify-between items-center border-b border-outline-variant pb-4">
            <h2 className="font-headline-md text-headline-md text-primary font-bold">Filters</h2>
            <button 
              onClick={handleReset}
              className="text-label-sm font-label-sm text-secondary hover:text-primary uppercase tracking-wider transition-colors cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Vehicle Type */}
          <section>
            <h3 className="text-body-md font-bold text-primary mb-4">Vehicle Type</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={types.includes('car')}
                  onChange={() => handleTypeChange('car')}
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary focus:ring-0"
                />
                <span className="text-body-md text-on-surface-variant group-hover:text-primary transition-colors select-none font-semibold">Cars</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={types.includes('bike')}
                  onChange={() => handleTypeChange('bike')}
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary focus:ring-0"
                />
                <span className="text-body-md text-on-surface-variant group-hover:text-primary transition-colors select-none font-semibold">Bikes</span>
              </label>
            </div>
          </section>

          {/* Make checklist */}
          <section>
            <h3 className="text-body-md font-bold text-primary mb-4">Make</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
              {AVAILABLE_MAKES.map((make) => (
                <label key={make} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={selectedMakes.includes(make)}
                    onChange={() => handleMakeChange(make)}
                    className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary focus:ring-0"
                  />
                  <span className="text-body-md text-on-surface-variant group-hover:text-primary transition-colors select-none font-semibold">{make}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Price Range */}
          <section>
            <h3 className="text-body-md font-bold text-primary mb-4">Price Range</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-outline">Min</label>
                <input 
                  type="number" 
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  onBlur={() => applyFilters({ minPrice })}
                  onKeyDown={(e) => e.key === 'Enter' && applyFilters({ minPrice })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-primary font-semibold" 
                  placeholder="$0" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-outline">Max</label>
                <input 
                  type="number" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  onBlur={() => applyFilters({ maxPrice })}
                  onKeyDown={(e) => e.key === 'Enter' && applyFilters({ maxPrice })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-primary font-semibold" 
                  placeholder="$500k+" 
                />
              </div>
            </div>
          </section>

          {/* Year selection */}
          <section>
            <h3 className="text-body-md font-bold text-primary mb-4">Year</h3>
            <select 
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                applyFilters({ year: e.target.value });
              }}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none appearance-none transition-all text-primary font-semibold"
            >
              <option>Any Year</option>
              {YEARS.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </section>
        </aside>

        {/* Listing Grid Section */}
        <section className="flex-grow">
          {loading ? (
            <div className="py-24 text-center">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-on-surface-variant">Updating listings catalog...</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <p className="text-body-lg font-body-lg text-on-surface-variant">
                  Showing <span className="font-bold text-primary">{listings.length}</span> luxury vehicles
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-body-md text-outline">Sort by:</span>
                  <select 
                    value={sort}
                    onChange={(e) => {
                      setSort(e.target.value);
                      applyFilters({ sort: e.target.value });
                    }}
                    className="bg-transparent border-none text-primary font-bold focus:ring-0 cursor-pointer outline-none"
                  >
                    <option>Newest Arrivals</option>
                    <option>Price: High to Low</option>
                    <option>Price: Low to High</option>
                    <option>Year: Newest First</option>
                  </select>
                </div>
              </div>

              {paginatedListings.length === 0 ? (
                <div className="py-24 text-center border border-dashed border-outline-variant rounded-xl bg-surface-container-lowest">
                  <span className="material-symbols-outlined text-outline text-5xl mb-4">search_off</span>
                  <p className="text-primary font-bold text-lg">No vehicles found</p>
                  <p className="text-on-surface-variant text-sm mt-1">Try resetting the filters or modifying your search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {paginatedListings.map((vehicle) => (
                    <div 
                      key={vehicle._id} 
                      onClick={() => onSelectVehicle && onSelectVehicle(vehicle._id)}
                      className="group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0px_8px_30px_rgba(0,0,0,0.08)] hover:scale-[1.01] flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <img 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                            src={vehicle.imageUrl} 
                            alt={vehicle.title}
                            onError={(e) => {
                              e.target.onerror = null; 
                              e.target.src = vehicle.type === 'car' 
                                ? "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
                                : "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80";
                            }}
                          />
                          {vehicle.isFeatured && (
                            <div className="absolute top-4 left-4 bg-primary text-on-primary text-[10px] font-bold px-3 py-1 uppercase rounded-full tracking-widest">
                              Featured
                            </div>
                          )}
                          <button 
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white transition-colors group/heart"
                          >
                            <span className="material-symbols-outlined text-white group-hover/heart:text-primary transition-colors">favorite</span>
                          </button>
                        </div>
                        
                        <div className="p-6">
                          <h4 className="font-headline-md text-headline-md text-primary mb-2 line-clamp-1">{vehicle.title}</h4>
                          <p className="text-primary font-bold text-headline-md mb-4">{formatPrice(vehicle.price)}</p>
                          
                          <div className="grid grid-cols-3 gap-2 py-4 border-y border-outline-variant mb-6">
                            <div className="flex flex-col items-center justify-center text-center">
                              <span className="material-symbols-outlined text-outline mb-1 text-[20px]">speed</span>
                              <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">
                                {formatMileage(vehicle.mileage)}
                              </span>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center">
                              <span className="material-symbols-outlined text-outline mb-1 text-[20px]">settings_input_component</span>
                              <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">
                                {vehicle.type === 'car' ? (vehicle.transmission || 'Auto') : (vehicle.engineSize || 'Manual')}
                              </span>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center">
                              <span className="material-symbols-outlined text-outline mb-1 text-[20px]">local_gas_station</span>
                              <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">
                                {vehicle.fuelType || 'Petrol'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="px-6 pb-6 mt-auto">
                        <button className="w-full border border-primary text-primary py-3 rounded-lg font-bold hover:bg-primary hover:text-on-primary transition-all active:scale-[0.98] cursor-pointer">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Dynamic Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-16 flex justify-center items-center gap-4">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-primary hover:text-on-primary transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-primary cursor-pointer"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors cursor-pointer font-bold ${
                          currentPage === pageNum
                            ? 'bg-primary text-on-primary border-primary'
                            : 'border-outline-variant hover:bg-surface-container-low'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-primary hover:text-on-primary transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-primary cursor-pointer"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default BrowseView;
