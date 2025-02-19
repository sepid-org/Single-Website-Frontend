import { WidgetType } from 'commons/types/widgets/widget';
import {
    Article,
    Problem,
    Submission,
} from '../models'

export type ArticleType = {
    id: number;
    name?: string;
    description?: string;
    cover_image?: string;
    is_hidden: boolean;
    tags: TagType[];
}

export type TagType = {
    id: number; 
    name: string; 
    created_at: string;
}

export type ArticlesInitialStateType = {
    isFetching: boolean;
    widgets: WidgetType[];
    articles: Article[];
    teams: any; // TODO: fix this! because of teams: {} in another file. but I think it must be Array instead of object
    problems: Problem[];
    submissions: Submission[];
    articlesCount: number;
    article: Article,
}