const comments = [
    {
        name:"Victor Pinto",
        date: "11/02/2023",
        comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        name:"Christina Cabrera",
        date: "10/28/2023",
        comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        name:"Isaac Tadesse",
        date: "10/20/2023",
        comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
];

function createcommentCard(comment) {
    const commentsList = document.getElementById("comments-list");
    
    comments.forEach(comment => {
    
    const cardContainer = document.createElement('div');
    cardContainer.classList.add("comments-list__item")
    

        // const cardContainer2 = document.createElement('div');
        // cardContainer2.classList.add("comments-list__item-top")

            const topContainer = document.createElement('div');
            topContainer.classList.add("comments-list__item-top")
                
                const nameValue = document.createElement('p');
                nameValue.classList.add('comments-list__item-top--name');
                nameValue.innerHTML = comment.name;

                const dateValue = document.createElement('p');
                dateValue.classList.add('comments-list__item-top--date');  
                dateValue.innerHTML = comment.date;

            topContainer.appendChild(nameValue);
            topContainer.appendChild(dateValue);

            const commentValue = document.createElement('p');
            commentValue.classList.add('comments-list__item-comment')
            commentValue.innerHTML = comment.comment;

            cardContainer.appendChild(topContainer);
            cardContainer.appendChild(commentValue); 

        // const avatarContainer = document.createElement('div');
        // avatarContainer.classList.add('comments__avatar');

        //     const avatar = document.createElement('div');
        //     avatar.classList.add('comments__avatar-img');
            
        //     avatarContainer.appendChild(avatar);
        
    // cardContainer.appendChild(cardContainer2);
    // cardContainer.appendChild(avatarContainer);    
    
    commentsList.appendChild(cardContainer);

    console.log(cardContainer);
    // return cardContainer;
})
}

createcommentCard();

function renderCommentCards() {
    const commentsElem = document.querySelector(".comments-list");
    commentsElem.innerHTML = "";

    for (let i = 0; i < comments.length; i++) {
        const card = createcommentCard(comments[i]);
        commentsElem.appendChild(card);
    }
};

renderCommentCards();

function getCurrentDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2,'0');
    const month = String(now.getMonth()+1).padStart(2,'0');
    const year = now.getFullYear();
    return `${month}/${day}/${year}`;
}

// renderCommentCards();

const formEl = document.querySelector(".comments-form");

formEl.addEventListener("submit", (event) =>{
    event.preventDefault();

    let cardData = {
        name: event.target.name.value,
        date: getCurrentDate(),
        comment: event.target.comment.value,
    };

    comments.push(cardData);

    console.log(comments)

    // createcommentCard(cardData);

    renderCommentCards();

    // formEl.reset();
});

