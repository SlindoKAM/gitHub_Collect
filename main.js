async function fetchProfile() 
{
    const usernameIn = document.getElementById('username').value.trim();
    const errorDiv = document.getElementById('errMsg');
    const profileDiv = document.getElementById('profile');
    const loadingDiv = document.getElementById('loading');

    //Input Validation
    if(!usernameIn)
    {
        errorDiv.textContent = 'Please Enter a gitHub username';
        errorDiv.style.display = 'block';
        profileDiv.style.display = 'none';
        return;
    }

    //Show loading state
    loadingDiv.style.display = 'block';
    errorDiv.style.display = 'none';
    profileDiv.style.display = 'none';

    //Error handling using try-catch block
    try
    {
        //API request to fetch the data from GitHub
        const response = await fetch(`https://api.github.com/users/${usernameIn}`);

        if(!response.ok)
        {
            throw new Error(`HTTP error!! status: ${response.status}`);
        }

        const data = await response.json();

        //Update profile information
        document.getElementById('avatar').src = data.avatar_url;
        document.getElementById('name').textContent = data.name || usernameIn;
        document.getElementById('bio').textContent = data.bio || 'No Bio Available!';
        document.getElementById('location').textContent = data.location || 'Location Not Found!!';
        document.getElementById('followers').textContent = data.followers;
        document.getElementById('following').textContent = data.following;
        document.getElementById('repos').textContent = data.public_repos;

        //Update GitHub profile link(to take you to the desired github page)
        const githubLink = document.getElementById('githubLinked');
        githubLink.href = `https://github.com/${usernameIn}`

        //Show profile container
        profileDiv.style.display = 'block';
        errorDiv.style.display = 'none';
    }catch(error)
    {
        console.error('Error:', error);
        errorDiv.textContent = 'User not found or an Error Occurred.';
        errorDiv.style.display = 'block';
        profileDiv.style.display = 'none';        
    }finally
    {
        loadingDiv.style.display = 'none';
    }
}

//adding event listener for Enter key (When you press the Enter Key an event will occur)
document.getElementById('username').addEventListener('keypress', function(event)
{
    if(event.key === 'Enter')
    {
        fetchProfile();
    }
});