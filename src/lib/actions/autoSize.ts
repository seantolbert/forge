export const autoSize = (node: HTMLTextAreaElement) => {
  const resize = () => {
    node.style.height = "auto";
    node.style.height = `${Math.max(node.scrollHeight, 44)}px`;
  };

  resize();
  node.addEventListener("input", resize);

  return {
    destroy() {
      node.removeEventListener("input", resize);
    }
  };
};
