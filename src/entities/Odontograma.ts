import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Procedimento } from "./Procedimento";
import { Paciente } from "./Paciente";

@Entity('odontogramas')
export class Odontograma{
    @PrimaryGeneratedColumn()
    codOdon : number

    @Column({type: 'text'})
    dente : String

    @Column({type: 'text'})
    face : String

    @Column({type: 'date'})
    dataRealizacao: Date

    @Column({type: 'text'})
    valor: String

    @ManyToOne(() => Procedimento, procedimento => procedimento.odontograma)
    @JoinColumn({name: 'procedimento_codProcedimento'})
    procedimento: Procedimento

    @ManyToOne(() => Paciente, paciente => paciente.odontograma)
    @JoinColumn({name: 'paciente_codPac'})
    paciente: Paciente

    @Column({type: 'int', nullable: true})
    codPac: number
}
