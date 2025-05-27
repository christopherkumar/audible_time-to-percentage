// Icon components for the audiobook progress tracker
const { createElement } = React;

function BookOpenIcon() {
  return createElement(
    "svg",
    {
      className: "mx-auto h-12 w-12 text-indigo-600 dark:text-indigo-400 mb-3",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      viewBox: "0 0 24 24",
    },
    createElement("path", {
      d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",
    }),
    createElement("path", {
      d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
    })
  );
}

function ClockIcon() {
  return createElement(
    "svg",
    {
      className: "inline h-4 w-4 mr-1",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      viewBox: "0 0 24 24",
    },
    createElement("circle", { cx: "12", cy: "12", r: "10" }),
    createElement("polyline", { points: "12,6 12,12 16,14" })
  );
}

function ToggleLeftIcon() {
  return createElement(
    "svg",
    {
      className: "h-8 w-8 text-gray-400 dark:text-gray-500",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      viewBox: "0 0 24 24",
    },
    createElement("rect", {
      x: "1",
      y: "5",
      width: "22",
      height: "14",
      rx: "7",
      ry: "7",
    }),
    createElement("circle", { cx: "8", cy: "12", r: "3" })
  );
}

function ToggleRightIcon() {
  return createElement(
    "svg",
    {
      className: "h-8 w-8 text-indigo-600 dark:text-indigo-400",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      viewBox: "0 0 24 24",
    },
    createElement("rect", {
      x: "1",
      y: "5",
      width: "22",
      height: "14",
      rx: "7",
      ry: "7",
    }),
    createElement("circle", { cx: "16", cy: "12", r: "3" })
  );
}

function MoonIcon() {
  return createElement(
    "svg",
    {
      className: "h-5 w-5",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      viewBox: "0 0 24 24",
    },
    createElement("path", {
      d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
    })
  );
}

function SunIcon() {
  return createElement(
    "svg",
    {
      className: "h-5 w-5",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      viewBox: "0 0 24 24",
    },
    createElement("circle", { cx: "12", cy: "12", r: "5" }),
    createElement("line", { x1: "12", y1: "1", x2: "12", y2: "3" }),
    createElement("line", {
      x1: "12",
      y1: "21",
      x2: "12",
      y2: "23",
    }),
    createElement("line", {
      x1: "4.22",
      y1: "4.22",
      x2: "5.64",
      y2: "5.64",
    }),
    createElement("line", {
      x1: "18.36",
      y1: "18.36",
      x2: "19.78",
      y2: "19.78",
    }),
    createElement("line", {
      x1: "1",
      y1: "12",
      x2: "3",
      y2: "12",
    }),
    createElement("line", {
      x1: "21",
      y1: "12",
      x2: "23",
      y2: "12",
    }),
    createElement("line", {
      x1: "4.22",
      y1: "19.78",
      x2: "5.64",
      y2: "18.36",
    }),
    createElement("line", {
      x1: "18.36",
      y1: "5.64",
      x2: "19.78",
      y2: "4.22",
    })
  );
}
