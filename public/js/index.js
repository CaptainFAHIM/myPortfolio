const projectLink = document.querySelectorAll(".project-link");
const projectLayer = document.querySelector(".project-layer");
const contactBtn = document.querySelector(".contact-btn");
const skillBtn = document.querySelector(".skill-btn");
const projectBtn = document.querySelector(".project-btn");


//Project Layout
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


// Hiding Showing

const showComponents = (fieldName) => {
    
const component = document.querySelector(`.${fieldName}`);
    if (component.classList.contains('hideme')) {
        component.classList.remove('hideme');
    }
}

const hideComponents = (fieldName) => {
    const component = document.querySelector(`.${fieldName}`);
    if (!component.classList.contains('hideme')) {
        component.classList.add('hideme');
    }
}


// Contact Button
contactBtn.addEventListener("click", () => {
    hideComponents("projects");
    hideComponents("skills");
    showComponents("contact-field");
});


// Skill Button
skillBtn.addEventListener("click", () => {
    hideComponents("projects");
    hideComponents("contact-field");
    showComponents("skills");
});

// Project Button
projectBtn.addEventListener("click", () => {
    hideComponents("contact-field");
    hideComponents("skills");
    showComponents("projects");
});