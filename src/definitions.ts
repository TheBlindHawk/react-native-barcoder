export type Format =
  | 'CODE39' | 'CODE128' | 'CODE128A' | 'CODE128B' | 'CODE128C'
  | 'EAN13' | 'EAN8' | 'EAN5' | 'EAN2'
  | 'UPC' | 'UPCE'
  | 'ITF14' | 'ITF'
  | 'MSI' | 'MSI10' | 'MSI11' | 'MSI1010' | 'MSI1110'
  | 'pharmacode' | 'codabar' | 'GenericBarcode';

export type Binary = {
  data?: string
  text?: string
  options?: {
    height?: number 
    fontSize?: string
  }
}

export type DefaultOptions = {
  format: Format;
  width: number;
  height: number;
  background: string;
  color: string;
  displayValue: boolean;
}

export type GuardableOptions = DefaultOptions & {
  format: 'EAN8' | 'EAN13' | 'UPC' | 'UPCE';
  flat: boolean;
}

export type EAN13Options = DefaultOptions & {
  format: 'EAN13';
  flat: boolean;
  lastChar: boolean;
}

export type Options = DefaultOptions | GuardableOptions | EAN13Options

export type Fonts = {
  font: string;
  fontSize: number;
  fontStyle: 'normal' | 'italic';
  fontWeight: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  textAlign: 'left' | 'center' | 'right';
  // textPosition: 'top' | 'bottom';
  textMargin: number;
  textColor?: string;
}

export type BarValue = {
  x: number,
  y: number,
  w: number,
  h: number,
}

export type Constructor = {
  value: string;
  options?: Partial<Options & Fonts>
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

export const defaults: {
  value: string,
  options: Options & Fonts
} = {
  value: 'barcoder',
  options: {
    format: 'CODE128',
    width: 2,
    height: 100,
    color: 'black',
    background: 'white',
    displayValue: true,
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'normal',
    font: 'monospace',
    textAlign: 'center',
    // textPosition: 'bottom',
    textMargin: 2,
  },
};
