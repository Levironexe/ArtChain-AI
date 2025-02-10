import React from 'react';
import { Upload, Wand2, Coins } from 'lucide-react';

const steps = [
  {
    icon: <Upload className="w-12 h-12 text-purple-500" />,
    title: "Upload Your Art",
    description: "Submit your original artwork to be minted as NFTs and contribute to the AI training dataset."
  },
  {
    icon: <Wand2 className="w-12 h-12 text-purple-500" />,
    title: "AI Generation",
    description: "Our specialized diffusion models learn your unique style to create new, original pieces."
  },
  {
    icon: <Coins className="w-12 h-12 text-purple-500" />,
    title: "Earn Royalties",
    description: "Receive automatic payments whenever your style influences new artwork generation."
  }
];

export default function HowItWorks() {
  return (
    <div id='tutorial' className="py-24 bg-gradient-to-b from-black/50 to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400 text-xl">Simple steps to start earning from your art</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-6">{step.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}