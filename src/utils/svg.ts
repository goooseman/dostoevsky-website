// https://stackoverflow.com/a/44769098

interface SvgElement extends Element {
  style: CSSStyleDeclaration;
}

const copyStylesInline = (destinationNode: Node, sourceNode: Node) => {
  const containerElements = ["svg", "g", "foreignObject"];
  for (let cd = 0; cd < destinationNode.childNodes.length; cd++) {
    const destinationChild = destinationNode.childNodes[cd] as SvgElement;
    if (containerElements.indexOf(destinationChild.tagName) != -1) {
      copyStylesInline(destinationChild, sourceNode.childNodes[cd]);
      continue;
    }
    const sourceChild = sourceNode.childNodes[cd] as SvgElement;
    const style = window.getComputedStyle(sourceChild);

    for (let st = 0; st < style.length; st++) {
      destinationChild.style.setProperty(
        style[st],
        style.getPropertyValue(style[st])
      );
    }
  }
};

export const triggerDownload = (imgURI: string, fileName: string): void => {
  const evt = new MouseEvent("click", {
    view: window,
    bubbles: false,
    cancelable: true,
  });
  const a = document.createElement("a");
  a.setAttribute("download", fileName);
  a.setAttribute("href", imgURI);
  a.setAttribute("target", "_blank");
  a.dispatchEvent(evt);
};

export const downloadSvg = (
  svg: SVGGraphicsElement | null,
  fileName: string
): void => {
  if (!svg) {
    return;
  }
  const copy = svg.cloneNode(true);
  copyStylesInline(copy, svg);
  const canvas = document.createElement("canvas");

  const bbox = svg.getBoundingClientRect();
  canvas.width = bbox.width;
  canvas.height = bbox.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, bbox.width, bbox.height);
  const data = new XMLSerializer().serializeToString(copy);
  const img = new Image();
  const url = `data:image/svg+xml;utf8,${data}`;

  img.onload = function () {
    ctx.drawImage(img, 0, 0);

    const imgURI = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    triggerDownload(imgURI, fileName);
  };

  img.src = url;
};
