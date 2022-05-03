let movingState = false 
let tour = "north"
let pionTomove =  {
    pion:undefined,
    pos:undefined,
}
class Plateform {
    constructor(){
        this.container = document.querySelector("#plateforme")
        this.lines = 10
        this.column = 10
    }
    createBox(type,line,i,j){
        let box = document.createElement("div")
        box.classList.add("box")
        box.setAttribute("i",i)
        box.setAttribute("j",j)
        if(type=="active"){
            box.classList.add("active")
        }
        line.appendChild(box)
    }
    build(){
        for(var i=0;i<this.lines;i++){
            let line = document.createElement("div")
            line.classList.add("line")
            for(var j=0;j<this.column;j++){
                 if(i%2==0){
                     let type = ""
                     if(j%2 != 0){
                         type = "active"
                     }
                     this.createBox(type,line,i,j)
                 }else{
                     let type = ""
                     if(j%2 == 0){
                         type = "active"
                     }
                     this.createBox(type,line,i,j)
                 }
            }
            this.container.appendChild(line)
        }
    }
}

class Pion{
    
    static get(i,j){
        let container = document.querySelector("#plateforme")
        container.querySelectorAll("line")[i].querySelectorAll("box.active")[j]
    }
    static set(i,j,type){
        let container = document.querySelector("#plateforme")
        let self = document.createElement("div")
        self.setAttribute("type",type)
        self.classList.add("pion")
        self.classList.add(type)
        container.querySelectorAll(".line")[i].querySelectorAll(".box.active")[j].appendChild(self)
    }
    static setMove(i,j,type){
        let container = document.querySelector("#plateforme")
        let self = document.createElement("div")
        self.setAttribute("type",type)
        self.classList.add("pion")
        self.classList.add(type)
        container.querySelectorAll(".line")[i].querySelectorAll(".box")[j].appendChild(self)
    }
    /**
     * 
     * @param {Plateforme} P 
     */
    static fillNorth(P,lines){
        for(var i=0;i<lines;i++){
            for(var j=0;j<P.column/2;j++){
                Pion.set(i,j,"north")
            }
        }
    }
    static fillSouth(P,lines){
        for(var i=P.lines-lines;i<P.lines;i++){
            for(var j=0;j<P.column/2;j++){
                Pion.set(i,j,"south")
            }
        }
    }
    static voisin(i,j){
        let container = document.querySelectorAll("#plateforme .line")
        let pos = {
            tl :undefined,
            tll :undefined,
            tr:undefined,
            trr:undefined,
            bl:undefined,
            bll:undefined,
            br:undefined,
            brr:undefined
        }
        try{
            let tl = container[i+1].querySelectorAll(".box")[j-1]
            pos.tl = tl
        }catch{
        }
        try{
            let tll = container[i+2].querySelectorAll(".box")[j-2]
            pos.tll = tll
        }catch{
        }
        try{
            let tr = container[i+1].querySelectorAll(".box")[j+1]
            pos.tr = tr
        }catch{
        }
        try{
            let trr = container[i+2].querySelectorAll(".box")[j+2]
            pos.trr = trr
        }catch{
        }
        try{
            let bl = container[i-1].querySelectorAll(".box")[j-1]
            pos.bl = bl
        }catch{
        }
        try{
            let bll = container[i-2].querySelectorAll(".box")[j-2]
            pos.bll = bll
        }catch{
        }
        try{
            let br = container[i-1].querySelectorAll(".box")[j+1]
            pos.br = br
        }catch{
        }
        try{
            let brr = container[i-2].querySelectorAll(".box")[j+2]
            pos.brr =brr
        }catch{
        }
        return pos
    }
    
    static resetMove(){
        let possibles = document.querySelectorAll(".box.possible")
        possibles.forEach((possible)=>{
            possible.classList.remove("possible")
        })
        pionTomove.pos = undefined 
        pionTomove.pion = undefined
        movingState = false 
        if(tour == "north"){
            tour = "south"
        }else{
            tour = "north"
        }
    }
    static moveHandler(){
        let boxs = document.querySelectorAll("#plateforme .box")
        boxs.forEach((box)=>{
            box.addEventListener("click",(e)=>{
                let pion = box.querySelector(".pion")
                let i = parseInt(box.getAttribute("i"))
                let j = parseInt(box.getAttribute("j"))
                let type = pion == null? null:pion.getAttribute("type")
                let voisin = Pion.voisin(i,j)

                if(pion && movingState==false){
                    this.verify(pion,voisin)

                    if(!movingState){
                        if(type=="north" && tour=="north"){
                      
                            if(voisin.tl){
                                if(!voisin.tl.querySelector(".pion")){
                                    voisin.tl.classList.add("possible")
                                    movingState = true 
                                    
                                }
                            }
                            if(voisin.tr){
                                if(!voisin.tr.querySelector(".pion")){
                                    voisin.tr.classList.add("possible")
                                    movingState = true

                                }
                            }
                            if(movingState){
                                pionTomove.pos = voisin
                                pionTomove.pion = pion
                            }
                        }
                        if(type=="south" && tour =="south"){
                            if(voisin.bl){
                                if(!voisin.bl.querySelector(".pion")){
                                    voisin.bl.classList.add("possible")
                                    movingState = true
                                
                                }
                            }
                            if(voisin.br){
                                if(!voisin.br.querySelector(".pion")){
                                    voisin.br.classList.add("possible")
                                    movingState = true 
                                }
                            }
                            if(movingState){
                                pionTomove.pos = voisin
                                pionTomove.pion = pion
                            }
                        }
                    }
                }
                if(movingState==true && pionTomove.pion){
                    try{
                        if(pionTomove.pion.getAttribute("type") == "north"){
                            if(pionTomove.pos.tr==box){
                                pionTomove.pion.remove()
                                Pion.setMove(i,j,"north")
                                Pion.resetMove()
    
                            }
                            
                            if(pionTomove.pos.tl == box){
                                pionTomove.pion.remove()
                                Pion.setMove(i,j,"north")
                                Pion.resetMove()
                            }
                        }
                        if(pionTomove.pion.getAttribute("type")=="south"){
                            if(pionTomove.pos.br==box){
                                pionTomove.pion.remove()
                                Pion.setMove(i,j,"south")
                                Pion.resetMove()
    
                            }
                            
                            if(pionTomove.pos.bl == box){
                                pionTomove.pion.remove()
                                Pion.setMove(i,j,"south")
                                Pion.resetMove()
                            }
                        }
                    }catch(e){
                        
                    }
                }
            })
        })
    }
    static verify(pion,voisin){
        if(pion == null){
            return false
        }
        let type = pion.getAttribute("type")
        let ok = true
        let newvoisin = voisin
        while(ok){
            if(newvoisin.tl != undefined && newvoisin.tll != undefined){
                let boxtl = newvoisin.tl.querySelector(".pion")
                let boxtll = newvoisin.tll.querySelector(".pion")
                if(boxtl != null && boxtll == null){
                    if(boxtl.getAttribute("type") != type){
                        console.log("tl")
                        newvoisin.tl.classList.add("road")
                        newvoisin.tll.classList.add("road") 
                        let i = parseInt(newvoisin.tll.getAttribute("i"))
                        let j = parseInt(newvoisin.tll.getAttribute("j"))
                        newvoisin = Pion.voisin(i,j)
                        console.log(newvoisin)
                        ok = true
                    }
                }
                
            }
            ok = false
        }
        if(voisin.tr != undefined && voisin.trr != undefined){
            let boxtr = voisin.tr.querySelector(".pion")
            let boxtrr = voisin.trr.querySelector(".pion")
            if(boxtr != null && boxtrr == null){
                if(boxtr.getAttribute("type") != type){
                    console.log("tr")
                    voisin.tr.classList.add("road")
                    voisin.trr.classList.add("road")
                }
            }
        }
        if(voisin.bl != undefined && voisin.bll !=undefined){
            let boxbl = voisin.bl.querySelector(".pion")
            let boxbll = voisin.bll.querySelector(".pion")
            if(boxbl != null && boxbll == null){
                if(boxbl.getAttribute("type") != type){
                    console.log("bl")
                    voisin.bl.classList.add("road")
                    voisin.bll.classList.add("road")
                }
            }
        }
        if(voisin.br != undefined && voisin.brr != undefined){
            let boxbr = voisin.br.querySelector(".pion")
            let boxbrr = voisin.brr.querySelector(".pion")
            if(boxbr != null && boxbrr == null){
                if(boxbr.getAttribute("type") != type){
                    console.log("br")
                    voisin.br.classList.add("road")
                    voisin.brr.classList("road")
                }
            }
        }
    }

}
let P = new Plateform()
P.build()
Pion.fillNorth(P,3)
Pion.fillSouth(P,3)
Pion.moveHandler()

