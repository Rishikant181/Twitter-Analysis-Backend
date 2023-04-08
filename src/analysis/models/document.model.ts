// INTERFACES
import { IDocument, EContentType } from '../interface/document.interface';

/**
 * Represents the input to API methods.
 */
export class Document implements IDocument {
	/** The content type of the document. If the type is not set or is TYPE_UNSPECIFIED, returns an INVALID_ARGUMENT error. */
	type: EContentType;

	/** The content of the input in string format. */
	content: string;

	/**
	 * Initializes the document representation of the given text.
	 *
	 * @param content The text to be represented as a document.
	 */
	constructor(content: string) {
		this.type = EContentType.PLAIN_TEXT;
		this.content = content;
	}
}
