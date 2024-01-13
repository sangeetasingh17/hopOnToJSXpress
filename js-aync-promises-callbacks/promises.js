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

// createPost({ title: "third post", body: "hello there mate!" })
//     .then(getPosts)
//     .catch(err => console.log(err));

//Promise.all
const promise1 = Promise.resolve("Hello World");
const promise2 = Promise.resolve(10);
const promise3 = new Promise((resolve, reject) => setTimeout(resolve, 2000, "GoodBye"));

const promise4 = fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
// .then(json => console.log(json))

Promise.all([promise1, promise2, promise3, promise4])
    .then(values => console.log(values));