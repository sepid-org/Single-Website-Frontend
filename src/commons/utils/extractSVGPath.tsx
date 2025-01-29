const extractSvgPath = (svgUrl: string) => {
  return new Promise<string>((resolve, reject) => {
    fetch(svgUrl)
      .then((response) => response.text())
      .then((svgText) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, 'image/svg+xml');
        
        const paths = doc.querySelectorAll('path');
        const rects = doc.querySelectorAll('rect'); // Capture all rects as well
        
        const pathData: { d: string, fill: string | null }[] = [];
        const rectData: { d: string, fill: string | null }[] = [];

        // Extract path elements with their styles
        paths.forEach(path => {
          const d = path.getAttribute('d');
          const fill = path.getAttribute('fill'); // Get fill color of path
          if (d) {
            pathData.push({ d, fill });
          }
        });

        // Extract rect elements with their styles
        rects.forEach(rect => {
          const x = rect.getAttribute('x');
          const y = rect.getAttribute('y');
          const width = rect.getAttribute('width');
          const height = rect.getAttribute('height');
          const rx = rect.getAttribute('rx'); // Rounded corner radius
          const ry = rect.getAttribute('ry'); // Same as rx for ellipses
          const fill = rect.getAttribute('fill'); // Get fill color of rect

          if (x && y && width && height) {
            let rectPath = `M${x},${y} H${+x + +width} V${+y + +height} H${x} Z`; // Creates a rect path
            if (rx && ry) {
              // Handle rounded rectangles if needed (basic approach)
              rectPath = `M${+x + +rx},${y} H${+x + +width - +rx} A${rx},${ry} 0 0 1 ${+x + +width},${+y + +ry} V${+y + +height - +ry} A${rx},${ry} 0 0 1 ${+x + +width - +rx},${+y + +height} H${x + rx} A${rx},${ry} 0 0 1 ${x},${+y + +height - +ry} Z`;
            }
            rectData.push({ d: rectPath, fill });
          }
        });

        // Combine path and rect data with their styles
        const allData = [...pathData, ...rectData];

        if (allData.length > 0) {
          // Join the `d` attributes of all paths and shapes into one string
          const mergedD = allData.map(item => item.d).join(' ');

          // Optionally: You can also handle colors here, but since you're returning a single path string, color handling may not be needed for this approach.

          resolve(mergedD); // Resolving with a string of combined paths
        } else {
          reject('No path found in SVG');
        }
      })
      .catch(reject);
  });
};

export default extractSvgPath;
