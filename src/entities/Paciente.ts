import {Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Consulta } from "./Consulta";
import { Orcamento } from "./Orcamento";

@Entity('pacientes')
export class Paciente{
    @PrimaryGeneratedColumn()
    codPac: number

    @Column({type: 'text' })
    nome: string

    @Column({type: 'text'})
    cpf: string
    
    @Column({type: 'text' })
    email: string

    @Column({type: 'date' })
    dataNasc: Date

    @Column({type: 'text' })
    celular: string

    @Column({type: 'text', nullable: true})
    celularRecado: string
    
    @OneToMany(() => Consulta, (consulta) => consulta.paciente)
    consulta: Consulta[]

    @OneToMany(() => Orcamento, (orcamento) => orcamento.paciente)
    orcamento: Orcamento[]
}