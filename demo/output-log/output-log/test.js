const a = {
  recall: {
    title: '召回率',
    min_val: 0,
    max_val: 1,
    recall: {
      x1: 'y1',
      x2: 'y2',
      x3: 'y3',
      x4: 'y4'
    },
    recall_cum: {
      x1: 'y1',
      x2: 'y2',
      x3: 'y3',
      x4: 'y4'
    },
    recall_title: '召回率',
    recall_cum_title: '累计召回率'
  }
}

console.log(JSON.stringify(a))
