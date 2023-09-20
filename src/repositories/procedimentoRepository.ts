import { AppDataSource } from "../data-source";
import { Procedimento } from "../entities/Procedimento";

export const procedimentoRepository = AppDataSource.getRepository(Procedimento)