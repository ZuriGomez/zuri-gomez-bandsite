// Global variable to store the API key
let apiKey = '';

// Function to register and get the API key
async function register() {
    try {
        const response = await fetch('https://unit-2-project-api-25c1595833b2.herokuapp.com/register');
        const data = await response.json();
        apiKey = data.api_key;  // Store the key in a global variable
        console.log('Registered successfully. Your API key is:', apiKey);
    
        await getComments();
        await getShowDates();
    
    } catch (error) {
        console.error('Error registering:', error);
    }
}

// Call the register function to get the API key
register();

// Function to get all comments
async function getComments() {
    try {
        const response = await fetch(`https://unit-2-project-api-25c1595833b2.herokuapp.com/comments?api_key=${apiKey}`);
        const comments = await response.json();
        console.log('Comments:', comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}

// Function to get all show dates
async function getShowDates() {
    try {
        const response = await fetch(`https://unit-2-project-api-25c1595833b2.herokuapp.com/showdates?api_key=${apiKey}`);
        const showDates = await response.json();
        console.log('Show Dates:', showDates);
    } catch (error) {
        console.error('Error fetching Show Dates:', error);
    }
}
