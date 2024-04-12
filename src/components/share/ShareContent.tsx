'use client';
import Toast from '@/components/ui/Toast';
import { HiClipboard } from 'react-icons/hi2';
import { useShare } from '@/lib/hooks/useShare';
import { SHARE_PLATFORMS } from '@/lib/Constants';
import AnimateInView from '../animationWrappers/AnimateInView';

const ShareContent = () => {
  const { currentURL, status, showToast, copyToClipboard, closeToast } =
    useShare();

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
                className='size-10 grid place-items-center group shadow'
              >
                {icon}
              </ShareButton>
            </AnimateInView>
          );
        })}
      </div>

      {status && (
        <Toast
          message={
            status === 'success'
              ? 'URL copied to clipboard'
              : 'Error copying to clipboard'
          }
          status={status}
          show={showToast}
          onClose={closeToast}
        />
      )}
    </section>
  );
};

export default ShareContent;
