export default class SVG_Dimensions {
  constructor(svg_el, x_margin = 0.05, y_margin = 0) {
    console.log('MARGIN', x_margin);

      this.new_dimensions = this.new_dimensions.bind(this);

      const chart_info = svg_el.getBoundingClientRect();
      const w = chart_info.width;
      const h = chart_info.height;

      this.x_margin = x_margin;
      this.y_margin = y_margin;

      this.dimensions = {
        w:w,
        h:h,
        margin_x: this.x_margin * w,
        margin_y: this.y_margin * h,
        width: w - 2 * (this.x_margin * w),
        height: h - 2 * (this.y_margin * h),
        x: chart_info.x,
        y: chart_info.y
      }

  }

  svg_dimensions() {
    return this.dimensions;
  }

  new_dimensions(svg_el){
    const chart_info = svg_el.getBoundingClientRect();
    const w = chart_info.width;
    const h = chart_info.height;

    this.dimensions = {
      w:w,
      h:h,
      margin_x: this.x_margin * w,
      margin_y: this.y_margin * h,
      width: w - 2 * (this.x_margin * w),
      height: h - 2 * (this.y_margin * h),
      x: chart_info.x,
      y: chart_info.y
    }

    return this.dimensions;
  }
}
