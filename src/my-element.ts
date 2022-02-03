/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

interface Coordinate {
  x: number,
  y: number
}

interface Point {
  [key: string]: Coordinate,
  p1: Coordinate,
  p2: Coordinate,
  cp1: Coordinate
}


/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  @query('#canvas')
  _canvas!: HTMLCanvasElement | null;

  @query('#code')
  _code!: HTMLPreElement | null;


  static override styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;

  /**
   * The name to say "Hello" to.
   */
  @property()
  name = 'World';

  /**
   * Width of borders
   */
  @property({type: Number})
  borderWidth = 10;

  override render() {
    return html`
      <canvas id="canvas">Fallback Content</canvas>
      <pre id="code">code</pre>
      <slot></slot>
    `;
  }

  private _canvasApp() {
    // const drawCanvas = this._draw.bind(this)
    const canvas = this._canvas as HTMLCanvasElement
    canvas.height = 400
    canvas.width = 400
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

    const point: Point = {
      p1: {
        x: 100,
        y: 250
      },
      p2: {
        x: 300,
        y: 250
      },
      cp1: {
        x: 200,
        y: 50
      }
    }
    // default styles
    const style = {
      curve: {
        width: 6,
        color: "#000"
      },
      cpline: {
        width: 2.5,
        color: "#BADA55"
      },
      point: {
        radius: 10,
        width: 2,
        color: "#900",
        fill: "rgba(200, 200, 200, .5)",
        arc1: 0,
        arc2: 2 * Math.PI
      }
    };
    let drag: string | null = null
    let dPoint: Coordinate = { x: 0, y: 0 }

    // define initial points
    function init() {

      // line style defaults
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      //event handles
      canvas.addEventListener("mousedown", dragStart, false);
      canvas.addEventListener("mousemove", dragging, false);
      canvas.addEventListener("mouseup", dragEnd, false);
      canvas.addEventListener("mouseout", dragEnd, false);

      drawScreen();
    }

    // draw screen
    const drawScreen = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this._draw()
      // control lines
      ctx.lineWidth = style.cpline.width;
      ctx.strokeStyle = style.cpline.color;

      ctx.beginPath();
      ctx.moveTo(point.p1.x, point.p1.y);
      ctx.lineTo(point.cp1.x, point.cp1.y);

      ctx.lineTo(point.p2.x, point.p2.y);
      ctx.stroke();

      // curve
      ctx.lineWidth = style.curve.width;
      ctx.strokeStyle = style.curve.color;

      ctx.beginPath();
      ctx.moveTo(point.p1.x, point.p1.y);
      ctx.quadraticCurveTo(point.cp1.x, point.cp1.y, point.p2.x, point.p2.y);
      ctx.stroke();

      // control points
      for (const p in point) {
        ctx.lineWidth = style.point.width;
        ctx.strokeStyle = style.point.color;
        ctx.fillStyle = style.point.fill;
        ctx.beginPath();
        ctx.arc(
          point[p].x,
          point[p].y,
          style.point.radius,
          style.point.arc1,
          style.point.arc2,
          true
        );
        ctx.fill();
        ctx.stroke();
      }

      showCode();
    }

    const showCode = () => {
      const { firstChild } = this._code as HTMLPreElement
      const { curve: { width, color } } = style
      const { p1, cp1, p2 } = point
      if (firstChild) {
        firstChild.nodeValue = `
        canvas = document.getElementById("canvas1");
        ctx = canvas.getContext("2d")
        ctx.lineWidth = ${width};
        ctx.strokeStyle = "${color}";
        ctx.beginPath();
        ctx.moveTo(${p1.x}, ${p1.y});
        ctx.quadraticCurveTo(${cp1.x}, ${cp1.y}, ${p2.x}, ${p2.y});
        ctx.stroke();
        `;
      }
    }

    // get coordinates from mouse event
    function MousePos(event: MouseEvent) {
      const e = event || window.event;
      return {
        x: e.pageX - canvas.offsetLeft,
        y: e.pageY - canvas.offsetTop
      };
    }

    // start dragging
    function dragStart(event: MouseEvent) {
      const e = MousePos(event);

      let dx = 0
      let dy = 0
      for (const p in point) {
        dx = point[p].x - e.x;
        dy = point[p].y - e.y;

        if (dx * dx + dy * dy < style.point.radius * style.point.radius) {
          drag = p;
          dPoint = e;
          canvas.style.cursor = "move";
          return;
        }
      }
    }

    // dragging in progress
    function dragging(event: MouseEvent) {
      if (drag) {
        const e = MousePos(event);
        point[drag].x += e.x - dPoint.x;
        point[drag].y += e.y - dPoint.y;
        dPoint = e;

        drawScreen();
      }
    }

    // stop dragging
    function dragEnd() {
      drag = null;
      canvas.style.cursor = "default";
      drawScreen();
    }
    drawScreen();
    init();
  }

  private _draw() {
    const canvas = this._canvas as HTMLCanvasElement
    canvas.height = 400
    canvas.width = 400
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const cx = 200;
    const cy = 200;
    const radius = 200;
    const colors = ['rgb(0,148,201)', 'rgb(241,200,49)', 'rgb(0,149,59)', 'rgb(199,50,58)'];

    for (let i = 0; i < colors.length; i++) {
      const startAngle = i * Math.PI / 2;
      const endAngle = startAngle + Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colors[i];
      ctx.strokeStyle = 'white'
      ctx.lineWidth = this.borderWidth
      ctx.fill();
      ctx.stroke();
    }
  }

  protected override firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void {
    this._canvasApp()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
