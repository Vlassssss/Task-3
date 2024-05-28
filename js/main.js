const fetchCommentsBtn = document.getElementById("fetchCommentsBtn");
const commentList = document.getElementById("commentList");

fetchCommentsBtn.addEventListener("click", () => {
    const numOfComments = parseInt(document.getElementById("numOfComments").value);
    if (isNaN(numOfComments) || numOfComments <= 0) {
        alert("Будь ласка, введіть дійсне число більше 0.");
        return;
    }

    fetchComments(numOfComments)
        .then((comments) => renderComments(comments))
        .catch((error) => console.log(error));
});

function fetchComments(numOfComments) {
    return fetch(`https://jsonplaceholder.typicode.com/comments?_limit=${numOfComments}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
}

function renderComments(comments) {
    const markup = comments
        .map((comment) => {
            return `<div class="card">
                <p><b>ID:</b> ${comment.id}</p>
                <p><b>Name:</b> ${comment.name}</p>
                <p><b>Email:</b> ${comment.email}</p>
                <p><b>Body:</b> ${comment.body}</p>
            </div>`;
        })
        .join("");
    commentList.innerHTML = markup;
}