const btnRejouer = document.getElementById('rejouer');
let j1 = 0
let j2 = 0
btnRejouer.addEventListener("click", () =>{
    localStorage.clear()
    localStorage.setItem("pointsJ1",j1)
    location.assign("index.html")
})

function points(essai){
    const reponse = localStorage.getItem("coCouleur")
    const reponseX = parseInt(reponse.split(" ")[0]) 
    const reponseY = parseInt(reponse.split(" ")[1])
    let reponse1X
    let reponse1Y
    let joueur = 0
    if(essai == 1){
        const reponse1 = localStorage.getItem("reponse1 x y")
        reponse1X = parseInt(reponse1.split(" ")[0])
        reponse1Y = parseInt(reponse1.split(" ")[1])
    }else{
        const reponse1 = localStorage.getItem("reponse2 x y")
        reponse1X = parseInt(reponse1.split(" ")[0])
        reponse1Y = parseInt(reponse1.split(" ")[1])
    }
    if (reponseX == reponse1X && reponseY == reponse1Y){
        console.log("3 points")
        joueur = joueur + 3;
    }
    else if( reponseX - 1 <= reponse1X && reponse1X <= reponseX +1 && reponseY - 1 <= reponse1Y && reponse1Y <= reponseY +1 ){
        console.log("2 point" )
        joueur = joueur+ 2
    }else if(reponseX - 2 <= reponse1X && reponse1X <= reponseX +2 && reponseY - 2 <= reponse1Y && reponse1Y <= reponseY +2){
        console.log("1 point")
        joueur = joueur+ 1
    }
    return parseInt(joueur);
}

j1 = j1 + points(1)
j1 = j1 + points(2)
const gain = document.getElementById('gain')
gain.textContent = "Vous avez gagnez: " + j1
if (localStorage.getItem("pointsJ1") != null){
    j1 = j1 + parseInt(localStorage.getItem("pointsJ1"))
}
localStorage.setItem("pointsJ1",j1)
const PointJ1Text =  document.getElementById("pointsJ1");
PointJ1Text.textContent = "points J1: " + localStorage.getItem("pointsJ1")
