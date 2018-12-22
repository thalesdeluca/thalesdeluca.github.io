const PROJECT_PRINTS = [5, 8];
let projctIdx = 0;

window.onscroll = () => {
  let windowWidth = window.innerWidth;
  if (windowWidth > 1024) {
    let currentScrollPos = window.pageYOffset;
    
    if (currentScrollPos > 40) {
      document.getElementById("nav").style.top = "0";
    } else {
      document.getElementById("nav").style.top = "-47px";
    }
  } else {
    document.getElementById("nav").style.top = "0px";
    document.getElementById("dropdown").style.display = "none";
  }
}
window.onresize = () => {
  let dropdown = document.getElementById("dropdown");
  if(window.innerWidth > 1024){
    document.getElementById("nav").style.top = "-47px";
    document.getElementById("dropdown").style.display = "block";
  } else {
    document.getElementById("nav").style.top = "0";
    document.getElementById("dropdown").style.display = "none";
  }
}

function toogleMenu() {
  if (window.innerWidth <= 1024) {
    let x = document.getElementById("dropdown");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
}
window.onload = function() {
  let project = document.getElementById("banners");
  let banners = project.getElementsByTagName("img");
  for(let banner of banners){
    banner.onclick = (e) => {
      let index = Array.prototype.indexOf.call(project.children, banner);
      for(let ban of project.children) {
        ban.style.opacity = "0.75";
        ban.style.border = "none";
      }
      banner.style.opacity = "1";
      banner.style.border = "2px solid #4068FF";
      projctIdx = index;
      switchProject(index);
    }
  }
  banners[0].style.opacity = "1";
  banners[0].style.border = "2px solid #4068FF";
  switchProject(0);
}

setInterval(() => {
  let container = document.getElementById("preview");
  if(container.firstChild){
    container.removeChild(container.firstChild);
    if(container.firstChild){
      container.firstChild.classList.add("next");
    } else {
      switchProject(projctIdx);
    }
  }
  
}, 4000);

function switchProject(index) {
  let images = [];
  switch (index) {
    case 0:
      projectCode = "v";
      
      break;
    case 1: {
      projectCode = "ps";
    }
      
  }

  let preview = document.getElementById("preview");
  while(preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  
  for(let count = 0; count < PROJECT_PRINTS[index]; count++){
    let img = new Image();
    img.src = "img/" + projectCode + count + ".png";
    img.classList.add("print");
    images.push(img);
  }
  

  addPrints(preview, images);
}

function addPrints(preview, images) {
  for(let print of images) {
    print.classList.remove("next");
    preview.appendChild(print);
  }
  preview.firstChild.classList.add("next");
}