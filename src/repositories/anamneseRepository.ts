import { AppDataSource } from "../data-source";
import { Anamnese } from "../entities/Anamnese";


export const anamneseRepository = AppDataSource.getRepository(Anamnese)