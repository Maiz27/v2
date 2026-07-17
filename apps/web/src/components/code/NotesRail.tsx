import type { AnnotationKind, CodeAnnotation } from '@/lib/annotations';

const kindLabel = (kind: AnnotationKind) =>
  kind === 'decision' ? 'Decision' : 'Context';

type Props = {
  annotations: CodeAnnotation[];
  activeId: string | null;
  pinnedId: string | null;
  onHover: (id: string | null) => void;
  onPin: (id: string) => void;
  className?: string;
};

/**
 * The numbered margin-notes column (xl+ only). Shared between a standalone
 * annotated listing and a tabbed code group, both of which need the same
 * hover/pin-synced note list beside a code panel — see useAnnotatedCode for
 * why the interactive state has to live one level up from here.
 */
const NotesRail = ({ annotations, activeId, pinnedId, onHover, onPin, className }: Props) => (
  <aside
    className={`mt-5 hidden xl:sticky xl:top-10 xl:mt-0 xl:block xl:max-h-[calc(100vh-5rem)] xl:self-start xl:overflow-y-auto ${className ?? ''}`}
  >
    <p className='mb-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-faint'>
      Notes
    </p>
    <ol className='space-y-4 xl:space-y-5'>
      {annotations.map((a, i) => {
        const isActive = a.id === activeId;
        const isPinned = a.id === pinnedId;
        return (
          <li
            key={a.id}
            className={`group grid grid-cols-[1.4rem_minmax(0,1fr)] gap-x-1 text-[0.8rem] leading-relaxed transition-colors duration-200 ${
              isActive ? 'text-ink' : 'text-ink-soft'
            }`}
          >
            <span className='font-mono text-[0.7rem] font-bold text-mark'>{i + 1}</span>
            <span>
              <button
                type='button'
                onPointerEnter={(e) => {
                  if (e.pointerType === 'touch') return;
                  onHover(a.id);
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType === 'touch') return;
                  onHover(null);
                }}
                onClick={() => onPin(a.id)}
                className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-mark focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${isPinned ? 'font-medium' : ''}`}
              >
                <span
                  className={`mb-1 block font-mono text-[0.62rem] uppercase tracking-[0.14em] ${
                    a.kind === 'decision' ? 'text-mark' : 'text-ink-faint'
                  }`}
                >
                  {kindLabel(a.kind)}
                  {isPinned && (
                    <span className='ml-1.5 normal-case tracking-normal text-ink-faint'>
                      &middot; pinned
                    </span>
                  )}
                </span>
                {a.body}
              </button>
            </span>
          </li>
        );
      })}
    </ol>
  </aside>
);

export default NotesRail;
