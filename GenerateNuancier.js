    const COLS = 30;
    const ROWS = 20;
    const board = document.getElementById('board');
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
        listeCouleurs.push(colorHex)
        const div = document.createElement('div');
        div.className = 'cell';
        div.style.background = hsl;
        div.dataset.x = x
        div.dataset.y = y
        div.dataset.HexCol = colorHex
       // Ignore si en dehors du cercle
        if(r > rMax){
          div.style.background = "transparent";
        } else {
          // Interaction : click → affiche coordonnées + couleur
          div.addEventListener("click", () => {
            if(localStorage.getItem("guess")== 1){
              localStorage.setItem("reponse1 x y",x + " " + y)
              localStorage.setItem("reponse1Color", colorHex)
            }else{
              localStorage.setItem("reponse2 x y",x + " " + y)
              localStorage.setItem("reponse2Color", colorHex)
            }
            document.getElementById('popup').style.display = 'block'
            document.getElementById('carre').style.backgroundColor = colorHex
            document.getElementById('closePopup').addEventListener("click", () =>{
              document.getElementById('popup').style.display = 'none'
            });
            document.getElementById('Valider').addEventListener("click", () =>{
              if(localStorage.getItem("guess")== 1){
                localStorage.setItem("guess", 2)
                location.assign("waitingScreen.html")
              }else if(localStorage.getItem("guess")== 2){
                location.assign("finalScreen.html")
              }
            });
          });
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

