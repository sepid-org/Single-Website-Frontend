const extractSvgPath = (svgUrl: string) => {
  return new Promise<string>((resolve, reject) => {
    fetch(svgUrl)
      .then((response) => response.text())
      .then((svgText) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, 'image/svg+xml');
        const paths = doc.querySelectorAll('path');
        const dAttributes: string[] = [];

        paths.forEach(path => {
          const d = path.getAttribute('d');
          if (d) {
            dAttributes.push(d);
          }
        });

        if (dAttributes.length > 0) {
          const mergedD = dAttributes.join(' ');
          resolve(mergedD);
        } else {
          reject('No path found in SVG');
        }
      })
      .catch(reject);
  });
};

export default extractSvgPath;