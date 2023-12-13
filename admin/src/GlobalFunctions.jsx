const GlobalFunctions = {
	logOut() {
		localStorage.removeItem('email');
		localStorage.removeItem('name');
		localStorage.removeItem('phone');
		localStorage.removeItem('photo');
		localStorage.removeItem('role');
		localStorage.removeItem('token');

		window.location.reload();
	},

	isAdmin() {
		if (localStorage.role != undefined && localStorage.role == 1) {
			return true;
		}
		return false;
	},
};

export default GlobalFunctions;
