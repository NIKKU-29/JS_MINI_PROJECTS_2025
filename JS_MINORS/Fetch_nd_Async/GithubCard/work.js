const username = "NIKKU-29";
const API_URL = `https://api.github.com/users/${username}`;
const EVENTS_API = `https://api.github.com/users/${username}/events`;

async function getRecentEvents() {
    try {
        const res = await fetch(EVENTS_API);
        
        // Check if response is successful
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        
        const events = await res.json();
        
        const pushEvents = events.filter(event => event.type === "PushEvent").slice(0, 5);
        const container = document.createElement("div");
        container.classList.add("events");

        pushEvents.forEach(event => {
            const repo = event.repo.name;
            const message = event.payload.commits[0]?.message || "No message";
            const time = new Date(event.created_at).toLocaleString();

            const item = document.createElement("div");
            item.classList.add("event-item");
            item.innerHTML = `
                <h4>${repo}</h4>
                <p>${message}</p>
                <small>${time}</small>
            `;
            container.appendChild(item);
        });

        document.body.appendChild(container);

    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

async function getUserData() {
    try {
        const res = await fetch(API_URL);
        
        // Check if response is successful
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        
        const data = await res.json();

        // Validate that elements exist before setting properties
        const avatarElement = document.querySelector(".avatar");
        if (avatarElement) avatarElement.src = data.avatar_url;
        
        const usernameElement = document.querySelector(".username");
        if (usernameElement) usernameElement.textContent = data.login;
        
        const followingElement = document.querySelector(".following");
        if (followingElement) followingElement.textContent = `Following: ${data.following}`;
        
        const followersElement = document.querySelector(".followers");
        if (followersElement) followersElement.textContent = `Followers: ${data.followers}`;
        
        const bioElement = document.querySelector(".bio");
        if (bioElement) bioElement.textContent = data.bio || "No bio available.";

    } catch (error) {
        console.error("Failed to fetch user data:", error);
    }
}

// Execute both functions
document.addEventListener("DOMContentLoaded", () => {
    getUserData();
    getRecentEvents();
});