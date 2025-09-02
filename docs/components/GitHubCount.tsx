import React, { useEffect, useState } from "react";

type GitHubCountProps = {
	owner: string;
	repo: string;
	type: "stars" | "contributors";
	className?: string;
};

const ONE_HOUR_MS = 60 * 60 * 1000;

function getCacheKey(owner: string, repo: string, type: string): string {
	return `gh:${owner}/${repo}:${type}`;
}

function readCachedNumber(key: string): number | null {
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return null;
		const parsed = JSON.parse(raw) as { value: number; ts: number };
		if (Date.now() - parsed.ts > ONE_HOUR_MS) return null;
		return parsed.value;
	} catch {
		return null;
	}
}

function writeCachedNumber(key: string, value: number): void {
	try {
		localStorage.setItem(key, JSON.stringify({ value, ts: Date.now() }));
	} catch {
		// ignore
	}
}

async function fetchStars(owner: string, repo: string): Promise<number> {
	const url = `https://api.github.com/repos/${owner}/${repo}`;
	const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
	if (!res.ok) throw new Error(`GitHub repo fetch failed: ${res.status}`);
	const data = (await res.json()) as { stargazers_count?: number };
	return typeof data.stargazers_count === "number" ? data.stargazers_count : 0;
}

async function fetchContributors(owner: string, repo: string): Promise<number> {
	// Use per_page=1 and parse the Link header's last page as total contributors
	const url = `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=1&anon=1`;
	const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
	if (!res.ok) {
		// Fall back to counting array length for small repos (no pagination)
		if (res.status === 200) {
			const arr = (await res.json()) as unknown[];
			return Array.isArray(arr) ? arr.length : 0;
		}
		throw new Error(`GitHub contributors fetch failed: ${res.status}`);
	}
	const link = res.headers.get("Link");
	if (!link) {
		const arr = (await res.json()) as unknown[];
		return Array.isArray(arr) ? arr.length : 0;
	}
	// Example: <...&page=2>; rel="next", <...&page=42>; rel="last"
	const match = link.match(/<[^>]*[?&]page=(\d+)[^>]*>;\s*rel="last"/);
	if (match && match[1]) {
		return Number(match[1]);
	}
	// If there's no last rel, try next or default to 1
	const next = link.match(/<[^>]*[?&]page=(\d+)[^>]*>;\s*rel="next"/);
	return next && next[1] ? Number(next[1]) - 1 : 1;
}

export function GitHubCount({ owner, repo, type, className }: GitHubCountProps): JSX.Element {
	const [value, setValue] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const key = getCacheKey(owner, repo, type);
		const cached = readCachedNumber(key);
		if (cached !== null) {
			setValue(cached);
		}
		(async () => {
			try {
				const num = type === "stars" ? await fetchStars(owner, repo) : await fetchContributors(owner, repo);
				setValue(num);
				writeCachedNumber(key, num);
			} catch (e) {
				setError(e instanceof Error ? e.message : "unknown error");
			}
		})();
	}, [owner, repo, type]);

	if (error) {
		return <span className={className}>—</span>;
	}

	return <span className={className}>{value === null ? "…" : value}</span>;
}

export default GitHubCount;


