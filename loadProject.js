const navigate = (route) => {
  window.location = route;
};
function loadProject(projectId) {
  const project = JSON.parse(localStorage.getItem(`project_${projectId}`));
  console.log(project);
  /**
   * Load project object in from localstorage.
   *
   * Pass in title, name, image, and description into #project element.
   *
   * For every step in the steps array, duplicate the .projectStep element
   * and fill in the details. Then, append it to the stepsContainer element.
   */
  const stepsContainer = document.getElementsByClassName("stepsContainer")[0];
  const projectStepTemplate = document.getElementsByClassName(
    "projectStepTemplate"
  )[0];
  document.getElementById("projectTitle").textContent = project.title;

  document.getElementsByClassName("_projectImg")[0].srcset = "";
  document.getElementsByClassName("_projectImg")[0].src = project.project_image;

  document.getElementById(
    "projectName"
  ).textContent = `Created by ${project.name}`;

  document.getElementById("projectDescription").textContent =
    project.project_description;

  const stepsArray = Object.keys(project.steps);
  if (stepsArray[0] === "step_template") {
    stepsArray.shift();
  }
  stepsArray.forEach((step, index) => {
    const newStep = projectStepTemplate.cloneNode(true);
    newStep.childNodes[1].textContent = `Step ${index + 1}`;
    newStep.childNodes[3].textContent = project.steps[step];
    console.log(newStep);
    newStep.classList.remove("projectStepTemplate");
    newStep.classList.add("projectStep");
    stepsContainer.appendChild(newStep);
  });
  console.log(stepsArray);
}
