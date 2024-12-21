import { dev } from "$app/environment";

/**
 * Runs console.log() if node instance is running in DEVELOPMENT mode.
 */
export function devlog(message?: unknown, ...optionalParams: unknown[]){
	if(dev){
		console.log(message, ...optionalParams)
	}
}