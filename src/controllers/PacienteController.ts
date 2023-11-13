import { Request, Response } from "express";
import { pacienteRepository } from "../repositories/pacienteRepository";

export class PacienteController{
    async create(req: Request, res: Response){
        let { nome, cpf, email, dataNasc, celular, celularRecado } = req.body
        dataNasc = new Date(dataNasc.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
        console.log(dataNasc)

        if(!nome){
            return res.status(400).json({ message: 'O Nome é obrigatório'})
        }
        if(!cpf){
            return res.status(400).json({ message: 'O CPF é obrigatório'})
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
            const newPaciente = pacienteRepository.create({ nome, cpf, email, dataNasc, celular, celularRecado})
            
            await pacienteRepository.save(newPaciente)

            return res.status(201).json(newPaciente)

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async list(req: Request, res:Response){
        try {
            const paciente = await pacienteRepository.find({
            })
            return res.json(paciente)
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async listId(req: Request, res:Response){
        try {
            const{ codPac } = req.params
            const paciente = await pacienteRepository.findOneBy({codPac:Number(codPac)})
            return res.json(paciente)
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async update(req: Request, res: Response){
        try {
            const{ codPac } = req.params

            const paciente = await pacienteRepository.update(codPac, req.body)

            if(paciente.affected == 1){
                const pacienteUpdated = await pacienteRepository.findOneBy({codPac:Number()})
                return res.json({message:'Paciente Atualizado'})
            } else {
                return res.status(404).json({message:'Paciente não encontrado'})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async delete(req: Request, res: Response){
        try {   
            const{ codPac } = req.params

            const paciente = await pacienteRepository.delete(codPac)

            if(paciente.affected == 1){
                const pacienteDeleted = await pacienteRepository.findOneBy({codPac:Number()})
                return res.json({message:'Paciente Excluido'})
            } else {
                return res.status(404).json({message:'Paciente não encontrado'})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }
}