export type Format =
  | 'CODE39' | 'CODE128' | 'CODE128A' | 'CODE128B' | 'CODE128C'
  | 'EAN13' | 'EAN8' | 'EAN5' | 'EAN2'
  | 'UPC' | 'UPCE'
  | 'ITF14' | 'ITF'
  | 'MSI' | 'MSI10' | 'MSI11' | 'MSI1010' | 'MSI1110'
  | 'pharmacode' | 'codabar' | 'GenericBarcode';

export type Options = {
  format: Format;
  width: number | { max?: number };
  height: number;
  color: string;
}

export type Barcode = {
  x: number,
  y: number,
  w: number,
  h: number,
}

export type Constructor = {
  value: string;
  options?: Partial<Options>
}

export const defaults = {
  value: 'barcoder',
  options: {
    format: 'CODE128',
    width: 2,
    height: 100,
    color: 'black'
  },
};
