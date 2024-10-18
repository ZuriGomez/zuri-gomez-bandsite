let apiKey = null;
let bandSiteApi = null;

async function initializeAPI() {
    apiKey = await register(); // Pull API Key from registration function
    if (apiKey) {
        bandSiteApi = new BandSiteApi(apiKey);
        await uploadShows();
    } else {
        console.error('API key could not be retrieved.');
    }
}

async function uploadShows() {
    const showsList = document.getElementById("shows-list");

    const tableHeaders = document.createElement('div');
    tableHeaders.classList.add('shows-list__header');

        const headerDate = document.createElement('p');
        headerDate.classList.add('shows-list__header-date');
        headerDate.textContent = "DATE";

        const headerVenue = document.createElement('p');
        headerVenue.classList.add('shows-list__header-venue');
        headerVenue.textContent = "VENUE";

        const headerLocation = document.createElement('p');
        headerLocation.classList.add('shows-list__header-location');
        headerLocation.textContent = "LOCATION";

        const headerSpace = document.createElement('p');
        headerSpace.classList.add('shows-list__header-space');
        headerSpace.textContent = "   ";

        tableHeaders.appendChild(headerDate);
        tableHeaders.appendChild(headerVenue);
        tableHeaders.appendChild(headerLocation);
        tableHeaders.appendChild(headerSpace)

    showsList.appendChild(tableHeaders);

    const shows = await bandSiteApi.getShows();
    
    shows.forEach(show => {
        const showContainer = document.createElement('div');
        showContainer.classList.add('shows-list__item');

        const showDate = new Date(show.date);
        const formattedDate = showDate.toLocaleDateString('en-US',{
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        });

            const dateLabel = document.createElement('p');
            dateLabel.classList.add('shows-list__item--label');
            dateLabel.textContent = "DATE";
            const dateValue = document.createElement('p');
            dateValue.classList.add('shows-list__item--value-highlighted');
            dateValue.textContent = formattedDate;
            
            const venueLabel = document.createElement('p');
            venueLabel.classList.add('shows-list__item--label');
            venueLabel.textContent = "VENUE";
            const venueValue = document.createElement('p');
            venueValue.classList.add('shows-list__item--value');
            venueValue.textContent = show.place;
            
            const locationLabel = document.createElement('p');
            locationLabel.classList.add('shows-list__item--label');
            locationLabel.textContent = "LOCATION";
            const locationValue = document.createElement('p');
            locationValue.classList.add('shows-list__item--value');
            locationValue.textContent = show.location;

            showContainer.appendChild(dateLabel);
            showContainer.appendChild(dateValue);
            showContainer.appendChild(venueLabel);
            showContainer.appendChild(venueValue);
            showContainer.appendChild(locationLabel);
            showContainer.appendChild(locationValue);

            const button = document.createElement('button');
            button.textContent = "BUY TICKETS";
            button.classList.add("shows-list__button");

            showContainer.appendChild(button);

        showsList.appendChild(showContainer);
    
    });
}

// uploadShows();

window.onload = () => {
    initializeAPI ();
};