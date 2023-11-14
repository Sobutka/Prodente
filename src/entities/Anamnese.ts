import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Consulta } from "./Consulta";
import { Paciente } from "./Paciente";

@Entity('anamneses')
export class Anamnese{
    @PrimaryGeneratedColumn()
    codAnam : number

    @Column({type: 'boolean'})
    cirurgia : boolean = false

    @Column({type: 'text', nullable: true})
    qCirurgia : String

    @Column({type: 'boolean'})
    alergiaRemedio : boolean = false

    @Column({type: 'text', nullable: true})
    qAlergiaRemedio : String

    @Column({type: 'boolean'})
    pressaoAlta : boolean = false

    @Column({type: 'boolean'})
    sangraCorte : boolean = false

    @Column({type: 'boolean'})
    manchasRochas : boolean = false

    @Column({type: 'boolean'})
    cicatrizacaoDemorada : boolean = false

    @Column({type: 'boolean'})
    anemia : boolean = false

    @Column({type: 'boolean'})
    transfusaoSangue : boolean = false

    @Column({type: 'boolean'})
    dst : boolean = false

    @Column({type: 'boolean'})
    tonturas : boolean = false

    @Column({type: 'boolean'})
    convulsoes : boolean = false

    @Column({type: 'boolean'})
    diabetes : boolean = false

    @Column({type: 'boolean'})
    fuma : boolean = false

    @Column({type: 'boolean'})
    alcool : boolean = false

    @Column({type: 'boolean'})
    asma : boolean = false

    @Column({type: 'boolean'})
    bronquite : boolean = false

    @Column({type: 'boolean'})
    rinite : boolean = false

    @Column({type: 'boolean'})
    sinusite : boolean = false

    @Column({type: 'boolean'})
    gastrite : boolean = false

    @Column({type: 'boolean'})
    alergiaPeniscilina : boolean = false

    @Column({type: 'boolean'})
    cancerDeProstata : boolean = false

    @Column({type: 'boolean'})
    alergiaIodo : boolean = false

    @Column({type: 'boolean'})
    denteMole : boolean = false

    @Column({type: 'boolean'})
    feridaLabioeLingua : boolean = false

    @Column({type:'text', nullable: true})
    anotacao : String

    @ManyToOne(() => Paciente, paciente => paciente.anamnese)
    @JoinColumn({name: 'paciente_codPac'})
    paciente: Paciente

    @Column({type: 'int', nullable: true})
    codPac: number
}