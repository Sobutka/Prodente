import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Odontograma } from "./Odontograma";

@Entity('procedimentos')
export class Procedimento{
    @PrimaryGeneratedColumn()
    codProcedimento : number

    @Column({type: 'text'})
    nome : String

    @Column({type: 'boolean'})
    dente : boolean = false

    @Column({type: 'boolean'})
    face: boolean = false

    @Column({type: 'text'})
    valor: String

    @OneToMany(() => Odontograma, (odontograma) => odontograma.procedimento)
    odontograma: Odontograma[]
}
