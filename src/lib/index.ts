import { dev } from "$app/environment";

/**
 * Standart Library
 */
export namespace STD {
	export type Option = "A" | "B" | "C" | "D"

	export interface Question {
		Quote: string,
		Options: { [sa in Option]: string },
		CorrectAnswer: Option,
		Image?: string
	}

	/**
	 * Runs console.log() if node instance is running in DEVELOPMENT mode.
	 */
	export function Devlog(message?: unknown, ...optionalParams: unknown[]) {
		if (dev) {
			console.log(message, ...optionalParams)

		}
	}

	/**
	 * Convert thing to string and then print.
	 */
	export function StrLog<T>(thing: T) {
		console.log(`${thing}`)
	}

	export class NestedQuestion {
		questions: Question[]

		constructor(...qs: Question[]) {
			this.questions = qs;
		}

		check(index: number, ans: Option) {
			return this.questions[index].CorrectAnswer == ans
		}

		at(index: number) {
			return this.questions.at(index)
		}

		toString() {
			return ""
		}

		toArray() {
			return Array.from(this.questions)
		}
	}
}

export function cx(...strings: string[]) {
	return [...strings.filter(e => e != "")].join(" ")
}
export function isNumeric(n: string) {
	//@ts-ignore
	return !isNaN(parseFloat(n)) && isFinite(n);
}
