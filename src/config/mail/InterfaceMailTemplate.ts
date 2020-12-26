interface InterfaceTemplateVariable {
    [key: string]: string | number;
}

interface InterfaceParseMailTemplate {
    file: string;
    variables: InterfaceTemplateVariable;
}