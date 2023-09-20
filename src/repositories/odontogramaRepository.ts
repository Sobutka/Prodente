import { AppDataSource } from "../data-source";
import { Odontograma } from "../entities/Odontograma";

export const odontogramaRepository = AppDataSource.getRepository(Odontograma)