import React from 'react';
import Barcode from './src';

export default function App() {
  return (
    <Barcode
      marginTop={20}
      marginLeft={20}
      value="1234567890128"
      options={{
        format: 'EAN13',
        width: 2,
        height: 100,
        background: 'white',
        color: 'black',
        displayValue: true,
        fontSize: 20,
        font: 'monospace',
        textAlign: 'center',
        textPosition: 'bottom',
        textMargin: 20,
      }}
    />
  );
}