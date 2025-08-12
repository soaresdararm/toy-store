import { env } from "~/env";

export function generateBorrowerAvatar(taxId: string) {
	return `${env.NEXT_PUBLIC_BORROWER_IMAGE_BASE_URL}${taxId}`;
}

export function generateWalletAvatar(walletId: string) {
	return `${env.NEXT_PUBLIC_WALLET_IMAGE_BASE_URL}${walletId}`;
}

export function generateBranchAvatar(branchId: string) {
	return `${env.NEXT_PUBLIC_BRANCH_IMAGE_BASE_URL}${branchId}`;
}
