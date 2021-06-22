window.onload = main;

const page = {

  ele: {

    top: {

      w: null,

      h: null,

      p: null
    },

    mid: {

      w: null,

      h: null,

      c: null,

      p: null
    },

    band: {

      w: null,

      h: null
    },

    /*
    foot: {

      w: null,

      h: null
    }
    */
  },

  dim: {

    logo: {

      x: {

        a: 840,

        b: 1200
      },

      y: 450,

      w: 2400,

      h: 1500,
    },

    back: {

      w: 3500,

      h: 2000
    }
  },

  img: {

    logo: null,

    back: null,
  },

  ply: {},

  vrb: {

    r: null
  },

  exp: {

    min: null,

    max: null
  }
};

function main(){

  layout();

  window.onresize = layout;
}

function layout(){

  var size = () => {

    var measure = function(){

      for(n in page.ele){

        page.ele[n].w = $('#'+n).width();

        page.ele[n].h = $('#'+n).height();
      }
    };

    var portion = function(){

      var ratio = {

        logo: (page.ele.top.h * 0.20) / page.dim.logo.h,

        back: {

          r: ((page.ele.top.w / page.dim.back.w) > (page.ele.top.h / page.dim.back.h))?
             page.ele.top.w / page.dim.back.w:
             page.ele.top.h / page.dim.back.h,

          w: page.ele.top.w / page.dim.back.w,

          h: page.ele.top.h / page.dim.back.h
        }
      };

      var scale = {

        logo: {

          w: (ratio.logo * page.dim.logo.w),

          h: (ratio.logo * page.dim.logo.h),
        },

        back: {

          w: (ratio.back.r * page.dim.back.w) / page.ele.top.w,

          h: (ratio.back.r * page.dim.back.h) / page.dim.back.w,
        }
      };

      page.img.logo = {

        x: (page.ele.top.w * 0.5) - (scale.logo.w * 0.5),

        y: (page.ele.top.h * 0.5) - (scale.logo.h * 0.75),

        w: scale.logo.w,

        h: scale.logo.h
      };

      page.img.back = {

        x: (scale.back.w > 1)? ((page.ele.top.w - ratio.back.r * page.dim.back.w) * 0.5): 0,

        y: (scale.back.h > 1)? ((page.ele.top.h - ratio.back.r * page.dim.back.h) * 0.5): 0,

        w: ratio.back.r * page.dim.back.w,

        h: ratio.back.r * page.dim.back.h
      };

      page.exp.min = (page.ele.mid.w <= 500)? (page.ele.mid.w * 0.10):
                     (page.ele.mid.w <= 720)? (page.ele.mid.w * 0.08):
                     80;

      page.exp.max = (page.ele.mid.w <= 500)? (page.ele.mid.w * 0.50):
                     (page.ele.mid.w <= 720)? (page.ele.mid.w * 0.40):
                     300;
    };

    measure();

    portion();

  };

  size();

  var node = {


  };

  var vect = {

    'back': {

      'x': page.img.back.x,

      'y': page.img.back.y,

      'width': page.img.back.w,

      'height': page.img.back.h
    },

    'logo': {

      'x': page.img.logo.x,

      'y': page.img.logo.y,

      'width': page.img.logo.w,

      'height': page.img.logo.h
    }
  };

  for(name in node){

    var tag = node[name];

    for(atr in tag){

      var value = (typeof tag[atr] == 'number')? tag[atr].toFixed(2)+'px': tag[atr];

      $('#'+name).css(atr, value);
    }
  }

  for(name in vect){

    var tag = vect[name];

    for(atr in tag){

      var value = (typeof tag[atr] == 'number')? tag[atr].toFixed(2): tag[atr];

      $('#'+name).attr(atr, value);
    }
  }

  action();
}

function action(){

  $('[scale = "false" ]').css('width', page.exp.min);

  $('.spand').each(function(i, spand){

    $(spand).mouseenter(function(){

      $(spand).attr('scale','true');

      $(spand).css('width', page.exp.max);

    });

    $(spand).mouseout(function(){

      $(spand).attr('scale','false');

      $(spand).css('width', page.exp.min);

    });
  });
}
