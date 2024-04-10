<h1 align="center">Customizable Roulette Library</h1>

<div align="center">
    
![](https://img.shields.io/npm/v/react-native-barcoder)
![](https://img.shields.io/npm/dm/react-native-barcoder)
![](https://img.shields.io/github/languages/code-size/TheBlindHawk/react-native-barcoder)

</div>

<div align="center">

![alt text](https://github.com/TheBlindHawk/react-native-barcoder/blob/main/docs/sample.png?raw=true)

</div>

```
npm install react-native-barcoder
```

A minimal package for displaying a barcode on react-native.

```typescript
import Barcode from 'react-native-barcoder';

const options = { /* add your options here*/ }

<Barcode value="barcoder" options={options}/>
```

## options

set up the options parameter (taken from [jsbarcode](https://github.com/lindell/JsBarcode/blob/master/README.md#options))

```typescript
interface Options = {
  format: Format;
  width: number | { max?: number };
  height: number;
  color: string;
};
```

regarding each value inside options:

| Value         | Type      | Default   | Comment        |
| ------------- | --------- | --------- | -------------- |
| format        | Format    | 'CODE128' | the format you want to use to display the barcode  |
| width         | int       | 2         | the width of the barcode, use max to apply a limit |
| height        | int       | 100       | the height of the barcode                          |
| color         | string    | black     | the color of the bars of the barcode               |