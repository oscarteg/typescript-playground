class User {
	constructor(
		public name: string,
		public email: string,
	) {
		this.name = name;
		this.email = email;
	}

	showName = () => {
		console.log(this);
	};

	showEmail() {
		console.log(this);
	}
}

const user = {
	name: "oscar",
	email: "",
	showEmail() {
		console.log(this);
	},
};

user.showEmail();
