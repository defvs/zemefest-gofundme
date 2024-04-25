async function getLastN(campaignName, limit, type) {
    // Construct the URL with query parameters
    const url = new URL('https://zemefest.volumetrique.live/gofundme.php');
    url.searchParams.append('campaign_name', campaignName);
    url.searchParams.append('limit', limit);
    url.searchParams.append('type', type);

    try {
        // Fetch the data from the endpoint
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Return the data for further processing
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Return null in case of an error
    }
}

function displayComments(comments) {
    const listGroup = document.querySelector('.list-group');
    listGroup.innerHTML = '';

    comments.forEach(commentData => {
        const name = commentData.donation.is_anonymous ? 'Anonymous' : commentData.donation.name;
        const donationAmount = commentData.donation.amount;
        const comment = commentData.comment.comment;

        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');

        listItem.innerHTML = `
      <strong class="comment-name-tag">Name:</strong> <span class="comment-name">${name}</span><br>
      <strong class="comment-amount-tag">Donation Amount:</strong> <span class="comment-amount">$${donationAmount}</span><br>
      <strong class="comment-comment-tag">Comment:</strong> <span class="comment-comment"></span>${comment}
    `;

        listGroup.appendChild(listItem);
    });
}


function displayDonations(donations) {
    const listGroup = document.querySelector('.list-group');
    listGroup.innerHTML = '';

    donations.forEach(commentData => {
        const name = commentData.name;
        const donationAmount = commentData.amount;

        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');

        listItem.innerHTML = `
      <strong class="donation-name-tag">Name:</strong> <span class="donation-name">${name}</span><br>
      <strong class="donation-amount-tag">Donation Amount:</strong> <span class="donation-amount">$${donationAmount}</span>
    `;

        listGroup.appendChild(listItem);
    });
}
