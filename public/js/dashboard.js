// Materialize collapsible 
document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".collapsible");
    var instances = M.Collapsible.init(elems);
});
// Materialize dropdown
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});
// create a new task
const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#task-title").value.trim();
    const description = document.querySelector("#task-description").value.trim();
    const status = document.querySelector("#task_status").value.trim();
    const urlArray = window.location.href.split("/");
    const project_id = urlArray[urlArray.length - 1];

    if (title && description && status && project_id) {
        const response = await fetch('/api/dashboard', {
            method: 'POST',
            body: JSON.stringify({ title, description, status, project_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create task.');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/dashboard/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to delete task');
        }
    }
};


document
    .querySelector('#task-submit')
    .addEventListener('click', newFormHandler);

document
    .querySelector('#checkbox')
    .addEventListener('click', delButtonHandler);