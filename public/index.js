const projectLink = document.querySelectorAll(".project-link");
const projectLayer = document.querySelector(".project-layer");

const show = (index) => {
    const project = document.querySelector(`.project${index}`);
    if (project.classList.contains('hidden-layer')) {
        project.classList.remove('hidden-layer');
    }
}

const hide = (index) => {
    const project = document.querySelector(`.project${index}`);
    if (!project.classList.contains('hidden-layer')) {
        project.classList.add('hidden-layer');
    }
}


for (let i = 0; i < projectLink.length; i++) {
    projectLink[i].addEventListener("mouseover", () => {
        show(i);
    });
}

for (let i = 0; i < projectLink.length; i++) {
    projectLink[i].addEventListener("mouseout", () => {
        hide(i);
    });
}