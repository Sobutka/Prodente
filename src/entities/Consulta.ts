import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Anamnese } from "./Anamnese";
import { Dentista } from "./Dentista";
import { Paciente } from "./Paciente";

@Entity('consultas')
export class Consulta{
    @PrimaryGeneratedColumn()
    codCons: number

    @Column({type: 'date' })
    data: Date

    @Column({type: 'text' })
    horaInicio: string

    @Column({type: 'text'})
    horaFinal: string

    @Column({type: 'text', nullable: true})
    confirmado: string
    
    @Column({type: 'text', nullable: true})
    consRealizada: string

    @ManyToOne(() => Dentista, dentista => dentista.consulta)
    @JoinColumn({name: 'dentista_codDent'})
    dentista: Dentista

    @ManyToOne(() => Paciente, paciente => paciente.consulta)
    @JoinColumn({name: 'paciente_codPac'})
    paciente: Paciente

    @ManyToOne(() => Anamnese, anamnese => anamnese.consulta)
    @JoinColumn({name: 'anamnese_codAnam'})
    anamnese: Anamnese

    @Column({type: 'int', nullable: true})
    codDent: number

    @Column({type: 'int', nullable: true})
    codPac: number

    @Column({type: 'int', nullable: true})
    codAnam: number
}