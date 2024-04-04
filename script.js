document.addEventListener("DOMContentLoaded", function (arg) {
    fetch('src/data.json').then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        const profile = document.querySelector(`#profile`);
        profile.appendChild(loadProfile(data.profile));
        const projects = document.querySelector(`#projects`);
        data.projects.forEach(projectData => {
            const projectElement = createProjectElement(projectData);
            projects.appendChild(projectElement);
        });

        const clickers = document.querySelectorAll(`.click`);

        clickers.forEach(clicker => {
            clicker.addEventListener('mousedown', (e) => {
                clicker.classList.add('mousedown');
                let title = e.target.childNodes[0].data;
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

    }).catch(error => {
        console.error('There was a problem fetching the data:', error);
    });

});

function showSnackbar(title, duration) {
    const snackbar = document.querySelector(`#snackbar`);
    snackbar.childNodes[2].textContent = title;
    snackbar.style.display = 'flex';

    const close = snackbar.childNodes[1];
    close.addEventListener(`click`, (e) => {
        snackbar.style.display = 'none';
    });

    setTimeout(() => {
        snackbar.style.display = 'none';
    }, duration);


}




function createProjectElement(projectData) {
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project');

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

    if (projectData.hosting_status) {
        const hostingElement = document.createElement('p');
        hostingElement.innerHTML = `<b>Hosting: </b> ${projectData.hosting_status}`;
        projectContainer.appendChild(hostingElement);
    }


    return projectContainer;
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
                socialsContainer.appendChild(linkElement);
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


