import type { CSSProperties } from 'react';

export type CustomProperties = CSSProperties & Record<`--${string}`, string | number>;
