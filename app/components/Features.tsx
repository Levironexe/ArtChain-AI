import React, { forwardRef } from 'react';
import { Palette, Shield, Coins, Cpu } from 'lucide-react';

const features = [
  {
    icon: <Palette className="w-8 h-8 text-purple-500" />,
    title: "Artist-Driven Creation",
    description: "Monetize your unique artistic style through consensual AI training while maintaining creative control."
  },
  {
    icon: <Shield className="w-8 h-8 text-purple-500" />,
    title: "Blockchain Verified",
    description: "Every piece is authenticated and recorded with permanent proof of ownership on the blockchain."
  },
  {
    icon: <Coins className="w-8 h-8 text-purple-500" />,
    title: "Fair Compensation",
    description: "Smart contracts ensure automated royalty distributions for contributing artists."
  },
  {
    icon: <Cpu className="w-8 h-8 text-purple-500" />,
    title: "AI Innovation",
    description: "Specialized diffusion models create unique pieces while preserving artistic integrity."
  }
];

const Features = forwardRef((props, ref) => {
  return (
    <div className="py-24 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Platform Features</h2>
          <p className="text-gray-400 text-xl">Empowering artists and collectors through technology</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-all">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

Features.displayName = 'Features';

export default Features;