console.log(dayjs().format());
dayjs.extend(dayjs_plugin_relativeTime);

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
    if (title && description && status) {
        const response = await fetch('/api/dashboard', {
            method: 'POST',
            body: JSON.stringify({ title, description, status }),
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
}

document
    .querySelector('#task-submit')
    .addEventListener('click', newFormHandler);

// Create time remaining until deadline  
const deadline = document.querySelector('#deadline').innerHTML;
const deadlineDate = deadline.slice(10).replace('-', '/');

const date1 = dayjs(deadlineDate);
const date2 = dayjs();
const dayJsDeadline = date1.diff(date2, 'day');

console.log(dayJsDeadline);

const jsDeadline = document.querySelector("#jsDeadline");
jsDeadline.textContent = dayJsDeadline;