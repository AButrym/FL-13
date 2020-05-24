class Student {
	constructor(name, email) {
		const _name = name;
		const _email = email;
		this.getName = () => _name;
		this.getEmail = () => _email;
	}
}
