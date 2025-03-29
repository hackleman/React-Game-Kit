export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | undefined;

export interface DirectionMapping {
    [key: string]: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | undefined;
}

export const directionMapping: DirectionMapping = {
    'w': 'UP',
    'ArrowUp': 'UP',
    's': 'DOWN',
    'ArrowDown': 'DOWN',
    'a': 'LEFT',
    'ArrowLeft': 'LEFT',
    'd': 'RIGHT',
    'ArrowRight': 'RIGHT',
}