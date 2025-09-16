const COLS = 30;
const ROWS = 20;
const board = document.getElementById('board');
const cx = (COLS - 1) / 2;
const cy = (ROWS - 1) / 2;
const rMax = Math.hypot(cx, cy);
const CoHighlightTrue = localStorage.getItem("coCouleur");
const HighlightTrueX = parseInt(CoHighlightTrue.split(" ")[0]) 
const HighlightTrueY = parseInt(CoHighlightTrue.split(" ")[1])
const CoHighlightEssai = localStorage.getItem("reponse1 x y");
const HighlightEssaiX = parseInt(CoHighlightEssai.split(" ")[0]) 
const HighlightEssaiY = parseInt(CoHighlightEssai.split(" ")[1])
let CoHighlightEssai2 = null;
let HighlightEssai2X = 0
let HighlightEssai2Y = 0
if(localStorage.getItem('reponse2 x y') != null){
  CoHighlightEssai2 = localStorage.getItem("reponse2 x y");
  HighlightEssai2X = parseInt(CoHighlightEssai2.split(" ")[0]) 
  HighlightEssai2Y = parseInt(CoHighlightEssai2.split(" ")[1])
}
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
        const div = document.createElement('div');
        div.className = 'cell';
        div.style.background = hsl;
        div.dataset.x = x
        div.dataset.y = y
        div.dataset.HexCol = colorHex

        if (x === HighlightEssaiX && y === HighlightEssaiY) {
          div.classList.add('highlight');
        }else if(x === HighlightTrueX && y === HighlightTrueY){
          div.classList.add('highlightTrue');
        }else if(CoHighlightEssai2 != null && x === HighlightEssai2X && y === HighlightEssai2Y){
          div.classList.add('highlight');
        }
        
        board.appendChild(div);
    }
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