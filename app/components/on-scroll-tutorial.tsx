import React, { useState, useEffect } from 'react';
import PagesExample3 from './on-scroll-components/pages-example-3';
import PagesExample1 from './on-scroll-components/pages-example-1';
import PagesExample2 from './on-scroll-components/pages-example-2';
import PagesExample4 from './on-scroll-components/pages-example-4';

const OnScrollSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const firstTransitionPoint = windowHeight * 3 + 900;
  const secondTransitionPoint = windowHeight * 4 + 900 ;
  const thirdTransitionPoint = windowHeight * 5 + 900;
console.log('first', firstTransitionPoint);
console.log('second', secondTransitionPoint);
console.log('third', thirdTransitionPoint);
  return (
    <main className='bg-gradient-to-b from-gray-900/50 to-black px-16 w-full'>
      <div className="max-w-screen-2xl mx-auto">

        {/* Section hiển thị ở mọi kích thước màn hình */}
        <section className='pt-[300px] pb-10 text-center max-w-7xl mx-auto'>
          <h2 className='text-6xl font-bold mb-6'>
          Step-by-step to unleash Your Creativity with 
          <span className='bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent'> ArtChain AI</span>
          </h2>
          <p className='text-xl text-white/85'>
          Harness the power of artificial intelligence to bring your artistic vision to life. Our state-of-the-art AI platform combines innovative technology with curated artist styles, allowing you to create unique digital artwork with unprecedented ease and precision.          </p>
        </section>


        {/* Các phần còn lại sẽ bị ẩn trên điện thoại */}
        <section className='relative h-[400vh] hidden sm:block'>
          {/* Sticky container for images */}
          <div className='sticky top-0'>
            <div className='grid grid-cols-4 gap-10 items-center min-h-screen'>
              <div className='col-span-3 z-50'>
                {scrollY < firstTransitionPoint && (
                  <PagesExample1/>                )}
                {(scrollY > firstTransitionPoint && scrollY < secondTransitionPoint) && (
                  <PagesExample2/>
                )}
                {(scrollY > secondTransitionPoint && scrollY < thirdTransitionPoint) && (
                  <PagesExample3/>
                )} 
                {(scrollY > thirdTransitionPoint) && (
                  <PagesExample4/>
                )}
              </div>
            </div>
          </div>

          {/* Non-sticky text sections */}
          <div className='top-0 right-0 w-1/4 absolute hidden sm:block'>
            <div className='min-h-screen flex items-center'>
              <div className='animation-block'>
                <h2 className='text-white font-bold text-3xl mb-4 leading-10'>
                  <span className='p-1 bg-purple-500 mr-2 rounded-lg'>1. </span>Connect your SUI or SUIET wallet
                </h2>
                <p className='text-white/90 text-xl'>
                  Link your digital wallet to unlock the full potential of AI art creation. Your secure gateway to storing and managing unique digital masterpieces.                </p>
              </div>
            </div>
            <div className='min-h-screen flex items-center'>
              <div className='animation-block'>
                <h2 className='text-white font-bold text-3xl mb-4 leading-10'>
                <span className='p-1 bg-purple-400 mr-2 rounded-lg'>2. </span>Discover Your Perfect Art Style

                </h2>
                <p  className='text-white/90 text-xl'> Browse our curated gallery of talented artists and their unique aesthetics. 
                Find a style that speaks to you, and we'll guide you through your creative journey.</p>
                </div>  
            </div>  
            <div className='min-h-screen flex items-center'>
              <div className='animation-block'>
                <h2 className='text-primary-red font-bold text-3xl mb-4 leading-10'>
                <span className='p-1 bg-pink-400 mr-2 rounded-lg'>3. </span>Generate your art using our latest AI model
                </h2>
                <ol className='text-white text-xl'>
                  <li className='mb-2'>
                  <span className='bg-white py-1 px-2 text-black font-semibold mr-2 rounded-lg'>Visit the AI Studio</span>
                  Navigate to the AI Studio tab on the menu bar.
                  </li>
                  <li className='mb-2'>
                  <span className='bg-white py-1 px-2 text-black font-semibold mr-2 rounded-lg'>
                  Choose Your Style
                  </span>
                  Select from our collection of artist styles to define your artwork's aesthetic.
                  </li>
                  <li className='mb-2'>
                  <span className='bg-white py-1 px-2 text-black font-semibold mr-2 rounded-lg'>
                    Enter Your Prompt
                  </span>
                  Describe your vision and let our AI transform it into unique artwork.
                  </li>
                </ol>  
              </div>
            </div>
            <div className='min-h-screen flex items-center'>
              <div className='animation-block'>
                <h2 className='text-hard-red font-bold text-3xl mb-4 leading-10'>
                <span className='p-1 bg-pink-500 mr-2 rounded-lg'>4. </span>Mint your first NFT!
                </h2>
                <p className='text-xl text-white/90'>
                  Once the mint button is clicked, your AI artwork will be minted as a unique NFT on the <span className='text-pink-500 font-semibold'>SUI BLOCKCHAIN</span> . Royalties are automatically included for <span className='text-pink-500 font-semibold'>YOUR ARTIST</span>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default OnScrollSection;