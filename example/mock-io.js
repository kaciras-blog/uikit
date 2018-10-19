import { sleep } from "../src";

class MockIOBuilder {

	delay (ms) {
		this._delay = ms;
		return this;
	}

	result (res) {
		this._res = res;
		return this;
	}

	generate (result) {
		return () => this.get(result);
	}

	async get () {
		if (this._delay) {
			await sleep(this._delay);
		}
		return this._res;
	}
}

export default function () {
	return new MockIOBuilder();
};
