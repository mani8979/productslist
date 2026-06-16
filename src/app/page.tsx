import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import FloatingActions from "@/components/FloatingActions";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      <ProductGrid />
      <FloatingActions />
    </main>
  );
}
