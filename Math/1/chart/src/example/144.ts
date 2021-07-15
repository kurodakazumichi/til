import FrequencyTable from "../FrequencyTable";

const data = [
  41, 53, 64, 47, 44, 31, 46, 53, 65, 54, 42, 50, 56, 66, 71, 
  39, 46, 55, 34, 56, 23, 54, 76, 62, 37, 58, 68, 48, 53, 56
];

const ft = new FrequencyTable(20, 10);
ft.set(data);
ft.show();