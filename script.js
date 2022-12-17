const navigate = (route) => {
  window.location = `${route}.html`;
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
  const uniqueId = `uniqueId_${Math.floor(Math.random() * 1e9)}`;
  return uniqueId;
}
function saveProject() {
  const projectId = `project_${generateUniqueId()}`;
  const form = document.getElementById("addNewProjectForm");
  console.log(form);
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
  localStorage.setItem(projectId, JSON.stringify(jsonFormData));
  navigate("/index");
}
