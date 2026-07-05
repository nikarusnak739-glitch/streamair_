import { Product, PAINT_FIXED_DESCRIPTION } from './types';

const BASIC_COLORS: [string, string][] = [
  ['01', 'білий'],
  ['02', 'чорний'],
  ['03', 'червоний'],
  ['04', 'синій'],
  ['05', 'жовтий'],
  ['06', 'фіолетовий'],
  ['07', 'салатовий'],
  ['08', 'малиновий'],
  ['09', 'винний'],
  ['10', 'шоколадний'],
  ['11', 'помаранчевий'],
  ['12', 'смарагдовий'],
  ['13', 'рожевий'],
  ['14', 'охра'],
  ['15', 'темна олива'],
];

const NEON_COLORS: [string, string][] = [
  ['21', 'блакитний неон'],
  ['22', 'кораловий неон'],
  ['23', 'рожевий неон'],
  ['24', 'жовтий неон'],
  ['25', 'зелений неон'],
  ['26', 'фуксія неон'],
  ['27', 'помаранчевий неон'],
  ['28', 'бірюзовий неон'],
];

const NUDE_COLORS: [string, string][] = [
  ['31', 'малиновий nude'],
  ['32', 'м\'ятний nude'],
  ['33', 'графітовий nude'],
  ['34', 'фіолетовий nude'],
  ['35', 'рожевий nude'],
  ['36', 'васильковий nude'],
  ['37', 'бежевий nude'],
  ['38', 'лавандовий nude'],
  ['39', 'лаймовий nude'],
];

const PEARL_COLORS: [string, string][] = [
  ['51', 'срібний перламутр'],
  ['52', 'рожевий перламутр'],
  ['53', 'золотий перламутр'],
  ['54', 'бронзовий перламутр'],
  ['55', 'білий перламутр'],
];

const PEARL_LIMITED_EDITION: [string, string][] = [['le', 'синій перламутр']];

const STENCILS: [string, string][] = [
  ['01', 'Виделкоподібні гілки, 4 варіанти'],
  ['02', 'Геометричні пазли — кістки та плетена решітка'],
  ['03', 'Тюльпани й пелюстки — бордюр із чашечок'],
  ['04', 'Вушка-крила — бордюр із завитками'],
  ['05', 'Півмісяці — бордюр посмішок, контур і залиті'],
  ['06', 'Хвилясті лінії, зигзаг-трикутники, S-завитки'],
  ['07', 'Концентричні кола та овали'],
  ['08', 'Абстрактні хвилясті лінії, 12 варіантів'],
  ['09', 'Хвилясті смуги, шеврон-зигзаг, дрібний зигзаг'],
  ['10', 'Тропічне листя монстери'],
  ['11', 'Вертикальні смуги різної товщини'],
  ['12', 'Метелики — парні та поодинокі'],
  ['13', 'Базові фігури — шестикутник, трикутник, квадрат'],
  ['14', 'Абстрактні гірські хвилі та зигзаг-піки'],
  ['15', 'Хвилі, зигзаг «пульс», карлючки'],
  ['16', 'Парні літери алфавіту'],
  ['17', 'Листя й пелюстки — довільні силуети'],
  ['18', 'Зірки та серця, щільний візерунок і поодинокі'],
  ['19', 'Кола — поодинокі та кластери'],
  ['20', 'Арки та пісочний годинник'],
  ['21', 'Текстури — бруківка, піксельний лабіринт, тигрові смуги'],
  ['22', 'Листя — клен, береза, папороть'],
  ['23', 'Абстрактні плями-амеби та шестерні'],
  ['24', 'Кельтська решітка, завитки, ацтек-ромби'],
  ['25', 'Черепи та жартівливі графіті-мотиви'],
  ['26', 'Полум\'я, блискавки, напис TOXIC'],
  ['27', 'Шеврон-арки, заокруглені та гострі'],
  ['28', 'Вертикальні хвилясті стрічки'],
  ['29', 'Ромбова решітка та мозаїчні текстури'],
  ['30', 'Сніжинки, 4 різних види'],
  ['32', 'Трайбл-завитки та полум\'я'],
  ['33', 'Масті карт — бубна, піка, серце, трефа'],
  ['34', 'Дрібні квіти-конюшинки та зірочки'],
  ['35', 'Квітка плюмерія та крапки'],
  ['36', 'Пера різної форми та вигину'],
  ['37', 'Метелики — великі та малі'],
  ['38', 'Мотиви LOVE, замок, фея'],
  ['39', 'Букети тюльпанів і маків'],
  ['40', 'Колоски пшениці, папороть, гілочка'],
  ['41', 'Пейзаж — гори, ліс, вовки, місяць'],
  ['42', 'Тваринні текстури — зебра, леопард, решітка'],
  ['43', 'Органічна павутина, мандала, лабіринт-річка'],
  ['44', 'Гілочки та ягідні грона, 12 варіантів'],
  ['45', 'Пейслі, шеврон-листя, полум\'я-хвилі'],
  ['46', 'Квіткові грона та абстрактні пелюстки'],
  ['47', 'Абстрактні хвилясті лінії та чорнильна пляма'],
  ['48', 'Серця, ромби та шеврон-бордюри'],
  ['49', 'Готичний алфавіт A-Z'],
];

const POPULAR_STENCILS = new Set(['24', '38', '49']);

function buildPaintLine(
  colors: [string, string][],
  line: 'basic' | 'neon' | 'nude' | 'pearl',
  basePrice: number,
  whitePriceNumber?: string
): Product[] {
  return colors.map(([number, colorName]) => ({
    id: `${line}-${number}`,
    category: 'paint',
    line,
    number,
    title: colorName,
    colorName,
    volume: '10 мл',
    price: whitePriceNumber && number === whitePriceNumber ? basePrice + 10 : basePrice,
    image: `/images/paints/${line}-${number}.jpg`,
    popular: (line === 'basic' && number === '01') || (line === 'neon' && (number === '21' || number === '24')) || (line === 'pearl' && number === '51'),
    descriptionShort: PAINT_FIXED_DESCRIPTION,
  }));
}

const basicPaints = buildPaintLine(BASIC_COLORS, 'basic', 165, '01');
const neonPaints = buildPaintLine(NEON_COLORS, 'neon', 175);
const nudePaints = buildPaintLine(NUDE_COLORS, 'nude', 165);
const pearlPaints = buildPaintLine(PEARL_COLORS, 'pearl', 175);

const pearlLimitedEditionPaints: Product[] = PEARL_LIMITED_EDITION.map(([number, colorName]) => ({
  id: `pearl-${number}`,
  category: 'paint',
  line: 'pearl',
  number,
  title: 'Pearl Limited Edition',
  colorName,
  volume: '10 мл',
  price: 175,
  image: `/images/paints/pearl-${number}.jpg`,
  descriptionShort: PAINT_FIXED_DESCRIPTION,
}));

const stencilProducts: Product[] = STENCILS.map(([number, desc]) => ({
  id: `stencil-${number}`,
  category: 'stencil',
  number,
  title: `Трафарет №${number}`,
  price: 75,
  image: `/images/stencils/stencil-${number}.jpg`,
  popular: POPULAR_STENCILS.has(number),
  descriptionShort: desc,
}));

const accessoryProducts: Product[] = [
  {
    id: 'fabric-mesh',
    category: 'accessory',
    title: 'Сітка для аерографії Fabric',
    price: 150,
    image: '/images/accessories/fabric-mesh.jpg',
    descriptionShort:
      'Текстильна сітка-трафарет для створення мереживних і текстурних візерунків в аерографії. Багаторазова.',
  },
  {
    id: 'notepad',
    category: 'accessory',
    title: 'Блокнот для трафаретів Notepad',
    price: 190,
    image: '/images/accessories/notepad.jpg',
    descriptionShort: 'Компактний блокнот для зберігання та впорядкування використаних трафаретів.',
  },
];

const careProducts: Product[] = [
  {
    id: 'airbrush-cleaner',
    category: 'care',
    title: 'Airbrush cleaner',
    volume: '55 мл',
    price: 330,
    image: '/images/care/airbrush-cleaner.jpg',
    popular: true,
    descriptionShort:
      'Рідина як для щоденного використання, так і для глибокого очищення аерографа. Рідина здатна діставати та розчиняти застарілу фарбу у важкодоступних місцях. Важливо після застосування рідини добре промити її водою та спиртом.',
  },
  {
    id: 'airbrush-top',
    category: 'care',
    title: 'Airbrush top Sticky',
    volume: '10 мл',
    price: 210,
    image: '/images/care/airbrush-top.jpg',
    descriptionShort: 'Топ з липким шаром використовується для перекриття на першому кроці.',
  },
];

export const products: Product[] = [
  ...basicPaints,
  ...neonPaints,
  ...nudePaints,
  ...pearlPaints,
  ...pearlLimitedEditionPaints,
  ...stencilProducts,
  ...accessoryProducts,
  ...careProducts,
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getPopularProducts(): Product[] {
  return products.filter((p) => p.popular);
}

export function getPaintsByLine(line: 'basic' | 'neon' | 'nude' | 'pearl'): Product[] {
  return products.filter((p) => p.category === 'paint' && p.line === line);
}

export function getStencils(): Product[] {
  return [...stencilProducts].sort((a, b) => Number(a.number) - Number(b.number));
}

export function getAccessories(): Product[] {
  return accessoryProducts;
}

export function getCareProducts(): Product[] {
  return careProducts;
}

export function getAdditionalMaterials(): Product[] {
  return [...accessoryProducts, ...careProducts];
}
