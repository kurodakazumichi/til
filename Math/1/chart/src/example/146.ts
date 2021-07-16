import Data from "../Data";

function Q1() {
  const data = new Data([172, 155, 187, 169, 163, 150, 167, 159, 177]);
  data.show();
}

function Q2() {
  const data = new Data([172, 155, 187, 169, 163, 150, 167, 159, 177, 160]);
  data.show();
}

function EX1() {
  const data = new Data([410, 360, 440, 420, 390, 450, 400]);
  data.show();
}

function EX2() {
  const data = new Data([410, 360, 440, 420, 390, 450, 400, 420, 360, 430]);
  data.show();
}

Q1();
Q2();
EX1();
EX2();