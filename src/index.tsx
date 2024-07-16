import formats from './barcodes';
import type { Constructor, Binary as Encoded, Options, Fonts, BarValue, Format } from './definitions';
import { defaults } from './definitions';
import ErrorBoundary from './Boundary';
import { View, Text } from 'react-native';

const Barcode = ({value, options, ...styles}: Constructor) => {

  const opts = { ...defaults.options, ...options } as Options & Fonts
  const encoder = new formats[opts.format](value, opts)
  const lastChar = (opts as any as { lastChar: boolean }).lastChar;

  if (!encoder.valid()) {
    throw new Error(`${value} is not a valid input for ${opts.format} barcode.`)
  }

  const encoded: Encoded | Encoded[] = encoder.encode()
  let leftmost = 0

  const baseH = opts.height + (opts.displayValue ? opts.textMargin * 2 + opts.fontSize : 0)
  const baseW = encoded instanceof Array ? encoded.reduce((n, {data}) => n + (data?.length ?? 0), 0) : (encoded.data?.length ?? 0) + (lastChar ? opts.fontSize : 0)

  const asBarcodes = (encoded: Encoded) => {
    const binary = encoded.data
    if(!binary) return { barcodes: [], text: '', textWidth: 0, textPos: leftmost }

    const barcodes: Array<BarValue> = []
    let counter = 0
    const w = opts.width
    const h = encoded.options?.height ?? opts.height

    for (let b = 0; b < binary.length; b++) {
      if (binary[b] === '1') { counter++ }
      const isLast = b === binary.length - 1;
      if ((binary[b] !== '1' || isLast) && counter > 0) {
        const x = leftmost + (b - counter + Number(binary[b])) * w
        barcodes.push({x, y: 0, w: w * counter, h})
        counter = 0
      }
    }

    const textPos = leftmost
    leftmost += binary.length * w

    return { barcodes, text: encoded.text, textWidth: binary.length * w, textPos }
  }

  return (
    <ErrorBoundary>
      <View style={{...styles, height: baseH, width: baseW}}>
        {Array.isArray(encoded) ? (
          encoded.map((encoded, i) => (
            <Section
              key={i}
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
        {lastChar && (
          <Text style={{
            fontSize: opts.fontSize,
            top: opts.height + opts.textMargin,
            left: leftmost,
          }}>
            {">"}
          </Text>
        )}
      </View>
    </ErrorBoundary>
  );
};

type SectionContructor = {
  opts: Options & Fonts,
  values: {
    barcodes: BarValue[],
    text?: string,
    textWidth: number,
    textPos: number
  }
}

const Section = ({opts, values: { barcodes, text, textWidth, textPos }}: SectionContructor) => {
  return (
    <View style={{position:'relative'}}>
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
      {opts.displayValue && text && (
        <Text style={{
          position: 'absolute',
          textAlign: opts.textAlign,
          fontSize: opts.fontSize,
          top: (barcodes[0]?.h ?? opts.height) + opts.textMargin,
          left: textPos,
          width: textWidth,
          backgroundColor: opts.background
        }}>
          {text}
        </Text>
      )}
    </View>
  )
}

export type { Constructor, Options, Format, BarValue }

export default Barcode;