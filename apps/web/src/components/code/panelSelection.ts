import type { CodeAnnotation } from '@/lib/annotations';

export type PanelSelection = Readonly<{
  id: string;
  panelKey: string;
}> | null;

/** Resolve a raw selection only when it belongs to the displayed panel. */
export function selectedIdForPanel(
  selection: PanelSelection,
  panelKey: string,
  annotations: CodeAnnotation[]
): string | null {
  if (selection?.panelKey !== panelKey) return null;
  return annotations.some((annotation) => annotation.id === selection.id)
    ? selection.id
    : null;
}

/** Toggle a pin without confusing equal annotation ids from different panels. */
export function toggledPanelSelection(
  selection: PanelSelection,
  id: string,
  panelKey: string,
  annotations: CodeAnnotation[]
): PanelSelection {
  return selectedIdForPanel(selection, panelKey, annotations) === id
    ? null
    : { id, panelKey };
}
