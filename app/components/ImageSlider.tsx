'use client'
import React from 'react';

interface SliderProps {
    items: string[];
    width: number;
    height: number;
    reverse?: boolean;
}

const Slider = ({ items }: SliderProps) => {
    return (
        <section className="py-24 min-h-screen">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                        Featured Artworks
                    </h2>
                    <p className="text-gray-400 text-xl">
                        Discover unique AI-generated artworks created by our community
                    </p>
                </div>

                <div className="space-y-10">
                    {/* Top slider - left to right */}
                    <div className="w-full overflow-hidden"
                        style={{
                            height: '300px',
                            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10% 90%, transparent)',
                            maskImage: 'linear-gradient(to right, transparent, black 10% 90%, transparent)'
                        }}>
                        <div className="flex relative w-full"
                            style={{
                                minWidth: `${300 * items.length}px`
                            }}>
                            {items.map((item, index) => (
                                <div
                                    key={`top-${index}`}
                                    className="absolute hover:grayscale-0 transition-all duration-500"
                                    style={{
                                        width: '300px',
                                        height: '300px',
                                        left: '100%',
                                        animation: 'autoRun 35s linear infinite',
                                        animationDelay: `calc((35s / ${items.length}) * ${index} - 20s)`,
                                    }}>
                                    <img
                                        src={item}
                                        alt={`Artwork ${index + 1}`}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom slider - right to left */}
                    <div className="w-full overflow-hidden"
                        style={{
                            height: '300px',
                            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10% 90%, transparent)',
                            maskImage: 'linear-gradient(to right, transparent, black 10% 90%, transparent)'
                        }}>
                        <div className="flex relative w-full"
                            style={{
                                minWidth: `${300 * items.length}px`
                            }}>
                            {items.map((item, index) => (
                                <div
                                    key={`bottom-${index}`}
                                    className="absolute hover:grayscale-0 transition-all duration-500"
                                    style={{
                                        width: '300px',
                                        height: '300px',
                                        left: '100%',
                                        animation: 'reverseRun 35s linear infinite',
                                        animationDelay: `calc((35s / ${items.length}) * ${index} - 20s)`,
                                    }}>
                                    <img
                                        src={item}
                                        alt={`Artwork ${index + 1}`}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes autoRun {
                    from {
                        left: 100%;
                    }
                    to {
                        left: -300px;
                    }
                }
                
                @keyframes reverseRun {
                    from {
                        left: -300px;
                    }
                    to {
                        left: 100%;
                    }
                }
            `}</style>
        </section>
    );
};

export default function SliderPage() {
    const sliderImages = [
        '/images/output.png',
        '/images/PIC1.png',
        '/images/PIC2.png',
        '/images/PIC3.png',
        '/images/PIC4.png',
        '/images/PIC5.png',
        '/images/PIC6.png',
        '/images/PIC7.png',
        '/images/PIC8.png',
        '/images/PIC9.png',
        '/images/PIC10.png'
    ];



    return (
        <main className="w-full mx-auto">
            <Slider
                items={sliderImages}
                width={512}
                height={512}
            />

        </main>
    );
}