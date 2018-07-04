export default function isOverlay(node) {
	if (node) {
		if (node.nodeName == "DIV" && node.id == "rap-overlay") {
			return true;
		}
	}
	return false;
}
