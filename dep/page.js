const dat = {

  dev: 'mid',

  key: null,

  rto: null,

  opt: null,

  pop: null,

  hom: null,

  lgo: null
};

const doc = {

  setup: function(){

    doc.scale();

    doc.action.optionChange('default');

    $(window).resize(doc.scale);
  },

  scale: function(){

    var alg = {

      site: (() => {

        var wdt = $('.site-bar').width();

        var hgt = $('.site-bar').height();

        return {wdt: wdt, hgt: hgt};
      })(),

      post: (() => {

        var wdt = $('#post').width();

        var hgt = $('#post').height();

        var dim = ((wdt + hgt) / 2).toFixed(2);

        return { wdt: wdt, hgt: hgt, dim: dim};

      })(),

      menu: (() => {

        var wdt = $('#menu').width();

        var hgt = $('#menu').height();

        var qty = (wdt / hgt).toFixed();

        var spc = (wdt - (hgt * 4)).toFixed();

        var avl = (qty >= 4 && spc >= 100);

        var opt = (avl)? hgt * 0.85 : (wdt * 0.15);

        return {wdt: wdt, hgt: hgt, qty: qty, spc: spc, avl: avl, opt: opt};

      })()
    };

    dat.dev = $(':root').css('--device');

    dat.opt = {

      mgW: (alg.menu.avl)? '5px': '2px',

      img: {

        wdt: (alg.menu.opt * 0.5).toFixed() + 'px',

        hgt: (alg.menu.opt * 0.5).toFixed() + 'px',

        mgW: ((alg.menu.opt - alg.menu.opt * 0.45) * 0.5) + 'px',

        mgH: ((alg.menu.hgt - alg.menu.opt * 0.5) * 0.5) + 'px'
      },

      sdw: {

        wdt: (alg.menu.avl)?
             (alg.menu.opt * 0.6).toFixed() + 'px':
             (alg.menu.opt * 0.7).toFixed() + 'px',

        hgt: (alg.menu.avl)?
             (alg.menu.opt * 0.6).toFixed() + 'px':
             (alg.menu.opt * 0.7).toFixed() + 'px',

        mgW: (alg.menu.avl)?
             ((alg.menu.opt * 0.4) * 0.55).toFixed() + 'px':
             ((alg.menu.opt * 0.4) * 0.5).toFixed() + 'px',

        mgH: (alg.menu.avl)?
             (alg.menu.hgt * 0.25).toFixed() + 'px':
             ((alg.menu.hgt - alg.menu.opt * 0.7) * 0.5).toFixed() + 'px',

        blr: (alg.menu.avl)? '8px':'0px',
      },

      txt: {

        mgH: ((alg.menu.hgt - parseInt($('.opt-txt').css('lineHeight'))) * 0.55).toFixed() + 'px',
      }

    };

    dat.pop = {

      wdt: (() => {

        var cap = $('.pop-cap').width()+'px';

        return (dat.pop != null)? (
               (dat.pop.mod == 'down')? cap:
                dat.pop.wdt): cap;

      })(),

      hgt: '0px',

      wtD:  (() => {

        var sml = (alg.post.wdt).toFixed() + 'px';

        var mid = (alg.post.wdt * 0.7).toFixed() + 'px';

        var lrg = (alg.post.wdt * 0.5).toFixed() + 'px';

        return (dat.dev == 'sml')? sml :(dat.dev == 'mid')? mid: lrg;

      })(),

      htD: (() => {

        var popHeight = $('.pop-cap').height();

        var height = (alg.post.hgt - popHeight).toFixed() + 'px';

        return height;

      })(),

      mod: (dat.pop != null)? dat.pop.mod : 'down'
    };

    dat.hom = {

      mgW: '15px',

      mgH: (alg.site.hgt * 0.2).toFixed() +'px',

      wdt: (alg.site.hgt * 0.6).toFixed() + 'px',

      hgt: (alg.site.hgt * 0.6).toFixed() + 'px'

    };

    dat.lgo = {

      pos: (() => {

        var dy = $('#link').height();

        var w = alg.post.wdt;

        var h = alg.post.hgt;

        var x = ((w * 0.5) - 100).toFixed() + 'px';

        var y = (dy + (h * 0.45) - 100).toFixed() + 'px';

        return {x: x, y: y};
      })()
    };

    doc.layout();
  },

  layout: function(){

    $('.hom').css({
      width: dat.hom.wdt,
      height: dat.hom.hgt,
      margin: dat.hom.mgH+' '+dat.hom.mgW,
    });


    $('.lgo').css({

      left: dat.lgo.pos.x,

      top: dat.lgo.pos.y
    });


    $('.pop-box').css({
      width: (dat.pop.mod == 'down')? dat.pop.wdt : dat.pop.wtD
    });


    $('.opt').css({

      margin: '0px '+dat.opt.mgW
    });

    $('.opt-img').css({

      width: dat.opt.img.wdt,

      height: dat.opt.img.hgt,

      margin: dat.opt.img.mgH +' '+dat.opt.img.mgW,

      backgroundSize: (parseInt(dat.opt.img.wdt) * 4).toFixed()+'px '+
                      dat.opt.img.hgt
    });

    $('.opt-txt').css({

      margin: dat.opt.txt.mgH+' 0px'

    });

    $('.opt-sdw').css({

      width: dat.opt.sdw.wdt,

      height: dat.opt.sdw.hgt,

      margin: dat.opt.sdw.mgH+' '+dat.opt.sdw.mgW,

      filter: 'blur('+dat.opt.sdw.blr+')'
    });

    doc.interact();
  },

  interact: function(){

    clear();

    display();

    function clear(){

      $('.opt').each(function(i, opt){

        $(opt).off('mouseover');

        $(opt).off('mouseleave');
      });

      $('.pop-cap').off('click')

    }

    function device(){

      $('.opt').each(function(i, opt){

        $(opt).on('touchstart',function(e){

          $('.opt-sdw').eq(i).css('backgroundColor','#F00');
        });
      });
    }

    function display(){

      $('.opt').each(function(i, opt){

        $(opt).on('mouseover', function(){

          $('.opt-txt').eq(i).attr('label', 'in');
        });

        $(opt).on('mouseleave', function(){

          $('.opt-txt').eq(i).attr('label', 'out');
        });

        $(opt).on('mousedown', function(){

          doc.action.optionChange($(this).attr('opt'));

        });
      });

      $('.pop-cap').on('click', function(i, pop){

        var change = (dat.pop.mod == 'down')? 'up': 'down';

        doc.action.popboxChange(change);

      });
    }

  },

  action: {

    logoChange: function(state){

      switch(state){

        case 'fade':

          $('.lgo-lrg').animate({opacity: 0}, 500, 'swing');

          $('.lgo-sml').animate({opacity: 0}, 500, 'swing');

          $('.lgo-bck').attr('logo','fade');

        break;
        case 'glow':

          $('.lgo-lrg').animate({opacity: 1}, 500, 'swing');

          $('.lgo-sml').animate({opacity: 1}, 500, 'swing');

          $('.lgo-bck').attr('logo','glow');

        break;
      }

    },

    optionChange: function(select){

      var relate = dat.key;

      function hide(){

        var post = $('.post[tag='+relate+']');

        var main = $('.main[tag='+relate+']');

        var sub = $('.sub[tag='+relate+']');

        switch(relate){

          case 'default':

            doc.action.logoChange('fade');

            setTimeout(()=>{

              post.attr('state','disable');

              main.attr('state','disable');

              sub.attr('state','disable');

            },500);

            setTimeout(()=>{

              post.css('display','none');

              main.css('display','none');

              sub.css('display','none');

              show();
            },1000);
          break;
          default:

            post.attr('state','disable');
            main.attr('state','disable');
            sub.attr('state','disable');

            setTimeout(()=>{
              post.css('display','none');
              main.css('display','none');
              sub.css('display','none');
              show();
            },1000);

          break;
        }

      }

      function show(){

        var post = $('.post[tag='+select+']');

        var main = $('.main[tag='+select+']');

        var sub = $('.sub[tag='+select+']');

        switch(select){

          case 'default':

            post.css('display','grid');

            main.css('display','block');

            sub.css('display','block');

            setTimeout(()=>{

              post.attr('state','enable');

              main.attr('state','enable');

              sub.attr('state','enable');

            },100);

            setTimeout(()=>{

              doc.action.logoChange('glow');

            },600);

          break;
          default:

            post.css('display','grid');

            main.css('display','block');

            sub.css('display','block');

            setTimeout(()=>{

              post.attr('state','enable');

              main.attr('state','enable');

              sub.attr('state','enable');

            },100);

          break;
        }

        dat.key = select;
      }

      hide();
    },

    buttonChange: function(){},

    popboxChange: function(state){

      var scale = (state == 'down')?{

        width: dat.pop.wdt, height: dat.pop.hgt

      }:{

        width: dat.pop.wtD, height: dat.pop.htD

      };

      var text = (state == 'down')? '+ info': '- info';

      $('.pop-txt-right').html(text);

      $('.pop-box').animate(scale, {
        duration: 500,
        easing: 'swing'
      });

      dat.pop.mod = state;
    },

    clear: function(){},

    reset: function(){}
  }
};

$(document).ready(doc.setup);
