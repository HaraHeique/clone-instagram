import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

import { ProgressoService } from './progresso.service';

@Injectable()
export class BdService {

    public constructor(private progressoService: ProgressoService) { }

    public async publicar(publicacao: any): Promise<any> {
        //console.log(publicacao);
        const B64EMAIL: string = btoa(publicacao.email);

        return await firebase.database().ref(`publicacoes/${B64EMAIL}`).push(publicacao.titulo)
            .then((response: any) => {
                console.log("Cadastro da publicação realizado com sucesso!");
                // let nomeImagem: number = Date.now();

                // Key que representa o documento de publicação
                const CHAVE_IMAGEM: string = response.key;

                firebase.storage().ref()
                    .child(`imagens/${CHAVE_IMAGEM}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        // Acompanhamento do progresso de upload
                        (snapshot: any) => {
                            this.progressoService.status = "andamento";
                            this.progressoService.estado = snapshot;
                            // console.log(snapshot);
                        },
                        (error: Error) => {
                            // Erro na subida
                            this.progressoService.status = "erro";
                            // console.log(error)
                        },
                        () => {
                            // finalização do processo
                            this.progressoService.status = "concluido";
                            // console.log("Upload completo");
                        }
                    );
            })
            .catch((error: Error) => console.log("Erro ao cadastrar publicação."));
    }

    public async consultaPublicacoes(userEmail: string): Promise<any> {
        // Método once recupera os dados do database como se fosse um snapshot do path passado
        return await new Promise((resolve, reject) => {
            firebase.database().ref(`publicacoes/${btoa(userEmail)}`)
                .orderByKey()
                .once('value')
                .then((snapshot: any) => {
                    //console.log(snapshot.val());

                    let publicacoes: Array<any> = [];

                    // Percorre por cada objeto recuperado do snapshot e pegar as imagens correspondentes
                    snapshot.forEach((childSnapshot: any) => {
                        publicacoes.push({
                            publicacaoId: childSnapshot.key,
                            urlImagem: '',
                            nomeUsuario: '',
                            titulo: childSnapshot.val()
                        });
                    });

                    // Inverte a ordenação das publicações para descrecente
                    return publicacoes.reverse();
                })
                .then((publicacoes: any) => {
                    publicacoes.forEach((publicacao: any) => {
                        firebase.storage().ref()
                            .child(`imagens/${publicacao.publicacaoId}`)
                            .getDownloadURL()
                            .then((url: string) => {
                                // console.log(url);

                                // Consultar o nome do usuário
                                firebase.database().ref(`usuario_detalhe/${btoa(userEmail)}`)
                                    .once('value')
                                    .then((snapshot: any) => {
                                        // console.log(snapshot.val());
                                        publicacao.urlImagem = url;
                                        publicacao.nomeUsuario = snapshot.val().nomeUsuario;
                                    });
                            });
                    });

                    // console.log(publicacoes);
                    resolve(publicacoes);
                });
        });
    }

    // public publicar(publicacao: any): void {
    //     console.log(publicacao);

    //     let nomeImagem: number = Date.now();

    //     firebase.storage().ref()
    //         .child(`imagens/${nomeImagem}`)
    //         .put(publicacao.imagem)
    //         .on(firebase.storage.TaskEvent.STATE_CHANGED,
    //             // Acompanhamento do progresso de upload
    //             (snapshot: any) => {
    //                 this.progressoService.status = "andamento";
    //                 this.progressoService.estado = snapshot;
    //                 // console.log(snapshot);
    //             },
    //             (error: Error) => {
    //                 // Erro na subida
    //                 this.progressoService.status = "erro";
    //                 // console.log(error)
    //             },
    //             () => {
    //                 // finalização do processo
    //                 this.progressoService.status = "concluido";
    //                 // console.log("Upload completo");
    //             }
    //         );
    // }
}