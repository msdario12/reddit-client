import htmr from "htmr";
import HTMLReactParser from "html-react-parser";

export const HtmlParser = ({ content }) => {
	const data = htmr(content);

	return HTMLReactParser(data);
};
