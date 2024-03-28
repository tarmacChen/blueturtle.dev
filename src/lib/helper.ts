export const mergeClassNames = (...classNames: string[]) =>
  classNames.filter(Boolean).join(' ');
