const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Listing = require('../models/Listing');
const Subscriber = require('../models/Subscriber');

// Load env variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const listings = [
  // Mockup 1: Cars
  {
    title: '2023 Porsche 911 Targa 4S',
    type: 'car',
    make: 'Porsche',
    model: '911 Targa 4S',
    year: 2023,
    price: 168500,
    mileage: 2400,
    transmission: 'PDK Auto',
    fuelType: 'Gasoline',
    location: 'Stuttgart, Germany',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqOUEL3Wjb9iVVI_h4_Z_sbusJp9lp4AxjgEVlmq7k4FRbWOfoPggL2rTQWQZ1VjjOEdL4-Vlw9ORDal8UNJq_0ZjwO7U2ifcyXeY1vOK3ceE87kb0SQsioNBvhTxaGfsekxg3HG89nWw3LbmtUJeI6HodoE2C-N-cgYxBfpNhRu8xsBsFIIQdvF6oQKPhWVxXhik92TzIQU1YOCT_j4kcm3NKgf3aoiGaXTM0DfmxoO4igyOqSAlV',
    isFeatured: true,
    owner: ''
  },
  {
    title: '2022 Ferrari Roma',
    type: 'car',
    make: 'Ferrari',
    model: 'Roma',
    year: 2022,
    price: 245000,
    mileage: 1200,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    location: 'Modena, Italy',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_EXxXNFEEJEicRb3Ah_J-TNOg5J_hXUbNWpIhws0BxtsRfkmhGsgLaNVn7QqlIK88EZc1Dmk1vV_6G-AFdfwdK40cDMkPe27-B4Nh3ztnCF8FIrHw65JImnVBSNbcFDfIGHBUCEJFc4OutbNPc6KOKqD1wgLq_48oAZYldu-2fY-HdQ7Ki-AVUa7Ej1zzAEoRJrY0Wyh__EosL49uMZa_t2FdkAI6N6KIbx5gKnHP2kZt2Nwkwcyh',
    isFeatured: true,
    owner: ''
  },
  {
    title: '2024 BMW M4 Competition',
    type: 'car',
    make: 'BMW',
    model: 'M4 Competition',
    year: 2024,
    price: 92000,
    mileage: 500,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    location: 'Munich, Germany',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcmy4FUmqALXi4pQ2RCPTm18zj6ogiQp6SVBU5h2-yiDbgeOH57nbgcENfpzkwXER-YGy4yC3nZ3pyDBdx8P5FvhEVlBhPW18WULo3AaNuhxccz0d-2MHQ-tqkeWl3G_dqTj3z5X-mTPNNX5Va6p79MnOm27k1SqvQUVGkIKH5ltoJxYm9VMLfPI41dY9maF9LnKpYBlAEqFzVYpl0IAWvlmkoegS7bn4zF5e2AwtZ27krG4DcHj61',
    isFeatured: true,
    owner: ''
  },
  
  // Mockup 2: Cars & Bikes
  {
    title: '2024 Porsche 911 GT3',
    type: 'car',
    make: 'Porsche',
    model: '911 GT3',
    year: 2024,
    price: 225000,
    mileage: 1250,
    transmission: 'PDK',
    fuelType: 'Petrol',
    location: 'Stuttgart, Germany',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfuIw5xg_xAyONo9w1g63vmpuZMaX_fYmglw6MBbU16j6JYhtYC6lYCcWlg5olM6PgYm8DgWsbaBcUYZEcz2WJT5b7xSbJSeGUn1Hx6ckaYr__ahqbYvPnyRsNiOJsFURgJa_LaRx4YYFO4LNd-5JVwStj4KYpt4g3uSZgL73NYwsXxL6BG0Tbq77mAjN53WSJRxF6qGJs0eJk6GvjoX2STLRAku8FtmjuVwVz9rElpHNH1E_xM0-J',
    isFeatured: true,
    owner: ''
  },
  {
    title: '2023 BMW M4 Competition',
    type: 'car',
    make: 'BMW',
    model: 'M4 Competition',
    year: 2023,
    price: 89900,
    mileage: 8400,
    transmission: 'Auto',
    fuelType: 'Petrol',
    location: 'Munich, Germany',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwBTCYpfvWp3D-HudH8jiPv4xLrrzU2o4MwETHln8VP1ngDf8C9Tb4cj7K_b4n9Hpl-d4E6RJyBcnU-0lK8NWhlmIHIVK0VTmF75bnxT3f9O3S2BTLnTwYC5rtFCc4i1JXI3Ai7qVPLn5IY4FgZ2oQA7NVHS681upwXJPUMTfCjuVqdriqFEb-7rS96CC_98k0gTnho7NlzhWxf0c8xINXQJohHczkIvuTRevWylQRcygckQ-ZkK6y',
    isFeatured: false,
    owner: ''
  },
  {
    title: '2024 Ducati Panigale V4',
    type: 'bike',
    make: 'Ducati',
    model: 'Panigale V4',
    year: 2024,
    price: 44500,
    mileage: 0,
    transmission: 'Manual',
    engineSize: '1103cc',
    fuelType: 'Petrol',
    location: 'Bologna, Italy',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDon-0oAcs2bpt9gpYM9HKqvv_sardgXFP3H5Pa58abXm7_0a8MPX_IKD2ic11SdQwNeRFtXvs056kP0eMjNC7kzpT1ZcX0rtqdId57SKjANIFiPD6LwjbMxI6h5YvKB07-UCy2xOV2aigCfYrz8oj_rb3TzUIgG1EJkq-Ywgxx2WR6KyPARvVYKAc0Jprqvnyws9qReOl1H-XbjlqoYLko6CB9v76GF5Mxm7xkUFChLosZfVllTDRZ',
    isFeatured: false,
    owner: ''
  },
  {
    title: '2024 Tesla Model S Plaid',
    type: 'car',
    make: 'Tesla',
    model: 'Model S Plaid',
    year: 2024,
    price: 94990,
    mileage: 150,
    transmission: 'Direct',
    fuelType: 'Electric',
    location: 'San Jose, USA',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtl0o9oh-DqbMrwkTTkjFXWUZlOcfAEZQ38yTaIOGRMFXUA3fSt8DUKbPMOVDsI7SDgOegN_Kqfw12gOSkZcoUFot5NtJhCy8ksr59K-SKvBPrmozHhfmmoN0og8FKnyv5dh90NzT9VRD-9HcOPYfM7X7E1x_L26PRy2M5-WnILS0Oaf4IQDhmeomcgKCkB6wpAiJZSTKEZLrUYBQsDnmFCqrfbrBDTcjjxL84K_kFivEyuqF559_9',
    isFeatured: false,
    owner: ''
  },
  {
    title: '1967 Ford Mustang GT',
    type: 'car',
    make: 'Ford',
    model: 'Mustang GT',
    year: 1967,
    price: 145000,
    mileage: 42000,
    transmission: 'Manual',
    fuelType: 'Petrol',
    location: 'Detroit, USA',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvHgaOgOLFSgyUMRN8hXs0CJtIkGPaV7naGcgLyPET1vXu2bhhh4BogyJ50KJQbS3zHAC-71rYT5WK2FKDqlKieAl-QP5-FBhir6aa9u-5R_KCqIXrh8wqN712a5TREEjvSZJfQJQvj8tei-kGJ8yKmSNd57r5L6QgPoqkNJE6DPypyoHmzuyDxh-LuBN1x_81XmuBDZgKNbUAeyJnDsZfJW8pVunPBTxk7jQhLTcqB5wE1b4hfLS8',
    isFeatured: false,
    owner: ''
  },
  {
    title: '2024 Land Rover Defender',
    type: 'car',
    make: 'Land Rover',
    model: 'Defender',
    year: 2024,
    price: 118600,
    mileage: 500,
    transmission: 'Auto',
    fuelType: 'Hybrid',
    location: 'Solihull, UK',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiemdOzCV8zU3-bnbbcG-H6rFw0XPjnktxDjjg3ZxNVMfIdHn5NBysjzplB3RjXfkb2Zpj5BgeCO5tLOwDe_K2QLpniY3rPUaF7Kw5fWrPrUq5vv_XEuTQh4MdUKloh7SGUHs9gOgK3V6WbvEOy8evun2z_uYmuhW9OfIRxlrW7TPj-92Clgl1h38rIZw5GXL9UA51Md8IBAy-OTi6eE8Ud5DhekTwPel-GL9urITLGcoSn87exM0x',
    isFeatured: false,
    owner: ''
  },

  // Mockup 1: Bikes
  {
    title: 'Ducati Panigale V4 S',
    type: 'bike',
    make: 'Ducati',
    model: 'Panigale V4 S',
    year: 2024,
    price: 31900,
    mileage: 0,
    transmission: '6-speed',
    engineSize: '1103cc',
    fuelType: 'Petrol',
    location: 'Bologna, Italy',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB52fsdQlg0AmU6j7uHGk6x0fsqGv_eXimhVlmnJ8uGtZv-xsdjfAQsbxYWvOgSVL5Il2GiaCDvIJlwVAwqH30_zu9YAZyV4dmOVgKDkLRFLvuDtz78TlaqGacEhuxDnlfr4nxCa3Lh4Yd0LSmUVLEgE9hJafYbBarpNcfjrp28x79iqlXk_QfU05Pw4km7g274TwapI9tC6UTb0EzODt0PEEbt8p6RMUOaDXVKN2x0vOFpDhPcYH2D',
    isFeatured: true,
    owner: ''
  },
  {
    title: 'BMW R 18 Custom',
    type: 'bike',
    make: 'BMW',
    model: 'R 18 Custom',
    year: 2023,
    price: 22500,
    mileage: 1800,
    transmission: '6-speed',
    engineSize: '1802cc',
    fuelType: 'Petrol',
    location: 'Berlin, Germany',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFvm6yXRUghzWu-1b9JaIcZG6B2bZl5pVjChMIlTZE1FqBDtSLdEUOPTDG5T93LgUDWMWQFsg1mIn01g2y_OdN0uuVJqOBQAMmBh5HEqW9bnrY6KqcMf9GykNLBZ8DT9vkBjBDmn3wCSojGLz14eyv-aswnL1IP785DNR4gP4b3XX0NOClf6cs5Lu5zI0DLpw48YjTh5TXcT8-jWakSepg7tow8Wx5r-2LwgZVYOUWT1sAv5MqAvnN',
    isFeatured: true,
    owner: ''
  },
  {
    title: 'Triumph Bonneville T120',
    type: 'bike',
    make: 'Triumph',
    model: 'Bonneville T120',
    year: 2022,
    price: 14200,
    mileage: 3500,
    transmission: '6-speed',
    engineSize: '1200cc',
    fuelType: 'Petrol',
    location: 'Hinckley, UK',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-d1jGtA_isQ8iwC_pxC-72jzrqC7gMupQp48wJYk8rnsqoA8BOC5icwI5IWjFhMRanKwthHlFMhmm2rSGSRNrBUjgrafr0PMD3AaaplDWkHNnq0MBVN09uGfNRqoMByFkjtADeU-PfZrlotyHuK4PMz1_1MKmJcMQVRk819yL9Km8xcuyNqvPSkDaBgwIL51sd6XyricOSvKYlNNpzq0qfik1525CaR49tgdtvDcMqpk8m2MNg3PL',
    isFeatured: true,
    owner: ''
  },
  {
    title: 'Husqvarna Vitpilen 701',
    type: 'bike',
    make: 'Husqvarna',
    model: 'Vitpilen 701',
    year: 2023,
    price: 9800,
    mileage: 900,
    transmission: '6-speed',
    engineSize: '692cc',
    fuelType: 'Petrol',
    location: 'Huskvarna, Sweden',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsYaPMRxQo6gZQ85EjmHa-Ahtoi9jkC3_u4WSH1zqVzaynJsjWxIFaJi5WLshBHcxCfDyItev-SRw4oReKYWOoi03MjodDL27CHOYhADK5vWSbxJCevhLa-fiUjgj3W1_7mm3RJm0YcJAKbmfdJ5l1VtHb3rwekdXoCp2H24i3DsxbVAv2nHd5NKjUlPUcGjXErqX9zYDbT44AxLWE1-_439u8WwZOKWPWURSzS06hcma544oT84K4',
    isFeatured: true,
    owner: ''
  },

  // Mockup 3 Details Screen: Veloce Apex GT
  {
    title: '2024 Veloce Apex GT',
    type: 'car',
    make: 'Veloce',
    model: 'Apex GT',
    year: 2024,
    price: 349000,
    mileage: 1240,
    transmission: '7-Speed Dual Clutch',
    fuelType: 'Petrol',
    location: 'Beverly Hills, CA',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW3_3F935ZDU5BLyZ6Z3S0cwbuWh2aPTe0Q4iBl1tysDZ5sotyDgCmH5MUfyQ7V9qahwdAd7B_v1gclXHrPCWnHFtLGT7ZgyFr3CTBFUeDNsN1f8daDnBOSR_XVBp3VuphYFZmWKXGArNvPMUIra2HOe0kG605RDAPkFEuP8i0Cfu3HXjYreZEflmXrN5T0baFUX0FjvhuQEu3oKg4i3TsXeYEdn1gh3e3Hp2ay1e2cS-oDYGe9Cnx',
    isFeatured: true,
    owner: '',
    narrative: 'The 2024 Veloce Apex GT represents the pinnacle of modern automotive engineering, blending uncompromising performance with refined luxury. Hand-assembled at our Maranello-inspired facility, this specific chassis is one of only 500 units produced globally, finished in the rare Nero Carbonio Metallic. Equipped with the Track-Focus Package, it features enhanced aerodynamics and a lightened chassis. The interior is a masterclass in ergonomics, draped in bespoke charcoal Alcantara with contrasting silver stitching. This vehicle has been maintained by Veloce Certified Technicians since delivery and remains in showroom condition.',
    specifications: {
      'Engine': '4.0L V8 Twin-Turbo',
      'Transmission': '7-Speed Dual Clutch',
      'Power': '720 HP @ 7,500 RPM',
      'Torque': '568 lb-ft @ 5,500 RPM',
      '0-60 MPH': '2.8 Seconds',
      'Top Speed': '212 MPH',
      'Drivetrain': 'Rear Wheel Drive',
      'Weight': '3,142 lbs'
    },
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDW3_3F935ZDU5BLyZ6Z3S0cwbuWh2aPTe0Q4iBl1tysDZ5sotyDgCmH5MUfyQ7V9qahwdAd7B_v1gclXHrPCWnHFtLGT7ZgyFr3CTBFUeDNsN1f8daDnBOSR_XVBp3VuphYFZmWKXGArNvPMUIra2HOe0kG605RDAPkFEuP8i0Cfu3HXjYreZEflmXrN5T0baFUX0FjvhuQEu3oKg4i3TsXeYEdn1gh3e3Hp2ay1e2cS-oDYGe9Cnx',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBWs9HvZCtjwHURisOvb5KBOHBAl6pw6zQd1ZVM0bHhcS8S5zjRWwz-Wf10bRNgQlL-8bbKMdHns5LyqTyAs14OqPNz_C7V41A2hOjGBPi7AhW60WCpivOWl5S8hfwrVpq2DYx67bcO3aq7e7c-0f86-bAla3iKvmdzUJF2KBlXPK_2vhmP7P-n9AM4tZuZbBsRPi_f8GcEbxV0odyS5QkUHJETTG4_VB-sOvliu0mY0oBvIZ8XByTn',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCbY2TRfMCOaYaMyeMfVW9yd1uCIJrIT8AhYaXA88-xdV409F8U6JYSuNuAEIRKsyNyOI0Ci54R6C92E8CmbFYjAdkE9nk6Q6jUC4NIdBn3dihJ0gPGD3lcMSkQjh1GL-MZzdXSQ6FFLJBvi_c4QugZ1g3q1dOMNhJjkEtLuUfgX92VqtXnuF3oAIMV4ThCu8Y7iytpI1RQwVRjcgYz13f9bi9CsZskC35n-JoqWDUs28dpM64Kx6Lm',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuALwpzd6dl7akaAeRHpzJ8JYt0SIDLwEKpoIsuXnLpWOXH2a8KP5wYahp6RSceSts30A2RvDpNBPAliej3fv6HJs_SKwNJpdGYqaupsDHvkhmf0nzgdiP-rj5u4GnzbWze76umDTv0fZMfaIdjeD_5MK0QqJOR0b2bZf94gaj4xKfXmnGUsbU4F9n-vHwS5quxvz8yH5S-DaUczbJG7xI6dI7Oyce4o-rsZNiKf8ImWsTXVWISbijwY',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuABFY5ogGC7lHkimssI8ucJ6gIpZd8q4-hyyGEHj0Nbh9NQwcweYYmOIbRZlFg3YnPjY9IrHWrrS7yQGidBYWe_SAMH_4M2A87r7qdbpieRhgz7_y-zeSpj4KfXL2sky7om_awZ2ciRP0IL4PiSRz2QmoDt_bJrubmvm1sYwkcwnFuIb2ZWmOgjR1OjkDNJ5tJ3426_viJaFRKXUE8S_Hsta2rX6MC5Qu1QPJ_k79eO0xTdHqBGasP5',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCqon7AtZZncR4WtC7c8KBCn3tg07Qw4ttgomaCLi7jRgxRmzDZsEkEsq5HEpxyX_koxSubGdwY4cWiVshEgMgdAcOAEpUY0hZV59cFLSck2-uR4Yum0_22w1sS1g7xG-sraQZMsaGPxA9m8EF1rxMMyI78sv1UFFtCyGLWAijbzGOAeePsj5Bhe8O_OeUOp2jm9Yo5rSTTxAms8Klpu3Hm-RiKMunbTl_fCluELare5bv_If8RfTzm'
    ]
  },

  // Mockup 4 Dashboard Screen: User Listings
  {
    title: '2023 Stealth GT-R Special Edition',
    type: 'car',
    make: 'Nissan',
    model: 'Stealth GT-R',
    year: 2023,
    price: 184500,
    mileage: 1240,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    location: 'Beverly Hills, CA',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQDMnDbFKDaSJ4h_hkvIXa2G7BJVlgGo7Upqv1aJBXm1RHFv71olax78afRPgyonLyFMteYpZWZvscGKKk2vkNnaHjQLorknSXBfCm5mgTY_37c5OY01c1phUx__RqnjGmedP7I7MJdPUcD2CQAFMyrzTmWO9rTeRhuN7Q7vvvtS-sLepPu6rVx5fRlLCwJ_SjmESaCYNqMaBtD2qIOND5Uilbk142KUxwHnN2NGT0A5rhO4W6Hbdk',
    isFeatured: true,
    owner: 'demo@veloce.com'
  },
  {
    title: '1974 Heritage Classic Custom',
    type: 'bike',
    make: 'Heritage',
    model: 'Classic Custom',
    year: 1974,
    price: 28000,
    mileage: 15400,
    transmission: 'Manual',
    engineSize: '750cc',
    fuelType: 'Petrol',
    location: 'Beverly Hills, CA',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvemTq_4FauXYbHoauPE084ViIjpcAgNq53SqNNDQuaOJCSPGunikJ930bA7w8V1hemZFGRH8qdpgLP-ZPX3SHFH_VxzJbPeRpsZfu84vXmUFtE1eOHZFbAgZsBtFvutveCJxIL1iWcSPXg2lqnjFAZgIpfPS8bYM8LKzQBy0Nj5WBWV5idO7OFYJCP8P9xYvUSZblmIjBN8IkKPEQkDHrhs_BAPymrjzIYd8HTbLXxjJskiIZbeIj',
    isFeatured: false,
    owner: 'google.user@gmail.com'
  }
];

const seedDB = async () => {
  try {
    console.log(`Connecting to MongoDB using URI: ${process.env.MONGODB_URI}`);
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB connection established for seeding.');
    } catch (dbError) {
      console.error(`Atlas connection error: ${dbError.message}`);
      console.log('Attempting local fallback connection for seeding...');
      await mongoose.connect('mongodb://127.0.0.1:27017/veloce');
      console.log('MongoDB Connected (Local Fallback) for seeding.');
    }

    // Clear existing collections
    await Listing.deleteMany({});
    console.log('Cleared existing Listings.');
    await Subscriber.deleteMany({});
    console.log('Cleared existing Subscribers.');

    // Insert new listings
    const createdListings = await Listing.insertMany(listings);
    console.log(`Successfully seeded ${createdListings.length} vehicle listings!`);

    mongoose.connection.close();
    console.log('DB Connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
};

seedDB();
