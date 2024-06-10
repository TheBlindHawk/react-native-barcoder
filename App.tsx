import React from 'react';
import Barcode from './dist';

export default function App() {
  return (
    <Barcode
      marginTop={20}
      marginLeft={20}
      value="1234567890128"
      options={{
        width: 2,
        height: 50,
        background: 'white',
        color: 'black',
        displayValue: true,
        font: 'monospace',
        textAlign: 'center',
        textPosition: 'bottom',
        textMargin: 10,
      }}
    />
  );
}