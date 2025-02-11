import Link from 'next/link';
import { artists, img } from '@/lib/data';

export default function Home() {
  return (
    <main className="container mx-auto px-8 py-16 bg-black min-h-screen">
      <h1 className="text-6xl font-bold mb-24 text-white tracking-tight text-center">
        NFT Generator
      </h1>
      
      {/* Artists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {artists.map((artist) => (
          <Link 
            href={`/artist/${artist.id}`} 
            key={artist.id}
            className="group"
          >
            <div className="bg-zinc-950 rounded-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-zinc-800 hover:border-zinc-700">
              <div className="relative">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full aspect-video object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all"></div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-medium mb-2 text-white">{artist.name}</h2>
                <p className="text-zinc-500 text-sm tracking-wide">{artist.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Centered Dance Floor Section */}
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10"></div>
        <Link href="/dancefloor" className="group block">
          <div className="relative bg-zinc-950 overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
            
            <div className="relative z-20">
              <div className="pt-8 pb-6 px-8 text-center">
                <h2 className="text-3xl font-medium mb-4 text-white tracking-wider">Enter the Dance Floor</h2>
                <p className="text-zinc-400 text-lg max-w-2xl mx-auto tracking-wide">
                  Generate unique art in the metaverse dance floor
                </p>
              </div>
              
              <div className="relative">
                <img
                  src={img}
                  alt="Dance Floor"
                  className="w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent mix-blend-multiply"></div>
                
                {/* Hover State Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-sm">
                    Enter Dance Floor →
                  </span>
                </div>
              </div>
              
              <div className="py-8 px-8 text-center">
                <div className="inline-flex items-center space-x-2 text-zinc-500 text-sm">
                  <span className="w-2 h-2 bg-zinc-500 rounded-full animate-pulse"></span>
                  <span className="tracking-widest uppercase">Live Generation</span>
                  <span className="w-2 h-2 bg-zinc-500 rounded-full animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}