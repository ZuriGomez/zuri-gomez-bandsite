// Function to register and get the API key
async function register() {
    try {
        const response = await fetch('https://unit-2-project-api-25c1595833b2.herokuapp.com/register');
        const data = await response.json();
        const apiKey = data.api_key;  
        console.log('Registered successfully. Your API key is:', apiKey);

        // const bandSiteApi = new BandSiteApi(apiKey);

        return apiKey

        await Promise.all([
            bandSiteApi.getComments(),
            bandSiteApi.getShows(),
            // bandSiteApi.postComment({ name: 'John Doe', comment: 'This is a new comment!' }),
        ]);
    } catch (error) {
        console.error('Error registering:', error);
        return null;
    }
}

register();

// BandSiteApi class
class BandSiteApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com';
    }

    // Method to post a new comment
    async postComment(comment) {
        if (!this.apiKey) {
            console.error('API key not available.');
            return;
        }
        try {
            const requestBody = {
                name: comment.name,  // Only include the name and comment fields
                comment: comment.comment
            };

            console.log("Posting comment:", requestBody);  // Log the request body to verify it

            const response = await fetch(`${this.baseUrl}/comments?api_key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)  // Send only 'name' and 'comment' properties
            });

            if (response.ok) {
                const newComment = await response.json();
                console.log('New comment added:', newComment);
                return newComment;
            } else {
                const errorText = await response.text();
                console.error(`Failed to post comment. Status: ${response.status}, ${errorText}`);
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    }



    // Method to get all comments
    async getComments() {
        if (!this.apiKey) {
            console.error('API key not available.');
            return;
        }
        try {
            const response = await fetch(`${this.baseUrl}/comments?api_key=${this.apiKey}`);
            const comments = await response.json();

            // Sort comments from newest to oldest
            comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            console.log('Comments (sorted from newest to oldest):', comments);

            return comments;
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }

    // Method to get all show dates
    async getShows() {
        if (!this.apiKey) {
            console.error('API key not available.');
            return [];
        }
        try {
            const response = await fetch(`${this.baseUrl}/showdates?api_key=${this.apiKey}`);
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error fetching shows. Status: ${response.status}, ${errorText}`);
                return [];
            }
            const showDates = await response.json();
            console.log('Show Dates:', showDates);
            return showDates;
        } catch (error) {
            console.error('Error fetching Show Dates:', error);
            return [];
        }
    }
    
}
