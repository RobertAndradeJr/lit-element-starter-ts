interface Props {
    ctx: CanvasRenderingContext2D;
    radius?: number;
    borderWidth?: number;
    colors?: string[];
}
export declare class Graph {
    height: number;
    width: number;
    cx: number;
    cy: number;
    radius: number;
    borderWidth: number;
    ctx: CanvasRenderingContext2D;
    mapRadius: number;
    borderRadius: number;
    colors: string[];
    constructor({ radius, ctx, borderWidth, colors }: Props);
    baseGraph(): void;
    internalBorderHorizontal(): void;
    internalBorderVertical(): void;
    dashBorder(border?: string): void;
    drawQuadrants(quadrants?: string[]): void;
    drawQuadrant(emphasis?: number, startAngle?: number, endAngle?: number, fill?: string, stroke?: string): void;
}
export {};
//# sourceMappingURL=graph.d.ts.map