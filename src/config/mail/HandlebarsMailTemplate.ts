import handlebars from 'handlebars';
import fs from 'fs';

class HandlebarsMailTemplate {

    public async parse({file, variables}: InterfaceParseMailTemplate): Promise<string> {

        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8'
        });

        const parseTemplate = handlebars.compile(templateFileContent);

        return parseTemplate(variables);
    }
}

export default HandlebarsMailTemplate;