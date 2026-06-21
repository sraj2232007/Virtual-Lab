const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});

function simulate() {
  const input = document.getElementById("inputValue").value.trim();
  const output = document.getElementById("output");

  if (!input) {
    output.innerHTML =
      '<span style="color: orange;">Please enter a value.</span>';
    return;
  }

  try {
    let value;
    let type;

    try {
      value = JSON.parse(input);
      type = inferPythonType(value);
    } catch {
      value = input;
      type = "str";
    }

    const typeClass = `type-${type.replace(/[^a-z]/g, "").toLowerCase()}`;
    const displayValue =
      typeof value === "string" ? `"${value}"` : JSON.stringify(value);

    output.innerHTML = `
      <div class="type-display ${typeClass}">
        Type: <code>&lt;class '${type}'&gt;</code>
      </div>
      <div class="code-python">
        &gt;&gt;&gt; x = ${displayValue}<br>
        &gt;&gt;&gt; type(x)<br>
        <strong>&lt;class '${type}'&gt;</strong>
      </div>
      <p><strong>${type}</strong>: ${getTypeDescription(type)}</p>
    `;
  } catch (e) {
    output.innerHTML = `<span style="color: red;">Error: ${e.message}</span>`;
  }
}

function inferPythonType(obj) {
  if (obj === null) return "NoneType";

  const t = typeof obj;

  if (t === "number") return Number.isInteger(obj) ? "int" : "float";
  if (t === "boolean") return "bool";
  if (t === "string") return "str";
  if (Array.isArray(obj)) return "list";
  if (t === "object") return "dict";

  return "unknown";
}

function getTypeDescription(type) {
  const desc = {
    int: "Whole numbers (e.g., 42).",
    float: "Decimal numbers (e.g., 3.14).",
    str: "Text strings.",
    list: "Mutable sequence [1,2,3].",
    dict: "Key-value mapping.",
    bool: "True or False.",
    NoneType: "None value."
  };

  return desc[type] || "Custom type.";
}

function setExample(val) {
  document.getElementById("inputValue").value = val;
  simulate();
}

document
  .getElementById("inputValue")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") simulate();
  });
