import * as d3 from 'd3';

// https://bl.ocks.org/mbostock/4739610f6d96aaad2fb1e78a72b385ab
const project = (x, y) => {
  let angle = (x - 90) / 180 * Math.PI;
  let radius = y;
  return [radius * Math.cos(angle), radius * Math.sin(angle)];
}

const processData = (csv) => {

  let stratify = d3.stratify()
                  .id(d => d.emojis)
                  .parentId(d => d.group)(csv)

  stratify.sort((a,b) => (b.data.group > a.data.group) || b.data.n > a.data.n);
  return stratify;
}

export {project, processData};
