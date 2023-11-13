import { Request, Response } from "express";
import { odontogramaRepository } from "../repositories/odontogramaRepository";

export class OdontogramaController{
    async create(req: Request, res: Response){
        let { dataRealizacao, dente, face, valor, procedimento, paciente} = req.body
        dataRealizacao = new Date(dataRealizacao.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
        dataRealizacao.setDate(dataRealizacao.getDate() + 1)
        console.log(dataRealizacao)


        if(!dataRealizacao){
            return res.status(400).json({ message: 'A data é obrigatória'})
        } 

        try {

            const newOdontograma = odontogramaRepository.create({ dataRealizacao, dente, face, valor, procedimento, paciente})

            await odontogramaRepository.save(newOdontograma)

            return res.status(201).json(newOdontograma)
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async list(req: Request, res:Response){
        try {
            let odontogramas = await odontogramaRepository.find({})
            return res.json(odontogramas)
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async listId(req: Request, res:Response){
        try {
            const{ codOdon } = req.params
            let odontogramas = await odontogramaRepository.findOneBy({codOdon:Number(codOdon)})
            return res.json(odontogramas)
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async update(req: Request, res: Response){
        try {
            const{ codOdon } = req.params

            const odontograma = await odontogramaRepository.update(codOdon, req.body)

            if(odontograma.affected == 1){
                const odontogramaUpdated = await odontogramaRepository.findOneBy({codOdon:Number()})
                return res.json({message:'Odontograma Atualizado'})
            } else {
                return res.status(404).json({message:'Odontograma não encontrado'})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async delete(req: Request, res: Response){
        try {   
            const{ codOdon } = req.params

            const odontograma = await odontogramaRepository.delete(codOdon)

            if(odontograma.affected == 1){
                const odontogramaDeleted = await odontogramaRepository.findOneBy({codOdon:Number()})
                return res.json({message:'Odontograma Excluido'})
            } else {
                return res.status(404).json({message:'Odontograma não encontrado'})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }
}