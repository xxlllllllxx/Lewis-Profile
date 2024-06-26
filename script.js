let is_mobile = false;

document.addEventListener("DOMContentLoaded", function (arg) {
    const close = document.querySelector('#close_snackbar');
    const devicewidth = window.innerWidth;
    // is_mobile = devicewidth <= 500;
    console.log(is_mobile, devicewidth)

    if (is_mobile) {
        const head = document.head;
        const link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = 'style_mobile.css';
        head.appendChild(link);
    } else {
        const head = document.head;
        const link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = 'style.css';
        head.appendChild(link);
    }

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
                statsLink.innerHTML = "<img src='./src/image/right.png' class='shield'/>";
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
    statsContainer.style.height = (is_mobile) ? "auto" : "400px";
    statsContainer.classList.add('stats');
    statsContainer.classList.add('snapper');
    statsContainer.addEventListener('click', (e) => {
        const pad = `&${Math.random(0, 100)}`;
        location.href = `#${statsData.id}`;
        let div = document.querySelector(`#${statsData.id}`);
        div = div.parentNode;
        div = div.childNodes[1];
        let image1 = div.childNodes[0];
        image1 = image1.childNodes[1];
        image1.src = image1.src + pad;
        image2 = div.childNodes[1];
        console.log(image2.src)
        image2.src = image2.src + pad;
    });
    statistics.appendChild(statsContainer);

    const cardholder = document.createElement('div');
    cardholder.classList.add('info-card');
    statsContainer.appendChild(cardholder);

    const card = document.createElement(`div`);
    const title = document.createElement(`h3`);
    title.textContent = statsData.title;
    title.classList.add('click');
    title.style.marginBottom = "20px"
    card.appendChild(title);
    const name = document.createElement(`h5`);
    name.style.marginTop = "0";
    name.textContent = "Name: " + statsData.name;
    card.appendChild(name);
    const start = document.createElement(`h5`);
    start.style.marginTop = "0";
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


    const graphHolder = document.createElement('div');
    graphHolder.classList.add('toprepo-holder');
    const graph = document.createElement(`p`);
    graph.style.fontSize = '0.83em';
    graph.style.fontWeight = "bold";
    graph.textContent = "Graph: ";
    graphHolder.appendChild(graph);
    const imagegraph = document.createElement('img');
    imagegraph.style.width = "auto";
    imagegraph.classList.add('shield');
    imagegraph.src = statsData.graph;
    imagegraph.addEventListener('click', async (e) => {
        const pad = `&${Math.random(0, 100)}`;
        const body = document.querySelector('body');
        const popup = document.createElement('div');
        popup.classList.add("popup_image");
        const popup_img = document.createElement('img');
        popup_img.src = statsData.graph_link + pad;
        const popup_nav = document.createElement('div');
        popup_nav.style.alignSelf = "end";
        popup_nav.style.display = 'flex';
        popup_nav.style.flexDirection = 'row';
        popup_nav.style.alignItems = 'center';
        const popup_title = document.createElement('h3');
        popup_title.style.display = "inline-block";
        popup_title.textContent = "Activity";
        popup_title.style.margin = 0;
        popup_title.style.padding = '0 20px';
        popup_nav.appendChild(popup_title);

        const popup_close = document.createElement('img');
        popup_close.src = './src/image/close.png';
        popup_close.style.width = '32px';
        popup_close.style.marginBottom = "10px";

        popup_nav.appendChild(popup_close);
        popup.appendChild(popup_nav);

        popup.appendChild(popup_img);
        body.appendChild(popup);
        popup.addEventListener('click', (e) => {
            body.removeChild(popup);
        });
        setTimeout(() => {
            // body.removeChild(popup);
        }, 5000);
    });
    graphHolder.appendChild(imagegraph);


    card.appendChild(toprepoHolder);
    card.appendChild(graphHolder);
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
    const top = document.createElement('div');
    top.classList.add('top');
    const project = document.createElement('div');
    project.classList.add('project_scroll');
    top.appendChild(project);

    const projectContainer = document.createElement('div');
    projectContainer.style.position = "relative";
    projectContainer.classList.add('snapper');
    projectContainer.classList.add('project');
    project.appendChild(projectContainer);

    const linker = document.createElement('div');
    linker.id = projectData.id;
    linker.style.position = 'absolute';
    linker.style.top = "-47px";
    linker.style.width = "975px";
    linker.style.marginLeft = "-40px"
    projectContainer.appendChild(linker);
    projectContainer.addEventListener('click', (e) => { location.href = `#${projectData.id}` });

    const titleElement = document.createElement('h3');
    titleElement.innerHTML = `${projectData.title} ${projectData.project ? "<span class='click'>" + projectData.project + "</span>" : ""}`;


    const linkElement = document.createElement('a');
    linkElement.href = projectData.link;
    linkElement.target = '_blank';
    const image = document.createElement('img');
    image.style.marginBottom = "-10px";
    image.style.marginLeft = "10px";
    image.classList.add('shield');
    image.src = projectData.link_badge;
    linkElement.appendChild(image);
    titleElement.appendChild(linkElement);
    projectContainer.appendChild(titleElement);

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
        const navigation = new Navigation(projectData.id, projectData.screenshots.length);
        top.appendChild(navigation.get());
        projectData.screenshots.forEach((data, ind) => {
            const display = document.createElement('div');
            display.style.position = "relative";
            const linker2 = document.createElement('div');
            linker2.id = `${projectData.id}_${ind + 1}`;
            linker2.style.position = 'absolute';
            linker2.style.left = "37px";
            linker2.style.top = "-47px";
            linker2.style.width = "975px";
            linker2.style.height = "1px";
            linker2.style.marginLeft = "-20px"
            display.addEventListener('click', (e) => { location.href = `#${projectData.id}_${ind + 1}` });
            display.appendChild(linker2);

            display.classList.add('snapper');
            display.style.maxWidth = "980px";
            display.style.width = "980px";
            display.style.minWidth = "980px";
            display.style.overflow = "clip";
            display.style.justifyContent = "center";

            if (Array.isArray(data)) {
                const cont = document.createElement('div');
                cont.style.display = 'flex';
                cont.style.gap = '10px';
                cont.style.flexWrap = "wrap";
                cont.style.justifyContent = "center";
                cont.style.alignItems = "center";
                cont.style.height = `100%`;
                // cont.style.
                let height = 0;
                data.forEach((datum, i) => {
                    if (i < 2) {
                        const image = document.createElement("img");
                        image.style.flexShrink = "1";
                        image.alt = datum.name;
                        image.src = datum.link;

                        height += image.height;
                        cont.append(image);

                        const title = document.createElement("h2");
                        title.textContent = data.name;
                    }
                });
                display.appendChild(cont);

            } else {
                const image = document.createElement("img");
                image.style.position = "absolute";
                image.style.top = 0;
                image.style.left = 0;
                image.style.right = 0;
                image.style.bottom = 0;
                image.style.width = "95%";
                image.style.height = "95%";
                image.style.margin = "auto";
                image.style.border = 0;
                image.style.objectFit = 'scale-down';
                image.alt = data.name;
                image.src = data.link;
                display.appendChild(image);

                const title = document.createElement("h3");
                title.textContent = data.name;
                title.classList.add("inner-title");
                title.classList.add("navigator");
                display.appendChild(title);
            }

            project.appendChild(display);
        });

    }


    return top;
}

class Navigation {
    constructor(id, count) {
        this.id = id;
        this.count = count;
        this.navigator = document.createElement('div');
        this.nav = 0;
        this.navigator.classList.add("navigator");
        this.navigator.classList.add("bottomnav");

        this.prev = document.createElement('img');
        this.prev.src = './src/image/left.png';
        this.prev.style.cursor = 'pointer';
        this.prev.addEventListener('click', (e) => {
            this.prevClick();
        });
        this.navigator.appendChild(this.prev);
        this.numText = document.createElement('h3');
        this.numText.textContent = this.nav;
        this.navigator.appendChild(this.numText);
        this.next = document.createElement('img');
        this.next.src = './src/image/right.png';
        this.next.style.cursor = 'pointer';
        this.next.addEventListener('click', (e) => {
            this.nextClick();
        });
        this.navigator.appendChild(this.next);
        this.update();
    }
    get() {
        return this.navigator;
    }

    update() {
        this.numText.textContent = this.nav + 1;
        if (this.nav < 1) {
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

    nextClick() {
        location.href = `#${this.id}_${++this.nav}`;
        this.update();
        return true;
    }
    prevClick() {
        location.href = `#${this.id}${--this.nav > 0 ? "_" + this.nav : ""}`;
        this.update();
        return true;
    }
}

