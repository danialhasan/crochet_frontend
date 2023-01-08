const navigate = (route) => {
  window.location = route;
};
function addStep() {
  let stepsContainerTemplate = document
    .getElementsByClassName("stepsContainer")[0]
    .cloneNode(true);

  const uniqueId = generateUniqueId();
  if (stepsContainerTemplate.id === "stepsContainerTemplate") {
    stepsContainerTemplate.id = uniqueId;
  }

  const addNewProjectForm = document.getElementById("addNewProjectForm");

  stepsContainerTemplate.childNodes[1].childNodes[1].textContent = `Step ${
    document.getElementsByClassName("stepsContainer").length
  }`;
  stepsContainerTemplate.childNodes[3].childNodes[1].name = `step_${
    document.getElementsByClassName("stepsContainer").length
  }`;

  stepsContainerTemplate.id = uniqueId;
  stepsContainerTemplate.childNodes[1].childNodes[3].classList.add(uniqueId);
  addNewProjectForm.appendChild(stepsContainerTemplate);
}
function deleteStep(e, element) {
  e.preventDefault();
  const elementId = element.classList[1];
  const stepToDelete = document.getElementById(elementId);
  stepToDelete.remove();

  const allSteps = Array.from(
    document.getElementsByClassName("stepsContainer")
  );
  allSteps.forEach((step, index) => {
    step.childNodes[1].childNodes[1].textContent = `Step ${index}`;
  });
}
function generateUniqueId() {
  const uniqueId = `uniqueId-${Math.floor(Math.random() * 1e9)}`;
  return uniqueId;
}
async function saveProject() {
  const projectId = `project_${generateUniqueId()}`;
  const form = document.getElementById("addNewProjectForm");
  const formData = new FormData(form);
  let jsonFormData = { steps: {} };
  for (let [key, value] of formData.entries()) {
    if (key.includes("step")) {
      if (!value) value = "testValue";
      jsonFormData.steps[key] = value;
    } else {
      jsonFormData[key] = value;
    }
  }
  if (jsonFormData.project_image) {
    jsonFormData.project_image = await convertFileToBase64(
      jsonFormData.project_image
    );
  }
  localStorage.setItem(projectId, JSON.stringify(jsonFormData));
  navigate("/index.html");
}
async function convertFileToBase64(file) {
  /**
   * Convert image file to dataURL to store as JSON
   */
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    let base64;
    fileReader.onload = () => {
      base64 = fileReader.result;
      return resolve(base64);
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  });
}
function loadProjects() {
  /**
   * Fetch projects from local storage, and load them in their own
   * project components. When a project is clicked, open it.
   */

  localStorage.removeItem("debug");
  const projectContainer = document.getElementById("projects");
  const allProjects = { ...localStorage };
  const projectKeys = Object.keys(allProjects);
  const projectValues = Object.values(allProjects);
  for (const key in projectKeys) {
    /**
     * For each project, clone the projectTemplate node. Fill it
     * with data from the project, and then append it to the DOM.
     * Add an event listener to each project that opens it up when it's clicked.
     */
    const projectInfo = JSON.parse(projectValues[key]);
    let stepsContainerClone = document
      .getElementsByClassName("project")[0]
      .cloneNode(true);

    if (stepsContainerClone.id === "template-project") {
      stepsContainerClone.id = projectKeys[key].split("_")[1];
    }
    const topDiv = stepsContainerClone.childNodes[3];
    const bottomDiv = stepsContainerClone.childNodes[5];
    bottomDiv.childNodes[1].textContent = truncate(projectInfo.title, 18);
    bottomDiv.childNodes[3].textContent = truncate(projectInfo.name, 24);
    bottomDiv.childNodes[5].childNodes[1].textContent = truncate(
      projectInfo.project_description,
      24
    );
    topDiv.childNodes[1].src = projectInfo.project_image;

    topDiv.childNodes[1].srcset = "";
    stepsContainerClone.addEventListener("click", () => {
      console.log(`Project ${stepsContainerClone.id} clicked!`);
      navigate(`/routes/project.html?project=${stepsContainerClone.id}`);
    });
    projectContainer.appendChild(stepsContainerClone);
  }
}
function truncate(text, limit) {
  return `${text.slice(0, limit)}...`;
}
