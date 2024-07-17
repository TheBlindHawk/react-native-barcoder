import React from 'react';
import { View, Text } from 'react-native';
import Barcode from './dist';

export default function App() {
  return (
    <View>
      <View style={{width:"100%", height:100, paddingTop:40}}>
        <Text style={{fontSize:32, textAlign: "center"}}>{"Welcome to local development!"}</Text>
      </View>
      <Barcode
        marginTop={20}
        marginLeft={20}
        value="1234567890128"
        options={{
          format: 'EAN13',
          width: 2,
          height: 50,
          background: 'lime',
          color: 'red',
          displayValue: true,
          font: 'monospace',
          textAlign: 'center',
          textMargin: 10,
          textColor: 'black',
          lastChar: true,
        }}
      />
      <View style={{width:"100%", height:100, paddingTop:40}}>
        <Text style={{fontSize:32, textAlign: "center"}}>{"Welcome to local development!"}</Text>
      </View>
    </View>
  );
}