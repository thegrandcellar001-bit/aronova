export default function ConciergePage() {
  return (
    <main className="max-w-frame mx-auto px-4 xl:px-0 py-10">
      <h1 className="text-3xl font-bold mb-4">Your Curator, Always On Hand.</h1>
      <ul className="list-disc pl-6 text-black/80 space-y-2 mb-6">
        <li><a href="#" className="underline">Track My Order →</a></li>
        <li><a href="#" className="underline">Speak to a Concierge →</a></li>
        <li><a href="#" className="underline">Authentication Help →</a></li>
        <li><a href="/returns" className="underline">Returns & Care →</a></li>
      </ul>
      <p className="text-black/70 max-w-2xl">Every Aronova object is authenticated, inspected, and certified before delivery. If your discovery does not meet your expectations, you may return it within 14 days. Our concierge team will arrange collection and ensure the process is seamless.</p>
    </main>
  );
}


