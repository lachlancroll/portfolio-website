export const isNullOrUndefined = (variable: any) => {
    return variable == null || isNaN(variable);
};

export const stringIsNullOrEmpty = (string : string) => {
    return string == null || string === '';
}

