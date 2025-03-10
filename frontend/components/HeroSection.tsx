import Image from "next/image"
import { Button } from "./ui/button";

export default function HeroSection() {
    return (
        <section className="relative bg-gray-300 text-black py-16 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">
                            FIND CLOTHES
                            <br />
                            THAT MATCHES
                            <br />
                            YOUR STYLE
                        </h1>
                        <p className="text-sm text-gray-500">
                            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                        </p>
                        <Button className="bg-black text-white rounded-lg hover:bg-gray-200 px-8">SHOP NOW</Button>
                        <div className="flex gap-8 mt-8">
                            <div>
                                <p className="text-4xl font-bold">200+</p>
                                <p className="text-sm text-gray-500">International Brands</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold">2,000+</p>
                                <p className="text-sm text-gray-500">High-Quality Products</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold">30,000+</p>
                                <p className="text-sm text-gray-500">Happy Customers</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <Image
                            src="/Images/hero-image.png"
                            alt="Fashion models"
                            width={900}
                            height={900}
                            className="object-cover mix-blend-multiply rounded-md"
                        />
                        {/* <div className="absolute -top-4 -left-4 w-8 h-8">
                <Image src="/placeholder.svg?height=32&width=32" alt="Decoration" width={32} height={32} />
              </div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8">
                <Image src="/placeholder.svg?height=32&width=32" alt="Decoration" width={32} height={32} />
              </div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}
