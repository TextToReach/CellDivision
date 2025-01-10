import type { PageLoad } from './$types';
import yaml from "yaml";

export const load = (async ({ params, url }) => {
	const MaxTime = yaml.parse(await (await fetch(url.origin + "/config.yaml")).text());

    return {
			MaxTime
		};
}) satisfies PageLoad;