import formats from './barcodes';
import type { Constructor, Binary as Encoded, Options, Fonts, BarValue, Format } from './definitions';
import { defaults } from './definitions';
import ErrorBoundary from './Boundary';
import { View } from 'react-native';

const Barcode = ({value, options, ...styles}: Constructor) => {

  const opts = { ...defaults.options, ...options } as Options & Fonts
  const encoder = new formats[opts.format](value, opts)

  if (!encoder.valid()) {
    throw new Error(`${value} is not a valid input for ${opts.format} barcode.`)
  }

  const encoded: Encoded | Encoded[] = encoder.encode()

  const asBarcodes = (encoded: Encoded) => {
    const binary = encoded.data
    if(!binary) return { barcodes: [], text: '' }

    const barcodes: Array<BarValue> = []
    let counter = 0
    const w = opts.width
    const h = encoded.options?.height ?? opts.height

    for (let b = 0; b < binary.length; b++) {
      if (binary[b] === '1') { counter++ }
      const isLast = b === binary.length - 1;
      if ((binary[b] !== '1' || isLast) && counter > 0) {
        const x = (b - counter - Number(isLast)) * w
        barcodes.push({x, y: 0, w: w * counter, h})
        counter = 0
      }
    }

    return { barcodes, text: encoded.text }
  }

  return (
    <ErrorBoundary>
      <View style={styles}>
        {Array.isArray(encoded) ? (
          encoded.map((encoded) => (
            <Section
              opts={opts}
              values={asBarcodes(encoded)}
            />
          ))
        ) : (
          <Section
            opts={opts}
            values={asBarcodes(encoded)}
          />
        )}
      </View>
    </ErrorBoundary>
  );
};

type SectionContructor = {
  opts: Options & Fonts,
  values: {
    barcodes: BarValue[],
    text?: string
  }
}

const Section = ({opts, values: { barcodes, text }}: SectionContructor) => {
  return (
    <View>
      {barcodes.map(({x, y, w, h}, i) => (
        <View key={i} style={{
          position: 'absolute',
          left: x,
          top: y,
          width: w,
          height: h,
          backgroundColor: opts.color
        }} />
      ))}
      {opts.displayValue && barcodes.length > 0 && text && (
        <View style={{
          position: 'absolute',
          top: barcodes[0].h,
          left: barcodes[0].x,
          backgroundColor: opts.color
        }}>
          {text}
        </View>
      )}
    </View>
  )
}

export type { Constructor, Options, Format, BarValue }

export default Barcode;