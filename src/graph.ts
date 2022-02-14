import { Colors, Props } from "./types"
import { QUADRANT_LABELS } from "./util/constants"

export class Graph {
  height: number
  width: number
  cx: number
  cy: number
  radius: number
  borderWidth: number
  ctx: CanvasRenderingContext2D
  mapRadius: number
  borderRadius: number
  colors: Colors

  constructor({
    radius = 50,
    ctx = new CanvasRenderingContext2D,
    borderWidth = 5,
    colors = {
      D: `rgba(0,149,59,1)`,
      i: `rgba(199,50,58,1)`,
      S: `rgba(0,148,201,1)`,
      C: `rgba(241,200,49,1)`,
    }
  }: Props) {
    this.colors = colors
    this.height = radius * 2
    this.width = radius * 2
    this.borderWidth = borderWidth
    this.ctx = ctx
    this.radius = this.width / 2
    // padding between circle and border
    // removing 1 border width meets outer border
    // then 2 border widths of padding
    this.mapRadius = this.radius - (this.borderWidth * 8)
    // half of border width to have full border in frame
    // since stroke is half inside half outside of line
    // and radius goes up to edge of box
    this.borderRadius = this.radius - (this.borderWidth / 2)
    this.cx = radius
    this.cy = radius
    this.ctx.lineWidth = borderWidth
  }

  baseGraph() {
    const { cx, cy, mapRadius: radius, ctx } = this
    ctx.save()
    ctx.moveTo(cx, cy)
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(128,128,128,1)'
    ctx.strokeStyle = 'rgba(128,128,128,0.15)'
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }

  dashBorder(border = '#000') {
    const { cx, cy, borderRadius: radius, ctx, borderWidth } = this
    this.ctx.lineWidth = borderWidth
    ctx.save()
    ctx.moveTo(cx, cy)
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.strokeStyle = border
    ctx.setLineDash([borderWidth * 3, borderWidth * 3])
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
  }

  internalBorderHorizontal() {
    const { height, width, ctx } = this
    ctx.lineWidth = this.borderWidth * 3
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(0, height / 2)
    ctx.lineTo(width, height / 2)
    ctx.strokeStyle = 'white'
    ctx.stroke()
    ctx.restore()
  }

  internalBorderVertical() {
    const { height, width, ctx } = this
    ctx.lineWidth = this.borderWidth * 3
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(width / 2, 0)
    ctx.lineTo(width / 2, height)
    ctx.strokeStyle = 'white'
    ctx.stroke()
    ctx.restore()
  }

  drawQuadrants(quadrants = QUADRANT_LABELS) {
    const { colors } = this
    for (let i = 0; i < Object.values(colors).length; i++) {
      if (quadrants.includes(QUADRANT_LABELS[i])) {
        // need offset so drawing starts from top left 
        // quadrant, or 'D' style quadrant
        const quadrant = QUADRANT_LABELS[i] as keyof Colors
        const currentColor = colors[quadrant]
        const angleOffset = i + 2
        const startAngle = (angleOffset * Math.PI) / 2
        const endAngle = startAngle + Math.PI / 2
        const emphasis = QUADRANT_LABELS.length - quadrants.length
        this.drawQuadrant(emphasis, startAngle, endAngle, currentColor, currentColor)
      }
    }
  }

  drawQuadrant(
    emphasis = 0,
    startAngle = 0,
    endAngle = Math.PI / 2,
    fill = '#000',
    stroke = '#fff'
  ) {
    const { cx, cy, mapRadius: radius, ctx } = this

    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.arc(cx, cy, radius + emphasis, startAngle, endAngle)
    ctx.closePath()
    ctx.fillStyle = fill
    ctx.strokeStyle = stroke
    ctx.fill()
    ctx.stroke()
  }
}