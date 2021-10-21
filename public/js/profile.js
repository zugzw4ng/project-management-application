// Materialize date picker
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems);
});
// Materialize dropdown
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});

// Materialize collapsible 
 document.addEventListener("DOMContentLoaded", function () {
   var elems = document.querySelectorAll(".collapsible");
   var instances = M.Collapsible.init(elems);
 });

const newFormHandler = async (event) => {
    event.preventDefault();
    const projectName = document.querySelector("#project-name").value.trim();
    const projectDeadline = document.querySelector("#project-deadline").value.trim();
    const projectStatus = document.querySelector("#project_status").value.trim();

    if (projectName && projectDeadline && projectStatus) {
        const response = await fetch('/api/profile', {
            method: 'POST',
            body: JSON.stringify({ projectName, projectDeadline, projectStatus }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("YOU GOT HERE");
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create project');
        }
    }
}

document
    .querySelector('#project-submit')
    .addEventListener('click', newFormHandler);
