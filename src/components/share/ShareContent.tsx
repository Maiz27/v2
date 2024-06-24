'use client';
import { useShare } from '@/lib/hooks/useShare';
import { SHARE_PLATFORMS } from '@/lib/Constants';
import AnimateInView from '../animationWrappers/AnimateInView';
import { HiClipboard } from 'react-icons/hi2';

const ShareContent = () => {
  const { currentURL, copyToClipboard } = useShare();

  return (
    <section className='w-full my-16'>
      <h3 className='text-2xl px-2'>Share Project</h3>
      <div className='w-full flex items-center gap-2'>
        <AnimateInView
          delay={0}
          tag='button'
          aria-label='Copy to clipboard'
          className=' size-10 grid place-items-center group shadow transition-colors'
          onClick={copyToClipboard}
        >
          <HiClipboard className='text-xl xl:text-2xl group-hover:text-primary' />
        </AnimateInView>
        {SHARE_PLATFORMS.map(({ id, icon, ShareButton }, idx) => {
          return (
            <AnimateInView key={id} delay={0.4 * ++idx}>
              <ShareButton
                url={currentURL}
                title={id}
                className='size-10 grid place-items-center group shadow'
              >
                {icon}
              </ShareButton>
            </AnimateInView>
          );
        })}
      </div>
    </section>
  );
};

export default ShareContent;
