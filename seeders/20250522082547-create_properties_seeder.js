'use strict';
const env = process.env.NODE_ENV || 'development';

const propertiesSeed = [
  {
    title: "Modern Family Home",
    description: "Spacious and modern 3-bedroom family home with a large compound and fitted kitchen.",
    offerType: "rent",
    amount: 1800,
    currency: "GHS",
    address: "42 Maple Crescent",
    country: "Ghana",
    region: "Greater Accra",
    rooms: 3,
    washrooms: 2
  },
  {
    title: "City Centre Apartment",
    description: "1-bedroom apartment in Accra Central with easy access to public transport.",
    offerType: "rent",
    amount: 1200,
    currency: "GHS",
    address: "15 Kwame Nkrumah Avenue",
    country: "Ghana",
    region: "Greater Accra",
    rooms: 1,
    washrooms: 1
  },
  {
    title: "Executive Condo",
    description: "Luxury 2-bedroom condo in Airport Residential Area with pool and gym access.",
    offerType: "sale",
    amount: 520000,
    currency: "GHS",
    address: "Airport Hills",
    country: "Ghana",
    region: "Greater Accra",
    rooms: 2,
    washrooms: 2
  },
  {
    title: "Coastal Retreat",
    description: "2-bedroom beachfront cottage ideal for vacation rentals.",
    offerType: "sale",
    amount: 385000,
    currency: "GHS",
    address: "Cape Coast Road",
    country: "Ghana",
    region: "Central",
    rooms: 2,
    washrooms: 1
  },
  {
    title: "Student Hostel Room",
    description: "Single room accommodation near KNUST with shared kitchen and Wi-Fi.",
    offerType: "rent",
    amount: 450,
    currency: "GHS",
    address: "Tech Junction",
    country: "Ghana",
    region: "Ashanti",
    rooms: 1,
    washrooms: 1
  },
  {
    title: "Spacious Detached House",
    description: "4-bedroom house with boys quarters and security post in Tema Community 18.",
    offerType: "sale",
    amount: 750000,
    currency: "GHS",
    address: "Tema Comm. 18",
    country: "Ghana",
    region: "Greater Accra",
    rooms: 4,
    washrooms: 3
  },
  {
    title: "Compact Studio Apartment",
    description: "Affordable self-contained studio in Achimota.",
    offerType: "rent",
    amount: 700,
    currency: "GHS",
    address: "Achimota Mile 7",
    country: "Ghana",
    region: "Greater Accra",
    rooms: 1,
    washrooms: 1
  },
  {
    title: "Townhouse in Estate",
    description: "3-bedroom townhouse in Devtraco Estate, Tema. Gated with 24/7 security.",
    offerType: "sale",
    amount: 620000,
    currency: "GHS",
    address: "Devtraco Courts",
    country: "Ghana",
    region: "Greater Accra",
    rooms: 3,
    washrooms: 2
  },
  {
    title: "Beachfront Villa",
    description: "5-bedroom luxury villa with pool and sea views in Keta.",
    offerType: "sale",
    amount: 980000,
    currency: "GHS",
    address: "Anloga Beach Road",
    country: "Ghana",
    region: "Volta",
    rooms: 5,
    washrooms: 4
  },
  {
    title: "Trendy Studio Loft",
    description: "Stylish loft with balcony in Kumasi city center. Open-concept layout.",
    offerType: "rent",
    amount: 950,
    currency: "GHS",
    address: "Ahodwo Roundabout",
    country: "Ghana",
    region: "Ashanti",
    rooms: 1,
    washrooms: 1
  },
  {
    title: "Luxury Hilltop Mansion",
    description: "6-bedroom mansion in Aburi with panoramic mountain views and garden.",
    offerType: "sale",
    amount: 1500000,
    currency: "GHS",
    address: "Aburi Hills",
    country: "Ghana",
    region: "Eastern",
    rooms: 6,
    washrooms: 5
  },
  {
    title: "East Legon Bedsitter",
    description: "Bedsitter with kitchenette and bathroom, walking distance to A&C Mall.",
    offerType: "rent",
    amount: 800,
    currency: "GHS",
    address: "East Legon",
    country: "Ghana",
    region: "Greater Accra",
    rooms: 1,
    washrooms: 1
  },
  {
    title: "Spintex Executive Apartment",
    description: "Fully furnished 2-bedroom apartment for rent in Spintex with generator.",
    offerType: "rent",
    amount: 2500,
    currency: "GHS",
    address: "Spintex Road",
    country: "Ghana",
    region: "Greater Accra",
    rooms: 2,
    washrooms: 2
  },
  {
    title: "Affordable Kumasi House",
    description: "2-bedroom house with garden in Asokwa, Kumasi. Newly tiled floors.",
    offerType: "sale",
    amount: 300000,
    currency: "GHS",
    address: "Asokwa",
    country: "Ghana",
    region: "Ashanti",
    rooms: 2,
    washrooms: 1
  },
  {
    title: "Takoradi Apartment",
    description: "3-bedroom flat with modern finish near Market Circle, Takoradi.",
    offerType: "rent",
    amount: 1500,
    currency: "GHS",
    address: "Takoradi Market Circle",
    country: "Ghana",
    region: "Western",
    rooms: 3,
    washrooms: 2
  },
  {
    title: "Ashongman Hills Family House",
    description: "Detached 4-bedroom house with car port and security fence.",
    offerType: "sale",
    amount: 650000,
    currency: "GHS",
    address: "Ashongman Hills",
    country: "Ghana",
    region: "Greater Accra",
    rooms: 4,
    washrooms: 3
  },
  {
    title: "Lapaz Chamber & Hall",
    description: "Chamber and hall self-contained with water heater, close to main road.",
    offerType: "rent",
    amount: 1000,
    currency: "GHS",
    address: "Lapaz",
    country: "Ghana",
    region: "Greater Accra",
    rooms: 2,
    washrooms: 1
  },
  {
    title: "Cape Coast Storey Building",
    description: "5-bedroom storey building with borehole and garage in Cape Coast.",
    offerType: "sale",
    amount: 820000,
    currency: "GHS",
    address: "Cape Coast Township",
    country: "Ghana",
    region: "Central",
    rooms: 5,
    washrooms: 3
  },
  {
    title: "Tema Community 25 Property",
    description: "Brand new 3-bedroom home in a gated community near Dawhenya.",
    offerType: "sale",
    amount: 540000,
    currency: "GHS",
    address: "Community 25, Tema",
    country: "Ghana",
    region: "Greater Accra",
    rooms: 3,
    washrooms: 2
  },
  {
    title: "Ho Student Studio",
    description: "Compact studio apartment for students near Ho Technical University.",
    offerType: "rent",
    amount: 500,
    currency: "GHS",
    address: "Ho Central",
    country: "Ghana",
    region: "Volta",
    rooms: 1,
    washrooms: 1
  }
];


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const inProduction = env === 'production'
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const categoryIds = inProduction ? [1,2,3] : [5,6,7]
    const userIds = inProduction ? [5,6] : [15,17]
    const images = [
      "public/01793afe-41b4-43ea-8eb2-f670c6d1e4c1.jpg?mimeType=image/jpeg",
      "public/01b39e4e-794d-4f21-9407-05cba5e4d052.webp?mimeType=image/webp",
      "public/02955590-0797-4547-91ae-068249e52bb0.jpg?mimeType=image/jpeg",
      "public/09ca6c11-6bf9-4a89-9de4-18c2bbc576b6.jpg?mimeType=image/jpeg",
      "public/11a114f2-4647-4358-b3ee-5113ae495726.jpg?mimeType=image/jpeg",
      "public/144c594e-1651-4722-8930-7a8c2289f043.jpg?mimeType=image/jpeg",
      "public/1e167179-cf0b-4e39-b9e4-f84d24208b30.avif?mimeType=image/avif",
      "public/1f18669d-3ac2-4868-83bc-f0aa1891e5f0.jpg?mimeType=image/jpeg",
      "public/21a470ba-d93e-4510-bed7-c8c24cb56ff7.webp?mimeType=image/webp",
      "public/289f16ea-c993-48c4-957d-e0310c621429.jpg?mimeType=image/jpeg",
      "public/2b6702ec-b5fb-4bef-b8d5-700ffd40b35c.avif?mimeType=image/avif",
      "public/2cf6b4bb-dfb2-4c6d-bb0a-38e94580a495.jpg?mimeType=image/jpeg",
      "public/2da572ab-29aa-4c91-a040-cd3e7ad48ebb.avif?mimeType=image/avif",
      "public/31f09120-2cb9-4383-a54b-067b8b87e948.jpg?mimeType=image/jpeg",
      "public/33679f54-bee6-4885-ab3c-0d90d29196ab.avif?mimeType=image/avif",
      "public/346924ad-edfb-478f-885d-504ca11c514e.jpg?mimeType=image/jpeg",
      "public/34edd6aa-a067-4f65-a35f-f303ef309124.webp?mimeType=image/webp",
      "public/3a6deb93-4bb7-43e9-9292-d6aaef40c84f.jpg?mimeType=image/jpeg",
      "public/3b9d9362-7260-443a-8a28-773858f750a4.avif?mimeType=image/avif",
      "public/3e5ac2d4-a5a2-4ca5-848d-315cda836ed6.jpg?mimeType=image/jpeg",
      "public/400a7c35-404c-457a-bf50-f0df74e3ce74.jpg?mimeType=image/jpeg",
      "public/40826678-5e77-4b46-b97b-fadb889f5e5c.jpg?mimeType=image/jpeg",
      "public/416ca40f-85df-4e55-b29d-5f03229c1499.jpg?mimeType=image/jpeg",
      "public/4332e164-b908-4184-a594-7b1205d5b5f0.jpg?mimeType=image/jpeg",
      "public/4617a9ca-617b-4dc7-9198-7111c01e51d2.jpg?mimeType=image/jpeg",
      "public/4b60ce39-3ffd-48d7-891b-7c493a383741.jpeg?mimeType=image/jpeg",
      "public/4bff59c8-37c3-4089-81a1-c5e1b25b1166.jpg?mimeType=image/jpeg",
      "public/4fbcd97a-968a-49d5-ba1b-6b088e2790bd.webp?mimeType=image/webp",
      "public/55ac28cf-d89b-4340-9d09-7ab2f3e9520c.jpg?mimeType=image/jpeg",
      "public/5815288e-126c-41a9-833b-944a852a342d.avif?mimeType=image/avif",
      "public/593aeb85-8c6c-4fd9-9a6f-01c0bc8e41e9.avif?mimeType=image/avif",
      "public/598bf1e6-3263-4584-a6a5-90ee4f87b033.jpg?mimeType=image/jpeg",
      "public/59fb70e7-ae88-41f6-bc10-27adbd79d97e.jpg?mimeType=image/jpeg",
      "public/5faff720-b022-4145-a43f-bb2c59fc0c2f.jpg?mimeType=image/jpeg",
      "public/64eb62f6-d6b4-47c3-a56d-83cd5967eebc.avif?mimeType=image/avif",
      "public/6bc132c3-6eba-4a9f-9f62-92ad387d7fab.webp?mimeType=image/webp",
      "public/6c27c6e2-f1ed-4485-a898-e61d8623ca2c.jpg?mimeType=image/jpeg",
      "public/717ea255-6bcd-4022-9f52-306a6f3411fb.jpeg?mimeType=image/jpeg",
      "public/98382ce0-b819-4965-9cf1-b07ab92ba56d.jpg?mimeType=image/jpeg",
      "public/9f57a236-13a9-4c02-8220-9cc30699a09b.avif?mimeType=image/avif",
      "public/a12bca9e-5934-480f-b8c8-307047f6acdd.jpg?mimeType=image/jpeg",
      "public/a2bccb31-8372-43c9-88cd-7a91df85ed6f.webp?mimeType=image/webp",
      "public/a34d8aaf-b97c-47ef-9bdf-8a57a7aec4ee.jpg?mimeType=image/jpeg",
      "public/a43a244b-ecdc-426a-8317-4d12ab0a2df3.jpg?mimeType=image/jpeg",
      "public/a53a5bf0-73a8-41d9-adc0-97e4a0a81d42.jpg?mimeType=image/jpeg",
      "public/a654f0aa-e5a0-4b7c-a1d1-269b6469643c.jpg?mimeType=image/jpeg",
      "public/aade79ac-44ac-4bfa-8fed-7b4045cfbd06.webp?mimeType=image/webp",
      "public/aca973e3-2a11-4caf-9816-662b31352f75.jpg?mimeType=image/jpeg",
      "public/ada3fa6a-a90f-4c00-9162-f25b5ecec1b9.jpg?mimeType=image/jpeg",
      "public/b1342f82-634b-481f-8ba4-fd322839eebe.jpg?mimeType=image/jpeg",
      "public/baf06fc4-aa95-4fd4-a202-c1a46d3a29a2.jpg?mimeType=image/jpeg"
    ];


    const propertiesArrayToInsert = propertiesSeed.map(item => {
      const categoryId = categoryIds[Math.floor(Math.random()*categoryIds.length)]
      const userId = userIds[Math.floor(Math.random()*userIds.length)]
      const mainImagePath = images[Math.floor(Math.random()*images.length)]
      return {
        categoryId: categoryId,
        userId: userId,
        creatorId: userId,
        title: item.title,
        description: item.description,
        mainImagePath: mainImagePath,
        offerType: item.offerType,
        amount: item.amount,
        currency: item.currency,
        address: item.address,
        country: item.country,
        region: item.region,
        rooms: item.rooms,
        published: true,
        washrooms: item.washrooms,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })

    // 1. Insert Properties
    await queryInterface.bulkInsert('Properties', propertiesArrayToInsert)

    // 2. Fetch them back with their generated IDs
    const insertedProperties = await queryInterface.sequelize.query(
        `SELECT id, "mainImagePath", title FROM "Properties" WHERE title IN (${propertiesSeed.map(p => `'${p.title}'`).join(",")})`,
        { type: Sequelize.QueryTypes.SELECT }
    );


    // 3. Create PropertySpecifications
    const specifications = [];

    insertedProperties.forEach(prop => {
      specifications.push({
        propertyId: prop.id,
        title: "Furnishing",
        value: "Semi-Furnished",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      specifications.push({
        propertyId: prop.id,
        title: "Availability",
        value: "Immediate",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      specifications.push({
        propertyId: prop.id,
        title: "Pet Friendly",
        value: Math.random() > 0.5 ? "Yes" : "No",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    // 4. Insert into PropertySpecifications
    await queryInterface.bulkInsert('PropertySpecifications', specifications, {});

    // Gallery

  // For each property, insert 2-3 other images into PropertiesGalleries
    const galleryInserts = [];

    for (const property of insertedProperties) {
      const availableGalleryPaths = images.filter(p => p !== property.mainImagePath);
      const randomPaths = [];

      // Choose 2–3 distinct random images
      const count = Math.floor(Math.random() * 2) + 2; // 2 or 3
      while (randomPaths.length < count) {
        const candidate = availableGalleryPaths[Math.floor(Math.random() * availableGalleryPaths.length)];
        if (!randomPaths.includes(candidate)) {
          randomPaths.push(candidate);
        }
      }

      randomPaths.forEach(path => {
        galleryInserts.push({
          propertyId: property.id,
          path,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    }

    await queryInterface.bulkInsert('PropertyGalleries', galleryInserts);

  },

  async down (queryInterface, Sequelize) {
    // List all titles used in propertiesSeed
    const seededTitles = propertiesSeed.map(p => p.title);

    // Step 1: Get IDs of seeded Properties
    const seededProperties = await queryInterface.sequelize.query(
        `SELECT id FROM "Properties" WHERE title IN (${seededTitles.map(title => `'${title}'`).join(',')})`,
        { type: Sequelize.QueryTypes.SELECT }
    );

    const propertyIds = seededProperties.map(p => p.id);

    if (propertyIds.length === 0) return;

    // Step 2: Delete from dependent tables using propertyId
    await queryInterface.bulkDelete('PropertySpecifications', {
      propertyId: propertyIds
    });

    await queryInterface.bulkDelete('PropertyGalleries', {
      propertyId: propertyIds
    });

    // Step 3: Delete from Properties
    await queryInterface.bulkDelete('Properties', {
      id: propertyIds
    });
  }
};
