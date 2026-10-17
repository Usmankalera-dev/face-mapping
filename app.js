// progress bar + burger + scrollspy + reveal + back-to-top
(function(){
  var bar=document.getElementById('progress');
  addEventListener('scroll',function(){
    var h=document.documentElement;
    var p=h.scrollTop/(h.scrollHeight-h.clientHeight)*100;
    bar.style.width=p+'%';
    var tt=document.getElementById('toTop');
    if(tt) tt.classList.toggle('show',h.scrollTop>600);
  },{passive:true});

  var burger=document.getElementById('burger'),nav=document.getElementById('navlinks');
  burger.addEventListener('click',function(){
    var open=nav.classList.toggle('open');
    burger.setAttribute('aria-expanded',open);
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false');});
  });

  var secs=[...document.querySelectorAll('.block')];
  var links=[...nav.querySelectorAll('a')];
  var spy=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){
        links.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id);});
      }
    });
  },{rootMargin:'-40% 0px -55% 0px'});
  secs.forEach(function(s){spy.observe(s);});

  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

  document.getElementById('toTop').addEventListener('click',function(){
    scrollTo({top:0,behavior:'smooth'});
  });
})();
