import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"

export default function DressStyleFilter() {
  const dressStyle = ["Casual", "Formal", "Party", "Gym"]

  return (
    <div className="mb-8">
      <h3 className="font-semibold mb-4">Dress Style</h3>
      <div className="space-y-2">
        {dressStyle.map((dress) => (
          <div key={dress} className="flex items-center">
            <Checkbox id={`dress-${dress}`} />
            <Label htmlFor={`dress-${dress}`} className="ml-2">
              {dress}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
