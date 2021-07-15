import FrequencyTable from "../FrequencyTable";

// 度数分布表(4以上、階級の幅=3)
const ft = new FrequencyTable(4, 3);
ft.set([9.1, 11.6, 7.5, 4.5, 8.7, 12.3, 8.3, 6.2, 7.9, 9.8, 14.1, 6.8, 15.3, 10.9, 4.9]);
ft.show();