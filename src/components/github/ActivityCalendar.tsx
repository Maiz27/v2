import GitHubCalendar, { ThemeInput } from 'react-github-calendar';
import Heading from '../heading/Heading';
import { SiGithub } from 'react-icons/si';

const ActivityCalendar = () => {
  const theme: ThemeInput = {
    dark: ['#1a1a1a', '#2a3f5f', '#4a679d', '#7390c3', '#96b7e3'],
  };

  return (
    <section id='github-calendar'>
      <Heading
        icon={<SiGithub />}
        heading='Code Contributions'
        paragraph='Visualizing my GitHub activity. Each square represents a day of coding, 
        showcasing my consistent commitment to crafting digital solutions.'
      />
      <div className='py-8 lg:pb-12'>
        <GitHubCalendar username='maiz27' theme={theme} />
      </div>
    </section>
  );
};

export default ActivityCalendar;
