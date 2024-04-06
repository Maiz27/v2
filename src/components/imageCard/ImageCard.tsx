'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Props = {
  src: string;
};

const ImageCard = ({ src }: Props) => {
  const [boxes, setBoxes] = useState<Array<number>>([]);
  const [imageVisible, setImageVisible] = useState(false);

  useEffect(() => {
    // Create an array of 100 numbers (for 100 boxes)
    setBoxes(Array.from({ length: 100 }, (_, i) => i));
    // Set the image to visible after the grid is rendered
    setImageVisible(true);
  }, []);

  return (
    <>
      <div className='relative h-full'>
        <div className='absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none'>
          {boxes.map((box) => (
            <motion.div
              key={box}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: Math.random() * 2, duration: 1 }}
              className='bg-background'
            />
          ))}
        </div>
        <Image
          src={src}
          alt='avatar'
          width={500}
          height={500}
          className={`h-full object-cover ${
            imageVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </>
  );
};

export default ImageCard;
