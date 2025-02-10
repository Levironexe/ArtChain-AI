import React from 'react';
import  {motion} from "framer-motion"; // Animation library

// Animation configuration for fading up elements
const fadeUp = {
    hidden: {opacity: 0, y: 50},
    reveal: {opacity: 1, y: 0},
}

const PagesExample = () => {
  return (
    <main className='overflow-hidden w-full'>
            <section>
                <motion.div 
                className="flex gap-20 justify-center items-start xl:mb-0"
                initial='hidden'
                whileInView='reveal'
                >
                    <motion.div
                    className='py-4'
                    transition={{duration: 0.5}}
                    variants={fadeUp}>
                        <img src='/images/connect_a_wallet.png'/>
                    </motion.div>
                </motion.div>
            </section>
    </main>
    
  )
}

export default PagesExample