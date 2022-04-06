import { Colors, Props, TestUser, Coordinate } from "./types"
import { FONT_STACK, QUADRANT_COLORS, QUADRANT_LABELS } from "./util/constants"

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
  labelFontSize: number
  priorityFontSize: number

  constructor({
    radius = 50,
    ctx = new CanvasRenderingContext2D,
    borderWidth = 4,
    colors = QUADRANT_COLORS
  }: Props) {
    this.colors = colors
    this.height = radius * 2
    this.width = radius * 2
    this.borderWidth = borderWidth
    this.ctx = ctx
    this.radius = this.width / 2
    this.cx = radius
    this.cy = radius
    this.labelFontSize = this.width / 6.5
    this.priorityFontSize = this.labelFontSize / 4

    // padding between circle and border
    // removing 1 border width to be flush with outer border
    // then 4 border widths of padding
    // also clear text
    this.mapRadius = this.radius - this.textHeight * 1.75 - (this.borderWidth * 5)

    // half of border width to have full border in frame
    // since stroke is half inside half outside of line
    // and radius goes up to edge of box
    // also clear text
    this.borderRadius = this.radius - this.textHeight * 1.75 - (this.borderWidth / 2)

    this.ctx.lineWidth = borderWidth
  }

  get textHeight() {
    const { priorityFontSize } = this
    const div = document.createElement("div")
    div.innerHTML = 'test'
    div.style.position = 'absolute'
    div.style.top = '-10000px'
    div.style.left = '-10000px'
    div.style.fontFamily = FONT_STACK
    div.style.fontSize = `${priorityFontSize}px`
    document.body.appendChild(div)
    const textHeight = div.offsetHeight
    document.body.removeChild(div)
    return textHeight
  }

  baseGraph() {
    const { cx, cy, mapRadius: radius, ctx } = this
    const { base } = QUADRANT_COLORS
    ctx.save()
    ctx.moveTo(cx, cy)
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.fillStyle = base
    ctx.strokeStyle = base
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }

  drawDashedBorder(border = QUADRANT_COLORS.border) {
    const { cx, cy, borderRadius: radius, ctx, borderWidth } = this
    this.ctx.lineWidth = borderWidth
    ctx.save()
    ctx.setLineDash([borderWidth * 2.25, borderWidth * 2.25])
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
    const padding = (borderRadius - mapRadius) / 2
    ctx.lineWidth = this.borderWidth * 1.5
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
    const { height, width, ctx, labelFontSize } = this
    const { textColor } = QUADRANT_COLORS
    ctx.save()
    ctx.font = `${labelFontSize}px ${FONT_STACK}`
    ctx.fillStyle = textColor
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.imageSmoothingEnabled = false
    ctx.fillText('D', width * 1 / 3, height * 8.5 / 24)
    ctx.fillText('i', width * 2 / 3, height * 8.5 / 24)
    ctx.fillText('S', width * 2 / 3, height * 16 / 24)
    ctx.fillText('C', width * 1 / 3, height * 16 / 24)
    ctx.restore()

  }

  drawQuadrants(quadrants = QUADRANT_LABELS, user: TestUser) {
    const { colors, ctx, mapRadius, width } = this
    const center = width / 2

    const _clip = (user: TestUser) => {
      const { angle, vector } = user
      const radians = (angle) * (Math.PI / 180) // We will adjust this as necessary based on the orientation of angles from the API
      const hyp = (mapRadius / 2) * vector // This gives us the distance from center for our profile image


      const xCoord = hyp * Math.sin(radians) //these coords are now relative to center of the canvas/graph
      const yCoord = hyp * Math.cos(radians)

      ctx.save()
      ctx.beginPath()
      ctx.ellipse(center + xCoord, center + yCoord, mapRadius * 5 / 6, mapRadius, -radians, 0, 2 * Math.PI)


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
          const emphasis = (QUADRANT_LABELS.length - quadrants.length) * 2
          this.drawQuadrant(emphasis, startAngle, endAngle, currentColor, currentColor)
        }
      }
    }

    if (user) {
      _clip(user)
    } else {
      _draw()
    }
  }

  drawQuadrant(
    emphasis = 0,
    startAngle = 0,
    endAngle = Math.PI / 2,
    fill = QUADRANT_COLORS.base,
    stroke = QUADRANT_COLORS.base
  ) {
    const { cx, cy, mapRadius: radius, ctx, borderWidth } = this
    const getOffset = (startAngle: number): Coordinate => {
      if (!emphasis) {
        return { x: 0, y: 0 }
      }
      startAngle /= Math.PI
      const offsetLength = borderWidth
      if (startAngle > 2) {
        return { x: -offsetLength, y: offsetLength }
      } else if (startAngle > 1.5) {
        return { x: offsetLength, y: offsetLength }
      } else if (startAngle > 1) {
        return { x: offsetLength, y: -offsetLength }
      } else {
        return { x: -offsetLength, y: -offsetLength }
      }
    }

    const offset = getOffset(startAngle)
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.arc(cx + offset.x, cy + offset.y, radius + emphasis, startAngle, endAngle)
    ctx.closePath()
    ctx.fillStyle = fill
    ctx.strokeStyle = stroke
    ctx.fill()
    ctx.stroke()
  }

  drawPriorityLabel(text: string, startAngle: number, align: 'left' | 'center' | 'right', textInside: boolean, inwardFacing: boolean, kerning: number) {
    const { ctx, priorityFontSize, textHeight, radius, width } = this
    // text:         The text to be displayed
    // startAngle:   In degrees, Where the text will be shown.
    // align:        Positions text to left right or center of startAngle
    // textInside:   true to show inside the diameter. False to show outside
    // inwardFacing: true for base of text facing inward. false for outward
    // kerning:     0 for normal gap between letters. positive or
    //               negative number to expand/compact gap in pixels
    //------------------------------------------------------------------------

    // declare and intialize canvas, reference, and useful variables
    const clockwise = align == "right" ? 1 : -1 // draw clockwise for aligned right or counter-clockwise
    let diameter = width
    align = align.toLowerCase() as 'center' | 'left' | 'right'
    startAngle = startAngle * (Math.PI / 180) // convert to radians
    if (!ctx) return



    ctx.save()

    ctx.fillStyle = '#323212'
    ctx.font = `${priorityFontSize}px ${FONT_STACK}`

    // Reverse letters for align Left inward, align right outward 
    // and align center inward.
    if (((["left", "center"].indexOf(align) > -1) && inwardFacing) || (align == "right" && !inwardFacing)) text = text.split("").reverse().join("")

    ctx.translate(radius, radius) // Move to center
    // in cases where we are drawing outside diameter,
    // expand diameter to handle it
    if (!textInside) diameter += textHeight * 2

    startAngle += (Math.PI * (inwardFacing ? 1 : -1)) // Rotate 180 if outward
    ctx.textBaseline = 'middle' // Ensure we draw in exact center
    ctx.textAlign = 'center' // Ensure we draw in exact center

    // rotate 50% of total angle for center alignment
    if (align == "center") {
      for (let j = 0; j < text.length; j++) {
        const charWid = ctx.measureText(text[j]).width
        startAngle += ((charWid + (j == text.length - 1 ? 0 : kerning)) / (diameter / 2 - textHeight)) / 2 * -clockwise
      }
    }

    // Phew... now rotate into final start position
    ctx.rotate(startAngle)

    // Now for the fun bit: draw, rotate, and repeat
    for (let j = 0; j < text.length; j++) {
      const charWid = ctx.measureText(text[j]).width // half letter
      // rotate half letter
      ctx.rotate((charWid / 2) / (diameter / 2 - textHeight) * clockwise)
      // draw the character at "top" or "bottom" 
      // depending on inward or outward facing
      ctx.fillText(text[j], 0, (inwardFacing ? 1 : -1) * (0 - diameter / 2 + textHeight / 2))

      ctx.rotate((charWid / 2 + kerning) / (diameter / 2 - textHeight) * clockwise) // rotate half letter
    }
    ctx.restore()
  }
}