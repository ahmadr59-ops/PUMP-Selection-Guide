
function saveProject(projectData) {

    const blob = new Blob(
        [JSON.stringify(projectData, null, 2)],
        { type: 'application/json' }
    );

    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);

    link.download = 'pump_project.json';

    link.click();
}
