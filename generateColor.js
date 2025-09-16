  const el = document.getElementById('carre');
  const btnCarte = document.getElementById('BtnCarte');
  const btnStart = document.getElementById('StartBtn');
  var coCouleur = new Map();
  if(localStorage.getItem("guess") == null){
    localStorage.setItem("guess", 1)
  }
  btnCarte.addEventListener('click', () => {
    let randomColor = (Math.floor(Math.random()*600));  
    el.style.backgroundColor = getAllColors()[randomColor];
    console.log(getAllColors()[randomColor])
    localStorage.setItem("couleur",getAllColors()[randomColor])
    localStorage.setItem("coCouleur",coCouleur.get(getAllColors()[randomColor]))
  });
  btnStart.addEventListener('click', () => {
    if(localStorage.getItem("couleur")==null){
      alert('veuillez tirez une carte')
    }else{
      document.location.replace('nuancier.html')
    }
  });
  function getAllColors(){
    const COLS = 30;
    const ROWS = 20;    
    const cx = (COLS - 1) / 2;
    const cy = (ROWS - 1) / 2;
    const rMax = Math.hypot(cx, cy);
    let listeCouleurs = []
    for(let y=0; y<ROWS; y++){
      for(let x=0; x<COLS; x++){
        const dx = x - cx;
        const dy = y - cy;
        const r  = Math.hypot(dx, dy);
        const ratio = r / rMax; // 0 au centre → 1 au bord

        // teinte selon l’angle (cercle chromatique)
        let hue = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;

        // Saturation et luminosité : moins de blanc au centre
        const light = 90 - 65 * ratio;    // ~95% au centre → 25% au bord

        const hsl = `hsl(${hue.toFixed(0)}, 80%, ${light.toFixed(0)}%)`;

        let colorHex = hslToHex(hue.toFixed(0), 80, light.toFixed(0));
        coCouleur.set(colorHex, x + " " + y)
        listeCouleurs.push(colorHex)}
    }
    return listeCouleurs;
  }
function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}