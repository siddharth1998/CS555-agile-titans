/** This is very painful for me to write something that uses callbacks, but REACT doesn't use async await */
const fetchSomething = (url, requestOptions, successCb, errorCb) => {
	if (!Object.prototype.hasOwnProperty.call(requestOptions, "headers")) requestOptions.headers = new Headers();

	requestOptions.headers.append("Auth", localStorage.getItem("Auth"));
	fetch(url, requestOptions)
		.then(res => {
			res.text().then(resText => {
				if (!res.ok) return errorCb(res);

				successCb(JSON.parse(resText));
			});
		})
		.catch(err => errorCb(err));
};

export { fetchSomething };