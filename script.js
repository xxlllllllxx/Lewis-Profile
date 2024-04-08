document.addEventListener("DOMContentLoaded", function (arg) {
    const close = document.querySelector('#close_snackbar');
    close.addEventListener(`click`, (e) => {
        snackbar.style.display = 'none';
    });
    fetch('src/data.json').then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        loadInformation(data);
    }).catch(error => {
        console.error('There was a problem fetching the data:', error);
    });
});


function loadInformation(data) {
    const profile = document.querySelector(`#profile`);
    profile.appendChild(loadProfile(data.profile));

    const stats = document.querySelector(`#statsbox`);
    data.statistics.forEach(statsData => {
        const statElement = createStatsElement(statsData);
        stats.appendChild(statElement);
    });


    const projects = document.querySelector(`#projbox`);
    data.projects.forEach(projectData => {
        const projectElement = createProjectElement(projectData);
        projects.appendChild(projectElement);
    });

    const clickers = document.querySelectorAll(`.click`);
    clickers.forEach(clicker => {
        clicker.addEventListener('mousedown', (e) => {
            clicker.classList.add('mousedown');
            let title = e.target.childNodes[0].data;
            navigator.clipboard.writeText(title);
            if (title.length > 30) {
                title = title.substring(0, 27) + '...';
            }
            showSnackbar(`${title} copied!`, 3000);
        });

        clicker.addEventListener('mouseleave', (e) => {
            clicker.classList.remove('mousedown');
        });

        clicker.addEventListener('mouseup', (e) => {
            clicker.classList.remove('mousedown');
        });
    });
}

function showSnackbar(title, duration) {
    const snackbar = document.querySelector(`#snackbar`);
    snackbar.childNodes[2].textContent = title;
    snackbar.style.display = 'flex';

    setTimeout(() => {
        snackbar.style.display = 'none';
    }, duration);


}

function loadProfile(profileData) {
    const profileContainer = document.createElement('div');

    const profileHeading = document.createElement('h2');
    profileHeading.textContent = 'Profile';
    profileContainer.appendChild(profileHeading);

    const profileInfo = document.createElement('div');
    profileInfo.classList.add('profile-info');

    const nameElement = document.createElement('p');
    nameElement.innerHTML = `<b>Name:</b> <span class="click">${profileData.name}</span>`;
    profileInfo.appendChild(nameElement);

    const courseElement = document.createElement('p');
    courseElement.innerHTML = `<b>Course:</b> <span class="click">${profileData.course}</span>`;
    profileInfo.appendChild(courseElement);

    const learnedLanguagesHeading = document.createElement('h3');
    learnedLanguagesHeading.textContent = 'Learned Languages:';
    profileInfo.appendChild(learnedLanguagesHeading);

    const learnedLanguagesList = document.createElement('ul');
    profileData.learned_languages.forEach(language => {
        const languageItem = document.createElement('li');
        languageItem.textContent = language;
        learnedLanguagesList.appendChild(languageItem);
    });
    profileInfo.appendChild(learnedLanguagesList);

    const platformsHeading = document.createElement('h3');
    platformsHeading.textContent = 'Platforms:';
    profileInfo.appendChild(platformsHeading);

    const platformsList = document.createElement('ul');
    profileData.platforms.forEach(platform => {
        const platformItem = document.createElement('li');
        platformItem.textContent = platform;
        platformsList.appendChild(platformItem);
    });
    profileInfo.appendChild(platformsList);

    const socialsHeading = document.createElement('h3');
    socialsHeading.textContent = 'Socials:';
    profileInfo.appendChild(socialsHeading);

    const socialsContainer = document.createElement('div');
    socialsContainer.classList.add('socials');

    for (const platform in profileData.socials) {
        if (Array.isArray(profileData.socials[platform])) {
            profileData.socials[platform].forEach(profile => {
                const linkElement = document.createElement('a');
                linkElement.href = profile.link;
                linkElement.target = '_blank';
                const image = document.createElement('img');
                image.classList.add('shield');
                image.src = profile.badge;
                linkElement.appendChild(image);
                socialsContainer.appendChild(document.createElement('br'));
                const statsLink = document.createElement('a');
                statsLink.href = `#${profile.stats}`;
                statsLink.textContent = profile.stats;

                socialsContainer.appendChild(linkElement);
                socialsContainer.appendChild(statsLink);
            });
        } else {
            const linkElement = document.createElement('a');
            linkElement.href = profileData.socials[platform].link;
            linkElement.target = '_blank';
            const image = document.createElement('img');
            image.classList.add('shield');
            image.src = profileData.socials[platform].badge;
            linkElement.appendChild(image);
            socialsContainer.appendChild(linkElement);
        }
    }

    profileInfo.appendChild(socialsContainer);
    profileContainer.appendChild(profileInfo);

    return profileContainer;
}

function createStatsElement(statsData) {
    const statistics = document.createElement('div');

    const linker = document.createElement('div');
    linker.id = statsData.id;
    linker.style.top = "-69px";
    linker.style.position = "absolute";
    linker.style.width = "950px";
    linker.style.height = "1px";
    linker.style.backgroundColor = "red";
    linker.style.marginLeft = "20px"
    statistics.appendChild(linker);

    const statsContainer = document.createElement('div');
    statsContainer.style.width = "890px";
    statsContainer.style.marginLeft = "10px";
    statsContainer.style.marginRight = "10px";
    statsContainer.style.height = "400px";
    statsContainer.classList.add('stats');
    statsContainer.classList.add('snapper');
    statsContainer.addEventListener('click', (e) => { location.href = `#${statsData.id}` });
    statistics.appendChild(statsContainer);

    const cardholder = document.createElement('div');
    cardholder.classList.add('info-card');
    statsContainer.appendChild(cardholder);

    const card = document.createElement(`div`);
    const title = document.createElement(`h3`);
    title.textContent = statsData.title;
    title.classList.add('click');
    title.style.marginBottom = "50px"
    card.appendChild(title);
    const name = document.createElement(`h5`);
    name.textContent = "Name: " + statsData.name;
    card.appendChild(name);
    const start = document.createElement(`h5`);
    start.textContent = "Start Date: " + statsData.start;
    card.appendChild(start);
    const toprepoHolder = document.createElement('div');
    toprepoHolder.classList.add('toprepo-holder');
    const toprepo = document.createElement(`p`);
    toprepo.style.fontSize = '0.83em';
    toprepo.style.fontWeight = "bold";
    toprepo.textContent = "Top Repository: ";
    toprepoHolder.appendChild(toprepo);
    const a = document.createElement('a');
    a.target = '_blank';
    a.href = statsData.toprepo_link;
    const image = document.createElement('img');
    image.style.width = "auto";
    image.classList.add('shield');
    image.src = statsData.toprepo;
    a.appendChild(image);
    toprepoHolder.appendChild(a);
    card.appendChild(toprepoHolder);
    cardholder.appendChild(card);

    const stat = document.createElement('img');
    stat.src = statsData.stats;
    stat.style.width = '100%';
    cardholder.appendChild(stat);

    const toplang = document.createElement('img');
    toplang.src = statsData.toplang;
    statsContainer.appendChild(toplang);



    return statistics;
}

function createProjectElement(projectData) {
    const project = document.createElement('div');
    project.classList.add('project_scroll');

    const projectContainer = document.createElement('div');
    projectContainer.classList.add('snapper');
    projectContainer.classList.add('project');
    projectContainer.id = projectData.id + "_0";
    project.appendChild(projectContainer);

    const linker = document.createElement('div');
    linker.id = projectData.id;
    linker.style.position = 'absolute';
    linker.style.top = "-37px";
    projectContainer.appendChild(linker);
    projectContainer.addEventListener('click', (e) => { location.href = `#${projectData.id}` });

    const titleElement = document.createElement('h3');
    titleElement.innerHTML = `${projectData.title} ${projectData.project ? "<span class='click'>" + projectData.project + "</span>" : ""}`;
    projectContainer.appendChild(titleElement);



    projectContainer.appendChild(titleElement);

    const linkElement = document.createElement('a');
    linkElement.href = projectData.link;
    linkElement.target = '_blank';
    const image = document.createElement('img');
    image.classList.add('shield');
    image.src = projectData.link_badge;
    linkElement.appendChild(image);
    projectContainer.appendChild(linkElement);

    const roleElement = document.createElement('p');
    roleElement.innerHTML = `<b>Role: </b>${projectData.role}`;
    projectContainer.appendChild(roleElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.innerHTML = `<b>Description: </b>${projectData.description}`;
    projectContainer.appendChild(descriptionElement);

    if (projectData.features && projectData.features.length > 0) {
        const featuresElement = document.createElement('ul');
        projectData.features.forEach(feature => {
            const featureItem = document.createElement('li');
            featureItem.textContent = feature;
            featuresElement.appendChild(featureItem);
        });
        const featuresContainer = document.createElement('div');
        featuresContainer.innerHTML = `<b>Features: </b>`;
        featuresContainer.appendChild(featuresElement);
        projectContainer.appendChild(featuresContainer);
    }

    if (projectData.games && projectData.games.length > 0) {
        const gamesContainer = document.createElement('div');
        gamesContainer.innerHTML = '<b>Games:</b>';
        const gamesList = document.createElement('ul');
        projectData.games.forEach(game => {
            const gameItem = document.createElement('div');
            gameItem.innerHTML = `<b>${game.title} : </b>`;
            const featuresList = document.createElement('ul');
            game.features.forEach(feature => {
                const featureItem = document.createElement('li');
                featureItem.textContent = feature;
                featuresList.appendChild(featureItem);
            });
            gameItem.appendChild(featuresList);
            gamesList.appendChild(gameItem);
        });
        gamesContainer.appendChild(gamesList);
        projectContainer.appendChild(gamesContainer);
    }

    if (projectData.sample && projectData.sample.length > 0) {
        const sampleContainer = document.createElement('div');
        sampleContainer.innerHTML = `<b>Sample: </b>`;
        const sampleList = document.createElement('ul');
        projectData.sample.forEach(sample => {
            const sampleItem = document.createElement('li');
            const sampleLink = document.createElement('a');
            sampleLink.href = sample.link;
            const image = document.createElement('img');
            image.classList.add('shield');
            image.src = sample.badge;
            sampleLink.appendChild(image);
            sampleItem.appendChild(sampleLink);
            sampleList.appendChild(sampleItem);
        });
        sampleContainer.appendChild(sampleList);
        projectContainer.appendChild(sampleContainer);
    }

    const techHardwareContainer = document.createElement('div');
    techHardwareContainer.classList.add('tech-hardware-container');
    projectContainer.appendChild(techHardwareContainer);

    if (projectData.technologies_used && projectData.technologies_used.length > 0) {
        const technologiesUsedElement = document.createElement('ul');
        projectData.technologies_used.forEach(tech => {
            const techItem = document.createElement('li');
            const image = document.createElement('img');
            image.classList.add('shield');
            image.src = tech.badge;
            techItem.appendChild(image);
            technologiesUsedElement.appendChild(techItem);
        });
        const technologiesUsedContainer = document.createElement('div');
        technologiesUsedContainer.innerHTML = `<b>Technologies Used: </b>`;
        technologiesUsedContainer.appendChild(technologiesUsedElement);
        techHardwareContainer.appendChild(technologiesUsedContainer);
    }

    if (projectData.hardware_integration && projectData.hardware_integration.length > 0) {
        const hardwareContainer = document.createElement('div');
        hardwareContainer.innerHTML = '<b>Hardware Integration:</b>';
        const hardwareList = document.createElement('ul');
        projectData.hardware_integration.forEach(hardware => {
            const hardwareItem = document.createElement('li');
            const image = document.createElement('img');
            image.classList.add('shield');
            image.src = hardware.badge;
            hardwareItem.appendChild(image);
            hardwareList.appendChild(hardwareItem);
        });
        hardwareContainer.appendChild(hardwareList);
        techHardwareContainer.appendChild(hardwareContainer);
    }

    if (projectData.highlights) {
        const highlighContainer = document.createElement('div');
        highlighContainer.innerHTML = `<b>Highlights: </b>`;
        const highlighList = document.createElement('ul');
        projectData.highlights.forEach(text => {
            const highlightItem = document.createElement('li');
            highlightItem.textContent = text;
            highlighList.appendChild(highlightItem);
        });
        highlighContainer.appendChild(highlighList);
        projectContainer.appendChild(highlighContainer);
    }

    if (projectData.screenshots && (projectData.screenshots.length > 0)) {
        project.classList.add('nav');
        project.classList.add('scroll');
        const navigation = new Navigation(`#${projectData.id}_`, projectData.screenshots.length);
        project.appendChild(navigation.get());
        projectData.screenshots.forEach((data, ind) => {
            const display = document.createElement('div');
            display.id = projectData.id + "_" + ind + 1;
            display.classList.add('snapper');
            display.style.maxWidth = "980px";
            display.style.minWidth = "980px";
            display.style.justifyContent = "center";
            if (Array.isArray(data)) {
                console.log("ARRAY: " + data);
            } else {
                console.log("MAP" + data);
                const image = document.createElement("img");
                image.style.height = "100%";
                image.alt = data.name;
                image.src = data.link;
                display.appendChild(image);
            }

            project.appendChild(display);
        });

    }


    return project;
}

class Navigation {
    constructor(id, count) {
        this.id = id;
        this.count = count;
        this.navigator = document.createElement('div');
        this.nav = 1;
        this.navigator.classList.add("navigator");
        this.prev = document.createElement('img');
        this.prev.src = './src/image/left.png';
        this.prev.style.cursor = 'pointer';
        this.prev.addEventListener('click', (e) => {
            prev();
        });
        this.navigator.appendChild(this.prev);
        const num = document.createElement('h3');
        num.textContent = this.nav;
        this.navigator.appendChild(num);
        this.next = document.createElement('img');
        this.next.src = './src/image/right.png';
        this.next.style.cursor = 'pointer';
        this.next.addEventListener('click', (e) => {
            next();
        });
        this.navigator.appendChild(this.next);
        console.log(this.navigator);
        this.update();
    }
    get() {
        return this.navigator;
    }

    update() {
        if (this.nav <= 1) {
            this.prev.style.visibility = "hidden";
        } else {
            this.prev.style.visibility = "visible";
        }
        if (this.nav >= this.count) {
            this.next.style.visibility = "hidden";
        } else {
            this.next.style.visibility = "visible";
        }
    }

    // next(e) {
    //     return true;
    // }
    // prev(e) {
    //     return true;
    // }
}

