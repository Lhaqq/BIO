window.onload = scale;

window.onscroll = scroll;

window.onresize = scale;

const dat = {

  menu: {

    lock: false,
  },

  image: {

    w: 3500,

    h: 2000
  },

  post: {},

  logo: {

    w: 1000,

    h: 687
  },

  option: {

    min: null,

    max: null,
  },

  sprite: {

    w: 1250,

    h: 500,
  }
};

const dom = {

  page: {},

  post: {},

  view: {},

  menu: {},

  source: {},
};

const sub = {

  post: {},

  option: {},
};

const elm = {

  view: null,

  post: null,

  menu: null,

  source: null,

  post: null,

  logo: null,

  caption: null,

  option: null,

  label: null,

  icon: null,

  sprite: null,

};

function scale(){

  for( i in dom ){

    var obj = $('#'+i);

    dom[i].w = obj.width();

    dom[i].h = obj.height();
  }

  for( i in sub ){

    var obj = $('.'+i);

    sub[i].w = obj.width();

    sub[i].h = obj.height();
  }

  var ratio = {

    view: dom.view.w / dom.view.h,

    image: {

      w: dom.view.w / dat.image.w,

      h: dom.view.h / dat.image.h
    },

    logo: (
      ((dom.view.w < 500)? (dom.view.w * 0.5):
      (dom.view.w < 720)? (dom.view.w * 0.4):
      (dom.view.w < 1024)? (dom.view.w * 0.3):
      300) / (dat.logo.w + dat.logo.h)
    ),

    post: (
       (dom.view.w < 500)? (dom.view.w * 0.38):
       (dom.view.w < 720)? (dom.view.w * 0.28):
       (dom.view.w < 1024)? (dom.view.w * 0.25):
       250
     ),

    sprite: (dom.menu.h * 0.6)

  };

  var size = {

    image: {

      w: (ratio.image.w * dat.image.w).toFixed(),

      h: (ratio.image.h * dat.image.h).toFixed()
    },

    logo: {

      w: (ratio.logo * dat.logo.w).toFixed(),

      h: (ratio.logo * dat.logo.h).toFixed(),
    },

    post: {

      h: dom.view.h * 0.5,

      w: (ratio.post).toFixed(),
    },

    caption: {

      w: (ratio.post * 1.25).toFixed(),

      h: (dom.view.h * 0.5) * 0.25
    },

    option: {

      w: dom.menu.h * 0.6,

      h: dom.menu.h * 0.6,

      s: dom.menu.h * 2,
    },

    icon: {

      w: (ratio.sprite * 5).toFixed(),

      h: (ratio.sprite * 2).toFixed()
    },

    label: {

      font: (dom.menu.h * 0.3).toFixed()
    }

  };

  var offset = {

    image: {

      x: (size.image.w > dom.view.w)? (dom.view.w * 0.5 - size.image.w * 0.5).toFixed(): 0,

      y: (size.image.h > dom.view.h)? (dom.view.h * 0.5 - size.image.h * 0.5).toFixed(): 0,
    },

    menu: (dat.menu.lock)? 0: dom.view.h,

    source: (dom.view.h + dom.menu.h).toFixed(),

    logo: {

      x: (size.post.w * 0.5 - size.logo.w * 0.5).toFixed(),

      y: 0
    },

    post: {

      x: (dom.view.w * 0.5 - size.post.w * 0.5).toFixed(),

      y: (dom.view.h * 0.5 - size.post.h * 0.5).toFixed(),

      p: size.logo.h,
    },

    caption: {

      x: (size.post.w * 0.5) - (size.caption.w * 0.5),

      y: size.post.h,
    },

    option: {

      x: (dom.menu.w * 0.5) - ((size.option.w * 2) + (dom.menu.h * 0.8)),

      p: {

        x: ( dom.menu.h * 0.2 ).toFixed(),

        y: 0
      },

      m: {

        x: 0,

        y: ( dom.menu.h * 0.2 ).toFixed()
      },

      o: (dom.menu.w * 0.5) - ((size.option.w * 2.4) + (dom.menu.h * 1.2)),
    },

    icon: ratio.icon,

    label: {

      x: size.option.w * 1.5,

      y: ((size.option.h * 0.55) - (dom.menu.h * 0.15)).toFixed()

    }
  };

  var position = {

    menu: (dat.menu.lock)? 'fixed': 'absolute'
  };

  elm.view = {

    size: size.image.w+'px '+size.image.h+'px',

    position: offset.image.x+'px '+offset.image.y+'px'

  };

  elm.menu = {

    offset: offset.menu,

    position: position.menu
  };

  elm.source = {

    top: offset.source+'px'
  };

  elm.post = {

    left: offset.post.x+'px',

    top: offset.post.y+'px',

    width: size.post.w+'px',

    height: size.post.h+'px',

    size: size.logo.w+'px '+size.logo.h+'px',

    position: offset.logo.x+'px '+offset.logo.y+'px',

    padding: offset.post.p+'px'
  };

  elm.caption = {

    left: offset.caption.x+'px',

    top: offset.caption.y+'px',

    width: size.caption.w+'px',

    height: size.caption.h+'px'
  };

  elm.logo = {

    width: size.logo.w,

    height: size.logo.h
  };

  elm.option = {

    left: offset.option.x+'px',

    width: size.option.w+'px',

    height: size.option.h+'px',

    scale: size.option.s+'px',

    margin: offset.option.m.y+'px '+offset.option.m.x+'px',

    padding: offset.option.p.y+'px '+offset.option.p.x+'px',

    offset: offset.option.o+'px',

  };

  elm.icon = {

    width: size.option.w+'px',

    height: size.option.h+'px',

    offset: size.option.w,

    size: size.icon.w+'px '+size.icon.h+'px',
  };

  elm.label = {

    left: offset.label.x+'px',

    top: offset.label.y+'px',

    font: size.label.font+'px',
  };

  layout();

}

function layout(){

  $('#menu').css('top', elm.menu.offset);

  $('#menu').css('position', elm.menu.position);



  $('#view').css('background-size', elm.view.size);

  $('#view').css('background-position', elm.view.position);


  $('#source').css('top', elm.source.top);


  $('.logo').css('width', elm.logo.width);

  $('.logo').css('height', elm.logo.height);



  $('.option').css('left', elm.option.left);

  $('.option').css('width', elm.option.width);

  $('.option').css('height', elm.option.height);

  $('.option').css('margin', elm.option.margin);

  $('.option').css('padding', elm.option.padding);

  $('.option').attr('shift', 'disable');


  $('.icon').css('width', elm.icon.width);

  $('.icon').css('height', elm.icon.height);

  $('.icon').css('background-size', elm.icon.size);

  $('.icon').each(function(i, ico){

    var x = (i * -elm.icon.offset).toFixed();

    var y = 0;

    var position = x+'px '+y+'px';

    var poly = 'polygon(0px 0px, '+elm.icon.width+' 0px, '+
                elm.icon.width+' '+elm.icon.height+', '+
                '0px '+elm.icon.width+', 0px 0px)';

    //var poly = 'polygon(0% 0%, 50% 0%, 50% 50%, 0% 50%, 0% 0%)';

    $(ico).css('background-position', position);

    $(ico).css('clip-path', poly);

  });


  //$('.label').css('left', elm.label.left);

  $('.label').css('top', elm.label.top);

  $('.label').css('font-size', elm.label.font);

  $('.label').attr('fade', 'on');

  action();
}

function scroll(){

  dat.menu.lock = (window.scrollY > dom.view.h);

  elm.menu.offset = (dat.menu.lock)? 0: dom.view.h;

  elm.menu.position = (dat.menu.lock)? 'fixed': 'absolute';


  $('#menu').css('top', elm.menu.offset);

  $('#menu').css('position', elm.menu.position);

}

function action(){

    $('.option').each(function(i, opt){

      $(opt).on('mouseover', function(){

        $(this).css('width', elm.option.scale);

        $('.label').eq(i).attr('fade', 'in');

        $('.option').css('left', elm.option.offset);

        $(this).on('mousedown', function(){

          $(this).attr('shift', 'enable');

        });

        $(this).on('mouseup', function(){

          $(this).attr('shift', 'disable');

        });

      });

      $(opt).on('mouseout', function(){

        $(this).css('width', elm.option.width);

        $(this).attr('shift', 'disable');

        $(this).off('mousedown');

        $(this).off('mouseup');

        $('.label').eq(i).attr('fade', 'out');

        $('.option').css('left', elm.option.left);
      });
    });

}
