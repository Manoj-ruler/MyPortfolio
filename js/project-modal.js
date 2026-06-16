// Project details (ensure this is defined globally or accessible)
const projectDetailsOverlayData = {
  'Web Development': [
    {
      banner: 'images/igna.png',
      title: 'INDO-GERMAN NACHKONTAKT ASSOCIATION (IGNA)',
      category: 'Web Development',
      client: 'IGNA',
      live: 'https://www.ignahyd.in/',
      carousel: ['images/image.png', 'images/image1.png', 'images/image2.png', 'images/image3.png'],
      description: `<p>Enhanced the official website by implementing event updates, refining UI/UX, improving responsiveness, and developing admin panels for streamlined content management.</p>`,
      techStacks: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'PHP']
    },
    {
      banner: 'images/srkr.png',
      title: 'SAANA – SRKREC Alumni Association of North America',
      category: 'Web Development',
      client: 'SAANA',
      live: 'https://www.thesaana.org/',
      carousel: ['images/srkr1.png', 'images/srkr2.png', 'images/srkr3.jpg', 'images/srkr4.jpg'],
      description: `<p>Enhanced the official website by building admin panels, improving alumni data management and announcements workflows, and refining UI/UX for a better user experience.</p>`,
      techStacks: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'PHP']
    },
    {
      banner: 'images/jaithra_banner.png',
      title: 'JAITRA 2026 – AP\'s Premier Engineering Sports Carnival Website',
      category: 'Web Development',
      client: 'SRKR Engineering College',
      live: 'https://jaithra2026.in/',
      carousel: ['images/jaithra_banner.png', 'images/srkr1.png', 'images/srkr2.png'],
      description: `<p>Designed and developed the official sports carnival website for JAITRA 2026 at SRKR Engineering College, attracting <b>6,190+ visitors</b> during the event. Features a real-time live scoreboard ticker and sport-wise scoreboards for Volleyball (18 matches), Kabaddi (22 matches), Badminton (33 matches), and Pickleball (28 matches). Includes a secure admin dashboard built to update scores and publish live match statistics instantly.</p>`,
      techStacks: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Bootstrap', 'MySQL']
    }
  ],
  'Personal Projects': [
    {
      banner: 'images/termassist-banner.png',
      title: 'TermAssist – Privacy-First Terminal Assistant',
      category: 'Personal Projects',
      client: 'Personal',
      live: 'https://termassist.vercel.app/',
      carousel: ['images/term1.png','images/term2.png','images/term3.png'],
      description: `<p>Built a privacy-first terminal assistant that converts natural language queries into executable bash commands using the BM25 retrieval algorithm.</p>
<p>Developed a full-stack ecosystem consisting of a CLI application and a web dashboard with authentication, analytics, query history, and custom snippet management.</p>
<p>Implemented secure dashboard-to-CLI synchronization using Supabase and token-based authentication.</p>
<p>Engineered an offline-first architecture capable of sub-50 ms local command retrieval while preserving user privacy.</p>`,
      techStacks: ['Next.js', 'TypeScript', 'Node.js', 'Supabase', 'PostgreSQL', 'BM25']
    },
    {
      banner: 'images/study-banner.png',
      title: 'StudySensei – AI-Powered Learning Platform',
      category: 'Personal Projects',
      client: 'Personal',
      live: 'https://github.com/Manoj-ruler/study_sensei',
      carousel: ['images/study1.png','images/study2.png','images/study3.png','images/study4.png'],
      description: `<p>Built an AI-powered learning platform featuring AI mentorship, coding challenges, quizzes, personalized roadmaps, and document-based learning.</p>
<p>Implemented a RAG system using LangChain and PostgreSQL (pgvector) for semantic document retrieval and context-aware responses.</p>
<p>Developed a coding evaluation system with configurable sandbox integration support.</p>`,
      techStacks: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'pgvector', 'LangChain', 'Google Gemini']
    },
    {
      banner: 'images/run.jpeg',
      title: 'Temple Run Game with Automations',
      category: 'Personal Projects',
      client: 'Personal',
      live: 'https://github.com/Manoj-ruler/temple-run',
      carousel: ['images/run1.jpeg', 'images/run2.png', 'images/run3.png', ],
      description: `<p>Developed an automated version of the Temple Run game using Python and computer vision, controlled by body gestures.
Implemented gesture detection to perform actions like jumping, ducking, and moving left or right using a webcam feed.
The project aimed to create an interactive, hands-free gaming experience by combining real-time video processing with game control logic.</p>`,
      techStacks: ['Python', 'OpenCV']
    }
  ]
};


let currentCategory = null;
let currentProjectIdx = 0;

// Function to create overlay DOM elements if they don't exist
function ensureOverlayDOM() {
    if (!document.getElementById('projectDetailsOverlay')) {
        const overlayDiv = document.createElement('div');
        overlayDiv.id = 'projectDetailsOverlay';
        // Initial style is display: none (handled by CSS or directly)
        overlayDiv.style.display = 'none'; // Explicitly hide initially

        overlayDiv.innerHTML = `
            <div id="projectDetailsModal">
                <span id="projectDetailsCloseBtn">×</span>
                <div id="projectDetailsContent">
                    <!-- Main project content injected here -->
                </div>
                <div id="projectListSidebar">
                    <div> <!-- Inner div for padding -->
                        <h3 id="projectListSidebarTitle">Projects</h3>
                        <ul id="categoryProjectList"></ul>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlayDiv);

        document.getElementById('projectDetailsOverlay').addEventListener('click', function(e) {
            if (e.target === this) closeProjectDetailsOverlay();
        });
        document.getElementById('projectDetailsCloseBtn').addEventListener('click', closeProjectDetailsOverlay);
    }

    if (!document.getElementById('zoomImageOverlay')) {
        const zoomDiv = document.createElement('div');
        zoomDiv.id = 'zoomImageOverlay';
        zoomDiv.style.display = 'none';
        zoomDiv.innerHTML = `<span id='zoomCloseBtnZoom'>×</span><img id='zoomedImg' src=''>`;
        document.body.appendChild(zoomDiv);
        document.getElementById('zoomCloseBtnZoom').onclick = function() { zoomDiv.style.display = 'none'; };
        zoomDiv.onclick = function(e) { if (e.target === zoomDiv) zoomDiv.style.display = 'none'; };
    }
}
// Call it once on script load
ensureOverlayDOM();


function zoomProjectImage(imgSrc) {
    const zoomDiv = document.getElementById('zoomImageOverlay');
    document.getElementById('zoomedImg').src = imgSrc;
    zoomDiv.style.display = 'flex'; // Use flex for centering
}

function renderImagesRow(images) {
    if (!images || images.length === 0) return '';
    return `
        <h3 class='section-title'>Gallery</h3>
        <div class='gallery-container'>
            ${images.map(img => `<img src='${img}' class='gallery-image' alt="Project image" onclick='zoomProjectImage("${img}")'>`).join('')}
        </div>
    `;
}

function renderTechStacks(techStacks) {
    if (!techStacks || techStacks.length === 0) return '';
    return `
        <h3 class='section-title'>Used</h3>
        <div class='tech-stacks-container'>
            ${techStacks.map(tech => `<span class='tech-stack-item'>${tech}</span>`).join('')}
        </div>
    `;
}

function renderDigitalMarketing(project) {
    const liveBtn = project.live ? `<a href='${project.live}' target='_blank' class='live-preview-button'>View Our Website</a>` : '';
    return `
        ${project.banner ? `<img src='${project.banner}' class='project-banner-image' alt='${project.title} banner'>` : ''}
        <div class='content-padding ${!project.banner ? 'content-padding-no-banner' : ''}'>
            <div style='display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:15px; margin-bottom:12px;'>
                <h2 class='project-title'>${project.title}</h2>
                ${liveBtn}
            </div>
            <div class='info-row'>
                <div><b>Company:</b><br><span class="info-value">${project.client}</span></div>
            </div>
            <h3 class='section-title'>Clients I Brought In</h3>
            <div class='dm-clients-container'>
                ${project.clients.map(client => `<span class='dm-client-tag'>${client}</span>`).join('')}
            </div>
            <h3 class='section-title'>My Role & Impact</h3>
            <div class='role-impact-text'>${project.description}</div>
        </div>
    `;
}

function renderProjectListSidebar(category, activeIdx) {
    const projectsInCategory = projectDetailsOverlayData[category];
    const sidebarEl = document.getElementById('projectListSidebar');
    const listContainerEl = document.getElementById('categoryProjectList');
    const sidebarTitleEl = document.getElementById('projectListSidebarTitle');

    // Determine if sidebar should be visible based on CSS media queries for stacking
    // For simplicity, we'll always try to show it if there's more than one project,
    // CSS will handle its layout (side or stacked).
    const shouldShowSidebar = projectsInCategory && projectsInCategory.length > 1 && category !== 'Digital Marketing';

    if (!shouldShowSidebar) {
        sidebarEl.style.transform = window.innerWidth <= 992 ? 'translateY(100%)' : 'translateX(100%)'; // Hide based on orientation
        sidebarEl.style.opacity = '0';
        sidebarEl.style.width = window.innerWidth <= 992 ? '100%' : '0'; // Collapse width if not stacked
        sidebarEl.style.minWidth = window.innerWidth <= 992 ? '100%' : '0';
        if (listContainerEl) listContainerEl.innerHTML = '';
        return;
    }

    // Restore default/active sidebar styles
    sidebarEl.style.width = ''; // Let CSS handle width
    sidebarEl.style.minWidth = '';


    if(sidebarTitleEl) sidebarTitleEl.textContent = `${category} Projects`;

    listContainerEl.innerHTML = projectsInCategory.map((proj, index) => {
        const isActive = index === activeIdx;
        return `
            <li
                onclick="openProjectDetailsOverlay('${category}', ${index})"
                style="
                    background-color: ${isActive ? '#1A1A1A' : 'transparent'};
                    color: ${isActive ? '#FFFFFF' : '#333333'};
                    border-color: ${isActive ? '#000000' : 'transparent'};
                    font-weight: ${isActive ? '600' : '500'};
                "
                onmouseover="
                    this.style.backgroundColor='${isActive ? '#000000' : '#DCD0C0'}';
                    this.style.color='${isActive ? '#FFFFFF' : '#1A1A1A'}';
                    this.style.transform='translateX(3px)';
                "
                onmouseout="
                    this.style.backgroundColor='${isActive ? '#1A1A1A' : 'transparent'}';
                    this.style.color='${isActive ? '#FFFFFF' : '#333333'}';
                    this.style.transform='translateX(0)';
                "
            >
                ${proj.title}
            </li>`;
    }).join('');

    // Animate sidebar in
    requestAnimationFrame(() => {
        // Check screen width to decide animation direction
        if (window.innerWidth <= 992) { // Matches @media (max-width: 992px)
            sidebarEl.style.transform = 'translateY(0)';
        } else {
            sidebarEl.style.transform = 'translateX(0)';
        }
        sidebarEl.style.opacity = '1';
        sidebarEl.classList.add('sidebar-visible'); // For CSS dependent transitions if needed
    });
}

function openProjectDetailsOverlay(category, idx = 0) {
    const projects = projectDetailsOverlayData[category];
    if (!projects || !projects[idx]) {
        console.error("Project data not found for category:", category, "index:", idx);
        return;
    }
    const data = projects[idx];
    currentCategory = category;
    currentProjectIdx = idx;

    const overlayEl = document.getElementById('projectDetailsOverlay');
    const projectDetailsContentEl = document.getElementById('projectDetailsContent');
    const projectListSidebarEl = document.getElementById('projectListSidebar');

    // Reset sidebar state before opening
    projectListSidebarEl.classList.remove('sidebar-visible');
    if (window.innerWidth <= 992) {
        projectListSidebarEl.style.transform = 'translateY(100%)';
    } else {
        projectListSidebarEl.style.transform = 'translateX(100%)';
    }
    projectListSidebarEl.style.opacity = '0';


    if (category === 'Digital Marketing') {
        projectDetailsContentEl.innerHTML = renderDigitalMarketing(data);
    } else {
        let imagesRowHtml = renderImagesRow(data.carousel);
        let techStacksHtml = renderTechStacks(data.techStacks);
        let liveBtnText = data.live && data.live.includes('github.com') ? 'View on GitHub' : 'Live Preview';
        let liveBtnClasses = 'live-preview-button' + (data.live && data.live.includes('github.com') ? ' github-button' : '');
        let liveBtn = data.live ? `<a href='${data.live}' target='_blank' class='${liveBtnClasses}'>${liveBtnText}</a>` : '';

        let infoRow = `
            <div class='info-row'>
                <div><b>Category:</b><br><span class="info-value">${data.category}</span></div>
                <div><b>Client:</b><br><span class="info-value">${data.client}</span></div>
                ${data.date ? `<div><b>Date:</b><br><span class="info-value">${data.date}</span></div>` : ''}
                ${data.developer ? `<div><b>Developer:</b><br><span class="info-value">${data.developer}</span></div>` : ''}
            </div>
        `;

        projectDetailsContentEl.innerHTML = `
            ${data.banner ? `<img src='${data.banner}' class='project-banner-image' alt='${data.title} banner'>` : ''}
            <div class='content-padding ${!data.banner ? 'content-padding-no-banner' : ''}'>
                <div style='display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:15px; margin-bottom:10px;'>
                    <h2 class='project-title'>${data.title}</h2>
                    ${liveBtn}
                </div>
                ${infoRow}
                <h3 class='section-title'>Project Description</h3>
                <div class='description-text'>${data.description}</div>
                ${techStacksHtml}
                ${imagesRowHtml}
            </div>
        `;
    }
    
    renderProjectListSidebar(category, idx); // Call this after content is set

    overlayEl.style.display = 'flex';
    document.body.classList.add('project-overlay-active');
    projectDetailsContentEl.scrollTop = 0; // Scroll content to top
}

function closeProjectDetailsOverlay() {
    const overlay = document.getElementById('projectDetailsOverlay');
    overlay.style.display = 'none';
    document.body.classList.remove('project-overlay-active');

    const sidebarEl = document.getElementById('projectListSidebar');
    if (sidebarEl) {
        sidebarEl.classList.remove('sidebar-visible');
        if (window.innerWidth <= 992) {
            sidebarEl.style.transform = 'translateY(100%)';
        } else {
            sidebarEl.style.transform = 'translateX(100%)';
        }
        sidebarEl.style.opacity = '0';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    ensureOverlayDOM(); // Make sure DOM is ready before attaching listeners

    const cardTitles = document.querySelectorAll('.horizontal-scroller-image ~ .p-absolute h4');
    cardTitles.forEach(function(titleElement) {
        const categoryNameFromCard = titleElement.textContent.trim();
        let cardElement = titleElement.closest('a, .project-card, article, .card'); // More robust card selection
        if (!cardElement && titleElement.parentElement && titleElement.parentElement.parentElement && titleElement.parentElement.parentElement.parentElement && titleElement.parentElement.parentElement.parentElement.parentElement) {
            cardElement = titleElement.parentElement.parentElement.parentElement.parentElement;
        }


        if (cardElement) {
            cardElement.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                let targetCategory = categoryNameFromCard;
                // Attempt to match category more robustly if direct match fails
                if (!projectDetailsOverlayData[targetCategory]) {
                    const potentialCategories = Object.keys(projectDetailsOverlayData);
                    for (const pCat of potentialCategories) {
                        if (categoryNameFromCard.toLowerCase().includes(pCat.toLowerCase()) || pCat.toLowerCase().includes(categoryNameFromCard.toLowerCase())) {
                            targetCategory = pCat;
                            break;
                        }
                    }
                }



                if (projectDetailsOverlayData[targetCategory]) {
                    // Find the index of the project if the card itself has a title that matches one in the data
                    let projectIndex = 0;
                    const projectCardTitle = cardElement.querySelector('h3, h4, .project-title-on-card'); // Adjust selector for actual title on card
                    if(projectCardTitle) {
                        const titleText = projectCardTitle.textContent.trim();
                        const idx = projectDetailsOverlayData[targetCategory].findIndex(p => p.title.includes(titleText) || titleText.includes(p.title));
                        if(idx !== -1) projectIndex = idx;
                    }
                    openProjectDetailsOverlay(targetCategory, projectIndex);
                } else {
                    console.warn(`No data or specific category mapping found for card title: "${categoryNameFromCard}". Attempted category: "${targetCategory}"`);
                     // Fallback: Try to open the first project of the first category if nothing matches
                    const firstCategory = Object.keys(projectDetailsOverlayData)[0];
                    if (firstCategory) {
                         console.warn(`Falling back to first project in category: ${firstCategory}`);
                         openProjectDetailsOverlay(firstCategory, 0);
                    }
                }
            });
        } else {
            console.warn("Could not find a suitable card element for title:", titleElement.textContent.trim());
        }
    });
});