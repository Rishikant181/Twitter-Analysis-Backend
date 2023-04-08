// PACKAGES
import { ICursoredData } from 'rettiwt-api';

/**
 * The cursor to the batch of data to be fetched.
 */
export class Cursor {
	/** The cursor string. */
	value: string;

	/**
	 * @param cursorStr The cursor string.
	 */
	constructor(cursorStr: string) {
		this.value = cursorStr;
	}
}

/**
 * The data that us fetched batch-wise along with a cursor.
 *
 * @typeParam Type - The type of data present in the list.
 */
export class CursoredDataDto<T> implements ICursoredData<T> {
	/** The list of data of the given type. */
	list: T[];

	/** The cursor to the next batch of data. */
	next: Cursor;

	/**
	 * @param list The data list to be stored.
	 * @param next The cursor string to the next batch.
	 */
	constructor(list: T[], next: string) {
		this.list = list;
		this.next = new Cursor(next);
	}
}
