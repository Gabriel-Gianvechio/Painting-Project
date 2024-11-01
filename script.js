
// ----------- INITIAL DATA ----------- 
let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d'); //peguei um contexto em duas dimensões da minha tela e salvei em CTX, par poder passar parametros de desenho nele

// ----------- EVENTS ----------- 
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);


// ----------- FUNCTIONS ----------- 
function colorClickEvent(event){
    let color = event.target.getAttribute('data-color');
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    event.target.classList.add('active');
}

function mouseDownEvent(e){
    // console.log('clicou no mouse'); // teste de funcionamento
    canDraw = true; 
    mouseX = e.pageX - screen.offsetLeft; // pageX é nativo do JS e me dâ a posição HORIZONTAL do mouse(em pixels)
                                          // offsetLeft mê a a distancia do elemento até o fim da pagina a ESQUERDA (no caso, elemento SCREEN que recebe a div #tela) 
    mouseY = e.pageY - screen.offsetTop;  // offsetTop é a mesma coisa, mas me dá a distancia do elemento até o fim da pagina no TOPO
                                          // então pointY e pointX está transformando o inicio da tela de pintura, tanto para cima como para esquerda, como sendo o pixel 0 do meu mouse.
}

function mouseMoveEvent(e){
    // console.log('Moveu o mouse'); // teste de funcionamento
    if(canDraw){
        draw(e.pageX, e.pageY);
    }
}

function mouseUpEvent(){
    // console.log('Soltou o mouse'); // teste de funcionamento
    canDraw = false;
}

function draw(x, y){
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    //comandos nativos JS, estou atribuindo valores ao elemento CTX que criamos
    ctx.beginPath(); //comece a desenhar
    ctx.lineWidth = 5; // largura da linha 5px
    ctx.lineJoin = "round"; //bordas arredondadas, se for só um click, então teremos uma bolinha
    ctx.moveTo(mouseX, mouseY); //alinhei o inicio do desenho com a posição do mouse
    ctx.lineTo(pointX, pointY); //faça uma linha até o pointX e pointY
    ctx.closePath(); //finaliza o desenho
    ctx.strokeStyle = currentColor; //selecionamos a cor da váriavel que criamos anteiormente, currentColor
    ctx.stroke(); // aplica a cor selecionada na linha

    mouseX = pointX; //pega a posição inicial do mouse e vai alternando ela conforme movimentamos o mouse, para fazer do desenho um continuo
    mouseY = pointY; //mesma coisa para vertical
}

function clearScreen(){
    ctx.setTransform(1, 0, 0, 1, 0, 0); //zera o cursor do mouse para nao bugar em futuros desenhos
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height) //limpa toda minha tela de pintura, do inicio ao fim
}