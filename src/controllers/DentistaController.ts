import { Request, Response } from "express";
import { dentistaRepository } from "../repositories/dentistaRepository";

export class DentistaController{
    async create(req: Request, res: Response){
        let { nome, cro, email, dataNasc, celular, celularRecado } = req.body
        dataNasc = new Date(dataNasc.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
        console.log(dataNasc)

        if(!nome){
            return res.status(400).json({ message: 'O Nome é obrigatório'})
        }
        if(!cro){
            return res.status(400).json({ message: 'O CRO é obrigatório'})
        }
        if(!email){
            return res.status(400).json({ message: 'O Email é obrigatório'})
        }
        if(!dataNasc){
            return res.status(400).json({ message: 'A Data de Nascimento é obrigatória'})
        }
        if(!celular){
            return res.status(400).json({ message: 'O Celular é obrigatório'})
        }

        try {
            const newDentista = dentistaRepository.create({ nome, cro, email, dataNasc, celular, celularRecado })

            await dentistaRepository.save(newDentista)

            return res.status(201).json(newDentista)
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async list(req: Request, res:Response){
        try {
            const dentista = await dentistaRepository.find({
            })
            return res.json(dentista)
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async listId(req: Request, res:Response){
        try {
            const{ codDent } = req.params
            const dentista = await dentistaRepository.findOneBy({codDent:Number(codDent)})
            return res.json(dentista)
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async update(req: Request, res: Response){
        try {
            const{ codDent } = req.params

            const dentista = await dentistaRepository.update(codDent, req.body)

            if(dentista.affected == 1){
                const dentistaUpdated = await dentistaRepository.findOneBy({codDent:Number()})
                return res.json({message:'Dentista Atualizado'})
            } else {
                return res.status(404).json({message:'Dentista não encontrado'})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async delete(req: Request, res: Response){
        try {   
            const{ codDent } = req.params

            const dentista = await dentistaRepository.delete(codDent)

            if(dentista.affected == 1){
                const dentistaDeleted = await dentistaRepository.findOneBy({codDent:Number()})
                return res.json({message:'Dentista Excluido'})
            } else {
                return res.status(404).json({message:'Dentista não encontrado'})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }
}