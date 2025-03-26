import { Plus } from "lucide-react"

export default function CustomerReviews() {
    const customerReviews = [
        {
          id: 1,
          name: "John D.",
          rating: 5,
          comment: "Great quality products and fast shipping. Will definitely shop here again!",
        },
        {
          id: 2,
          name: "Sarah M.",
          rating: 4,
          comment: "Love the variety of styles. The fit is perfect and the material is comfortable.",
        },
        {
          id: 3,
          name: "Michael T.",
          rating: 5,
          comment: "Excellent customer service and the clothes are exactly as described. Very satisfied!",
        },
      ]

    return (
        <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold uppercase">OUR HAPPY CUSTOMERS</h2>
            <button className="text-sm">
              <Plus size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerReviews.map((review) => (
              <div key={review.id} className="bg-white p-6 shadow-sm">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm mb-4">{review.comment}</p>
                <p className="text-sm font-medium">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    )
}