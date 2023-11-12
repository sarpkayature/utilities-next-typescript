import { Children, ReactNode } from 'react';

import type { TPropsWithChildren } from './types';
export function Switch({
  children,
}: {
  children:
    | Array<TPropsWithChildren<typeof Case, typeof Default>>
    | TPropsWithChildren<typeof Case, typeof Default>;
}): ReactNode | null {
  let matchChild: TPropsWithChildren<typeof Case, typeof Default> = null;
  let defaultCase: TPropsWithChildren<typeof Case, typeof Default> = null;

  Children.forEach(children, (child) => {
    if (!matchChild && child?.type === Case) {
      const { condition } = child?.props;

      const conditionalResult = Boolean(condition);

      if (conditionalResult) {
        matchChild = child;
      }
    } else if (!defaultCase && child?.type === Default) {
      defaultCase = child;
    }
  });

  return matchChild ?? defaultCase ?? null;
}

function Case({ children }: { children: ReactNode; condition: boolean }) {
  return children;
}

function Default({ children }: { children: ReactNode }) {
  return children;
}

Switch.Case = Case;
Switch.Default = Default;
