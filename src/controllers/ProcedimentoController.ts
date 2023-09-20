import { Request, Response } from "express";
import { procedimentoRepository } from "../repositories/procedimentoRepository";

export class ProcedimentoController{
    async create(req: Request, res: Response){
        let { nome, dente, face, valor } = req.body

        if(!nome){
            return res.status(400).json({ message: 'O Nome é obrigatório'})
        }
        if(!valor){
            return res.status(400).json({ message: 'O Valor é obrigatório'})
        }

        try {
            const newProcedimento = procedimentoRepository.create({ nome, dente, face, valor })

            await procedimentoRepository.save(newProcedimento)

            return res.status(201).json(newProcedimento)
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async list(req: Request, res:Response){
        try {
            const procedimento = await procedimentoRepository.find({
            })
            return res.json(procedimento)
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async listId(req: Request, res:Response){
        try {
            const{ codProcedimento } = req.params
            const procedimento = await procedimentoRepository.findOneBy({codProcedimento:Number(codProcedimento)})
            return res.json(procedimento)
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async update(req: Request, res: Response){
        try {
            const{ codProcedimento } = req.params

            const procedimento = await procedimentoRepository.update(codProcedimento, req.body)

            if(procedimento.affected == 1){
                const procedimentoUpdated = await procedimentoRepository.findOneBy({codProcedimento:Number()})
                return res.json({message:'Procedimento Atualizado'})
            } else {
                return res.status(404).json({message:'Procedimento não encontrado'})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async delete(req: Request, res: Response){
        try {   
            const{ codDent } = req.params

            const procedimento = await procedimentoRepository.delete(codDent)

            if(procedimento.affected == 1){
                const procedimentoDeleted = await procedimentoRepository.findOneBy({codProcedimento:Number()})
                return res.json({message:'Procedimento Excluido'})
            } else {
                return res.status(404).json({message:'Procedimento não encontrado'})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }
}