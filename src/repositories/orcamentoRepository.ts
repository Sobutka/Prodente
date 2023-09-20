import { AppDataSource } from "../data-source";
import { Orcamento } from "../entities/Orcamento";

export const orcamentoRepository = AppDataSource.getRepository(Orcamento)