
import { Artist, ArtistQuestions } from './types';

export const img: string="https://media.cnn.com/api/v1/images/stellar/prod/180302141853-cryptokitties-top.jpg?q=w_2000,c_fill"

export const artists: Artist[] = [
  { id: 1, name: "CryptoKitty", image: "https://media.cnn.com/api/v1/images/stellar/prod/180302141853-cryptokitties-top.jpg?q=w_2000,c_fill", description: "NFT Art Pioneer" },
  { id: 2, name: "BlockchainBob", image: "https://media.cnn.com/api/v1/images/stellar/prod/180302141853-cryptokitties-top.jpg?q=w_2000,c_fill", description: "Pixel Art Master" },
  { id: 3, name: "ETHma", image: "https://media.cnn.com/api/v1/images/stellar/prod/180302141853-cryptokitties-top.jpg?q=w_2000,c_fill", description: "Abstract Artist" },
  { id: 4, name: "SolanaSage", image: "https://media.cnn.com/api/v1/images/stellar/prod/180302141853-cryptokitties-top.jpg?q=w_2000,c_fill", description: "Digital Surrealist" }
];

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
