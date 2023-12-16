        let userName;
        let requestUrl = "";
        let data;
        let button = document.querySelector(".btn");
        let main = document.querySelector(".main");
        let input = document.querySelector(".input");
        let reset = document.querySelector(".reset")
        button.addEventListener("click", () => {
            userName = document.querySelector("#input").value.trim();
            requestUrl = `https://api.github.com/users/${userName}`;
            main.style.display = 'flex';
            input.style.display = 'none';
            apiRequest();
        });
//         const reSet = function () {
//     if (data !== undefined) {
//         if(bool>1) return;
//         main.style.display = 'none';
//         input.style.display = 'flex';
//         data = null; // Reset data to null
//     }
// }
        // reset.addEventListener("click",reSet)



        const apiRequest = function () {
            const requestURL = requestUrl;
            const xhr = new XMLHttpRequest();
    
            xhr.open('GET', requestURL);
    
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 404) {
                   // Resource not found, handle 404 error
                    console.error('Resource not found:', xhr.status);
                    updateErrorDOM();
                    } 
                     else if (xhr.status === 200) {
                        // Parse the JSON response
                        data = JSON.parse(xhr.responseText);
                        // updateDOM();
                        if (data !== undefined) {
                        updateDOM();
                        } else {
                        console.error('Data not found');
                        updateErrorDOM(); // Call a function to update the DOM for error case
                }
                    }
                     else {
                        console.error('Request failed with status:', xhr.status);
                        updateErrorDOM();
                    }
                }
            };
    
            // Handle network errors
            xhr.onerror = function () {
                window.alert('Network error occurred');
            };
    
            xhr.send();
        };

         const updateErrorDOM = function () {
         // This function updates the DOM when data is not found or there is an error
         const heading = document.querySelector('.heading');
         heading.innerHTML = `<p>Data not found or an error occurred. check your UserName and try again!</p><h1>:(</h1>`;
        };

        const updateDOM = function () {
            const image = document.querySelector(".image");
            image.innerHTML =
                `
                <div class="card">
                    <img src=${data.avatar_url} alt="user_avatar">
                    <div class="details">
                        <p>Name : ${data.name!=undefined ? data.name : 'Not Found'}</p>
                        <p>Company : ${data.company}</p>
                        <p>Location : ${data.location}</p>
                        <p>Email : ${data.email}</p>
                        <p>Followers : ${data.followers}</p>
                        <p>Following : ${data.following}</p>
                        <p>github_url : <a href=${data.html_url}>ClickHere</a></p>
                    </div>

                </div>
                 
                `;
        };