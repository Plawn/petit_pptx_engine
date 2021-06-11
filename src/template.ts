import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import parser from './parsers';
import InspectModule from "docxtemplater/js/inspect-module";
import { Template } from 'petit_nodejs_publipost_connector';

const delimiters = {
    start: "{{",
    end: "}}",
}

class PPTXTemplate implements Template {
    content: Buffer;
    constructor(content: Buffer) {
        this.content = content;
    }
    render(data: any): Buffer {
        const doc = new Docxtemplater(new PizZip(this.content), { parser, delimiters });
        doc.setData(data);
        doc.render();
        return doc.getZip().generate({ type: 'nodebuffer' });
    }

    getAllPlaceholders() {
        const iModule = InspectModule();
        const doc = new Docxtemplater(new PizZip(this.content), { modules: [iModule], delimiters });
        doc.render();
        return Object.keys(iModule.getAllTags());
    }
}


export default PPTXTemplate;

