import Data from "../Data";

const datas = [
  new Data([1, 2, 3, 4, 4, 5, 5, 6, 7]),
  new Data([9.1, 11.6, 7.5, 4.5, 8.7, 12.3, 8.3, 6.2, 7.9, 9.8, 14.1, 6.8, 15.3, 10.9, 4.9])
]


datas.forEach((data) => { data.show(); })