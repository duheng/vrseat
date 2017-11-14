let LoadScripts = (scripts, callback) => {
  if (typeof scripts != 'object') var scripts = [scripts];
  var HEAD =
    document.getElementsByTagName('head').item(0) || document.documentElement;
  var s = new Array(),
    last = scripts.length - 1,
    recursiveLoad = function(i) {
      //递归
      s[i] = document.createElement('script');
      s[i].setAttribute('type', 'text/javascript');
      s[i].onload = s[i].onreadystatechange = function() {
        //Attach handlers for all browsers
        if (
          !/*@cc_on!@*/ 0 ||
          this.readyState == 'loaded' ||
          this.readyState == 'complete'
        ) {
          this.onload = this.onreadystatechange = null;
          this.parentNode.removeChild(this);
          if (i != last) recursiveLoad(i + 1);
          else if (typeof callback == 'function') callback();
        }
      };
      s[i].setAttribute('src', scripts[i]);
      HEAD.appendChild(s[i]);
    };
  recursiveLoad(0);
};
LoadScripts('./setting/tour.js', function(callback) {
  var vrdom = `<div id="pano" style="width:100%;height:100%;position:absolute;top:0;left:0;z-index:99;display:none;">
                     <div id="vr-pop" style="position:absolute;left:50%;bottom:30%;margin-left:-130px;display:none;color:#fff;font-size:1.6rem;z-index:1;text-align:center;line-height:45px;">
                        <div id="vr-cancel" style="width:120px;height:45px;display:block;background-color: #ee432e;border-radius:2px;">取消选座</div>
                        <div id="vr-confirm" style="width:120px;height:45px;display:block;background-color: #76b347;margin-left:20px;border-radius:2px;">确认选座</div>
                     </div>
                     <div id="pano_box" style="width:100%;height:100%;"></div>
                  </div>`;
  if (!document.getElementById('pano')) {
    var el = document.createElement('div');
    el.id = 'vrdom';
    el.innerHTML = vrdom;
    el.style.cssText = 'z-index:9;';
    document.body.appendChild(el);
  }
  const Pano = document.getElementById('pano'),
    Pop = document.getElementById('vr-pop'),
    Confirm = document.getElementById('vr-confirm'),
    Cancel = document.getElementById('vr-cancel');
  const InitPano = () => {
    Pano.style.display = 'none';
    Pop.style.display = 'none';
    document.getElementById('krpanoSWFObject') &&
      document.getElementById('krpanoSWFObject').call("set('view.fov', 120);");
  };

  //close vrseat
  Cancel.addEventListener(
    'click',
    () => {
      InitPano();
    },
    false
  );

  //confirm vrseat

  Confirm.addEventListener(
    'click',
    event => {
      InitPano();
    },
    false
  );

  const panos_url = `./wepiao`;
  document.getElementById('pano') &&
    embedpano({
      xml: './setting/tour.xml',
      target: 'pano_box',
      html5: 'only',
      passQueryParameters: true,
      initvars: {
        imgpath: panos_url,
      },
    });
});

const vrseat = seat => {
  const datas = {
    '101': { hlookat: 0, vlookat: 6, fovmin: 20, fovmax: 135, fov: 135 },
    '102': { hlookat: 5, vlookat: 12, fovmin: 20, fovmax: 135, fov: 135 },
    '103': { hlookat: 3, vlookat: 5, fovmin: 20, fovmax: 155, fov: 135 },
    '104': { hlookat: -3, vlookat: 15, fovmin: 20, fovmax: 150, fov: 135 },
    '105': { hlookat: -5, vlookat: 5, fovmin: 20, fovmax: 155, fov: 135 },
    '106': { hlookat: -5, vlookat: 15, fovmin: 20, fovmax: 155, fov: 135 },

    '201': { hlookat: 1, vlookat: 6, fovmin: 20, fovmax: 155, fov: 150 },
    '202': { hlookat: 12, vlookat: 3, fovmin: 20, fovmax: 150, fov: 135 },
    '203': { hlookat: 5, vlookat: 8, fovmin: 20, fovmax: 155, fov: 135 },
    '204': { hlookat: 0, vlookat: 3, fovmin: 20, fovmax: 150, fov: 135 },
    '205': { hlookat: -5, vlookat: -5, fovmin: 20, fovmax: 155, fov: 155 },
    '206': { hlookat: -25, vlookat: 5, fovmin: 20, fovmax: 155, fov: 135 },

    '301': { hlookat: 15, vlookat: 5, fovmin: 20, fovmax: 150, fov: 130 },
    '302': { hlookat: 2, vlookat: 8, fovmin: 20, fovmax: 150, fov: 130 },
    '303': { hlookat: 6, vlookat: 6, fovmin: 20, fovmax: 155, fov: 130 },
    '304': { hlookat: -8, vlookat: 8, fovmin: 20, fovmax: 150, fov: 130 },
    '305': { hlookat: -8, vlookat: 5, fovmin: 20, fovmax: 150, fov: 130 },

    '401': { hlookat: 5, vlookat: 25, fovmin: 20, fovmax: 150, fov: 125 },
    '402': { hlookat: 3, vlookat: 13, fovmin: 20, fovmax: 150, fov: 125 },
    '403': { hlookat: 3, vlookat: 18, fovmin: 20, fovmax: 150, fov: 125 },
    '404': { hlookat: -3, vlookat: 21, fovmin: 20, fovmax: 150, fov: 130 },
    '405': { hlookat: -5, vlookat: -1, fovmin: 20, fovmax: 155, fov: 148 },
    '406': { hlookat: -5, vlookat: 8, fovmin: 20, fovmax: 150, fov: 120 },

    '501': { hlookat: 5, vlookat: 22, fovmin: 20, fovmax: 150, fov: 122 },
    '502': { hlookat: 2, vlookat: -5, fovmin: 20, fovmax: 150, fov: 120 },
    '503': { hlookat: 2, vlookat: -14, fovmin: 20, fovmax: 155, fov: 122 },
    '504': { hlookat: 2, vlookat: 20, fovmin: 20, fovmax: 150, fov: 122 },
    '505': { hlookat: -8, vlookat: 18, fovmin: 20, fovmax: 150, fov: 120 },
    '506': { hlookat: -15, vlookat: 16, fovmin: 20, fovmax: 150, fov: 120 },
  };

  const Pano = document.getElementById('pano');
  const Pop = document.getElementById('vr-pop');
  const krpano = document.getElementById('krpanoSWFObject');
  const setting = (index, data) => {
    krpano.call(`  
          set(view.hlookat, ${data.vlookat});
          loadscene(${index}, null, MERGE,  ZOOMBLEND(2.0, 2.0, easeInOutSine));
          wait(0.5);
          tween(view.hlookat,${data.hlookat}, 1.5, easeInOutQuad);
          tween(view.vlookat, ${data.vlookat}, 1.5, easeInOutQuad);
          tween(view.fov,     ${data.fov},  1.5, easeInOutQuad);
          tween(view.fovmin,     ${data.fovmin},  1.5, easeInOutQuad);
          tween(view.fovmax,     ${data.fovmax},  1.5, easeInOutQuad);
         // tween(view.fisheye, 0.0, 1.5, easeInOutQuad);
            //保真视角
          tween(view.fisheye,        0.0, distance(1.0, 0.45), easeoutquad, set(view.stereographic,false);set(view.pannini,false);set(display.flash10,on); );
          //正常视角
          // tween(view.architectural,  0.0, distance(1.0, 0.45), easeoutquad);
          // tween(view.fisheye,        0.0, distance(1.0, 0.45), 
          // easeoutquad, set(view.stereographic,false); 
          // set(view.pannini,false); 
          // set(display.flash10,on); );
        `);
    document.getElementById('pano').style.display = 'block';
    setTimeout(() => {
      document.getElementById('vr-pop').style.display = 'flex';
    }, 2500);
  };

  for (var i in datas) {
    if (i == `${seat}`) {
      setting(i, datas[i]);
    }
  }
};
