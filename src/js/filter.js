const filterTab = document.querySelector(".js-filter");

function filterRemoveActive() {
  filterTab.querySelectorAll(".filter__button").forEach((tabButton) => {
    console.log(tabButton);
    tabButton.classList.remove("filter__button--active");
  });
}

function filterActive(activeButton) {
  activeButton.classList.add("filter__button--active");
}

document.addEventListener("DOMContentLoaded", (event) => {
  if (filterTab) {
    filterTab.querySelectorAll(".filter__button").forEach((tabButton) => {
      tabButton.addEventListener("click", (event) => {
        event.preventDefault();
        filterRemoveActive();
        filterActive(event.currentTarget);
      });
    });
  }
});
