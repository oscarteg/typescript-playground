import { assert } from "ts-essentials";

import { expect, test } from "bun:test";

function addSubdomainToDomainOnly(url: string, subdomain: string): string {
	const parsedUrl = new URL(url);

	const checkSubdomains = parsedUrl.hostname.match(/\./g);
	const hasSubdomain = checkSubdomains !== null && checkSubdomains.length > 1;

	const hostname = hasSubdomain
		? parsedUrl.hostname.replace(/^[^.]+\./g, "")
		: parsedUrl.hostname;

	// Reconstruct the URL with only the protocol, subdomain, and domain
	return `${parsedUrl.protocol}//${subdomain}.${hostname}`;
}

test("", () => {
	expect(addSubdomainToDomainOnly("https://www.google.com", "test")).toBe(
		"https://test.google.com",
	);

	expect(addSubdomainToDomainOnly("https://google.com", "test")).toBe(
		"https://test.google.com",
	);
});
