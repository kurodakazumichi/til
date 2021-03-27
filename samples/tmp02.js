$(function () {
const wrap1 = $('.first-wrap');
const wrap2 = $('.second-wrap');
const wrap3 = $('.third-wrap');
const sec1 = $('#section1');
const InVelocity = 150;
const OutVelocity = 8;

const sec2 = $('#section2');
const wrap4 = $('.four-wrap');
const wrap5 = $('.five-wrap');
const wrap6 = $('.six-wrap');
const UpperVelocity01 = 400;
const UpperVelocity02 = 400;
const UpperVelocity03 = 600;

//文字が大きい→小さく
// wrap1.animate({fontSize:'80px'},InVelocity,'easeOutExpo',function(){
//   wrap1.animate({'z-index':0},OutVelocity,'easeOutExpo',function(){
//     wrap2.animate({fontSize:'80px'},InVelocity,'easeOutExpo',function(){
//       wrap2.animate({'z-index':0},OutVelocity,'easeOutExpo',function(){
//         wrap3.animate({fontSize:'80px'},InVelocity,'easeOutExpo',function(){
//           wrap3.animate({'z-index':0},OutVelocity,'easeOutExpo');
//         })
//       });
//     });
//   });
//   });

class Animation {
  constructor() {
    this.needPlay = true;
    this.needNext = false;
  }

  // アニメーションを再生
  play() {
    this.needPlay = false;
  }

  // 次のアニメーションへ遷移
  next() {
    animation = null;
  }

  // アニメーション再生終了時に呼ぶ処理
  onFinish() {
    this.needNext = true;
  }
}

class Animation1 extends Animation {
  play() {
    super.play();
    sec1.animate({left:'0%'},2000,'easeInOutExpo', this.onFinish.bind(this));
  }

  next() {
    animation = new Animation2();
  }
}

class Animation2 extends Animation {
  play() {
    wrap1.animate({'opacity':1},0,'easeOutExpo', this.onFinish.bind(this));
  }

  next() {
    animation = new Animation3();
  }
}

class Animation3 extends Animation {
  play() {
    wrap1.animate({fontSize:'80px','opacity':1},InVelocity,'easeOutExpo', this.onFinish.bind(this));
  }
  next() {

  }
}


let animation = new Animation1();

const step = () => {
  if (animation) {
    animation.needPlay && animation.play();
    animation.needNext && animation.next();
  }

  requestAnimationFrame(step);
};

requestAnimationFrame(step);
  
});

