import { type PropsWithChildren } from 'react';

export type TPropsWithChildren<Case, Default> = PropsWithChildren<{
  props: { condition: boolean };
  type: Case | Default;
}> | null;
