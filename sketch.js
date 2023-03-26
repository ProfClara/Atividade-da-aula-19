// Aula de revisão : 💀 O fantasma da torre

var imagemDaTorre, torre;
var imagemDaJanela, janela, grupoJanelas;
var imagemPlataforma, plataforma, grupoPlataformas;
var fantasma, imagemDoFantasma;
var blocosInvisiveisGroup, blocosInvisiveis;

var gameState = "play"

function preload(){
  // 1- Carregue a imagem da Torre
  imagemDaJanela = loadImage("janela.png");
  imagemPlataforma = loadImage("plataforma.png");
  imagemDoFantasma = loadImage("fantasma.png");
  //6-Carregue o som para o jogo
 }

function setup(){
  createCanvas(600,600);
  somBoo.loop();
  //2-Crie o sprite da torre
  //3-Coloque a imagem que você carregou na função preload no sprite
 //4-Coloque a torre para se mover para baixo
  
  grupoJanelas = new Group();
  grupoPlataformas = new Group();
  blocosInvisiveisGroup = new Group();
  
  fantasma = createSprite(200,200,50,50);
  fantasma.scale = 0.3;
  fantasma.addImage("fantasma", imagemDoFantasma);
}

function draw(){
  background(0);
  if (gameState === "play") {
    //7-Faça o som tocar
    if(keyDown("left_arrow")){
      fantasma.x = fantasma.x - 3;
    }
    
    if(keyDown("right_arrow")){
      fantasma.x = fantasma.x + 3;
    }
    
    //9-Faça o fantasma  pular  quando pressionarmos espaço
    
    fantasma.velocityY = fantasma.velocityY + 0.8
    
    //5-Faça a torre se repetir infinitamente no fundo
    spawnjanelas();

    

    if(grupoPlataformas.isTouching(fantasma)){
      fantasma.velocityY = 0;
    }
    if(blocosInvisiveisGroup.isTouching(fantasma) || fantasma.y > 600){
      fantasma.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    //8-Faça o som parar
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,350)
  }

}

function spawnjanelas() {
  //escreva aqui o código para gerar as portas na torre
  if (frameCount % 240 === 0) {
    var janela = createSprite(200, -50);
    var plataforma = createSprite(200,10);
    var blocosInvisiveis = createSprite(200,15);
    blocosInvisiveis.width = plataforma.width;
    blocosInvisiveis.height = 2;
    
    janela.x = Math.round(random(120,400));
    plataforma.x = janela.x;
    blocosInvisiveis.x = janela.x;
    
    janela.addImage(imagemDaJanela);
    plataforma.addImage(imagemPlataforma);
    
    janela.velocityY = 1;
    plataforma.velocityY = 1;
    blocosInvisiveis.velocityY = 1;
    
    fantasma.depth = janela.depth;
    fantasma.depth +=1;
   
    //designe tempo de vida a variável
    janela.lifetime = 800;
    plataforma.lifetime = 800;
    blocosInvisiveis.lifetime = 800;

    
    //adicione cada porta ao grupo
    grupoJanelas.add(janela);
    blocosInvisiveis.debug = true;
    grupoPlataformas.add(plataforma);
    blocosInvisiveisGroup.add(blocosInvisiveis);
  }
}

