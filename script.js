const showcase = document.querySelector(".service-showcase");
const tabs = showcase ? Array.from(showcase.querySelectorAll('[role="tab"]')) : [];
const panels = showcase ? Array.from(showcase.querySelectorAll('[role="tabpanel"]')) : [];

function activateTab(nextTab, moveFocus = true) {
  tabs.forEach((tab) => {
    const isSelected = tab === nextTab;

    tab.classList.toggle("is-active", isSelected);
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
  });

  panels.forEach((panel) => {
    const isSelected = panel.id === nextTab.getAttribute("aria-controls");

    panel.hidden = !isSelected;
    panel.classList.toggle("is-active", isSelected);
  });

  if (moveFocus) {
    nextTab.focus();
  }
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab, false));

  tab.addEventListener("keydown", (event) => {
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    activateTab(tabs[nextIndex]);
  });
});
