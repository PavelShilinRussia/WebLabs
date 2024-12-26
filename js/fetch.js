(function () {
    const userListContainer = document.getElementById("user-list");
    const preloader = document.getElementById("preloader");

    function createUserHTML(user) {
        return `
            <li>
                <h3>${user.name}</h3>
                <strong>Username:</strong> ${user.username}
                <strong>Email:</strong> ${user.email}
                <strong>Address:</strong> ${user.address.street}, ${user.address.city}
                <strong>Phone:</strong> ${user.phone}
            </li>
        `;
    }

    async function fetchUsers() {
        try {
            preloader.style.display = "block";
            const response = await fetch("https://jsonplaceholder.typicode.com/users");

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const users = await response.json();
            userListContainer.innerHTML = users.map(createUserHTML).join(""); 
        } catch (error) {
            userListContainer.innerHTML = `<p style="color: red;">Error loading users: ${error.message}</p>`;
        } finally {
            preloader.style.display = "none"; 
        }
    }

    window.addEventListener("load", fetchUsers);
})();
