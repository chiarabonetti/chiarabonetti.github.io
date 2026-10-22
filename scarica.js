// Scarica in PDF il foglio della pagina (tessera o diploma), in formato A4.
function scaricaPdf(nomeFile, margineMm, larghezzaMm){
  var el=document.querySelector('.foglio');
  var btn=document.getElementById('btn-scarica');
  if(!window.html2pdf){window.print();return;}
  var testo=btn.textContent;
  btn.textContent='Preparo il PDF...';btn.disabled=true;
  window.scrollTo(0,0);
  // copia del foglio appoggiata in alto a sinistra, a misura di stampa
  var box=document.createElement('div');
  box.className='in-pdf';
  box.style.cssText='position:absolute;left:0;top:0;width:'+larghezzaMm+'mm;background:#fff;z-index:-1';
  var copia=el.cloneNode(true);
  copia.style.width=larghezzaMm+'mm';copia.style.border='0';
  box.appendChild(copia);
  document.body.appendChild(box);
  html2pdf().set({
    margin:margineMm,
    filename:nomeFile,
    image:{type:'jpeg',quality:0.98},
    html2canvas:{scale:3,useCORS:true,backgroundColor:'#ffffff'},
    jsPDF:{unit:'mm',format:'a4',orientation:'portrait'},
    pagebreak:{mode:['avoid-all']}
  }).from(copia).save().then(fine,fine);
  function fine(){
    box.remove();
    btn.textContent=testo;btn.disabled=false;
  }
}
