type Props = {
  bottom: string;
};

const HoverStrips = ({ bottom }: Props) => {
  return (
    <div
      className={`absolute ${bottom} -right-4 w-full translate-x-1/4 translate-y-1/4 rotate-[-30deg]`}
    >
      <div className='-ml-4 h-12 w-full border-t bg-gradient-to-r to-background transition-transform group-hover:-translate-y-1 border-primary/80 from-primary via-primary/90 via-30%'></div>
      <div className='-ml-8 h-12 w-full border-t bg-gradient-to-r to-background transition-transform group-hover:-translate-y-5 border-primary/80 from-primary via-primary/90 via-30%'></div>
      <div className='-ml-12 h-12 w-full border-t bg-gradient-to-r to-background transition-transform group-hover:-translate-y-8 border-primary/80 from-primary via-primary/90 via-30%'></div>
      <div className='-ml-16 h-12 w-full border-t bg-gradient-to-r to-background transition-transform group-hover:-translate-y-12 border-primary/80 from-primary via-primary/90 via-30%'></div>
      <div className='-ml-16 h-12 w-full border-t bg-gradient-to-r to-background transition-transform group-hover:-translate-y-16 border-primary/80 from-primary via-primary/90 via-30%'></div>
    </div>
  );
};

export default HoverStrips;
