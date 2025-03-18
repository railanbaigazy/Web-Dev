async function fetchAllData() {
    const fetchUsers = fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json());
    const fetchPosts = fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json());
    const fetchComments = fetch("https://jsonplaceholder.typicode.com/comments").then(res => res.json());

    try {
        const _ = await Promise.all([fetchUsers, fetchPosts, fetchComments]);
        console.log("✅ All data fetched successfully");
    } catch (error) {
        console.error("❌ One of the requests failed:", error);
    }
}

async function fetchAllWithResults() {
    const fetchUsers = fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json());
    const fetchInvalid = fetch("https://invalid-url.com/data").then(res => res.json());
    const fetchComments = fetch("https://jsonplaceholder.typicode.com/comments").then(res => res.json());

    const results = await Promise.allSettled([fetchUsers, fetchInvalid, fetchComments]);

    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`✅ Request ${index + 1} was successful`);
        } else {
            console.error(`❌ Request ${index + 1} failed:`, result.reason);
        }
    });
}

async function fetchFirstSuccessful() {
    const fetchBackup1 = fetch("https://invalid-api.com").then(res => res.json());
    const fetchBackup2 = fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json());
    const fetchBackup3 = fetch("https://another-invalid-api.com").then(res => res.json());

    try {
        const result = await Promise.any([fetchBackup1, fetchBackup2, fetchBackup3]);
        console.log("✅ First successful request:", result);
    } catch (error) {
        console.error("❌ All requests failed:", error);
    }
}

// fetchAllData();
// fetchAllWithResults();
fetchFirstSuccessful();