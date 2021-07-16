import Data from "../Data";
import FrequencyTable from "../FrequencyTable";

function Q1() {
  const data = new Data([10, 4, 7, 6, 3, 12, 6, 3, 0, 2, 6, 7]);
  data.show();
}

function Q2() {
  const ft = new FrequencyTable(0, 20, [5, 16, 11, 7, 1]);
  ft.show();
}

function EX1() {
  const data = new Data([6, 8, 22, 18, 2, 6, 11, 0, 17, 7, 2, 14, 8, 11, 4, 8]);
  data.show();
}

function EX2() {
  const ft = new FrequencyTable(14, 2, [2, 6, 16, 5, 2]);
  ft.show();
}

Q1();
Q2();
EX1();
EX2();