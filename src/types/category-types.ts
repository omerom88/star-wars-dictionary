export interface CategoryData {
    name?: string;
    title?: string;
    height: string;
    mass: string;
    hair_color?: string;
    skin_color?: string;
    eye_color?: string;
    birth_year: string;
    gender: string;
    homeworld?: string;
    films?: string[];
    species?: string[];
    vehicles?: string[];
    starships?: string[];
    created: string;
    edited?: string;
    url: string;
    id: string;
}

export interface CategoryDataResponse {
    count: number;
    next?: string;
    previous: string | null;
    results: CategoryData[];
}
