/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ref, createRef } from 'lit/directives/ref.js'

import { Graph } from './graph'
import { Point, Coordinate } from './types'
import { booleanColorConverter, quadrantConverter } from './util/func'



/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  _canvas = createRef<HTMLCanvasElement>()
  _code = createRef<HTMLPreElement>();

  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1em;
    }

    #accessibilityText {
      position: absolute;
      left: -99999px
    }

    #canvas {
      border-radius: 50%;
    }
    /* The switch - the box around the slider */
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }

    /* Hide default HTML checkbox */
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    /* The slider */
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    .slider:before {
      position: absolute;
      content: '';
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    input:checked + .slider {
      background-color: #2196f3;
    }

    input:focus + .slider {
      box-shadow: 0 0 1px #2196f3;
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }
  `;

  /**
   * The name to say "Hello" to.
   */
  @state()
  stylePath?: Point | undefined;

  @state()
  save = false

  
  private cachedImages: { [key: number]: HTMLImageElement } = {}; //Here we define the structure for the cachedImages object: The key will always be a number, the value will always be an HTMLImageElement
  @property()
  accessibilityText = "Test accessibility text"

  @property({
    type: Boolean
  })
  edit = true

  @property({
    attribute: false
  })
  graph = null

  @property({
    type: Number
  })
  mapRadius = 0 //Radius of the actual shadable, inner content of the graph.

  @property({
    type: Number
  })
  avatarSize = 25
  /**
   * Width of borders
   */
  @property({
    type: Number
  })
  borderWidth?: number;

  /**
   * Width of element
   */
  @property({
    type: Number
  })
  width = 100;

  /**
   * Height of element
   */
  @property({
    type: Number
  })
  height?: number;

  /**
   * qubic or quadratic arc
   */
  @property({ type: Boolean })
  quadratic = false;

  /**
   * border color
   */
  @property({
    type: String,
    converter: booleanColorConverter
  })
  border?: string;

  /**
   * 
   * Which quadrants are emphasized
   * if any
   */
  @property({
    type: Array,
    converter: quadrantConverter
  })
  quadrants = ['D', 'i', 'S', 'C']

  constructor() {
    super()
    this.loadImage('https://upload.wikimedia.org/wikipedia/en/9/95/Test_image.jpg', 1)
    this.loadImage('https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_960_720.png', 2)
    // this._draw()
    // this.init()
    // this._canvasApp()
  }

  loadImage(src: string, accountId: number) { //Provides a pre-loaded HTMLImageElement so we don't risk calling for the image repeatedly
    const image = new Image()
    image.src = src
    image.onload = () => { //So we should talk about this... we need to find a way to time the initial drawing
      if (this._canvas.value) { // Basically firstUpdated isn't firing after the images are loaded so they are not rendering properly
        this._draw()  // Also some of the styling changes when 
      }
    }
    this.cachedImages[accountId] = image
  }

  getImage(accountId: number) {
    console.log(this.cachedImages)
    console.log(this.cachedImages[accountId])
    return this.cachedImages[accountId]
  }

  override render() {
    const editControls = this.edit ? html`
    <pre ${ref(this._code)}>code</pre>
    <div class="input">
      <span>cubic</span>
      <label class="switch">
        <input @click="${this._toggle}" type="checkbox" />
        <span class="slider round"></span>
      </label>
      <span>quadratic</span>
      <br>
      <button @click="${this.save ? this._deleteArc : this._saveArc}">${this.save ? 'Delete' : 'Save'} Arc</button>
    </div>
    ` : undefined

    
    return html`
      <canvas ${ref(this._canvas)}>${this.accessibilityText}</canvas>
      ${editControls} 
    `
  }

  private _toggle() {
    this.quadratic = !this.quadratic
    this.save = false
    this.stylePath = undefined
    this._canvasApp()
  }

  private _saveArc() {
    this.save = true
    this._canvasApp()
  }

  private _deleteArc() {
    this.save = false
    this._canvasApp()
  }

  private _drawProfileAvatar(angle: number, vector: number, accountId: number) {
    const avatarSize = 25
    //This needs some updating for canvas, but otherwise good
   
    // const scale = this.height || this.width //scale

    const radians = (angle) * (Math.PI / 180) //-90 orients upwards? So this is radians from the positive y axis?

    const canvas = this._canvas.value as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.save()
    ctx.setTransform(1,0,0,1,0,0) // Something is messing with the transform outside this function, we're resetting it to default before beginning
    ctx.translate(canvas.width/2, canvas.height/2) //set transform matrix to center of canvas
    const offset = (this.mapRadius/2) * vector // This gives us the distance from center for our profile image

    //angle is theta
    const xCoord = offset * Math.sin(radians) //these points are relative to center
    const yCoord = offset * Math.cos(radians)

    const testImage = this.getImage(accountId)
    ctx.beginPath()
    ctx.arc(xCoord, yCoord, avatarSize, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()
    
    ctx.drawImage(testImage, xCoord-avatarSize, yCoord-avatarSize, avatarSize*2, avatarSize*2)
    ctx.restore()

  }
  

  private _canvasApp() {
    // const drawCanvas = this._draw.bind(this)
    const { width, height, save } = this
    const canvas = this._canvas.value as HTMLCanvasElement
    canvas.width = width
    canvas.height = height || width
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    const point: Point = {
      p1: {
        x: 100,
        y: 350,
      },
      p2: {
        x: 300,
        y: 350,
      },
      cp1: {
        x: 200,
        y: 100,
      },
    }

    if (!this.quadratic) {
      point.cp1 = {
        x: 100,
        y: 100,
      }
      point.cp2 = {
        x: 300,
        y: 100,
      }
    }

    // default styles
    const style = {
      curve: {
        width: 6,
        color: '#000',
      },
      cpline: {
        width: 2.5,
        color: '#BADA55',
        fill: 'orange'
      },
      point: {
        radius: 10,
        width: 2,
        color: '#900',
        fill: 'rgba(200, 200, 200, .5)',
        arc1: 0,
        arc2: 2 * Math.PI,
      },
    }
    let drag: keyof Point | null = null
    let dPoint: Coordinate = { x: 0, y: 0 }

    // define initial points
    const init = () => {
      // line style defaults
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      //event handles
      canvas.addEventListener('mousedown', dragStart, false)
      canvas.addEventListener('mousemove', dragging, false)
      canvas.addEventListener('mouseup', dragEnd, false)
      canvas.addEventListener('mouseout', dragEnd, false)
      console.log('predraw')
      
      drawScreen()
    }

    // draw screen
    const drawScreen = () => {
      console.log('draw screen')
      const {
        point: { width, color, fill, radius, arc1, arc2 },
      } = style
      const { p1, p2, cp1, cp2 } = point
      const { cpline, curve } = style
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      this._draw()

      // control lines
      ctx.lineWidth = cpline.width
      ctx.strokeStyle = cpline.color
      ctx.fillStyle = cpline.fill

      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(cp1.x, cp1.y)

      if (cp2) {
        ctx.moveTo(p2.x, p2.y)
        ctx.lineTo(cp2.x, cp2.y)
      } else {
        ctx.lineTo(p2.x, p2.y)
      }
      ctx.stroke()

      // curve
      ctx.lineWidth = curve.width
      ctx.strokeStyle = curve.color
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      if (cp2) {
        ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, p2.x, p2.y)
      } else {
        ctx.quadraticCurveTo(cp1.x, cp1.y, p2.x, p2.y)
      }


      // this.stylePath = point
      ctx.stroke()

      // control points
      for (const p in point) {
        const { x, y } = point[p as keyof Point] as Coordinate
        ctx.lineWidth = width
        ctx.strokeStyle = color
        ctx.fillStyle = fill
        ctx.beginPath()
        ctx.arc(x, y, radius, arc1, arc2, true)
        ctx.fill()
        ctx.stroke()
      }

      showCode()
    }

    // format string for code
    const showCode = () => {
      console.log('showcode?')
      const { firstChild } = this._code.value as HTMLPreElement
      const {
        curve: { width, color },
      } = style
      const { p1, cp1, cp2, p2 } = point
      if (firstChild) {
        firstChild.nodeValue = `
        canvas = document.getElementById("canvas")
        ctx = canvas.getContext("2d")
        ctx.lineWidth = ${width}
        ctx.strokeStyle = "${color}"
        ctx.beginPath()
        ctx.moveTo(${p1.x}, ${p1.y})
        ${cp2
            ? `ctx.bezierCurveTo(${cp1.x}, ${cp1.y}, ${cp2.x}, ${cp2.y}, ${p2.x}, ${p2.y})`
            : `ctx.quadraticCurveTo(${cp1.x}, ${cp1.y}, ${p2.x}, ${p2.y})`
          }
        ctx.stroke()
        `
      }
    }

    // get coordinates from mouse event
    const MousePos = (event: MouseEvent) => {
      const { pageX, pageY } = event || window.event
      const { offsetLeft, offsetTop } = canvas
      return {
        x: pageX - offsetLeft,
        y: pageY - offsetTop,
      }
    }

    // start dragging
    const dragStart = (event: MouseEvent) => {
      const e = MousePos(event)
      const {
        point: { radius },
      } = style

      let dx = 0
      let dy = 0
      for (const p in point) {
        const { x, y } = point[p as keyof Point] as Coordinate
        const { x: mouseX, y: mouseY } = e
        dx = x - mouseX
        dy = y - mouseY

        if (dx * dx + dy * dy < radius * radius) {
          drag = p as keyof Point
          dPoint = e
          canvas.style.cursor = 'move'
          return
        }
      }
    }

    // dragging in progress
    function dragging(event: MouseEvent) {
      const e = MousePos(event)
      if (drag) {
        const currentPoint = point[drag]
        if (currentPoint?.x) {
          currentPoint.x += e.x - dPoint.x
        }
        if (currentPoint?.y) {
          currentPoint.y += e.y - dPoint.y
        }

        dPoint = e

        drawScreen()
      }
    }

    // stop dragging
    const dragEnd = () => {
      drag = null
      canvas.style.cursor = 'default'
      drawScreen()
    }

    if (save) {
      this.stylePath = point
    } else {
      this.stylePath = undefined
      this.save = false
    }

    drawScreen()
    init()
  }

  private _draw() {
    const { border, quadrants, borderWidth, width, height, stylePath } = this
    const canvas = this._canvas.value as HTMLCanvasElement
    canvas.width = width
    canvas.height = height || width
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const graph = new Graph({ ctx, radius: width / 2, borderWidth })
    this.mapRadius = graph.mapRadius
    graph.baseGraph()

    if (border) {
      graph.drawDashedBorder(border)
    }

    graph.drawQuadrants(quadrants, stylePath)

    graph.drawInternalBorder('horizontal')

    graph.drawInternalBorder('vertical')

    graph.drawLabels()
    const textInside = true
    const kerning = 0
    graph.drawPriorityLabel('COLLABORATION', 270, 'center', textInside, true, kerning)
    graph.drawPriorityLabel('ACTION', 180, 'center', textInside, true, kerning)
    graph.drawPriorityLabel('ENCOURAGEMENT', 225, 'center', textInside, true, kerning)
    graph.drawPriorityLabel('CHALLENGE', 90, 'center', textInside, true, kerning)
    graph.drawPriorityLabel('DRIVE', 135, 'center', textInside, true, kerning)
    graph.drawPriorityLabel('SUPPORT', 135, 'center', textInside, false, kerning)
    graph.drawPriorityLabel('OBJECTIVITY', 225, 'center', textInside, false, kerning)
    graph.drawPriorityLabel('RELIABILITY', 180, 'center', textInside, false, kerning)

    this._drawProfileAvatar(180, 2, 1)
    this._drawProfileAvatar(125, 1.5, 2)
  }

  protected override firstUpdated(
    _changedProperties: Map<string | number | symbol, unknown>
  ): void {
    const { edit } = this
    if (edit) {
      this._canvasApp()

    } else {
      this._draw()
    }
  }
  
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
