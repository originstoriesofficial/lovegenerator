
import { Artist, ArtistQuestions } from './types';

export const img: string = "/images/galactic_disco.jpg"

// export const artists: Artist[] = [
//   { id: 1, name: "CryptoKitty", image: "/images/galactic_disco.jpg", description: "NFT Art Pioneer" },
//   { id: 2, name: "BlockchainBob", image: "/images/galactic_disco.jpg", description: "Pixel Art Master" },
//   { id: 3, name: "ETHma", image: "/images/galactic_disco.jpg", description: "Abstract Artist" },
//   { id: 4, name: "SolanaSage", image: "/images/galactic_disco.jpg", description: "Digital Surrealist" }
// ];

export const questions: ArtistQuestions = {
  "1": [
    {
      id: 1,
      question: "What's your favorite blockchain?",
      options: ["Ethereum", "Solana", "Bitcoin", "Other"],
      allowCustom: true
    },
    {
      id: 2,
      question: "Choose your art style vibe:",
      options: ["Cyberpunk", "Vaporwave", "Abstract", "Minimalist"],
      allowCustom: true
    }
  ],
  "2": [
    {
      id: 1,
      question: "Pick your pixel art theme:",
      options: ["8-bit Heroes", "Space Adventure", "Crypto Monsters", "Custom"],
      allowCustom: true
    }
  ],
  "3": [
    {
      id: 1,
      question: "Select color palette:",
      options: ["Neon Dreams", "Pastel Future", "Monochrome Plus", "Custom"],
      allowCustom: true
    }
  ],
  "4": [
    {
      id: 1,
      question: "Choose your surreal element:",
      options: ["Floating Cities", "Digital Nature", "Crypto Symbols", "Custom"],
      allowCustom: true
    }
  ]
};

export const artists: Artist[] = [
  {
    "id": 1,
    "title": "Fermi",
    "questions": [
      {
        "question": "Choose a scene:",
        "options": [
          "A celestial dance floor filled with planets of every size",
          "Lovers drifting in zero gravity, bodies outlined in neon light",
          "A spaceship shaped like a vinyl record"
        ],
        "custom_option": "Write your own"
      },
      {
        "question": "Choose a cosmic detail:",
        "options": [
          "Mirror-ball asteroids",
          "A cosmic storm of letters",
          "Floating cassette tapes"
        ],
        "custom_option": "Write your own"
      },
      {
        "question": "Choose the lovers' presence:",
        "options": [
          "Silhouettes outlined in glowing red energy",
          "Shiny star inspired futuristic disco attire",
          "Translucent figures in neon light"
        ],
        "custom_option": "Write your own"
      }
    ],
    "ai_prompt_template": "A breathtaking, cinematic still from an 80s Italo Disco-inspired galaxy, where the green glow of pulsar beams, the deep red haze of planetary nebulae, and the black void of space create a hypnotic dreamscape. A surreal celestial dance floor reflects the vibrant neon lights of a colossal mirrorball moon. {scene}. {cosmic_detail}. Bodies clad in futuristic disco attire, outlined in pulsing green and red neon, moving weightlessly through the stardust-filled expanse. {lovers_presence}. A cosmic storm crackles through the sky with electric energy, scattering glowing love letters across the void. 4K, high resolution, award-winning composition.",
    "image": "/images/galactic_disco.jpg",
    "description": "Cosmic 80's Disco Dream",
  },
  {
    "id": 2,
    "title": "Leyla Diamondi",
    "questions": [
      {
        "question": "Choose a scene:",
        "options": [
          "A floating golden temple in space",
          "Lovers on a celestial columned bridge",
          "A cosmic river of flowing stars"
        ],
        "custom_option": "Write your own"
      },
      {
        "question": "Choose a celestial detail:",
        "options": [
          "Glowing hieroglyphs in the sky",
          "A golden chariot flying through space",
          "Astral pyramids"
        ],
        "custom_option": "Write your own"
      },
      {
        "question": "Choose the lovers' presence:",
        "options": [
          "Radiant blue and gold divine robes",
          "Shimmering beings of pink stardust",
          "Statues of gods coming to life"
        ],
        "custom_option": "Write your own"
      }
    ],
    "ai_prompt_template": "A breathtaking, cinematic still of an Ancient Greek or Egyptian-inspired cosmic love story. A surreal planetary dreamscape bathed in golden, blue, and pink hues. {scene}. {celestial_detail}. Lovers stand in awe, {lovers_presence}. The sky swirls with nebulae shaped like mythological symbols, as divine light illuminates their eternal bond. 4K, high resolution, award-winning composition.",
    "image": "/images/celestial_love.jpeg",
    "description": "Celestial Love of the Gods",
  },
  {
    "id": 3,
    "title": "Aram Mukanay",
    "description": "All Night Love",
    "questions": [
      {
        "question": "Choose a scene:",
        "options": [
          "A rooftop overlooking a neon city",
          "A dimly lit diner with lovers in a booth",
          "80's Studio 54 style dance floor glowing with red and black lights"
        ],
        "custom_option": "Write your own"
      },
      {
        "question": "Choose a cinematic detail:",
        "options": [
          "An oversized jukebox",
          "Flashing lights casting dramatic shadows",
          "A taxi speeding away into the night"
        ],
        "custom_option": "Write your own"
      },
      {
        "question": "Choose the lovers' presence:",
        "options": [
          "Silhouettes sharing a slow dance",
          "Kissing under a flickering streetlight",
          "Two figures locked in an embrace, lost in time"
        ],
        "custom_option": "Write your own"
      }
    ],
    "ai_prompt_template": "A breathtaking, cinematic still from an 80s Boogie-inspired love story, bathed in deep red, black, and white hues. {scene}. {cinematic_detail}. Lovers stand in the glow of neon reflections, {lovers_presence}. The air hums with the distant echo of a slow-burning love song, as the night pulses with passion and mystery. 4K, high resolution, award-winning composition.",
    "image": "/images/all_night_love.jpg"
  },
  {
    "id": 4,
    "title": "Sean Bradford",
    "description": "Old Hollywood (ROYGBIV)",
    "questions": [
      {
        "question": "Choose a scene:",
        "options": [
          "A timeless grand ballroom",
          "A misty rooftop under a vintage skyline",
          "A secret garden glowing under moonlight"
        ],
        "custom_option": "Write your own"
      },
      {
        "question": "Choose a surreal detail:",
        "options": [
          "Shadows embracing and intertwined",
          "A glowing rainbow mist",
          "A large movie-theatre screen"
        ],
        "custom_option": "Write your own"
      },
      {
        "question": "Choose the lovers' presence:",
        "options": [
          "Two figures locked in a timeless dance",
          "A dramatic, passionate embrace in monochrome light",
          "Lovers caught between reality and a dream"
        ],
        "custom_option": "Write your own"
      }
    ],
    "ai_prompt_template": "A breathtaking, cinematic still from an enchanted Old Hollywood-inspired love story, blending fantasy and classic cinema. {scene}. {surreal_detail}. Lovers stand at the center, {lovers_presence}. A soft, glowing haze wraps around them as the monochrome dreamscape shifts, revealing hidden colors and whispered secrets of a love beyond time. 4K, high resolution, award-winning composition.",
    "image": "/images/old_hollywood.jpeg"
  },
  {
    "id": 5,
    "title": "Daiki",
    "description": "Eternal Love in the Stars",
    "questions": [
      {
        "question": "Choose a scene:",
        "options": [
          "Astronauts floating",
          "A glowing neon-lit city under a midnight sky",
          "A dreamlike celestial temple"
        ],
        "custom_option": "Write your own"
      },
      {
        "question": "Choose a celestial detail:",
        "options": [
          "Soft green auroras",
          "Red glowing constellations forming love symbols",
          "A golden thread of light connecting their souls"
        ],
        "custom_option": "Write your own"
      },
      {
        "question": "Choose the lovers' presence:",
        "options": [
          "Two figures gently touching fingertips",
          "A warm embrace, glowing softly like distant stars",
          "Silhouettes standing under the cosmic moonlight"
        ],
        "custom_option": "Write your own"
      }
    ],
    "ai_prompt_template": "A breathtaking, cinematic still of a love story set in a cosmic dreamscape, blending pure love, deep night energy, and celestial wonder. {scene}. {celestial_detail}. Lovers stand together, {lovers_presence}. The atmosphere shimmers in hues of green and red, as the universe quietly moves around them, cradling their infinite connection. 4K, high resolution, award-winning composition.",
    "image": "/images/eternal_love.jpg"
  }
]
