import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Consulta } from "./Consulta";
import { Odontograma } from "./Odontograma";
import { Anamnese } from "./Anamnese";

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

    @OneToMany(() => Odontograma, (odontograma) => odontograma.paciente)
    odontograma: Odontograma[]

    @OneToMany(() => Anamnese, (anamnese) => anamnese.paciente)
    anamnese: Anamnese[]

}