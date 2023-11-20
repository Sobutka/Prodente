import { Request, Response } from "express";
import { anamneseRepository } from "../repositories/anamneseRepository";

export class AnamneseController {
  async create(req: Request, res: Response) {
    let {
      cirurgia,
      qCirurgia,
      alergiaRemedio,
      qAlergiaRemedio,
      pressaoAlta,
      sangraCorte,
      manchasRochas,
      cicatrizacaoDemorada,
      anemia,
      transfusaoSangue,
      dst,
      tonturas,
      convulsoes,
      diabetes,
      fuma,
      alcool,
      asma,
      bronquite,
      rinite,
      sinusite,
      gastrite,
      alergiaPeniscilina,
      cancerDeProstata,
      alergiaIodo,
      denteMole,
      feridaLabioeLingua,
      anotacao,
      dataRealizacao,
      paciente,
      codPac,
    } = req.body;
    codPac = paciente;
    dataRealizacao = new Date(
      dataRealizacao.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"),
    );
    dataRealizacao.setDate(dataRealizacao.getDate());
    console.log(dataRealizacao);

    if (!dataRealizacao) {
      return res.status(400).json({ message: "A data é obrigatória" });
    }

    try {
      const newAnamnese = await anamneseRepository.create({
        cirurgia,
        qCirurgia,
        alergiaRemedio,
        qAlergiaRemedio,
        pressaoAlta,
        sangraCorte,
        manchasRochas,
        cicatrizacaoDemorada,
        anemia,
        transfusaoSangue,
        dst,
        tonturas,
        convulsoes,
        diabetes,
        fuma,
        alcool,
        asma,
        bronquite,
        rinite,
        sinusite,
        gastrite,
        alergiaPeniscilina,
        cancerDeProstata,
        alergiaIodo,
        denteMole,
        feridaLabioeLingua,
        anotacao,
        dataRealizacao,
        paciente,
        codPac,
      });

      await anamneseRepository.save(newAnamnese);

      return res.status(201).json(newAnamnese);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async list(req: Request, res: Response) {
    try {
      let anamneses = await anamneseRepository.find({});
      return res.json(anamneses);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async listId(req: Request, res: Response) {
    try {
      const { codAnam } = req.params;
      let anamneses = await anamneseRepository.findOneBy({
        codAnam: Number(codAnam),
      });
      return res.json(anamneses);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { codAnam } = req.params;

      const anamnese = await anamneseRepository.update(codAnam, req.body);

      if (anamnese.affected == 1) {
        const anamneseUpdated = await anamneseRepository.findOneBy({
          codAnam: Number(),
        });
        return res.json({ message: "Anamnese Atualizada" });
      } else {
        return res.status(404).json({ message: "Anamnese não encontrada" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { codAnam } = req.params;

      const anamnese = await anamneseRepository.delete(codAnam);

      if (anamnese.affected == 1) {
        const anamneseUpdated = await anamneseRepository.findOneBy({
          codAnam: Number(),
        });
        return res.json({ message: "Anamnese Atualizada" });
      } else {
        return res.status(404).json({ message: "Anamnese não encontrada" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
