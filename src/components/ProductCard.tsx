import Image from "next/image";

export interface Product {
  _id: string;
  title: string;
  imageUrl?: string;
  cloudinaryImage?: {
    secure_url: string;
    url: string;
  };
  rank: number;
  redirectUrl: string;
}

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  // Use imageUrl if present, otherwise fall back to cloudinaryImage secure_url, else placeholder
  const imgSrc = product.imageUrl || product.cloudinaryImage?.secure_url || "https://placehold.co/400x400/e2e8f0/475569.png?text=No+Image";

  return (
    <a 
      href={product.redirectUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative w-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.03] animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative w-full aspect-square bg-white p-3 md:p-4 flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={imgSrc}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            className="object-contain p-2"
            loading={index < 8 ? "eager" : "lazy"}
            unoptimized
          />
        </div>
      </div>

      <div className="absolute top-3 left-3 bg-accent text-yellow-900 font-bold text-xs md:text-sm px-2.5 py-1 rounded-md shadow-sm z-10">
        #{product.rank}
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-12 pb-3 px-3">
        <h3 className="text-white font-bold text-xs md:text-sm uppercase tracking-[1px] text-center line-clamp-2 drop-shadow-md">
          {product.title}
        </h3>
      </div>
    </a>
  );
}
