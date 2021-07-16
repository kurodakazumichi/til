import FrequencyTable from "../FrequencyTable";

function Q1() {
  const data = [
    41, 53, 64, 47, 44, 31, 46, 53, 65, 54, 42, 50, 56, 66, 71, 
    39, 46, 55, 34, 56, 23, 54, 76, 62, 37, 58, 68, 48, 53, 56
  ];
  
  const ft = new FrequencyTable(20, 10);
  ft.set(data);
  ft.show();
}

function EX1() {
  const data = [
    18, 9, 19, 15, 10, 15, 8, 17, 11, 21, 9, 26, 23, 13, 31,
    14, 9, 27, 10, 11, 9, 17, 18, 19, 11, 6, 12, 15, 18, 11
  ];

  const ft = new FrequencyTable(5, 5);
  ft.set(data);
  ft.show();
}

Q1();
EX1();