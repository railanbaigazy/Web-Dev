import { Company } from "./company";

export interface Vacancy {
    id?: number;
    name: string;
    description: string;
    company: Company;
    salary: number;
}
