'use client';
import { cloneElement } from 'react';
import { Tooltip } from 'react-tooltip';
import GitHubCalendar, { ThemeInput } from 'react-github-calendar';
import Heading from '../heading/Heading';
import AnimateInView from '../animationWrappers/AnimateInView';
import { SiGithub } from 'react-icons/si';

const ActivityCalendar = () => {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || '';
  const theme: ThemeInput = {
    dark: ['#1a1a1a', '#2a3f5f', '#4a679d', '#7390c3', '#96b7e3'],
  };

  const tooltipId = 'activity-tooltip';

  const renderBlock = (block: any, activity: any) =>
    cloneElement(block, {
      'data-tooltip-id': tooltipId,
      'data-tooltip-html': `${activity.count} activities on ${activity.date}`,
    });

  return (
    <section id='github-calendar'>
      <Heading
        icon={<SiGithub />}
        heading='Code Contributions'
        paragraph='Each square represents a day of coding, showcasing my consistent commitment to crafting digital solutions.'
      />
      <AnimateInView className='py-8 lg:pb-12'>
        <GitHubCalendar
          username={username}
          theme={theme}
          renderBlock={renderBlock}
        />
        <Tooltip id={tooltipId} />
      </AnimateInView>
    </section>
  );
};

export default ActivityCalendar;
