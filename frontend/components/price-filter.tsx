import { Slider } from "./ui/slider"

export default function PriceFilter() {
  return (
    <div className="mb-8">
      <h3 className="font-semibold mb-4">Price Range</h3>
      <Slider defaultValue={[0, 100]} max={500} step={1} className="mb-2" />
      <div className="flex justify-between text-sm text-gray-500">
        <span>$0</span>
        <span>$500</span>
      </div>
    </div>
  )
}
