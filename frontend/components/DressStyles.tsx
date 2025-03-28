// components/DressStylesFlex.tsx
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function DressStylesFlex() {
  const dressStyles = [
    { id: 1, name: "Casual", image: "/Images/casual.png" },
    { id: 2, name: "Formal", image: "/Images/formal.png" },
    { id: 3, name: "Party", image: "/Images/party.png" },
    { id: 4, name: "Gym", image: "/Images/gym.png" },
  ];

  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold uppercase mb-12">
          BROWSE BY DRESS STYLE
        </h2>
        {/* Desktop layout: hidden on mobile */}
        <div className="hidden md:flex flex-col gap-4">
          {/* First Row */}
          <div className="flex gap-4 h-64">
            {/* First image fixed width */}
            <Link href={`/dress-styles/${dressStyles[0].name.toLowerCase()}`} legacyBehavior>
              <a className="group relative w-1/3 h-full overflow-hidden bg-gray-100">
                <Image
                  src={dressStyles[0].image}
                  alt={dressStyles[0].name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60">
                </div>
              </a>
            </Link>
            {/* Second image flex-grow */}
            <Link href={`/dress-styles/${dressStyles[1].name.toLowerCase()}`} legacyBehavior>
              <a className="group relative flex-1 h-full overflow-hidden bg-gray-100">
                <Image
                  src={dressStyles[1].image}
                  alt={dressStyles[1].name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60">
                </div>
              </a>
            </Link>
          </div>
          {/* Second Row */}
          <div className="flex gap-4 h-64">
            {/* Third image flex-grow */}
            <Link href={`/dress-styles/${dressStyles[2].name.toLowerCase()}`} legacyBehavior>
              <a className="group relative flex-1 h-full overflow-hidden bg-gray-100">
                <Image
                  src={dressStyles[2].image}
                  alt={dressStyles[2].name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60">
                </div>
              </a>
            </Link>
            {/* Fourth image fixed width */}
            <Link href={`/dress-styles/${dressStyles[3].name.toLowerCase()}`} legacyBehavior>
              <a className="group relative w-1/3 h-full overflow-hidden bg-gray-100">
                <Image
                  src={dressStyles[3].image}
                  alt={dressStyles[3].name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60">
                </div>
              </a>
            </Link>
          </div>
        </div>

        {/* Mobile Layout: visible only on small screens */}
        <div className="flex flex-col gap-4 md:hidden">
          {dressStyles.map((style) => (
            <Link href={`/dress-styles/${style.name.toLowerCase()}`} key={style.id} legacyBehavior>
              <a className="group relative w-full h-64 overflow-hidden bg-gray-100">
                <Image
                  src={style.image}
                  alt={style.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60">
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
