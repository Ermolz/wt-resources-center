const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  await prisma.gpu.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.chipset.deleteMany();
  await prisma.vendor.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleared existing data');

  const chipsets = await Promise.all([
    prisma.chipset.create({
      data: {
        name: 'RTX 4090',
        manufacturer: 'NVIDIA',
      },
    }),
    prisma.chipset.create({
      data: {
        name: 'RTX 4080',
        manufacturer: 'NVIDIA',
      },
    }),
    prisma.chipset.create({
      data: {
        name: 'RTX 4070',
        manufacturer: 'NVIDIA',
      },
    }),
    prisma.chipset.create({
      data: {
        name: 'RTX 4060',
        manufacturer: 'NVIDIA',
      },
    }),
    prisma.chipset.create({
      data: {
        name: 'RTX 3090',
        manufacturer: 'NVIDIA',
      },
    }),
    prisma.chipset.create({
      data: {
        name: 'RTX 3080',
        manufacturer: 'NVIDIA',
      },
    }),
    prisma.chipset.create({
      data: {
        name: 'RTX 3070',
        manufacturer: 'NVIDIA',
      },
    }),
    prisma.chipset.create({
      data: {
        name: 'RTX 3060',
        manufacturer: 'NVIDIA',
      },
    }),
    prisma.chipset.create({
      data: {
        name: 'RX 7900 XTX',
        manufacturer: 'AMD',
      },
    }),
    prisma.chipset.create({
      data: {
        name: 'RX 7900 XT',
        manufacturer: 'AMD',
      },
    }),
    prisma.chipset.create({
      data: {
        name: 'RX 7800 XT',
        manufacturer: 'AMD',
      },
    }),
    prisma.chipset.create({
      data: {
        name: 'RX 7700 XT',
        manufacturer: 'AMD',
      },
    }),
    prisma.chipset.create({
      data: {
        name: 'RX 7600',
        manufacturer: 'AMD',
      },
    }),
    prisma.chipset.create({
      data: {
        name: 'RX 6900 XT',
        manufacturer: 'AMD',
      },
    }),
    prisma.chipset.create({
      data: {
        name: 'Arc A770',
        manufacturer: 'Intel',
      },
    }),
    prisma.chipset.create({
      data: {
        name: 'Arc A750',
        manufacturer: 'Intel',
      },
    }),
  ]);

  console.log(`✅ Created ${chipsets.length} chipsets`);

  const vendors = await Promise.all([
    prisma.vendor.create({ data: { name: 'ASUS' } }),
    prisma.vendor.create({ data: { name: 'MSI' } }),
    prisma.vendor.create({ data: { name: 'Gigabyte' } }),
    prisma.vendor.create({ data: { name: 'EVGA' } }),
    prisma.vendor.create({ data: { name: 'Zotac' } }),
    prisma.vendor.create({ data: { name: 'PNY' } }),
    prisma.vendor.create({ data: { name: 'Palit' } }),
    prisma.vendor.create({ data: { name: 'Sapphire' } }),
    prisma.vendor.create({ data: { name: 'PowerColor' } }),
    prisma.vendor.create({ data: { name: 'XFX' } }),
    prisma.vendor.create({ data: { name: 'ASRock' } }),
    prisma.vendor.create({ data: { name: 'Inno3D' } }),
  ]);

  console.log(`✅ Created ${vendors.length} vendors`);

  const tags = await Promise.all([
    prisma.tag.create({ data: { name: 'Gaming' } }),
    prisma.tag.create({ data: { name: 'Ray Tracing' } }),
    prisma.tag.create({ data: { name: 'Workstation' } }),
    prisma.tag.create({ data: { name: 'Low Profile' } }),
    prisma.tag.create({ data: { name: 'Overclocked' } }),
    prisma.tag.create({ data: { name: 'RGB' } }),
    prisma.tag.create({ data: { name: 'Water Cooled' } }),
    prisma.tag.create({ data: { name: 'Budget' } }),
    prisma.tag.create({ data: { name: 'High-End' } }),
    prisma.tag.create({ data: { name: '4K Ready' } }),
    prisma.tag.create({ data: { name: 'VR Ready' } }),
    prisma.tag.create({ data: { name: 'Mining' } }),
  ]);

  console.log(`✅ Created ${tags.length} tags`);

  const gamingTag = tags.find((t) => t.name === 'Gaming');
  const rayTracingTag = tags.find((t) => t.name === 'Ray Tracing');
  const workstationTag = tags.find((t) => t.name === 'Workstation');
  const overclockedTag = tags.find((t) => t.name === 'Overclocked');
  const rgbTag = tags.find((t) => t.name === 'RGB');
  const highEndTag = tags.find((t) => t.name === 'High-End');
  const budgetTag = tags.find((t) => t.name === 'Budget');
  const vrReadyTag = tags.find((t) => t.name === 'VR Ready');
  const k4ReadyTag = tags.find((t) => t.name === '4K Ready');
  const waterCooledTag = tags.find((t) => t.name === 'Water Cooled');

  const rtx4090 = chipsets.find((c) => c.name === 'RTX 4090');
  const rtx4080 = chipsets.find((c) => c.name === 'RTX 4080');
  const rtx4070 = chipsets.find((c) => c.name === 'RTX 4070');
  const rtx4060 = chipsets.find((c) => c.name === 'RTX 4060');
  const rtx3090 = chipsets.find((c) => c.name === 'RTX 3090');
  const rtx3080 = chipsets.find((c) => c.name === 'RTX 3080');
  const rtx3070 = chipsets.find((c) => c.name === 'RTX 3070');
  const rtx3060 = chipsets.find((c) => c.name === 'RTX 3060');
  const rx7900xtx = chipsets.find((c) => c.name === 'RX 7900 XTX');
  const rx7900xt = chipsets.find((c) => c.name === 'RX 7900 XT');
  const rx7800xt = chipsets.find((c) => c.name === 'RX 7800 XT');
  const rx7700xt = chipsets.find((c) => c.name === 'RX 7700 XT');
  const rx7600 = chipsets.find((c) => c.name === 'RX 7600');
  const rx6900xt = chipsets.find((c) => c.name === 'RX 6900 XT');
  const arcA770 = chipsets.find((c) => c.name === 'Arc A770');
  const arcA750 = chipsets.find((c) => c.name === 'Arc A750');

  const asus = vendors.find((v) => v.name === 'ASUS');
  const msi = vendors.find((v) => v.name === 'MSI');
  const gigabyte = vendors.find((v) => v.name === 'Gigabyte');
  const evga = vendors.find((v) => v.name === 'EVGA');
  const zotac = vendors.find((v) => v.name === 'Zotac');
  const pny = vendors.find((v) => v.name === 'PNY');
  const palit = vendors.find((v) => v.name === 'Palit');
  const sapphire = vendors.find((v) => v.name === 'Sapphire');
  const powerColor = vendors.find((v) => v.name === 'PowerColor');
  const xfx = vendors.find((v) => v.name === 'XFX');
  const asrock = vendors.find((v) => v.name === 'ASRock');
  const inno3d = vendors.find((v) => v.name === 'Inno3D');

  const gpus = [];

  const createGpu = (name, chipset, vendor, memoryGB, memoryType, tdp, price, status, description, tagIds) => {
    gpus.push({
      name,
      chipsetId: chipset.id,
      vendorId: vendor.id,
      memoryGB,
      memoryType,
      tdp,
      price,
      status,
      description,
      tagIds,
    });
  };

  createGpu('ASUS ROG Strix RTX 4090 OC', rtx4090, asus, 24, 'GDDR6X', 450, 1799.99, 'AVAILABLE', 'Flagship gaming GPU with exceptional 4K performance and ray tracing capabilities. Features triple-fan cooling and RGB lighting.', [gamingTag.id, rayTracingTag.id, highEndTag.id, rgbTag.id, k4ReadyTag.id, vrReadyTag.id]);
  createGpu('ASUS TUF RTX 4080 OC', rtx4080, asus, 16, 'GDDR6X', 320, 1299.99, 'AVAILABLE', 'Durable RTX 4080 with military-grade components and excellent cooling. Great for 1440p and 4K gaming.', [gamingTag.id, rayTracingTag.id, overclockedTag.id, k4ReadyTag.id]);
  createGpu('ASUS ROG Strix RTX 4070 OC', rtx4070, asus, 12, 'GDDR6X', 200, 699.99, 'AVAILABLE', 'Excellent RTX 4070 with premium cooling and RGB lighting. Great for 1440p gaming with ray tracing.', [gamingTag.id, rayTracingTag.id, rgbTag.id, overclockedTag.id]);
  createGpu('ASUS Dual RTX 4060 OC', rtx4060, asus, 8, 'GDDR6', 115, 329.99, 'AVAILABLE', 'Entry-level RTX 4060 with good 1080p performance. Great for budget gaming builds.', [gamingTag.id, budgetTag.id]);
  createGpu('ASUS ROG Strix RTX 3090 OC', rtx3090, asus, 24, 'GDDR6X', 350, 1499.99, 'DISCONTINUED', 'Previous generation flagship GPU with excellent performance. Still great for 4K gaming and workstation tasks.', [gamingTag.id, rayTracingTag.id, workstationTag.id, highEndTag.id]);
  createGpu('ASUS TUF RTX 3080 OC', rtx3080, asus, 10, 'GDDR6X', 320, 899.99, 'DISCONTINUED', 'Previous generation high-end GPU. Excellent for 1440p and 4K gaming.', [gamingTag.id, rayTracingTag.id, k4ReadyTag.id]);
  createGpu('ASUS Dual RTX 3070 OC', rtx3070, asus, 8, 'GDDR6', 220, 599.99, 'DISCONTINUED', 'Previous generation mid-range GPU. Great for 1440p gaming.', [gamingTag.id, rayTracingTag.id]);
  createGpu('ASUS ROG Strix RTX 4090 OC (Water Cooled)', rtx4090, asus, 24, 'GDDR6X', 450, 1999.99, 'COMING_SOON', 'Premium water-cooled RTX 4090 with exceptional cooling and overclocking potential. Coming soon.', [gamingTag.id, rayTracingTag.id, highEndTag.id, overclockedTag.id, waterCooledTag.id]);

  createGpu('MSI GeForce RTX 4090 Gaming X Trio', rtx4090, msi, 24, 'GDDR6X', 450, 1699.99, 'AVAILABLE', 'High-performance RTX 4090 with advanced cooling solution and factory overclock. Perfect for 4K gaming and content creation.', [gamingTag.id, rayTracingTag.id, overclockedTag.id, highEndTag.id, k4ReadyTag.id]);
  createGpu('MSI RTX 4080 Gaming X Trio', rtx4080, msi, 16, 'GDDR6X', 320, 1249.99, 'AVAILABLE', 'Well-balanced RTX 4080 with good performance and cooling. Excellent for high-resolution gaming.', [gamingTag.id, rayTracingTag.id, k4ReadyTag.id, vrReadyTag.id]);
  createGpu('MSI RTX 4080 Suprim X', rtx4080, msi, 16, 'GDDR6X', 320, 1399.99, 'AVAILABLE', 'Premium RTX 4080 with exceptional build quality and cooling. Perfect for enthusiasts.', [gamingTag.id, rayTracingTag.id, highEndTag.id, rgbTag.id, k4ReadyTag.id]);
  createGpu('MSI RTX 4070 Gaming X Trio', rtx4070, msi, 12, 'GDDR6X', 200, 649.99, 'AVAILABLE', 'Well-rounded RTX 4070 with good performance and cooling. Perfect for 1440p gaming.', [gamingTag.id, rayTracingTag.id, vrReadyTag.id]);
  createGpu('MSI RTX 4060 Gaming X', rtx4060, msi, 8, 'GDDR6', 115, 309.99, 'AVAILABLE', 'Solid RTX 4060 with good cooling. Perfect for 1080p gaming with ray tracing.', [gamingTag.id, budgetTag.id, rayTracingTag.id]);
  createGpu('MSI RTX 3080 Gaming Z Trio', rtx3080, msi, 10, 'GDDR6X', 320, 899.99, 'DISCONTINUED', 'Previous generation high-end GPU. Excellent for 1440p and 4K gaming.', [gamingTag.id, rayTracingTag.id, k4ReadyTag.id]);
  createGpu('MSI RTX 3070 Gaming X Trio', rtx3070, msi, 8, 'GDDR6', 220, 599.99, 'DISCONTINUED', 'Previous generation mid-range GPU. Great for 1440p gaming.', [gamingTag.id, rayTracingTag.id]);
  createGpu('MSI RTX 3060 Gaming X', rtx3060, msi, 12, 'GDDR6', 170, 399.99, 'DISCONTINUED', 'Previous generation budget GPU. Good for 1080p gaming.', [gamingTag.id, budgetTag.id]);

  createGpu('Gigabyte RTX 4090 AORUS Master', rtx4090, gigabyte, 24, 'GDDR6X', 450, 1899.99, 'AVAILABLE', 'Premium RTX 4090 with LCD display and advanced RGB lighting. Features excellent build quality and cooling performance.', [gamingTag.id, rayTracingTag.id, rgbTag.id, highEndTag.id, workstationTag.id]);
  createGpu('Gigabyte RTX 4080 AORUS Master', rtx4080, gigabyte, 16, 'GDDR6X', 320, 1349.99, 'AVAILABLE', 'Premium RTX 4080 with RGB lighting and advanced cooling. Perfect for gamers and content creators.', [gamingTag.id, rayTracingTag.id, rgbTag.id, workstationTag.id]);
  createGpu('Gigabyte RTX 4070 Windforce OC', rtx4070, gigabyte, 12, 'GDDR6X', 200, 599.99, 'AVAILABLE', 'Affordable RTX 4070 with solid performance. Great value for 1440p gaming.', [gamingTag.id, rayTracingTag.id]);
  createGpu('Gigabyte RTX 4070 Ti Gaming OC', rtx4070, gigabyte, 12, 'GDDR6X', 285, 799.99, 'AVAILABLE', 'High-performance RTX 4070 with excellent 1440p and 4K capabilities.', [gamingTag.id, rayTracingTag.id, k4ReadyTag.id, vrReadyTag.id]);
  createGpu('Gigabyte RTX 4060 Eagle', rtx4060, gigabyte, 8, 'GDDR6', 115, 299.99, 'AVAILABLE', 'Budget-friendly RTX 4060 with decent performance. Good for entry-level gaming.', [gamingTag.id, budgetTag.id]);
  createGpu('Gigabyte RTX 3090 AORUS Xtreme', rtx3090, gigabyte, 24, 'GDDR6X', 350, 1499.99, 'DISCONTINUED', 'Previous generation flagship GPU. Excellent for 4K gaming and workstation tasks.', [gamingTag.id, rayTracingTag.id, workstationTag.id, highEndTag.id]);
  createGpu('Gigabyte RTX 3080 AORUS Master', rtx3080, gigabyte, 10, 'GDDR6X', 320, 899.99, 'DISCONTINUED', 'Previous generation high-end GPU. Excellent for 1440p and 4K gaming.', [gamingTag.id, rayTracingTag.id, k4ReadyTag.id]);
  createGpu('Gigabyte RTX 3070 Gaming OC', rtx3070, gigabyte, 8, 'GDDR6', 220, 599.99, 'DISCONTINUED', 'Previous generation mid-range GPU. Great for 1440p gaming.', [gamingTag.id, rayTracingTag.id]);

  createGpu('EVGA RTX 4090 FTW3 Ultra', rtx4090, evga, 24, 'GDDR6X', 450, 1749.99, 'AVAILABLE', 'Top-tier RTX 4090 with exceptional overclocking potential and premium components. Excellent for enthusiasts.', [gamingTag.id, rayTracingTag.id, overclockedTag.id, highEndTag.id, k4ReadyTag.id]);
  createGpu('EVGA RTX 4080 FTW3 Ultra', rtx4080, evga, 16, 'GDDR6X', 320, 1299.99, 'AVAILABLE', 'Premium RTX 4080 with excellent overclocking capabilities and build quality.', [gamingTag.id, rayTracingTag.id, overclockedTag.id, highEndTag.id]);
  createGpu('EVGA RTX 4070 FTW3 Ultra', rtx4070, evga, 12, 'GDDR6X', 200, 679.99, 'AVAILABLE', 'High-performance RTX 4070 with excellent cooling and overclocking potential.', [gamingTag.id, rayTracingTag.id, overclockedTag.id]);
  createGpu('EVGA RTX 3090 FTW3 Ultra', rtx3090, evga, 24, 'GDDR6X', 350, 1499.99, 'DISCONTINUED', 'Previous generation flagship GPU. Excellent for 4K gaming and workstation tasks.', [gamingTag.id, rayTracingTag.id, workstationTag.id, highEndTag.id]);
  createGpu('EVGA RTX 3080 FTW3 Ultra', rtx3080, evga, 10, 'GDDR6X', 320, 899.99, 'DISCONTINUED', 'Previous generation high-end GPU. Excellent for 1440p and 4K gaming.', [gamingTag.id, rayTracingTag.id, k4ReadyTag.id]);
  createGpu('EVGA RTX 3070 FTW3 Ultra', rtx3070, evga, 8, 'GDDR6', 220, 599.99, 'DISCONTINUED', 'Previous generation mid-range GPU. Great for 1440p gaming.', [gamingTag.id, rayTracingTag.id]);
  createGpu('EVGA RTX 3060 XC Gaming', rtx3060, evga, 12, 'GDDR6', 170, 399.99, 'DISCONTINUED', 'Previous generation budget GPU. Good for 1080p gaming.', [gamingTag.id, budgetTag.id]);

  createGpu('Zotac RTX 4090 Trinity OC', rtx4090, zotac, 24, 'GDDR6X', 450, 1599.99, 'AVAILABLE', 'Solid RTX 4090 option with good performance and cooling. Great value for money in the RTX 4090 segment.', [gamingTag.id, rayTracingTag.id, highEndTag.id, k4ReadyTag.id]);
  createGpu('Zotac RTX 4080 Trinity OC', rtx4080, zotac, 16, 'GDDR6X', 320, 1199.99, 'AVAILABLE', 'Well-balanced RTX 4080 with good performance and competitive pricing.', [gamingTag.id, rayTracingTag.id, k4ReadyTag.id]);
  createGpu('Zotac RTX 4070 Twin Edge OC', rtx4070, zotac, 12, 'GDDR6X', 200, 579.99, 'AVAILABLE', 'Compact RTX 4070 with good performance. Suitable for smaller cases.', [gamingTag.id, rayTracingTag.id]);
  createGpu('Zotac RTX 4060 Twin Edge', rtx4060, zotac, 8, 'GDDR6', 115, 289.99, 'AVAILABLE', 'Compact RTX 4060 with good performance. Perfect for small form factor builds.', [gamingTag.id, budgetTag.id]);
  createGpu('Zotac RTX 3090 Trinity OC', rtx3090, zotac, 24, 'GDDR6X', 350, 1399.99, 'DISCONTINUED', 'Previous generation flagship GPU. Excellent for 4K gaming and workstation tasks.', [gamingTag.id, rayTracingTag.id, workstationTag.id, highEndTag.id]);
  createGpu('Zotac RTX 3080 Trinity OC', rtx3080, zotac, 10, 'GDDR6X', 320, 849.99, 'DISCONTINUED', 'Previous generation high-end GPU. Excellent for 1440p and 4K gaming.', [gamingTag.id, rayTracingTag.id, k4ReadyTag.id]);
  createGpu('Zotac RTX 3070 Twin Edge OC', rtx3070, zotac, 8, 'GDDR6', 220, 579.99, 'DISCONTINUED', 'Previous generation mid-range GPU. Great for 1440p gaming.', [gamingTag.id, rayTracingTag.id]);
  createGpu('Zotac RTX 3060 Twin Edge', rtx3060, zotac, 12, 'GDDR6', 170, 379.99, 'DISCONTINUED', 'Previous generation budget GPU. Good for 1080p gaming.', [gamingTag.id, budgetTag.id]);

  createGpu('PNY RTX 4090 XLR8 Gaming', rtx4090, pny, 24, 'GDDR6X', 450, 1649.99, 'AVAILABLE', 'Solid RTX 4090 with good performance and competitive pricing. Great for 4K gaming.', [gamingTag.id, rayTracingTag.id, highEndTag.id, k4ReadyTag.id]);
  createGpu('PNY RTX 4080 XLR8 Gaming', rtx4080, pny, 16, 'GDDR6X', 320, 1199.99, 'AVAILABLE', 'Solid RTX 4080 with good performance and competitive pricing. Great option for 1440p gaming.', [gamingTag.id, rayTracingTag.id, k4ReadyTag.id]);
  createGpu('PNY RTX 4070 XLR8 Gaming', rtx4070, pny, 12, 'GDDR6X', 200, 589.99, 'AVAILABLE', 'Well-priced RTX 4070 with good performance. Great for 1440p gaming.', [gamingTag.id, rayTracingTag.id]);
  createGpu('PNY RTX 4060 XLR8 Gaming', rtx4060, pny, 8, 'GDDR6', 115, 299.99, 'AVAILABLE', 'Budget-friendly RTX 4060 with decent performance. Good for entry-level gaming.', [gamingTag.id, budgetTag.id]);
  createGpu('PNY RTX 3090 XLR8 Gaming', rtx3090, pny, 24, 'GDDR6X', 350, 1449.99, 'DISCONTINUED', 'Previous generation flagship GPU. Excellent for 4K gaming and workstation tasks.', [gamingTag.id, rayTracingTag.id, workstationTag.id, highEndTag.id]);
  createGpu('PNY RTX 3080 XLR8 Gaming', rtx3080, pny, 10, 'GDDR6X', 320, 849.99, 'DISCONTINUED', 'Previous generation high-end GPU. Excellent for 1440p and 4K gaming.', [gamingTag.id, rayTracingTag.id, k4ReadyTag.id]);
  createGpu('PNY RTX 3070 XLR8 Gaming', rtx3070, pny, 8, 'GDDR6', 220, 589.99, 'DISCONTINUED', 'Previous generation mid-range GPU. Great for 1440p gaming.', [gamingTag.id, rayTracingTag.id]);
  createGpu('PNY RTX 3060 XLR8 Gaming', rtx3060, pny, 12, 'GDDR6', 170, 389.99, 'DISCONTINUED', 'Previous generation budget GPU. Good for 1080p gaming.', [gamingTag.id, budgetTag.id]);

  createGpu('Palit RTX 4090 GameRock OC', rtx4090, palit, 24, 'GDDR6X', 450, 1599.99, 'AVAILABLE', 'Solid RTX 4090 with good performance and RGB lighting. Great value for money.', [gamingTag.id, rayTracingTag.id, highEndTag.id, rgbTag.id, k4ReadyTag.id]);
  createGpu('Palit RTX 4080 GameRock OC', rtx4080, palit, 16, 'GDDR6X', 320, 1199.99, 'AVAILABLE', 'Well-balanced RTX 4080 with RGB lighting and good cooling.', [gamingTag.id, rayTracingTag.id, rgbTag.id, k4ReadyTag.id]);
  createGpu('Palit RTX 4070 GameRock OC', rtx4070, palit, 12, 'GDDR6X', 200, 579.99, 'AVAILABLE', 'Good RTX 4070 with RGB lighting and solid performance.', [gamingTag.id, rayTracingTag.id, rgbTag.id]);
  createGpu('Palit RTX 4060 Dual', rtx4060, palit, 8, 'GDDR6', 115, 289.99, 'AVAILABLE', 'Budget-friendly RTX 4060 with decent performance. Good for entry-level gaming.', [gamingTag.id, budgetTag.id]);
  createGpu('Palit RTX 3090 GameRock OC', rtx3090, palit, 24, 'GDDR6X', 350, 1399.99, 'DISCONTINUED', 'Previous generation flagship GPU. Excellent for 4K gaming and workstation tasks.', [gamingTag.id, rayTracingTag.id, workstationTag.id, highEndTag.id]);
  createGpu('Palit RTX 3080 GameRock OC', rtx3080, palit, 10, 'GDDR6X', 320, 839.99, 'DISCONTINUED', 'Previous generation high-end GPU. Excellent for 1440p and 4K gaming.', [gamingTag.id, rayTracingTag.id, k4ReadyTag.id]);
  createGpu('Palit RTX 3070 GameRock OC', rtx3070, palit, 8, 'GDDR6', 220, 569.99, 'DISCONTINUED', 'Previous generation mid-range GPU. Great for 1440p gaming.', [gamingTag.id, rayTracingTag.id]);
  createGpu('Palit RTX 3060 Dual', rtx3060, palit, 12, 'GDDR6', 170, 369.99, 'DISCONTINUED', 'Previous generation budget GPU. Good for 1080p gaming.', [gamingTag.id, budgetTag.id]);

  createGpu('Sapphire RX 7900 XTX Nitro+', rx7900xtx, sapphire, 24, 'GDDR6', 355, 1099.99, 'AVAILABLE', 'Flagship AMD GPU with excellent 4K performance. Great alternative to RTX 4080.', [gamingTag.id, highEndTag.id, k4ReadyTag.id, vrReadyTag.id]);
  createGpu('Sapphire RX 7900 XT Pulse', rx7900xt, sapphire, 20, 'GDDR6', 315, 899.99, 'AVAILABLE', 'High-performance RX 7900 XT with good cooling. Excellent for 1440p and 4K gaming.', [gamingTag.id, k4ReadyTag.id, vrReadyTag.id]);
  createGpu('Sapphire RX 7800 XT Nitro+', rx7800xt, sapphire, 16, 'GDDR6', 263, 549.99, 'AVAILABLE', 'Excellent mid-range GPU with great 1440p performance. Great value for money.', [gamingTag.id, vrReadyTag.id]);
  createGpu('Sapphire RX 7700 XT Pulse', rx7700xt, sapphire, 12, 'GDDR6', 245, 449.99, 'AVAILABLE', 'Good mid-range GPU for 1440p gaming. Great performance per dollar.', [gamingTag.id]);
  createGpu('Sapphire RX 7600 Pulse', rx7600, sapphire, 8, 'GDDR6', 165, 269.99, 'AVAILABLE', 'Budget-friendly AMD GPU with good 1080p performance. Great for entry-level gaming.', [gamingTag.id, budgetTag.id]);
  createGpu('Sapphire RX 6900 XT Nitro+', rx6900xt, sapphire, 16, 'GDDR6', 300, 799.99, 'DISCONTINUED', 'Previous generation flagship AMD GPU. Still excellent for 1440p and 4K gaming.', [gamingTag.id, highEndTag.id, k4ReadyTag.id]);
  createGpu('Sapphire RX 6800 XT Nitro+', rx6900xt, sapphire, 16, 'GDDR6', 300, 699.99, 'DISCONTINUED', 'Previous generation high-end AMD GPU. Excellent for 1440p gaming.', [gamingTag.id, k4ReadyTag.id]);
  createGpu('Sapphire RX 6700 XT Pulse', rx7700xt, sapphire, 12, 'GDDR6', 230, 449.99, 'DISCONTINUED', 'Previous generation mid-range AMD GPU. Great for 1440p gaming.', [gamingTag.id]);

  createGpu('PowerColor RX 7900 XTX Red Devil', rx7900xtx, powerColor, 24, 'GDDR6', 355, 1049.99, 'AVAILABLE', 'Premium RX 7900 XTX with excellent cooling and RGB lighting. Great for high-end gaming.', [gamingTag.id, rgbTag.id, highEndTag.id, k4ReadyTag.id]);
  createGpu('PowerColor RX 7900 XT Hellhound', rx7900xt, powerColor, 20, 'GDDR6', 315, 849.99, 'AVAILABLE', 'Well-designed RX 7900 XT with good performance and aesthetics.', [gamingTag.id, k4ReadyTag.id]);
  createGpu('PowerColor RX 7800 XT Red Devil', rx7800xt, powerColor, 16, 'GDDR6', 263, 529.99, 'AVAILABLE', 'Premium RX 7800 XT with RGB lighting and excellent cooling.', [gamingTag.id, rgbTag.id]);
  createGpu('PowerColor RX 7700 XT Fighter', rx7700xt, powerColor, 12, 'GDDR6', 245, 449.99, 'AVAILABLE', 'Good mid-range GPU for 1440p gaming. Great performance per dollar.', [gamingTag.id]);
  createGpu('PowerColor RX 7600 Fighter', rx7600, powerColor, 8, 'GDDR6', 165, 259.99, 'AVAILABLE', 'Budget-friendly AMD GPU with good 1080p performance. Great for entry-level gaming.', [gamingTag.id, budgetTag.id]);
  createGpu('PowerColor RX 6900 XT Red Devil', rx6900xt, powerColor, 16, 'GDDR6', 300, 789.99, 'DISCONTINUED', 'Previous generation flagship AMD GPU. Still excellent for 1440p and 4K gaming.', [gamingTag.id, highEndTag.id, k4ReadyTag.id]);
  createGpu('PowerColor RX 6800 XT Red Devil', rx6900xt, powerColor, 16, 'GDDR6', 300, 689.99, 'DISCONTINUED', 'Previous generation high-end AMD GPU. Excellent for 1440p gaming.', [gamingTag.id, k4ReadyTag.id]);
  createGpu('PowerColor RX 6700 XT Fighter', rx7700xt, powerColor, 12, 'GDDR6', 230, 439.99, 'DISCONTINUED', 'Previous generation mid-range AMD GPU. Great for 1440p gaming.', [gamingTag.id]);

  createGpu('XFX RX 7900 XTX Speedster MERC 310', rx7900xtx, xfx, 24, 'GDDR6', 355, 999.99, 'AVAILABLE', 'Solid RX 7900 XTX with good performance and competitive pricing.', [gamingTag.id, highEndTag.id, k4ReadyTag.id]);
  createGpu('XFX RX 7900 XT Speedster MERC 310', rx7900xt, xfx, 20, 'GDDR6', 315, 849.99, 'AVAILABLE', 'Well-designed RX 7900 XT with good performance and cooling.', [gamingTag.id, k4ReadyTag.id]);
  createGpu('XFX RX 7800 XT Speedster QICK 319', rx7800xt, xfx, 16, 'GDDR6', 263, 519.99, 'AVAILABLE', 'Solid RX 7800 XT with good performance and competitive pricing.', [gamingTag.id]);
  createGpu('XFX RX 7700 XT Speedster QICK 319', rx7700xt, xfx, 12, 'GDDR6', 245, 439.99, 'AVAILABLE', 'Good mid-range GPU for 1440p gaming. Great performance per dollar.', [gamingTag.id]);
  createGpu('XFX RX 7600 Speedster SWFT 210', rx7600, xfx, 8, 'GDDR6', 165, 259.99, 'AVAILABLE', 'Budget-friendly AMD GPU with good 1080p performance. Great for entry-level gaming.', [gamingTag.id, budgetTag.id]);
  createGpu('XFX RX 6900 XT Speedster MERC 319', rx6900xt, xfx, 16, 'GDDR6', 300, 779.99, 'DISCONTINUED', 'Previous generation flagship AMD GPU. Still excellent for 1440p and 4K gaming.', [gamingTag.id, highEndTag.id, k4ReadyTag.id]);
  createGpu('XFX RX 6800 XT Speedster MERC 319', rx6900xt, xfx, 16, 'GDDR6', 300, 679.99, 'DISCONTINUED', 'Previous generation high-end AMD GPU. Excellent for 1440p gaming.', [gamingTag.id, k4ReadyTag.id]);
  createGpu('XFX RX 6700 XT Speedster QICK 319', rx7700xt, xfx, 12, 'GDDR6', 230, 429.99, 'DISCONTINUED', 'Previous generation mid-range AMD GPU. Great for 1440p gaming.', [gamingTag.id]);

  createGpu('ASRock RX 7800 XT Phantom Gaming', rx7800xt, asrock, 16, 'GDDR6', 263, 529.99, 'AVAILABLE', 'Solid RX 7800 XT with good performance and RGB lighting.', [gamingTag.id, rgbTag.id]);
  createGpu('ASRock RX 7700 XT Phantom Gaming', rx7700xt, asrock, 12, 'GDDR6', 245, 449.99, 'AVAILABLE', 'Good mid-range GPU for 1440p gaming. Great performance per dollar.', [gamingTag.id]);
  createGpu('ASRock RX 7600 Challenger', rx7600, asrock, 8, 'GDDR6', 165, 259.99, 'AVAILABLE', 'Budget-friendly AMD GPU with good 1080p performance. Great for entry-level gaming.', [gamingTag.id, budgetTag.id]);
  createGpu('ASRock Intel Arc A770 Phantom Gaming', arcA770, asrock, 16, 'GDDR6', 225, 349.99, 'AVAILABLE', 'Intel Arc A770 with good 1440p performance. Great for budget gaming with modern features.', [gamingTag.id, budgetTag.id, rayTracingTag.id]);
  createGpu('ASRock Intel Arc A750 Challenger', arcA750, asrock, 8, 'GDDR6', 225, 249.99, 'AVAILABLE', 'Budget-friendly Intel Arc A750. Good for 1080p gaming with ray tracing support.', [gamingTag.id, budgetTag.id, rayTracingTag.id]);
  createGpu('ASRock RX 6900 XT Phantom Gaming', rx6900xt, asrock, 16, 'GDDR6', 300, 789.99, 'DISCONTINUED', 'Previous generation flagship AMD GPU. Still excellent for 1440p and 4K gaming.', [gamingTag.id, highEndTag.id, k4ReadyTag.id]);
  createGpu('ASRock RX 6800 XT Phantom Gaming', rx6900xt, asrock, 16, 'GDDR6', 300, 689.99, 'DISCONTINUED', 'Previous generation high-end AMD GPU. Excellent for 1440p gaming.', [gamingTag.id, k4ReadyTag.id]);
  createGpu('ASRock RX 6700 XT Challenger', rx7700xt, asrock, 12, 'GDDR6', 230, 429.99, 'DISCONTINUED', 'Previous generation mid-range AMD GPU. Great for 1440p gaming.', [gamingTag.id]);

  createGpu('Inno3D RTX 4090 iChill X3', rtx4090, inno3d, 24, 'GDDR6X', 450, 1649.99, 'AVAILABLE', 'Solid RTX 4090 with good performance and cooling. Great value for money.', [gamingTag.id, rayTracingTag.id, highEndTag.id, k4ReadyTag.id]);
  createGpu('Inno3D RTX 4080 iChill X3', rtx4080, inno3d, 16, 'GDDR6X', 320, 1199.99, 'AVAILABLE', 'Well-balanced RTX 4080 with good performance and competitive pricing.', [gamingTag.id, rayTracingTag.id, k4ReadyTag.id]);
  createGpu('Inno3D RTX 4070 Twin X2 OC', rtx4070, inno3d, 12, 'GDDR6X', 200, 579.99, 'AVAILABLE', 'Compact RTX 4070 with good performance. Suitable for smaller cases.', [gamingTag.id, rayTracingTag.id]);
  createGpu('Inno3D RTX 4060 Twin X2', rtx4060, inno3d, 8, 'GDDR6', 115, 289.99, 'AVAILABLE', 'Budget-friendly RTX 4060 with decent performance. Good for entry-level gaming.', [gamingTag.id, budgetTag.id]);
  createGpu('Inno3D RTX 3090 iChill X3', rtx3090, inno3d, 24, 'GDDR6X', 350, 1399.99, 'DISCONTINUED', 'Previous generation flagship GPU. Excellent for 4K gaming and workstation tasks.', [gamingTag.id, rayTracingTag.id, workstationTag.id, highEndTag.id]);
  createGpu('Inno3D RTX 3080 iChill X3', rtx3080, inno3d, 10, 'GDDR6X', 320, 839.99, 'DISCONTINUED', 'Previous generation high-end GPU. Excellent for 1440p and 4K gaming.', [gamingTag.id, rayTracingTag.id, k4ReadyTag.id]);
  createGpu('Inno3D RTX 3070 Twin X2 OC', rtx3070, inno3d, 8, 'GDDR6', 220, 569.99, 'DISCONTINUED', 'Previous generation mid-range GPU. Great for 1440p gaming.', [gamingTag.id, rayTracingTag.id]);
  createGpu('Inno3D RTX 3060 Twin X2', rtx3060, inno3d, 12, 'GDDR6', 170, 369.99, 'DISCONTINUED', 'Previous generation budget GPU. Good for 1080p gaming.', [gamingTag.id, budgetTag.id]);

  console.log(`✅ Prepared ${gpus.length} GPUs for creation`);

  for (const gpuData of gpus) {
    const { tagIds, ...gpuFields } = gpuData;
    await prisma.gpu.create({
      data: {
        ...gpuFields,
        tags: {
          connect: tagIds.map((id) => ({ id })),
        },
      },
    });
  }

  console.log(`✅ Created ${gpus.length} GPUs`);

  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@gpuvault.com',
      password: hashedPassword,
      isActive: true,
      role: 'ADMIN',
      confirmationToken: null,
    },
  });

  console.log('✅ Created admin user: admin@gpuvault.com / admin123');

  const testUser = await prisma.user.create({
    data: {
      email: 'user@example.com',
      password: hashedPassword,
      isActive: true,
      role: 'USER',
      confirmationToken: null,
    },
  });

  console.log('✅ Created test user: user@example.com / admin123');

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
