import * as d3 from 'd3'
import _ from 'lodash'

export const loadAllData = (callback = _.noop) =>  {
  d3.queue()
  .defer(d3.csv, './data/category_totals.csv')
  .await((error, category_totals) => {
    if (error) throw error;

    console.log('datahandle', category_totals);
    callback({
        categories: category_totals
      })
  });
};
