import { Colors, Props } from "./types";
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
    colors: Colors;
    constructor({ radius, ctx, borderWidth, colors }: Props);
    baseGraph(): void;
    dashBorder(border?: string): void;
    internalBorderHorizontal(): void;
    internalBorderVertical(): void;
    drawQuadrants(quadrants?: string[]): void;
    drawQuadrant(emphasis?: number, startAngle?: number, endAngle?: number, fill?: string, stroke?: string): void;
}
//# sourceMappingURL=graph.d.ts.map