export class ProgressoService {
    public status: string;
    public estado: any;

    public calcularPorcentagemUpload(): number {
        return (this.estado.bytesTransferred / this.estado.totalBytes) * 100;
    }
}