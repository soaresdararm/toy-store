export function isValidCPF(cpf: string): boolean {
	const onlyDigits = cpf.replace(/\D/g, "");
	if (onlyDigits.length !== 11) return false;
	if (/^(\d)\1{10}$/.test(onlyDigits)) return false;

	let sum = 0;
	for (let i = 0; i < 9; i++) {
		sum += parseInt(onlyDigits.charAt(i)) * (10 - i);
	}
	let firstDigit = (sum * 10) % 11;
	if (firstDigit === 10 || firstDigit === 11) firstDigit = 0;
	if (firstDigit !== parseInt(onlyDigits.charAt(9))) return false;

	sum = 0;
	for (let i = 0; i < 10; i++) {
		sum += parseInt(onlyDigits.charAt(i)) * (11 - i);
	}
	let secondDigit = (sum * 10) % 11;
	if (secondDigit === 10 || secondDigit === 11) secondDigit = 0;
	if (secondDigit !== parseInt(onlyDigits.charAt(10))) return false;

	return true;
}

export function isValidCNPJ(cnpj: string): boolean {
	const onlyDigits = cnpj.replace(/\D/g, "");
	if (onlyDigits.length !== 14) return false;
	if (/^(\d)\1{13}$/.test(onlyDigits)) return false;

	const calcCheckDigit = (base: string, factors: number[]) => {
		let sum = 0;
		for (let i = 0; i < factors.length; i++) {
			sum += parseInt(base.charAt(i)) * factors[i]!;
		}
		const remainder = sum % 11;
		return remainder < 2 ? 0 : 11 - remainder;
	};

	const firstFactors = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
	const secondFactors = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

	const base = onlyDigits.slice(0, 12);
	const firstDigit = calcCheckDigit(base, firstFactors);
	if (firstDigit !== parseInt(onlyDigits.charAt(12))) return false;

	const baseWithFirstDigit = base + firstDigit;
	const secondDigit = calcCheckDigit(baseWithFirstDigit, secondFactors);
	if (secondDigit !== parseInt(onlyDigits.charAt(13))) return false;

	return true;
}
