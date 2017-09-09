export class Imgupload {
    category: string;
    prdID:string;
    name: string;
    file: File;

    url: string;
    progress: number;

    constructor(file: File,cate: string, id: string) {
        this.file = file;
        this.category = cate;
        this.prdID = id;
    }


}
