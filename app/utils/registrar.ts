import { CookieJar } from "tough-cookie";
import makeFetchCookie from "fetch-cookie";
import nodeFetch from "node-fetch";
import { Agent } from "https";
import queryString from "query-string";
import { scheduleTypeResolver } from "./schedule-type";
import { parseSchedule } from "./parse";

const HOST = "https://registrar.nu.edu.kz";
const BUILD_ID = "form-tFAqQhbP6TRrM1eFFrnkFOGsb2ExDtyBNHcywT3RB8s";

export class RegistrarClient {
	private jar: CookieJar;
	private agent: Agent;
	private fetch: typeof nodeFetch;
	private request: typeof nodeFetch;

	constructor() {
		this.jar = new CookieJar();
		this.agent = new Agent({ rejectUnauthorized: false });
		this.jar.setCookieSync("has_js=1;", HOST);
		this.fetch = makeFetchCookie(nodeFetch, this.jar);
		this.request = (url, init) =>
			this.fetch(url, { ...init, agent: this.agent });
	}

	async sync(username: string, password: string) {
		await this.login(username, password);
		const type = await this.getScheduleType();
		const schedule = await this.getSchedule(type);
		return schedule;
	}

	private async login(username: string, password: string) {
		const url = queryString.stringifyUrl({
			url: `${HOST}/index.php`,
			query: { q: "user/login" },
		});

		await this.request(url, {
			method: "POST",
			body: `name=${username}&pass=${password}&form_build_id=${BUILD_ID}&form_id=user_login&op=Log+in`,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});

		const cookies = await this.jar.getCookies(HOST);
		const authed = cookies.some((cookie) => cookie.key === "AUTHSSL");

		if (!authed) {
			throw new Error("Invalid credentials");
		}

		return true;
	}

	private async getScheduleType() {
		const url = `${HOST}/my-registrar/personal-schedule`;
		const response = await this.request(url);
		const text = await response.text();
		return scheduleTypeResolver(text);
	}

	private async getSchedule(type: "reg" | "current") {
		const url = queryString.stringifyUrl({
			url: `${HOST}/my-registrar/personal-schedule/json`,
			query: {
				method: "getTimetable",
				type,
				page: 1,
				start: 0,
				limit: 50,
			},
		});

		const response = await this.request(url);
		const text = await response.text();
		return parseSchedule(text);
	}
}
