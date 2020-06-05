const fetch = require("node-fetch");

const posts = [
  { title: "one", body: "post one" },
  { title: "two", body: "post two" },
];

function getPosts() {
  setTimeout(() => {
    let output = "";
    posts.forEach((post, index) => {
      output += `<li>${post.title}</li>`;
    });
    console.log(output);
  }, 1000);
}

//callbacks
// function createPosts(post, callback){
//     setTimeout(()=>{
//         posts.push(post);
//         callback()
//     },2000);
// }

// createPosts({ title: "three", body: "post three" }, getPosts);


function createPosts(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);
      const error = false;
      if (!error) {
        resolve();
      } else {
        reject("error");
      }
    }, 2000);
  });
}

//Promise
// createPosts({ title: "three", body: "post three" })
//     .then(getPosts)
//     .catch(err=>console.log(err));


//Async / Await
// async function init(){
//     await createPosts({ title: "three", body: "post three" });
    
//     getPosts();
// }

// init();



//Async / Await / Fetch

async function fetchUsers(){
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json()
    console.log(data);
}
fetchUsers();