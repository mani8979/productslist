"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ProductCard, { Product } from "./ProductCard";
import { client } from "../sanity/lib/client";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [lastId, setLastId] = useState<string | null>(null);
  const [lastRank, setLastRank] = useState<number | null>(null);
  
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchProducts = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    
    try {
      // Fetch 12 products ordered by rank (ascending)
      // Using pagination with last fetched item's rank and id
      let query = `*[_type == "product"] | order(rank asc, _id asc) [0...12] {
        _id,
        title,
        image,
        rank,
        redirectUrl
      }`;

      if (lastRank !== null && lastId !== null) {
        query = `*[_type == "product" && (rank > $lastRank || (rank == $lastRank && _id > $lastId))] | order(rank asc, _id asc) [0...12] {
          _id,
          title,
          image,
          rank,
          redirectUrl
        }`;
      }

      const params = lastRank !== null ? { lastRank, lastId } : {};
      const newProducts: Product[] = await client.fetch(query, params);
      
      if (newProducts.length > 0) {
        setProducts(prev => [...prev, ...newProducts]);
        const lastProduct = newProducts[newProducts.length - 1];
        setLastRank(lastProduct.rank);
        setLastId(lastProduct._id);
      } else {
        setHasMore(false);
      }

      // If we got less than 12 items, there are no more items left
      if (newProducts.length < 12) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, [hasMore, lastRank, lastId]);

  // Initial load
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Intersection Observer for Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          fetchProducts();
        }
      },
      { threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [loading, hasMore, fetchProducts]);

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Category Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide">
        {['All', 'Electronics', 'Home & Kitchen', 'Gadgets', 'Gifts'].map((cat, i) => (
          <button 
            key={cat} 
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              i === 0 ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-200 hover:border-primary/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {products.map((product, index) => (
          <ProductCard key={product._id} product={product} index={index % 12} />
        ))}
        
        {/* Skeleton Loaders */}
        {loading && Array.from({ length: 4 }).map((_, i) => (
          <div key={`skeleton-${i}`} className="w-full aspect-square bg-gray-200 rounded-xl animate-pulse"></div>
        ))}
      </div>

      {/* Infinite Scroll trigger element */}
      <div ref={loaderRef} className="w-full h-20 flex items-center justify-center mt-8">
        {loading && (
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        )}
        {!hasMore && products.length > 0 && (
          <p className="text-gray-500 font-medium text-sm md:text-base">You have reached the end of the list.</p>
        )}
        {!hasMore && products.length === 0 && !loading && (
          <p className="text-gray-500 font-medium text-sm md:text-base">No products found. Add some from the Admin panel!</p>
        )}
      </div>
    </section>
  );
}
