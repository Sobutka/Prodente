import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Odontograma } from "./Odontograma";
import { Paciente } from "./Paciente";

@Entity('orcamentos')
export class Orcamento{
    @PrimaryGeneratedColumn()
    codOrcamento : number

    @Column({type: 'date'})
    data: Date

    @OneToMany(() => Odontograma, (odontograma) => odontograma.orcamento)
    odontograma: Odontograma[]

    @ManyToOne(() => Paciente, paciente => paciente.orcamento)
    @JoinColumn({name: 'paciente_codPac'})
    paciente: Paciente

}
