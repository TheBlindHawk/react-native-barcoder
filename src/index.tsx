import Svg, { Rect } from 'react-native-svg';
import formats from 'jsbarcode/src/barcodes';
import type { Constructor, Options, BarValue, Format } from './definitions';
import { defaults } from './definitions';
import ErrorBoundary from './Boundary';

const Barcode = ({value, options}: Constructor) => {

  const opts = { ...defaults, ...options } as Options
  const encoder = new formats[opts.format](value, opts)

  if (!encoder.valid()) {
    throw new Error(`${value} is not a valid input for ${opts.format} barcode.`)
  }

  const binary = encoder.encode()?.data

  if(!binary) return <></>

  const barcodes: Array<BarValue> = []
  let counter = 0;
  const w = 
    typeof opts.width === 'number' ? opts.width :
    (opts.width?.max || 1) / binary.length || 1
  const h = opts.height

  for (let b = 0; b < binary.length; b++) {
    if (binary[b] === '1') { counter++ }
    const isLast = b === binary.length - 1;
    if ((binary[b] !== '1' || isLast) && counter > 0) {
      const x = (b - counter - Number(isLast)) * w
      barcodes.push({x, y: 0, w: w * counter, h})
      counter = 0
    }
  }

  return (
    <ErrorBoundary>
      <Svg width={w*binary.length} height={opts.height} fill={opts.color}>
        {barcodes.map(({x, y, w, h}, i) => (
          <Rect key={i} x={x} y={y} width={w} height={h} />
        ))}
      </Svg>
    </ErrorBoundary>
  )
};

export type { Constructor, Options, Format, BarValue }

export default Barcode;