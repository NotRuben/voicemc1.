const getDelta = (elOne, elTwo) => {
  return {
    deltaX: elOne.left - elTwo.left,
    deltaY: elOne.top - elTwo.top,
    deltaW: elOne.width / elTwo.width,
    deltaH: elOne.height / elTwo.height,
  };
};

function flip({
  el,
  stateChange,
  timing = 0.3,
  scale = true,
  translate = true,
}) {
  const firstBoxes = [...document.querySelectorAll(".box")];
  const firstRects = firstBoxes.map(box => {
    const bg1 = box.querySelector(el);
    if (bg1 === null) return;
    //F.irst
    const firstRect = bg1.getBoundingClientRect();
    return {
      rect: firstRect,
      key: bg1.dataset.key
    };
  });

  stateChange();

  requestAnimationFrame(() => {
    firstRects.forEach(({
      rect,
      key
    }) => {
      const [firstRect, firstKey] = [rect, key];
      const secondBox = document.querySelector(`[data-key="${firstKey}"]`);
      //L.ast
      const secondRect = secondBox.getBoundingClientRect();

      //I.nvert
      const {
        deltaX,
        deltaY,
        deltaW,
        deltaH
      } = getDelta(
        firstRect,
        secondRect
      );
      secondBox.style.transition = "none";
      secondBox.style.transformOrigin = "left top";
      secondBox.style.transform = `
      ${translate ? `translate(${deltaX}px, ${deltaY}px)` : ""}
      ${scale ? `scale(${deltaW}, ${deltaH})` : ""}
      `;

      //P.lay
      requestAnimationFrame(() => {
        secondBox.style.transition = `transform ${timing}s ease`;
        secondBox.style.transform = `none`;
      });
    });
  });
}

console.clear();



const elApp = document.querySelector("#app");

const elBoxes = [...document.querySelectorAll(".box")];

const svgs = document.querySelectorAll("svg");

elBoxes.forEach(box => {
  box.addEventListener("click", () => activate(box));
});

function activate(box) {
  console.log("click");
  const stateValue =
    typeof box === "string" ?
    box :
    box.dataset.active ?
    "start" :
    box.dataset.show;
  flip({
    el: ".bg",
    stateChange: () => (elApp.dataset.state = stateValue)
  });
  flip({
    el: ".title",
    stateChange: () => (elApp.dataset.state = stateValue),
    scale: false,
  });
  flip({
    el: ".svg-wrap",
    stateChange: () => (elApp.dataset.state = stateValue),
    scale: false,
  });

  document.querySelectorAll("[data-active]").forEach(el => {
    el.removeAttribute("data-active");
  });

  document
    .querySelectorAll(
      `[data-show~="${stateValue}"], [data-hide]:not([data-hide~="${stateValue}"])`
    )
    .forEach(el => {
      el.setAttribute("data-active", true);
    });
}




(function($) {
  "use strict";

  document.getElementsByTagName("body")[0].addEventListener("mousemove", function(n) {
    t.style.left = n.clientX + "px",
      t.style.top = n.clientY + "px",
      e.style.left = n.clientX + "px",
      e.style.top = n.clientY + "px",
      i.style.left = n.clientX + "px",
      i.style.top = n.clientY + "px"
  });
  var t = document.getElementById("cursor"),
    e = document.getElementById("cursor2"),
    i = document.getElementById("cursor3");

  function n(t) {
    e.classList.add("hover"), i.classList.add("hover")
  }

  function s(t) {
    e.classList.remove("hover"), i.classList.remove("hover")
  }
  s();
  for (var r = document.querySelectorAll(".hover-target"), a = r.length - 1; a >= 0; a--) {
    o(r[a])
  }

  function o(t) {
    t.addEventListener("mouseover", n), t.addEventListener("mouseout", s)
  }

  //Navigation

  var app = function() {
    var body = undefined;
    var menu = undefined;
    var menuItems = undefined;
    var init = function init() {
      body = document.querySelector('body');
      menu = document.querySelector('.menu-icon');
      menuItems = document.querySelectorAll('.nav__list-item');
      applyListeners();
    };
    var applyListeners = function applyListeners() {
      menu.addEventListener('click', function() {
        return toggleClass(body, 'nav-active');
      });
    };
    var toggleClass = function toggleClass(element, stringClass) {
      if (element.classList.contains(stringClass)) element.classList.remove(stringClass);
      else element.classList.add(stringClass);
    };
    init();
  }();


  //Switch light/dark

  $("#switch").on('click', function() {
    if ($("body").hasClass("light")) {
      $("body").removeClass("light");
      $("#switch").removeClass("switched");
    } else {
      $("body").addClass("light");
      $("#switch").addClass("switched");
    }
  });

})(jQuery);
