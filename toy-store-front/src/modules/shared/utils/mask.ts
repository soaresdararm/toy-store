export function maskTaxId(value: string) {
	const onlyDigits = value.replace(/\D/g, "");

	if (onlyDigits.length <= 11) {
		return onlyDigits
			.replace(/(\d{3})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
	} else {
		return onlyDigits
			.replace(/^(\d{2})(\d)/, "$1.$2")
			.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
			.replace(/\.(\d{3})(\d)/, ".$1/$2")
			.replace(/(\d{4})(\d)/, "$1-$2");
	}
}

export const maskCellPhone = (value: string) => {
	const onlyDigits = value.replace(/\D/g, "");

	if (onlyDigits.length <= 10) {
		return onlyDigits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
	} else {
		return onlyDigits.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
	}
};

export function maskCep(value: string) {
	return value.replace(/(\d{5})(\d{3})/, "$1-$2");
}
