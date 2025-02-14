import Link from "next/link";
import { artists, img } from "@/lib/data";

export default function Home() {
  return (
    <main className="container font-vt323 mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 bg-black min-h-screen">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 sm:mb-16 md:mb-24 text-white tracking-tight text-center font-vt323">
        THE ORIGIN OF LOVE
      </h1>

      {/* Artists Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-16 md:mb-24">
        {artists.map((artist) => (
          <Link href={`/artist/${artist.id}`} key={artist.id} className="group">
            <div className="bg-zinc-950 rounded-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-zinc-800 hover:border-zinc-700">
              <div className="relative">
                <img
                  src={artist.image}
                  alt={artist.title}
                  className="w-full aspect-video object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all"></div>
              </div>
              <div className="p-4 sm:p-5 md:p-6">
                <h2 className="text-lg sm:text-xl font-medium mb-1 sm:mb-2 text-white">
                  {artist.title}
                </h2>
                <p className="text-zinc-500 text-xs sm:text-sm tracking-wide">
                  {artist?.description || "No description"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Centered Choose a Potion Section */}
      <div className="w-full px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        <div className="relative w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-b from-neon-green via-transparent to-neon-green z-10"></div>
          <Link href="/dancefloor" className="group block">
            <div className="relative bg-black overflow-hidden border border-neon-green hover:border-neon-green-light transition-all">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent"></div>

              <div className="relative z-20">
                <div className="pt-4 sm:pt-6 md:pt-8 pb-3 sm:pb-4 md:pb-6 px-4 sm:px-6 md:px-8 text-center">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 text-neon-green tracking-widest">
                    Choose a Potion
                  </h2>
                  <p className="text-neon-green-light text-sm sm:text-base md:text-lg max-w-2xl mx-auto tracking-wide">
                    Select your potion for an enchanting experience
                  </p>
                </div>

                <div className="relative">
                  <img
                    src={img}
                    alt="Potion Selection"
                    className="w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neon-green/80 to-transparent mix-blend-multiply"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="relative px-4 top-0 h-auto justify-center flex bg-gradient-to-r border-neon-green/20 items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent text-center select-auto">
                      Enter Potion World
                    </span>
                  </div>
                </div>

                <div className="py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 text-center">
                  <div className="inline-flex items-center space-x-2 text-neon-green text-xs sm:text-sm">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-neon-green rounded-full animate-pulse"></span>
                    <span className="tracking-widest uppercase">
                      Magical Selections Await
                    </span>
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-neon-green rounded-full animate-pulse"></span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}