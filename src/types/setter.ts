import type { Dispatch, SetStateAction } from 'react';

/**
 * @internal
 */
export type Setter<T> = Dispatch<SetStateAction<T>>;
