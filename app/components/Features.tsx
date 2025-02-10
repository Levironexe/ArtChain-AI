import React from 'react';
import { Palette, Shield, Coins, Cpu } from 'lucide-react';

const features = [
  {
    icon: <Palette className="w-12 h-12 text-purple-500" />,
    title: "Artist-Driven Creation",
    description: "Monetize your unique artistic style through consensual AI training while maintaining creative control."
  },
  {
    icon: <Shield className="w-12 h-12" />,
    title: "Blockchain Verified",
    description: "Every piece is authenticated and recorded with permanent proof of ownership on the blockchain."
  },
  {
    icon: <Coins className="w-12 h-12" />,
    title: "Fair Compensation",
    description: "Smart contracts ensure automated royalty distributions for contributing artists."
  },
  {
    icon: <Cpu className="w-12 h-12 text-purple-500" />,
    title: "AI Innovation",
    description: "Specialized diffusion models create unique pieces while preserving artistic integrity."
  }
];

const Features = () => {
  return (
    <div className="py-24 bg-black/50 min-h-screen">
      <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">Platform Features</h2>
          <p className="text-gray-400 text-xl">Empowering artists and collectors through technology</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className={`aspect-square flex flex-col justify-center items-center text-center p-6 rounded-xl ${index == 1 ? 'bg-gradient-to-br from-main_purple to-purple-400 text-black hover:bg-main_purple'
            : index == 2 ? 'bg-gradient-to-bl from-purple-400 via-pink-500 to-pink-600 hover:bg-main_purple text-black' 
            : index == 3 ? ' bg-gray-900/50' : 'bg-gray-900/50 '} transition-all`}>
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-[22px] font-semibold mb-2">{feature.title}</h3>
              <p className='text-[18px]'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Features.displayName = 'Features';

export default Features;