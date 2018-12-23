const PROJECT_PRINTS = [5, 8];
let projctIdx = 0;

window.onscroll = () => {
  //navbar control
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

  //add animation when visible
  let headers = document.getElementsByClassName("header");
  for(let header of headers){
    if(isVisible(header)) {
      header.classList.add("appear-below");
    }
  }

  let about = document.getElementById("about");
  let skills = document.getElementById("skills");
  let intro = about.getElementsByTagName("p").item(0);
  let card = about.getElementsByClassName("photo-card").item(0);
  if(isVisible(about.getElementsByClassName("header").item(0))){
    skills.classList.add("appear-below");
    card.classList.add("appear-right");
    intro.classList.add("appear-left");
  }

  let projects = document.getElementById("projects");
  let banners = document.getElementById("banners");
  let preview = document.getElementById("preview")
  if(isVisible(projects.getElementsByClassName("header").item(0))){
    banners.classList.add("appear");
    preview.classList.add("appear-left");
  }

  let contacts = document.getElementById("contact");
  let info = contacts.getElementsByClassName("content");
  for(let i of info){
    if(isVisible(contacts.getElementsByClassName("header").item(0))){
      i.classList.add("appear-below");
    }
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



function isVisible(element) {
  let rect = element.getBoundingClientRect();
  let top = rect.top;
  let bottom = rect.bottom;

  return top >= 0 && bottom <= window.innerHeight;
}