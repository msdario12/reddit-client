import htmr from "htmr";
import HTMLReactParser from "html-react-parser";

export const HtmlParser = ({ content }) => {
	if (!content) {
		return "";
	}
	const data = htmr(content);
	return HTMLReactParser(data);
};
