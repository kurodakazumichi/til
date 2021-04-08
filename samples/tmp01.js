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
  
  //文字が大きく→下から出てくる
  const anim1 = () => {
    sec1.animate({left:'0%'},2000,'easeInOutExpo', anim2);
  };

  const anim2 = () => {
    wrap1.animate({'opacity':1},0,'easeOutExpo', anim3);
  };

  const anim3 = () => {
    wrap1.animate({fontSize:'80px','opacity':1},InVelocity,'easeOutExpo', anim4);
  };

  const anim4 = () => {
    wrap1.animate({'z-index':0},OutVelocity,'easeOutExpo', anim5);
  };

  const anim5 = () => {
    wrap2.animate({fontSize:'80px','opacity':1},InVelocity,'easeOutExpo', anim6);
  };

  const anim6 = () => {
    wrap2.animate({'z-index':0},OutVelocity,'easeOutExpo', anim7);
  };

  const anim7 = () => {
    wrap3.animate({fontSize:'80px','opacity':1},InVelocity,'easeOutExpo', anim8);
  };

  const anim8 = () => {
    wrap3.animate({'z-index':0},OutVelocity,'easeOutExpo', anim9);
  }

  const anim9 = () => {
    sec2.animate({top:'0%','opacity':1},0,'easeInOutExpo',anim10);
  };

  const anim10  = () => {
    wrap4.animate({top:'0%'},UpperVelocity01,'easeInOutBack');
    wrap5.animate({top:'33%'},UpperVelocity02,'easeInOutBack');
    wrap6.animate({top:'66%'},UpperVelocity03,'easeInOutBack');
  }

  anim1();
});
