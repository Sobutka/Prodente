import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Consulta } from "./Consulta";

@Entity("dentistas")
export class Dentista {
  @PrimaryGeneratedColumn()
  codDent: number;

  @Column({ type: "text" })
  nome: string;

  @Column({ type: "text" })
  cro: string;

  @Column({ type: "text" })
  email: string;

  @Column({ type: "date" })
  dataNasc: Date;

  @Column({ type: "text" })
  celular: string;

  @Column({ type: "text", nullable: true })
  celularRecado: string;

  @Column({ type: "text" })
  uf: string;

  @OneToMany(() => Consulta, (consulta) => consulta.dentista)
  consulta: Consulta[];
}
