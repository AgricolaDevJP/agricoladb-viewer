export const revisionKeys = ['AG1', 'AG2'] as const
export type RevisionKey = (typeof revisionKeys)[number]
