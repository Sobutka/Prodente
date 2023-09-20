import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orcamento } from "./Orcamento";
import { Procedimento } from "./Procedimento";

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

    @ManyToOne(() => Orcamento, orcamento => orcamento.odontograma)
    @JoinColumn({name: 'orcamento_codOrcamento'})
    orcamento: Orcamento

    @ManyToOne(() => Procedimento, procedimento => procedimento.odontograma)
    @JoinColumn({name: 'procedimento_codProcedimento'})
    procedimento: Procedimento
}
