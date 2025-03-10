import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"

export default function CategoryFilter() {
  const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"]

  return (
    <div className="mb-8">
      <h3 className="font-semibold mb-4">Filters</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category} className="flex items-center">
            <Checkbox id={`category-${category}`} />
            <Label htmlFor={`category-${category}`} className="ml-2">
              {category}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
