// V6 engine observer with intersectionObserver
const options = {
    root: null,
    rootMargin: "0px",
    scrollMargin: "0px",
    threshold: 0.7,
};

const callback = (entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const textElements = document.querySelectorAll(".engine-text");
            textElements.forEach(text => {
                text.classList.add("visibleEngineText");
            });
            observer.unobserve(entry.target);
        }
    });
}

const observer = new IntersectionObserver(callback, options);
document.querySelectorAll(".v6Engine").forEach(img => {
    observer.observe(img);
});




function showSidebar(){
    const sideBar = document.querySelector(".sidebar");
    // sideBar.style.display = 'flex';
    sideBar.classList.toggle("active");
}

function hideSidebar(){
    const sideBar = document.querySelector(".sidebar");
    // sideBar.style.display = 'none';
    sideBar.classList.toggle("active");
}


// Particles load - Vincent Garreau
particlesJS.load('particles-js', '/js/particles.json');

let currentSelectedCard;

function projectReveal(className){
    console.log("inside");
    let classNameFormat = "." + className;
    let card = document.querySelector(classNameFormat);
    // currentSelectedCard = classNameFormat;
    card.classList.add("visibleCard");
}

function projectClose(className){
    let classNameFormat = "." + className;
    let card = document.querySelector(classNameFormat);
    card.classList.remove("visibleCard");
}

async function projectGen(){
    const response = await fetch("/js/projects.json");
    const data = await response.json();
    
    const wrapper = document.querySelector(".projects-wrapper");
    const body = document.body;

    wrapper.innerHTML = "";

    data.projects.forEach((project, index) => {
        // console.log(project.project_title);
        const card = document.createElement("div");
        card.classList.add("project");
        card.setAttribute("onclick", `projectReveal('project-${index}')`);

        const cardTitle = document.createElement("h2");
        cardTitle.classList.add("project-title");
        cardTitle.innerText = project.project_title;

        const cardDesc = document.createElement("p");
        cardDesc.classList.add("project-short-desc");
        cardDesc.innerHTML = project.project_short_desc;

        const images = project.images;

        const cardThumbnail = document.createElement("img");
        cardThumbnail.setAttribute("src", images[0].src);
        cardThumbnail.setAttribute("alt", images[0].alt);

        const cardSeeMore = document.createElement("p");
        cardSeeMore.classList.add("project-seemore");
        cardSeeMore.innerText = "Voir plus"

        card.appendChild(cardTitle);
        card.appendChild(cardDesc);
        card.appendChild(cardThumbnail);
        card.appendChild(cardSeeMore);

        wrapper.appendChild(card);


        const openProjectCard = document.createElement("div");
        openProjectCard.classList.add('project-card');
        openProjectCard.classList.add(`project-${index}`);

        const openProjectCardCloseButton = document.createElement("span");
        openProjectCardCloseButton.classList.add("project-close");
        openProjectCardCloseButton.setAttribute("onclick", `projectClose('project-${index}')`);
        openProjectCardCloseButton.innerHTML = "&times;";
        openProjectCard.appendChild(openProjectCardCloseButton);

        const openProjectCardTexts = document.createElement("div");
        openProjectCardTexts.classList.add("project-texts");

        const openProjectCardTitle = document.createElement("h2");
        openProjectCardTitle.classList.add("project-card-title");
        openProjectCardTitle.innerText = project.project_card_title;
        openProjectCardTexts.appendChild(openProjectCardTitle);

        const openProjectCardDesc = document.createElement("p");
        openProjectCardDesc.classList.add("project-desc");
        openProjectCardDesc.innerHTML = project.project_desc;
        openProjectCardTexts.appendChild(openProjectCardDesc);

        const openProjectCardLinks = document.createElement("p");
        const numberLinks = project.links.length;
        let linkString = ""
        project.links.forEach((link, indexY) => {
            linkString += `<a href='${link.href}' target='_blank'>${link.name}</a>`
            if(numberLinks - indexY != 1){
                linkString += ' - ';
            }
        });
        openProjectCardLinks.innerHTML = linkString;  
        openProjectCardTexts.appendChild(openProjectCardLinks);

        openProjectCard.appendChild(openProjectCardTexts);

        const openProjectCardImages = document.createElement("div");

        openProjectCardImages.classList.add("project-images");
        images.forEach((image, index) => {
            if(index != 0){
                const newImage = document.createElement("img");
                newImage.setAttribute("src", image.src);
                newImage.setAttribute("alt", image.alt);
                openProjectCardImages.appendChild(newImage);
            }
        });
        openProjectCard.appendChild(openProjectCardImages);

        body.appendChild(openProjectCard);

        // console.log(openProjectCard);





        // const keys = Object.keys(project.links);
        // const numberLinks = keys.length;

        // let linkString = ""

        // project.links.forEach((link, index) => {
        //     linkString += `<a href='${link}'>${keys[index]}</a>`;
        //     if(numberLinks - index != 1){
        //         linkString += ' - ';
        //     }


            // const newLink = document.createElement("a");
            // newLink.setAttribute("href", link);
            // newLink.innerText(keys[index]);
            // openProjectCardLinks.appendChild(newLink);
            // if(numberLinks - index != 1){
                
            // }
        // });
        // openProjectCardLinks.innerText = linkString;
        // console.log(openProjectCardLinks);

    });
}

