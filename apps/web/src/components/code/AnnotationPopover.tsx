import type { CodeAnnotation } from '@/lib/annotations';

type Props = {
  note: CodeAnnotation;
  pos: { x: number; y: number };
  cardWidth: number;
};

/** Below-xl popover, anchored at the active token, clamped to the code block. */
const AnnotationPopover = ({ note, pos, cardWidth }: Props) => (
  <aside
    key={note.id}
    role='note'
    style={{ left: pos.x, top: pos.y, width: cardWidth }}
    className='ledger-pop absolute z-10 max-w-[calc(100%-1rem)] border border-rule bg-paper-raised px-4 py-3.5'
  >
    <p
      className={`mb-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] ${
        note.kind === 'decision' ? 'text-mark' : 'text-ink-faint'
      }`}
    >
      {note.kind === 'decision' ? 'Decision' : 'Context'}
      <span className='ml-2 normal-case tracking-normal text-ink-faint'>Esc to close</span>
    </p>
    <p className='text-[0.85rem] leading-relaxed text-ink-soft'>{note.body}</p>
  </aside>
);

export default AnnotationPopover;
