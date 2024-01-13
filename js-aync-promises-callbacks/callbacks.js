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
            output += `<li>${index + 1} ${post.title} : ${post.body}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createPost(post, callback) {
    setTimeout(() => {
        posts.push(post);
        callback();
    }, 1000);
}

createPost({ title: "third post", body: "hello there mate!" }, getPosts);