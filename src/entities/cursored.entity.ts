// PACKAGES
import { CursoredData as CursoredDataInterface, Cursor as CursorInterface } from 'rettiwt-api';

/**
 * Data that is stored as a list along with a cursor.
 *
 * @typeParam Type - The type of data present in the list.
 */
export class CursoredData<Type> implements CursoredDataInterface<Type> {
    /** The list of data of the given type. */
    list: Type[];

    /** The cursor to the next batch of data. */
    next: CursorInterface;
}