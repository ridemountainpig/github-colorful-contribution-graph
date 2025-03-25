// Utility function to convert hex to RGB
function hexToRgbSetColor(hex: string) {
  hex = hex.replace(/^#/, "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map(function (hexPart) {
        return hexPart + hexPart;
      })
      .join("");
  }

  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return `rgb(${r}, ${g}, ${b})`;
}

chrome.runtime.sendMessage(
  { type: "getColor", data: "levelColor" },
  function (response) {
    // Access the :root element
    const root = document.documentElement;

    const LevelOneColorValue = [
      root.style.getPropertyValue("--contribution-default-bgColor-1"),
      hexToRgbSetColor(
        root.style.getPropertyValue("--contribution-default-bgColor-1"),
      ),
    ];
    const LevelTwoColorValue = [
      root.style.getPropertyValue("--contribution-default-bgColor-2"),
      hexToRgbSetColor(
        root.style.getPropertyValue("--contribution-default-bgColor-2"),
      ),
    ];
    const LevelThreeColorValue = [
      root.style.getPropertyValue("--contribution-default-bgColor-3"),
      hexToRgbSetColor(
        root.style.getPropertyValue("--contribution-default-bgColor-3"),
      ),
    ];
    const LevelFourColorValue = [
      root.style.getPropertyValue("--contribution-default-bgColor-4"),
      hexToRgbSetColor(
        root.style.getPropertyValue("--contribution-default-bgColor-4"),
      ),
    ];

    // Set contribution graph colors
    root.style.setProperty("--contribution-default-bgColor-0", response[0]);
    root.style.setProperty("--contribution-default-bgColor-1", response[1]);
    root.style.setProperty("--contribution-default-bgColor-2", response[2]);
    root.style.setProperty("--contribution-default-bgColor-3", response[3]);
    root.style.setProperty("--contribution-default-bgColor-4", response[4]);

    // Set contribution activity highlight blob colors
    const highlightBlob = document.querySelector(".js-highlight-blob");
    if (highlightBlob) {
      highlightBlob.setAttribute("fill", response[2]);
      highlightBlob.setAttribute("stroke", response[2]);
    }

    // Set contribution activity progress bar colors
    const progressBars = Array.from(
      document.querySelectorAll("span.Progress-item.rounded-2"),
    );

    progressBars.forEach((bar) => {
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
  },
);
