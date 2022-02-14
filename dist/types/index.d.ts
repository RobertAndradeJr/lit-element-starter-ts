export interface Props {
    ctx: CanvasRenderingContext2D;
    radius?: number;
    borderWidth?: number;
    colors?: Colors;
}
export interface Colors {
    D: string;
    i: string;
    S: string;
    C: string;
}
export interface Coordinate {
    x: number;
    y: number;
}
export interface Point {
    p1: Coordinate;
    p2: Coordinate;
    cp1: Coordinate;
    cp2?: Coordinate;
}
//# sourceMappingURL=index.d.ts.map