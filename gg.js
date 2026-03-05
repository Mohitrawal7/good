setTimeout(() => {
    console.log("Hello, World!");
}, 177.888889);

fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(() => {
        console.log("Fetched data!");
    });

    console.log("This will log before the fetch completes.");
