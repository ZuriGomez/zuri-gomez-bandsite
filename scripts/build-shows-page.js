const shows= [
    {
        date: "Mon Sept 09 2024",
        venue: "Ronald Lane",
        location: "San Francisco, CA"
    },
    {
        date: "Tue Sept 17 2024",
        venue: "Pier 3 East",
        location: "San Francisco, CA"
    },
    {
        date: "Sat Oct 12 2024",
        venue: "View Lounge",
        location: "San Francisco, CA"
    },
    {
        date: "Sat Nov 16 2024",
        venue: "Hyatt Agency",
        location: "San Francisco, CA"
    },
    {
        date: "Friday Nov 29 2024",
        venue: "Moscow Center",
        location: "San Francisco, CA"
    },
    {
        date: "Wed Dec 18 2024",
        venue: "Press Club",
        location: "San Francisco, CA"
    }
]


function uploadShows() {
    const showsList = document.getElementById("shows-list");

    if(window.innerWidth >= 768) {
    const headerRow = document.createElement('div');
    headerRow.classList.add('shows__item', 'shows__item--header');
    
    const headers = ["DATE", "VENUE", "LOCATION", " "];
    headers.forEach(headerText => {
        const header = document.createElement('div');
        header.classList.add('shows__item--label');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    
    showsList.appendChild(headerRow);
}

    shows.forEach(show => {
        const showContainer = document.createElement('div');
        showContainer.classList.add('shows__item');

        const dateLabel = document.createElement('p');
        dateLabel.classList.add('shows__item--label')
        dateLabel.textContent = "DATE";
        
        const dateValue = document.createElement('p');
        dateValue.classList.add('shows__item--value-highlighted')
        dateValue.textContent = show.date;
        
        const venueLabel = document.createElement('p');
        venueLabel.classList.add('shows__item--label')
        venueLabel.textContent = "VENUE";
        
        const venueValue = document.createElement('p');
        venueValue.classList.add('shows__item--value')
        venueValue.textContent = show.venue;
        
        const locationLabel = document.createElement('p');
        locationLabel.classList.add('shows__item--label')
        locationLabel.textContent = "LOCATION";
        
        const locationValue = document.createElement('p');
        locationValue.classList.add('shows__item--value')
        locationValue.textContent = show.location;

        showContainer.appendChild(dateLabel);
        showContainer.appendChild(dateValue);
        showContainer.appendChild(venueLabel);
        showContainer.appendChild(venueValue);
        showContainer.appendChild(locationLabel);
        showContainer.appendChild(locationValue);

        
        const button = document.createElement('button');
        button.textContent = "BUY TICKETS";
        button.classList.add("shows__button");

        showContainer.appendChild(button);

        showsList.appendChild(showContainer);
    });
}

uploadShows();