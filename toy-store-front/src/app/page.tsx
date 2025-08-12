import { LoginForm } from "~/modules/auth/components/login-form";
import MultiStepLayout from "~/modules/auth/components/multi-step-layout";

export default function Page() {
	return (
		<MultiStepLayout>
			<LoginForm />
		</MultiStepLayout>
	);
}
