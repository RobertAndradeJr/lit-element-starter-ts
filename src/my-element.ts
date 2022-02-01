/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

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
   * The number of times the button has been clicked.
   */
  @property({type: Number})
  count = 0;

  override render() {
    return html`
      <canvas id="canvas">Fallback Content</canvas>
      <slot></slot>
    `;
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

    for (let i = 0; i < 4; i++) {
      const startAngle = i * Math.PI / 2;
      const endAngle = startAngle + Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colors[i];
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 5
      ctx.fill();
      ctx.stroke();
    }
  }

  protected override firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void {
    this._draw()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
