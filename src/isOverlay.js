export default function isOverlay(node) {
  if (node.nodeName == "DIV" && node.id == "overlay") {
    return true;
  }
  return false;
}
