import { Colors, Props, Point } from "./types"
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
    borderWidth = radius / 100,
    colors = {
      D: `#009e3d`,
      i: `#cd3741`,
      S: `#00a0d1`,
      C: `#f3cc23`,
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
    ctx.fillStyle = '#d9d8d6'
    ctx.strokeStyle = 'rgba(128,128,128,0.15)'
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }

  drawDashedBorder(border = '#949494') {
    const { cx, cy, borderRadius: radius, ctx, borderWidth } = this
    this.ctx.lineWidth = borderWidth
    ctx.save()
    ctx.setLineDash([borderWidth * 3, borderWidth * 3])
    ctx.moveTo(cx, cy)
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.strokeStyle = border
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
  }

  drawInternalBorder(direction: 'vertical' | 'horizontal') {
    const { height, width, ctx, borderRadius, mapRadius } = this
    const padding = borderRadius - mapRadius
    ctx.lineWidth = this.borderWidth * 3
    ctx.strokeStyle = 'white'
    ctx.save()
    ctx.beginPath()
    if (direction === 'vertical') {
      ctx.moveTo(width / 2, padding)
      ctx.lineTo(width / 2, height - padding)
    } else if (direction === 'horizontal') {
      ctx.moveTo(padding, height / 2)
      ctx.lineTo(width - padding, height / 2)
    }
    ctx.stroke()
    ctx.restore()
  }

  drawLabels() {
    const { height, width, ctx } = this
    ctx.save()
    ctx.font = `${width / 6}px Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif, Gadget, sans-serif`
    ctx.fillStyle = 'white'
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.fillText('D', width * 1 / 3, height * 1 / 3)
    ctx.fillText('i', width * 2 / 3, height * 1 / 3)
    ctx.fillText('S', width * 2 / 3, height * 2 / 3)
    ctx.fillText('C', width * 1 / 3, height * 2 / 3)
    ctx.restore()

  }

  drawQuadrants(quadrants = QUADRANT_LABELS, stylePath?: Point) {
    const { colors, ctx } = this

    const _clip = (stylePath: Point) => {
      const { p1, cp1, cp2, p2 } = stylePath
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      if (cp2) {
        ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, p2.x, p2.y)
        ctx.moveTo(p2.x, p2.y)
        ctx.bezierCurveTo(cp2.x, cp2.y + this.height, cp1.x, cp1.y + this.height, p1.x, p1.y)

      } else {
        ctx.quadraticCurveTo(cp1.x, cp1.y, p2.x, p2.y)
        ctx.moveTo(p2.x, p2.y)
        ctx.quadraticCurveTo(cp1.x, cp1.y + this.height, p1.x, p1.y)
      }
      ctx.closePath()
      ctx.clip()
      _draw()
      ctx.restore()
    }

    const _draw = () => {
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

    if (stylePath) {
      _clip(stylePath)
    } else {
      _draw()
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