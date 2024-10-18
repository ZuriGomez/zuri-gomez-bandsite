let apiKey = null;
let bandSiteApi = null;

async function initializeAPI() {
    apiKey = await register(); // Pull API Key from registration function
    if (apiKey) {
        bandSiteApi = new BandSiteApi(apiKey);
        await renderCommentCards();
    } else {
        console.error('API key could not be retrieved.');
    }
}

// Initializing form with error handling of API Key.
async function handleFormSubmission(event) {
    event.preventDefault();

    // Ensure bandSiteApi is initialized before submitting
    if (!bandSiteApi) {
        console.error('API not initialized');
        return;
    }

    const newComment = {
        name: event.target.name.value,
        date: getCurrentDate(),
        comment: event.target.comment.value,
    };

    const postedComment = await bandSiteApi.postComment(newComment);

    if (postedComment) {
        await renderCommentCards();
    }

    formEl.reset();
}

function createcommentCard(comment) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add("comments-list__item");
    
    const avatar = document.createElement('img');
    avatar.classList.add('comments-list__item-avatar'); 
    avatar.src = './assets/Images/Mohan-muruge.jpg'; 
    avatar.alt = 'Avatar placeholder';

    const cardContainer2 = document.createElement('div');
    cardContainer2.classList.add("comments-list__item-combox");

    const topContainer = document.createElement('div');
    topContainer.classList.add("comments-list__item-combox__top");
    
    const nameValue = document.createElement('p');
    nameValue.classList.add('comments-list__item-combox__top-name');
    nameValue.innerHTML = comment.name;

    const dateValue = document.createElement('p');
    dateValue.classList.add('comments-list__item-combox__top-date');  
    dateValue.innerHTML = new Date(comment.timestamp).toLocaleDateString();

    topContainer.appendChild(nameValue);
    topContainer.appendChild(dateValue);

    const commentValue = document.createElement('p');
    commentValue.classList.add('comments-list__item-combox__comment');
    commentValue.innerHTML = comment.comment;

    cardContainer2.appendChild(topContainer);
    cardContainer2.appendChild(commentValue); 
        
    cardContainer.appendChild(avatar);
    cardContainer.appendChild(cardContainer2);

    return cardContainer;
}

async function renderCommentCards() {
    if (!bandSiteApi) return;

    const commentsElem = document.getElementById("comments-list");
    commentsElem.innerHTML = "";

    const comments = await bandSiteApi.getComments();

    // Render each comment card
    comments.forEach(comment => {
        const card = createcommentCard(comment);
        commentsElem.appendChild(card);
    });
}

function getCurrentDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2,'0');
    const month = String(now.getMonth() + 1).padStart(2,'0');
    const year = now.getFullYear();
    return `${month}/${day}/${year}`;
}

const formEl = document.querySelector(".comments-box__form");

// Initializing and rendering cards submitted with error handling
initializeAPI().then(() => {
    formEl.addEventListener("submit", handleFormSubmission);
});
