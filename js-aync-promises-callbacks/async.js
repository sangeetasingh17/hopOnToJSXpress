const posts = [
    {
        title: "post one",
        body: "this is the first post"
    },
    {
        title: "post 2",
        body: "this is the second post"
    }
];

function getPosts() {
    setTimeout(() => {
        let output = "";
        posts.forEach((post, index) => {
            output += `<li>${post.title} : ${post.body}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);

            const error = false;
            if (!error)
            {
                resolve();
            }
            else
            {
                reject("Error: something went wrong");
            }

        }, 2000);
    });

}

// aynsc / await
async function init() {
    await createPost({ title: "third post", body: "hello there mate!" })
    getPosts();
}

// async / await / fetch
async function fetchUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    console.log(data);
}
init();
fetchUsers();