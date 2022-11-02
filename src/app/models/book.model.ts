import { Tag } from "../components/create-book/create-book.component";

export class Book {
    key?: string | null;
    title?: string;
    description?: string;
    author?: string;
    publishDate?: string;
    published?: boolean;
    tags?: Tag[];
}
