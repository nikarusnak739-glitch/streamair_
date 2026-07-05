export type ProductCategory = 'paint' | 'stencil' | 'accessory' | 'care';

export type PaintLine = 'basic' | 'neon' | 'nude' | 'pearl';

export interface Product {
  id: string;
  category: ProductCategory;
  line?: PaintLine;
  number?: string;
  title: string;
  colorName?: string;
  volume?: string;
  price: number;
  image: string;
  popular?: boolean;
  descriptionShort: string;
}

export const PAINT_FIXED_DESCRIPTION =
  'Фарба на водній основі, поліуретанова складова, щільна пігментація, легко проходить через сопло 0.2.';

export const PAINT_LINE_LABELS: Record<PaintLine, string> = {
  basic: 'Basic',
  neon: 'Neon',
  nude: 'Nude',
  pearl: 'Pearl',
};

export const PAINT_LINE_DESCRIPTIONS: Record<PaintLine, string> = {
  basic:
    'Базова колекція кольорів. Щільна пігментація, легко проходить через мінімальне сопло, не забиває аерограф. Важливо добре збовтати пляшку з фарбою.',
  neon: 'Неонова колекція яскравих відтінків. Важливо добре збовтати пляшку з фарбою.',
  nude: 'М\'які відтінки на основі білого кольору. Дуже щільна пігментація, з легкістю проходить через будь-яке сопло. Важливо добре збовтати пляшку з фарбою.',
  pearl: 'Перламутрові фарби з м\'яким сяючим ефектом. Важливо добре збовтати пляшку з фарбою.',
};
