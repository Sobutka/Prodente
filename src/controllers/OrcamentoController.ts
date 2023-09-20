import { Request, Response } from "express";
import { orcamentoRepository } from "../repositories/orcamentoRepository";

export class OrcamentoController{
    async create(req: Request, res: Response){
        let { data, paciente} = req.body
        data = new Date(data.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
        data.setDate(data.getDate() + 1)
        console.log(data)


        if(!data){
            return res.status(400).json({ message: 'A data é obrigatória'})
        } 

        try {

            const newOrcamento = orcamentoRepository.create({ data, paciente})

            await orcamentoRepository.save(newOrcamento)

            return res.status(201).json(newOrcamento)
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async list(req: Request, res:Response){
        try {
            let orcamentos = await orcamentoRepository.find({})
            return res.json(orcamentos)
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async listId(req: Request, res:Response){
        try {
            const{ codOrcamento } = req.params
            let orcamentos = await orcamentoRepository.findOneBy({codOrcamento:Number(codOrcamento)})
            return res.json(orcamentos)
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async update(req: Request, res: Response){
        try {
            const{ codOrcamento } = req.params

            const orcamento = await orcamentoRepository.update(codOrcamento, req.body)

            if(orcamento.affected == 1){
                const orcamentoUpdated = await orcamentoRepository.findOneBy({codOrcamento:Number()})
                return res.json({message:'Orcamento Atualizado'})
            } else {
                return res.status(404).json({message:'Orcamento não encontrado'})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async delete(req: Request, res: Response){
        try {   
            const{ codOrcamento } = req.params

            const orcamento = await orcamentoRepository.delete(codOrcamento)

            if(orcamento.affected == 1){
                const orcamentoDeleted = await orcamentoRepository.findOneBy({codOrcamento:Number()})
                return res.json({message:'Orcamento Excluido'})
            } else {
                return res.status(404).json({message:'Orcamento não encontrado'})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }
}