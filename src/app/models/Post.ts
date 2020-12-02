import {Comment} from './Comment';

export class Post {
    public id: number;
    public title: string;
    public content: string;
    public author: string;
    public comments?: Comment[];
}
