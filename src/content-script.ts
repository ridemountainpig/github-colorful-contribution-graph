function hexToRgb(hex: string) {
  // Remove the "#" if it's there
  hex = hex.replace(/^#/, "");

  // If shorthand format, convert to full format
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map(function (hexPart) {
        return hexPart + hexPart;
      })
      .join("");
  }

  // Convert to RGB
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return `rgb(${r}, ${g}, ${b})`;
}

const observer = new MutationObserver((mutations, obs) => {
  chrome.runtime.sendMessage(
    { type: "getColor", data: "levelColor" },
    function (response) {
      if (!response) {
        response = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
      }

      // Access the :root element
      const root = document.documentElement;

      const LevelOneColorValue = ["#9be9a8", hexToRgb("#9be9a8")];
      const LevelTwoColorValue = ["#40c463", hexToRgb("#40c463")];
      const LevelThreeColorValue = ["#30a14e", hexToRgb("#30a14e")];
      const LevelFourColorValue = ["#216e39", hexToRgb("#216e39")];

      // Set contribution graph colors
      root.style.setProperty("--color-calendar-graph-day-bg", response[0]);
      root.style.setProperty("--color-calendar-graph-day-L1-bg", response[1]);
      root.style.setProperty("--color-calendar-graph-day-L2-bg", response[2]);
      root.style.setProperty("--color-calendar-graph-day-L3-bg", response[3]);
      root.style.setProperty("--color-calendar-graph-day-L4-bg", response[4]);

      const observer = new MutationObserver((mutations, obs) => {
        const yearlyContributions = document.querySelector(
          ".js-yearly-contributions",
        );
        if (yearlyContributions) {
          root.style.setProperty("--color-calendar-graph-day-bg", response[0]);
          root.style.setProperty(
            "--color-calendar-graph-day-L1-bg",
            response[1],
          );
          root.style.setProperty(
            "--color-calendar-graph-day-L2-bg",
            response[2],
          );
          root.style.setProperty(
            "--color-calendar-graph-day-L3-bg",
            response[3],
          );
          root.style.setProperty(
            "--color-calendar-graph-day-L4-bg",
            response[4],
          );
          obs.disconnect(); // Stop observing once we've applied our changes
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      // Set contribution activity highlight blob colors
      const highlightBlob = document.querySelector(".js-highlight-blob");
      if (highlightBlob) {
        highlightBlob.setAttribute("fill", response[2]);
        highlightBlob.setAttribute("stroke", response[2]);
      }

      const observerHighlightBlob = new MutationObserver((mutations, obs) => {
        const highlightBlob = document.querySelector(".js-highlight-blob");
        if (highlightBlob) {
          highlightBlob.setAttribute("fill", response[2]);
          highlightBlob.setAttribute("stroke", response[2]);
          obs.disconnect(); // Stop observing once we've applied our changes
        }
      });

      observerHighlightBlob.observe(document.body, {
        childList: true,
        subtree: true,
      });

      // Set contribution activity progress bar colors
      const progressBars = Array.from(
        document.querySelectorAll("span.Progress-item.rounded-2"),
      );

      progressBars.forEach((bar: Element) => {
        const barColor = (bar as HTMLElement).style.backgroundColor;
        if (LevelOneColorValue.includes(barColor)) {
          (bar as HTMLElement).style.backgroundColor = response[1];
        } else if (LevelTwoColorValue.includes(barColor)) {
          (bar as HTMLElement).style.backgroundColor = response[2];
        } else if (LevelThreeColorValue.includes(barColor)) {
          (bar as HTMLElement).style.backgroundColor = response[3];
        } else if (LevelFourColorValue.includes(barColor)) {
          (bar as HTMLElement).style.backgroundColor = response[4];
        }
      });

      const observerProgressBar = new MutationObserver((mutations, obs) => {
        const contributionActivity = document.querySelector(
          "#js-contribution-activity",
        );
        if (contributionActivity) {
          const progressBars = Array.from(
            document.querySelectorAll("span.Progress-item.rounded-2"),
          );

          progressBars.forEach((bar: Element) => {
            const barColor = (bar as HTMLElement).style.backgroundColor;
            if (LevelOneColorValue.includes(barColor)) {
              (bar as HTMLElement).style.backgroundColor = response[1];
            } else if (LevelTwoColorValue.includes(barColor)) {
              (bar as HTMLElement).style.backgroundColor = response[2];
            } else if (LevelThreeColorValue.includes(barColor)) {
              (bar as HTMLElement).style.backgroundColor = response[3];
            } else if (LevelFourColorValue.includes(barColor)) {
              (bar as HTMLElement).style.backgroundColor = response[4];
            }
          });
          obs.disconnect(); // Stop observing once we've applied our changes
        }
      });

      observerProgressBar.observe(document.body, {
        childList: true,
        subtree: true,
      });
    },
  );
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
