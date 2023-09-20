import { AppDataSource } from "../data-source";
import { Dentista } from "../entities/Dentista";

export const dentistaRepository = AppDataSource.getRepository(Dentista)
