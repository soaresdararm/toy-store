export type ApiResponse =
	| {
			success: false;
			message: string;
			data: null;
	  }
	| {
			success: true;
			message: null;
			data: unknown;
	  };
