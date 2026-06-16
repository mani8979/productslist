export default function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-6 md:py-10 px-4 animate-fade-in">
      
      {/* Announcement Card */}
      <div className="w-full max-w-2xl bg-gradient-to-br from-primary/10 to-blue-50 border border-primary/20 rounded-[14px] p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
        
        <div className="mb-4 bg-accent/20 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
          New Feature
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-secondary mb-3 leading-tight">
          Try Our New Price Tracking Tool &<br className="hidden md:block" /> Save On Your Amazon Purchase
        </h2>
        
        <p className="text-gray-600 text-sm md:text-base mb-6 max-w-lg">
          Get instantly notified when prices drop on your favorite premium products. Stop overpaying and start saving today.
        </p>

        {/* CTA Button */}
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group">
          Try Now
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>

      </div>
    </section>
  );
}
