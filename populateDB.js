#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require('./models/Item');
const Category = require('./models/Category');
const slugify = require('slugify');

const items = [];
const categories = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createCategories();
  await createItems();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const category = new Category({
    name: name,
    description: description,
    slug: slugify(name, { lower: true }),
  });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(
  index,
  name,
  description,
  category,
  price,
  in_stock_count
) {
  const itemFields = {
    name: name,
    description: description,
    category: category,
    price: price,
    in_stock_count: in_stock_count,
    slug: slugify(name, { lower: true }),
  };

  const item = new Item(itemFields);
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log('Adding categories');
  await Promise.all([
    categoryCreate(
      0,
      'Darts',
      'Finest steel- and soft-tip darts on the market!'
    ),
    categoryCreate(1, 'Dartboards', 'Top-notch sisal dartboards!'),
    categoryCreate(
      2,
      'Flights',
      'Flights of different shapes, sizes and durability!'
    ),
    categoryCreate(3, 'Stems', 'Stems: nylon, polycarbonate and aluminium!'),
  ]);
}

async function createItems() {
  console.log('Adding items');
  await Promise.all([
    itemCreate(
      0,
      'Harrows - Harrows Magnum Reloaded Darts - Steel Tip - Black & Silver, 21g',
      'Harrows Magnum Reloaded Steel Tip Tungsten Darts - 97% Tungsten. Features: 97% Tungsten Barrels, 1 Set of Harrows Flights, 1 Set of Harrows Shafts with rings, Point Protector.',
      categories[0],
      59.95,
      10
    ),
    itemCreate(
      1,
      'Datadart - Datadart Marvin Koch Darts - Steel Tip, 22g',
      "Datadart Marvin Koch Darts - Steel Tip - 22g. The Marvin Koch 90% tungsten dart is a top dart for all players. Its straight barrel design gives better accuracy and grip, with a modern grey and blue PVD coating. Players can rely on this dart's durability and weight distribution to enhance their playing experience. The dart is suitable for casual and professional players and is sure to impress. Pack contains 90% tungsten barrels, Marvin Koch flights and stems.",
      categories[0],
      49.95,
      21
    ),
    itemCreate(
      2,
      'Shot - Shot Haupai Puha Darts - Steel Tip - 90%, 24g',
      'Shot Haupai Puha Darts - Steel Tip - 90% - 24g. These 90% Tungsten straight milled barrels have been designed by Haupai to perfectly fit his game. They contain a black colour within the rings and milled sections. Each set comes complete with a set of Shot flights and dart shafts to complete the setup.',
      categories[0],
      79.95,
      33
    ),
    itemCreate(
      3,
      'Mission - Mission Josh Rock Darts - Soft Tip - Rocky - Black & Blue - 18g',
      'Mission Josh Rock Soft Tip Tungsten Darts - 95% Tungsten. Features: 95% Tungsten Barrels, PVD Coating, 1 Set of Mission Flights, 1 Set of Mission Shafts with S-Lock rings, Point Protector. Just like a meteor blasting its way through space, will these Josh Rock darts help you demolish the competition? Rocky has been like a fireball, exploding through his matches using his new Mission Josh Rock darts, which feature a straight barrel design in electric blue and silver, with a bull nose in black.',
      categories[0],
      54.95,
      5
    ),
    itemCreate(
      4,
      'One80 - One80 Beau Greaves Darts - Soft Tip - VHD - Black Edition',
      'One80 Beau Greaves Darts - Soft Tip - VHD - Black Edition - 18g. Features: VHD (Very High Density) Tungsten, Matched Weighted, Set of Nylon Shafts, Set of One80 Flights.',
      categories[0],
      58.95,
      69
    ),
    itemCreate(
      5,
      'Unicorn - Unicorn Eclipse Ultra Dartboard - with UniLock - Ultra',
      'Unicorn Eclipse Ultra Dartboard - with UniLock. Features: New Radial Wiring System - incorporating a super-thin Bullseye Wiring. Injection Moulded High Definition Numbers and Invisible Number Ring. The new and improved Ultra Spider (patent pending) is designed to maximise dart retention and a specially designed ultra-bullseye helps achieve higher scoring.',
      categories[1],
      63.95,
      34
    ),
    itemCreate(
      6,
      'Datadart - Datadart Elite II - HD Dartboard - Professional Quality',
      'Datadart Elite II Professional HD Dartboard. Seamless playing surface for higher scores with High Definition White Digital number ring.',
      categories[1],
      39.99,
      2
    ),
    itemCreate(
      7,
      'XQMax - Goat - Everscore Dartboard - African Sisal - Professional',
      'GOAT – EVERSCORE NXT LVL Dartboard. UG Madagascar Sisal – Precision at its Core! Our Dartboards core is made from UG Madagascar sisal, known for its exceptional durability and self-healing properties, ensuring long-lasting play. Minimalist Elegance: Logo-Free Number Holder. The number ring holder is sleek and logo-free, preserving the clean and minimalist design of your dartboard.',
      categories[1],
      49.95,
      19
    ),
    itemCreate(
      8,
      'Shot - Shot Michael Smith Dartboard - Entry Level - Round Wire - Bully Boy',
      'This easy-to-install competition-sized dartboard is ready for you to hang and play on right away. Grab your darts and bring the noise! The Michael Smith "Bully Boy" dartboard is manufactured from quality sisal bristle fibres. It includes a removable number ring for even surface wear and longer life. Crafted in quality sisal with vibrant, long-lasting colours, strong slim round wire construction, and a staple free bullseye. This sleek staple-free technology means fewer bounce-outs and consistently better scores.',
      categories[1],
      29.95,
      92
    ),
    itemCreate(
      9,
      'Bulls NL - Bulls - Magnetic Dartboard - Hard Surface with 6 Free Magnetic Darts',
      'Dartboards - Bulls Magnetic Dartboard. Perfect for younger children out playing outside. Includes 6 Magnetic Darts. Size: 37.5cm x 1.5cm.',
      categories[1],
      17.8,
      66
    ),
    itemCreate(
      10,
      'Datadart - Datadart Dart Flights - Nations Designs - No2 - Std - Netherlands',
      'Datadart Dart Flights - Nations Designs - No2 - Std - Netherlands. An essential for any players set. These 100 Micron No2 dart flights feature a Dutch flag design across the flight and small Black Datadart logo. Each pack contains 3 flights.',
      categories[2],
      0.84,
      353
    ),
    itemCreate(
      11,
      'Harrows - Harrows Prime Dart Flights - Std - No6 - Luke Woodhouse - Woody',
      'Harrows Prime Dart Flights - Std - No6 - Luke Woodhouse - Woody. Prime flights combine advanced UV print technology with a tough, 100 micron, laminate to offer ultra-modern visual appeal and increased strength. Each pack contains 3 flights.',
      categories[2],
      0.7,
      222
    ),
    itemCreate(
      12,
      'Harrows - Harrows Atrax Dart Flights - Std - No6',
      'Harrows Atrax Dart Flights - Std - No6 - Blue. Atrax flights combine advanced UV print technology with a tough, 100 micron, laminate to offer ultra-modern visual appeal and increased strength. Each pack contains 3 flights.',
      categories[2],
      0.7,
      333
    ),
    itemCreate(
      13,
      'Designa - *Dart Flights - Raw 100 - 100 Micron - Std - Space',
      'Raw 100 Space Dart Flights - Extra Strong 100 Micron Flights. Each pack contains 3 Flights.',
      categories[2],
      0.1,
      78
    ),
    itemCreate(
      14,
      'Cosmo Darts - Cosmo Fit Flight Pro - Scott Mitchell - Standard - Black - Scotty Dog',
      "Cosmo Fit Flight Pro - Scott Mitchell - Standard - Black - Scotty Dog. These fit flight models feature Scott's own design featuring the Scotty Dog in a pink colour on a black base. The standard version is 30% thicker than the AIR versions. The flights are to be used with any Cosmo Fit Shaft. Each pack contains 3 flights.",
      categories[2],
      5.5,
      51
    ),
    itemCreate(
      15,
      'Mission - Mission Sabre Shafts - Polycarbonate Dart Stems - Black - Black Top',
      'The Mission Sabre Dart Shafts combine the lightness and strength of polycarbonate with the flight-grip of Aluminium shafts. The Sabre shafts are made from a strong black Polycarbonate material, encasing an Aluminium core and fixed top. The Aluminium tops enhance the grip of the flight and are available in a choice of six colours (black, blue, gold, green red and silver). The shafts are available in four sizes: Small (36mm), Tweenie (40mm), Tweenie Plus (44.5m) and Medium (49mm). Please note that sizes do not include the thread. Each pack contains three shafts.',
      categories[3],
      1.55,
      421
    ),
    itemCreate(
      16,
      'Harrows - *Harrows Clic System - Shafts - Slim - Orange',
      'Harrows Clic System. Constructed from a new and unique Polycarbonate material, this shaft allows the Clic flight to rotate 360 degrees which helps to eliminate bounce outs but also allows closer grouping and higher scoring. The construction has been designed to give this shaft 17 degree of longitudinal flex to reduce deflections. Use with Harrows Clic Flights Only.',
      categories[3],
      2.45,
      101
    ),
    itemCreate(
      17,
      'Darts Corner - Darts Corner Nylon Dart Shafts - VALUE PACK - 5 Sets - White',
      'Darts Corner Nylon Dart Shafts with Springs - Value Pack (5 Sets). Length: 36mm; (does not include thread - 5mm) Thread: 2ba Darts Corner Nylon Dart Shafts - VALUE PACK - 5 Sets - White - Short-S0740 These Great Value Packs of 5 Sets of Stems = 15 Stems.',
      categories[3],
      2.45,
      232
    ),
    itemCreate(
      18,
      'Designa - *Designa Nylon Two Tone Stems - White & Red',
      'Designa Two Tone Duo Nylon Shafts. Each pack contains 3 stems. Length: 35mm. Thread: 2ba.',
      categories[3],
      0.48,
      666
    ),
    itemCreate(
      19,
      'Cuesoul - Cuesoul - Dart Shafts - Tero Flight System - AK7 - Slim - Set of 4 - Black',
      'Cuesoul - Tero Dart Shafts - Slim - Solid - Black - 32mm. Features octagon shape at the base of the stem to make tightening the stem easier. The stem measurement provided is the full length of the stem, 32mm, with the visible part being approx 10mm shorter. To be used with the Tero AK4 flights, these look great with the Black flights.',
      categories[3],
      9.95,
      59
    ),
  ]);
}
